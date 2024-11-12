import React, { useState } from "react";
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

const HeadlinesTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const headlines = [
    {
      id: 1,
      portal: "Sabrangindia",
      publishedDate: "2024-11-11",
      author: "A Legal Researcher",
      headline:
        "Beyond insurance: addressing the needs of India's agricultural labour force",
      urlLink: "Read More",
      sentiment: "Neutral",
    },
    {
      id: 2,
      portal: "Sabrangindia",
      publishedDate: "2024-11-11",
      author: "Sabrangindia",
      headline:
        "Maharashtra: Free speech has remained on the line of fire of the current regime, democracy on trial as state goes for election",
      urlLink: "Read More",
      sentiment: "Negative",
    },
    {
      id: 3,
      portal: "Sabrangindia",
      publishedDate: "2024-11-11",
      author: "Sabrangindia",
      headline:
        "Citizens and experts rally to save Mumbai's BEST buses from privatisation pitfalls",
      urlLink: "Read More",
      sentiment: "Neutral",
    },
    {
      id: 4,
      portal: "Sabrangindia",
      publishedDate: "2024-11-11",
      author: "Sabrangindia",
      headline:
        "Faith v/s Environment: 17,600 trees felled in U.P. to pave way for proposed Kanwar Yatra route, fact-finding panel tells NGT",
      urlLink: "Read More",
      sentiment: "Neutral",
    },
    {
      id: 5,
      portal: "Maktoobmedia",
      publishedDate: "2024-11-11",
      author: "Maktoob Staff",
      headline:
        "Manipur: 10 Kukis killed by security forces, Kuki groups call 24-hour shutdown",
      urlLink: "Read More",
      sentiment: "Negative",
    },
    {
      id: 6,
      portal: "Maktoobmedia",
      publishedDate: "2024-11-11",
      author: "Maktoob Staff",
      headline:
        "SC declines to entertain bail plea, directs HC to hear matter as Gulfisha Fatima completes 4 years, 7 months in jail",
      urlLink: "Read More",
      sentiment: "Neutral",
    },
    {
      id: 7,
      portal: "Maktoobmedia",
      publishedDate: "2024-11-11",
      author: "Rida Fathima",
      headline: "Who has a right to the city?",
      urlLink: "Read More",
      sentiment: "Neutral",
    },
    {
      id: 8,
      portal: "Maktoobmedia",
      publishedDate: "2024-11-11",
      author: "Maktoob Staff",
      headline:
        "Baba Siddique killing: Main accused arrested from Uttar Pradesh",
      urlLink: "Read More",
      sentiment: "Negative",
    },
    {
      id: 9,
      portal: "Maktoobmedia",
      publishedDate: "2024-11-11",
      author: "Maktoob Staff",
      headline:
        "Many countries nervous about US after trump's return, India not one of them: S. Jaishankar",
      urlLink: "Read More",
      sentiment: "Negative",
    },
    {
      id: 10,
      portal: "The News Minute",
      publishedDate: "2024-11-11",
      author: "Pooja Prasanna",
      headline:
        "The complex legacy of Siddaramaiah: A political and ideological profile",
      urlLink: "Read More",
      sentiment: "Neutral",
    },
  ];

  const filters = ["All", "Neutral", "Negative", "Positive"];

  const filteredHeadlines = headlines.filter((headline) => {
    const matchesSearch =
      headline.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      headline.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      headline.portal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSentiment = filter === "All" || headline.sentiment === filter;
    return matchesSearch && matchesSentiment;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Negative":
        return "destructive";
      case "Positive":
        return "success";
      default:
        return "secondary";
    }
  };

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
              {filteredHeadlines.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
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
                    <a href="#" className="text-primary hover:underline">
                      {item.urlLink}
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
      </CardContent>
    </Card>
  );
};

export default HeadlinesTable;
