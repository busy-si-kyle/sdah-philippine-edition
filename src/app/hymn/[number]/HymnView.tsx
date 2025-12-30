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
    // ... (rest of isPresenting block)
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
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {hymn.number}. {hymn.title}
          </h1>
          {hymn.category && (
            <span className="inline-block text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
              {hymn.category}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {hymn.sheetMusicUrl && (
            <Link href={hymn.sheetMusicUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsPresenting(true)}>
            <Maximize2 className="h-4 w-4" />
            Present
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border dark:border-zinc-800 shadow-sm">
          <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
            {hymn.lyrics}
          </pre>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border dark:border-zinc-800 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
            {hymn.sheetMusicUrl ? (
              <div className="space-y-4">
                <FileMusic className="h-16 w-16 text-zinc-300 mx-auto" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Sheet Music Available</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">
                    You can download the full PDF version of this hymn's sheet music for your musical preparation.
                  </p>
                </div>
                <Link href={hymn.sheetMusicUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-2">
                    View on Google Drive
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <AlertCircle className="h-16 w-16 text-zinc-300 mx-auto" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Missing sheet music</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">
                    Help us complete this hymn! If you have the sheet music for this hymn, please consider contributing.
                  </p>
                </div>
                <Link href="/contribute">
                  <Button variant="secondary">
                    How to Contribute
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

