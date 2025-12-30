"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, X, Download, FileMusic, AlertCircle } from "lucide-react";
import { Hymn } from "@/types/hymn";
import Link from "next/link";

interface HymnViewProps {
  hymn: Hymn;
}

export default function HymnView({ hymn }: HymnViewProps) {
  const [isPresenting, setIsPresenting] = useState(false);

  if (isPresenting) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-black p-8 sm:p-16 flex flex-col items-center overflow-y-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 right-4" 
          onClick={() => setIsPresenting(false)}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Exit</span>
        </Button>
        
        <div className="w-full max-w-4xl flex flex-col items-center gap-12 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {hymn.number}. {hymn.title}
            </h1>
          </div>
          
          <pre className="whitespace-pre-wrap font-sans text-3xl sm:text-4xl leading-[1.6] text-center text-zinc-900 dark:text-zinc-50">
            {hymn.lyrics}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-12">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {hymn.number}. {hymn.title}
          </h1>
          {hymn.category && (
            <span className="inline-block text-sm font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
              {hymn.category}
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {hymn.sheetMusicUrl && (
            <Link href={hymn.sheetMusicUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="lg" className="gap-2 rounded-full">
                <Download className="h-5 w-5" />
                Download PDF
              </Button>
            </Link>
          )}
          <Button variant="outline" size="lg" className="gap-2 rounded-full" onClick={() => setIsPresenting(true)}>
            <Maximize2 className="h-5 w-5" />
            Present
          </Button>
        </div>
      </div>

      {/* Lyrics Section */}
      <div className="w-full">
        <pre className="whitespace-pre-wrap font-sans text-xl sm:text-2xl leading-[1.8] text-center text-zinc-800 dark:text-zinc-200">
          {hymn.lyrics}
        </pre>
      </div>

      {/* Footer / Sheet Music Status Section */}
      <div className="w-full pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center">
        {hymn.sheetMusicUrl ? (
          <div className="space-y-4 max-w-md">
            <FileMusic className="h-12 w-12 text-zinc-300 mx-auto" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg italic text-zinc-500">Sheet Music Available</h3>
            </div>
            <Link href={hymn.sheetMusicUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-primary decoration-primary/30">
                View on Google Drive
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6 max-w-md">
            <AlertCircle className="h-12 w-12 text-zinc-300 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Missing sheet music</h3>
              <p className="text-zinc-500 leading-relaxed">
                Help us complete this hymn! If you have the sheet music for this hymn, please consider contributing.
              </p>
            </div>
            <Link href="/contribute">
              <Button variant="secondary" className="rounded-full px-8">
                How to Contribute
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}