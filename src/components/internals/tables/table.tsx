'use client'

import { Search } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { csvDataObjectType } from '@/store/useUniversalStore'

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100]
const filters = ['All', 'Neutral', 'Negative', 'Positive']

interface HeadlinesTableProps {
    rangeData: csvDataObjectType[]
    selectedPortal: string
    onPortalChange: (portal: string) => void
    availablePortals: string[]
}

const HeadlinesTable = ({
    rangeData,
    selectedPortal,
    onPortalChange,
    availablePortals
}: HeadlinesTableProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [goToPage, setGoToPage] = useState('')

    const filteredHeadlines = useMemo(() => {
        return rangeData.filter((headline) => {
            const matchesSearch =
                headline.headline
                    ?.toLowerCase()
                    .includes(searchQuery?.toLowerCase()) ||
                headline.author
                    ?.toLowerCase()
                    .includes(searchQuery?.toLowerCase()) ||
                headline.portal
                    ?.toLowerCase()
                    .includes(searchQuery?.toLowerCase())
            const matchesSentiment =
                filter === 'All' ||
                headline.sentiment?.toLowerCase() === filter?.toLowerCase()

            return matchesSearch && matchesSentiment
        })
    }, [rangeData, searchQuery, filter])

    const totalPages = Math.ceil(filteredHeadlines.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedHeadlines = filteredHeadlines.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    const getSentimentColor = useCallback((sentiment: string) => {
        switch (sentiment?.toLowerCase()) {
            case 'negative':
                return 'destructive'
            case 'positive':
                return 'success'
            default:
                return 'secondary'
        }
    }, [])

    const handleGoToPage = (e: React.FormEvent) => {
        e.preventDefault()
        const pageNum = parseInt(goToPage)
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum)
            setGoToPage('')
        }
    }

    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('ellipsis')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('ellipsis')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('ellipsis')
                pages.push(currentPage - 1)
                pages.push(currentPage)
                pages.push(currentPage + 1)
                pages.push('ellipsis')
                pages.push(totalPages)
            }
        }
        return pages
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Headlines</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search headlines, authors or portals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by sentiment" />
                        </SelectTrigger>
                        <SelectContent>
                            {filters.map((f) => (
                                <SelectItem key={f} value={f}>
                                    {f}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={selectedPortal}
                        onValueChange={onPortalChange}
                    >
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Filter by portal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Portals</SelectItem>
                            {availablePortals.map((portal) => (
                                <SelectItem key={portal} value={portal}>
                                    {portal}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Portal</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Author
                                </TableHead>
                                <TableHead>Headline</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Link
                                </TableHead>
                                <TableHead>Sentiment</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedHeadlines.map((item, index) => (
                                <TableRow key={`${item.headline}-${index}`}>
                                    <TableCell className="font-medium">
                                        {startIndex + index + 1}
                                    </TableCell>
                                    <TableCell>{item.portal}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {item.publishedDate}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {item.author}
                                    </TableCell>
                                    <TableCell className="max-w-[300px] truncate">
                                        {item.headline}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <a
                                            href={item.urlLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            Read More
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                getSentimentColor(
                                                    item.sentiment
                                                ) as
                                                    | 'destructive'
                                                    | 'secondary'
                                                    | 'default'
                                                    | 'outline'
                                            }
                                        >
                                            {item.sentiment}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {totalPages > 1 && (
                    <Pagination className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-around">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    className={
                                        currentPage === 1
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>

                            {getPageNumbers().map((pageNum, index) => (
                                <PaginationItem key={index}>
                                    {pageNum === 'ellipsis' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            onClick={() =>
                                                setCurrentPage(
                                                    pageNum as number
                                                )
                                            }
                                            isActive={currentPage === pageNum}
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    className={
                                        currentPage === totalPages
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                        <div className="flex items-center gap-4">
                            <div className=" flex  items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Items per page:
                                </span>
                                <Select
                                    value={itemsPerPage.toString()}
                                    onValueChange={(value) => {
                                        setItemsPerPage(Number(value))
                                        setCurrentPage(1)
                                    }}
                                >
                                    <SelectTrigger className="w-[70px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ITEMS_PER_PAGE_OPTIONS.map(
                                            (option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option.toString()}
                                                >
                                                    {option}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">
                                    {`${startIndex + 1}-${Math.min(
                                        startIndex + itemsPerPage,
                                        filteredHeadlines.length
                                    )} of ${filteredHeadlines.length}`}
                                </span>
                            </div>

                            <form
                                onSubmit={handleGoToPage}
                                className="flex items-center gap-2"
                            >
                                <span className="text-sm text-muted-foreground">
                                    Go to page:
                                </span>
                                <Input
                                    type="number"
                                    min="1"
                                    max={totalPages}
                                    value={goToPage}
                                    onChange={(e) =>
                                        setGoToPage(e.target.value)
                                    }
                                    className="w-16"
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-primary px-2 py-1 text-sm text-primary-foreground"
                                >
                                    Go
                                </button>
                            </form>
                        </div>
                    </Pagination>
                )}
            </CardContent>
        </Card>
    )
}

export default HeadlinesTable
