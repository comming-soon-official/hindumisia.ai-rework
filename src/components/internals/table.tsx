"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type csvDataType = {
  value: string;
  publishedDate: string;
  portal: string;
  author: string;
  headline: string;
  urlLink: string;
  sentiment: string;
};

const HeadlinesTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [headlines, setHeadlines] = useState<csvDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const file = "/news_auto.csv";
        const response = await fetch(file);
        const csvText = await response.text();
        const rows = csvText.split("\n").map((row) => {
          const fields = [];
          let field = "";
          let inQuotes = false;

          for (let i = 0; i < row.length; i++) {
            if (row[i] === '"') {
              inQuotes = !inQuotes;
            } else if (row[i] === "," && !inQuotes) {
              fields.push(field.trim());
              field = "";
            } else {
              field += row[i];
            }
          }
          fields.push(field.trim());
          return fields;
        });

        const data = rows.slice(1); // Skip header row
        console.log(data);

        const today = "11-11-2024";

        const todaysData = data
          .filter((row) => row[1] === today)
          .map((row) => ({
            portal: row[0],
            publishedDate: row[1],
            author: row[2],
            headline: row[3],
            urlLink: row[4],
            sentiment: row[5],
            value: row[6],
          }));

        setHeadlines(todaysData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filters = ["All", "Neutral", "Negative", "Positive"];

  const filteredHeadlines = headlines.filter((headline) => {
    const matchesSearch =
      headline.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      headline.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      headline.portal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSentiment =
      filter === "All" ||
      headline.sentiment.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesSentiment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredHeadlines.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHeadlines = filteredHeadlines.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "negative":
        return "destructive";
      case "positive":
        return "success";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">Loading headlines...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-red-500">{error}</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Headlines for 11-Nov-2024
        </CardTitle>
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
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Portal</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead>Headline</TableHead>
                <TableHead className="hidden md:table-cell">Link</TableHead>
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
                        getSentimentColor(item.sentiment) as
                          | "destructive"
                          | "secondary"
                          | "default"
                          | "outline"
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
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeadlinesTable;
