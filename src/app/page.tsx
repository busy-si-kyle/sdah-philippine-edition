"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchHymns } from "@/lib/hymnal";
import { Hymn } from "@/types/hymn";
import Link from "next/link";
import { Search, FilterX } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Hymn[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const applySearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const searchResults = searchHymns(searchQuery);
      setResults(searchResults);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    applySearch(value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-950">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8">
        <div className={`text-center space-y-4 transition-all duration-500 ${hasSearched ? "mt-8" : "mt-20"}`}>
          <Reveal delay={0} y={20}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-zinc-900 dark:text-zinc-50">
              SDA Hymnal
            </h1>
          </Reveal>
          <Reveal delay={0.1} y={20}>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Philippine Edition
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={20} className="w-full space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applySearch(query);
            }}
            className="w-full"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="search"
                placeholder="Search hymns by title, number, or lyrics..."
                className="w-full h-12 text-lg pl-10"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </form>
        </Reveal>

        {hasSearched && (
          <div className="w-full max-w-2xl space-y-3">
            <p className="text-xs text-zinc-400 px-1">
              {results.length} results found
            </p>

            {results.length > 0 ? (
              <div className="flex flex-col gap-4">
                {results.map((hymn) => (
                  <Reveal key={hymn.number} y={20} duration={0.4}>
                    <Link
                      href={`/hymn/${hymn.number}`}
                      className="block p-6 rounded-2xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-primary dark:hover:border-primary transition-all duration-300 will-change-transform group"
                    >
                      <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors">
                        {hymn.number}. {hymn.title}
                      </h3>
                    </Link>
                  </Reveal>
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
                    Try searching for something else or check your spelling.
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
