"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, X, Download, AlertCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Hymn } from "@/types/hymn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sheetMusicMapRaw from "@/data/sheet_music_map.json";

const sheetMusicMap = sheetMusicMapRaw as Record<string, string[]>;
const MAX_HYMN_NUMBER = 474;

interface HymnViewProps {
  hymn: Hymn;
}

export default function HymnView({ hymn }: HymnViewProps) {
  const [isPresenting, setIsPresenting] = useState(false);
  const router = useRouter();

  const localSheetImages = sheetMusicMap[hymn.number.toString()];
  const hasLocalSheet = !!localSheetImages && localSheetImages.length > 0;

  const prevNumber = hymn.number > 1 ? hymn.number - 1 : null;
  const nextNumber = hymn.number < MAX_HYMN_NUMBER ? hymn.number + 1 : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowLeft" && prevNumber) {
        router.push(`/hymn/${prevNumber}`);
      } else if (e.key === "ArrowRight" && nextNumber) {
        router.push(`/hymn/${nextNumber}`);
      } else if (e.key === "Escape" && isPresenting) {
        setIsPresenting(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevNumber, nextNumber, isPresenting, router]);

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
    <div className="w-full flex flex-col items-center gap-12 relative">
      {/* Navigation Arrows - Desktop/Floating */}
      <div className="fixed inset-y-0 left-0 flex items-center p-4 z-10">
        {prevNumber ? (
          <Link href={`/hymn/${prevNumber}`} title="Previous Hymn (Left Arrow)">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-zinc-900">
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous Hymn</span>
            </Button>
          </Link>
        ) : (
          <div className="w-12" /> // Spacer
        )}
      </div>

      <div className="fixed inset-y-0 right-0 flex items-center p-4 z-10">
        {nextNumber ? (
          <Link href={`/hymn/${nextNumber}`} title="Next Hymn (Right Arrow)">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-zinc-900">
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next Hymn</span>
            </Button>
          </Link>
        ) : (
          <div className="w-12" /> // Spacer
        )}
      </div>

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
          {hasLocalSheet && (
            <Link href={`/hymn/${hymn.number}/sheet`}>
              <Button 
                variant="default" 
                size="lg" 
                className="gap-2 rounded-full"
              >
                <Eye className="h-5 w-5" />
                View Sheet Music
              </Button>
            </Link>
          )}
          {hymn.sheetMusicUrl && (
            <Link href={hymn.sheetMusicUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2 rounded-full">
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
      {!hasLocalSheet && !hymn.sheetMusicUrl && (
        <div className="w-full pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center">
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
        </div>
      )}
    </div>
  );
}
