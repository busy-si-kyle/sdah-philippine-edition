"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchHymns } from "@/lib/hymnal";
import { Hymn } from "@/types/hymn";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Hymn[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const searchResults = searchHymns(value);
      setResults(searchResults);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
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

        <div className="w-full flex gap-2">
          <Input 
            type="search" 
            placeholder="Search hymns by title, number, or lyrics..." 
            className="w-full h-12 text-lg"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button size="lg" className="h-12 px-6">
            Search
          </Button>
        </div>

        {hasSearched && (
          <div className="w-full space-y-4">
            {results.length > 0 ? (
              <div className="grid gap-4">
                {results.map((hymn) => (
                  <div 
                    key={hymn.number}
                    className="p-4 rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:border-zinc-400 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
                        {hymn.number}. {hymn.title}
                      </h3>
                      {hymn.category && (
                        <span className="text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                          {hymn.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                      {hymn.lyrics}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-zinc-500 mt-8">
                No hymns found matching "{query}"
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
