"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchHymns } from "@/lib/hymnal";
import { Hymn } from "@/types/hymn";
import Link from "next/link";
import { Music2, Search, FilterX } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Hymn[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showMissingOnly, setShowMissingOnly] = useState(false);

  const applySearch = (searchQuery: string, missingOnly: boolean) => {
    if (searchQuery.trim()) {
      let searchResults = searchHymns(searchQuery);
      if (missingOnly) {
        searchResults = searchResults.filter(h => !h.sheetMusicUrl);
      }
      setResults(searchResults);
      setHasSearched(true);
    } else if (missingOnly) {
      // If query is empty but "missing only" is enabled, show all missing
      const allHymns = searchHymns(""); // gets all
      setResults(allHymns.filter(h => !h.sheetMusicUrl));
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    applySearch(value, showMissingOnly);
  };

  const toggleMissingOnly = () => {
    const nextValue = !showMissingOnly;
    setShowMissingOnly(nextValue);
    applySearch(query, nextValue);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-950">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8">
        <div className={`text-center space-y-4 transition-all duration-500 ${hasSearched ? "mt-8" : "mt-20"}`}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-zinc-900 dark:text-zinc-50">
            SDA Hymnal
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Philippine Edition
          </p>
        </div>

        <div className="w-full space-y-4">
          <div className="w-full flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input 
                type="search" 
                placeholder="Search hymns by title, number, or lyrics..." 
                className="w-full h-12 text-lg pl-10"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button size="lg" className="h-12 px-6 rounded-xl">
              Search
            </Button>
          </div>

          <div className="flex justify-center">
            <Button 
              variant={showMissingOnly ? "default" : "outline"} 
              size="sm" 
              onClick={toggleMissingOnly}
              className="gap-2 rounded-full h-9"
            >
              <Music2 className="h-4 w-4" />
              Missing Sheet Music
            </Button>
          </div>
        </div>

        {hasSearched && (
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-sm text-zinc-500">
              <p>{results.length} results found</p>
              {showMissingOnly && (
                <span className="flex items-center gap-1 text-primary font-medium">
                  <Music2 className="h-3 w-3" />
                  Filtering for missing sheets
                </span>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid gap-4">
                {results.map((hymn) => (
                  <Link 
                    key={hymn.number}
                    href={`/hymn/${hymn.number}`}
                    className="p-5 rounded-2xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:border-primary transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors">
                          {hymn.number}. {hymn.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {hymn.lyrics}
                        </p>
                      </div>
                      {hymn.category && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border dark:border-zinc-700 px-2 py-1 rounded-md shrink-0">
                          {hymn.category}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <FilterX className="h-8 w-8 text-zinc-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">No hymns found</p>
                  <p className="text-zinc-500">
                    Try searching for something else or {showMissingOnly ? "disable the missing sheet music filter" : "check your spelling"}.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}