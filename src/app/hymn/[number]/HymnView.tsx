"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Hymn } from "@/types/hymn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import sheetMusicMapRaw from "@/data/sheet_music_map.json";

const sheetMusicMap = sheetMusicMapRaw as Record<string, string[]>;
const MAX_HYMN_NUMBER = 474;

interface HymnViewProps {
  hymn: Hymn;
}

export default function HymnView({ hymn }: HymnViewProps) {
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevNumber, nextNumber, router]);

  return (
    <div
      data-testid="hymn-view-container"
      className="w-full flex flex-col items-center relative min-h-[400px]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={hymn.number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex flex-col items-center gap-8"
        >
          {/* Header Section */}
          <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full flex flex-col items-center text-center">
              
              {/* Top Line: Navigation Arrows & Hymn Number */}
              <div className="w-full relative flex items-center justify-center min-h-[48px] mb-2">
                {prevNumber && (
                  <Link href={`/hymn/${prevNumber}`} title="Previous Hymn" className="absolute left-0">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 rounded-full border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                    >
                      <ChevronLeft className="h-6 w-6" />
                      <span className="sr-only">Previous Hymn</span>
                    </Button>
                  </Link>
                )}

                <span className="text-xl sm:text-2xl font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                  Hymn {hymn.number}
                </span>

                {nextNumber && (
                  <Link href={`/hymn/${nextNumber}`} title="Next Hymn" className="absolute right-0">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 rounded-full border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                    >
                      <ChevronRight className="h-6 w-6" />
                      <span className="sr-only">Next Hymn</span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Title Line */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                {hymn.title}
              </h1>

              {hymn.category && (
                <span className="mt-4 inline-block text-sm font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                  {hymn.category}
                </span>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {hasLocalSheet && (
                <Link href={`/hymn/${hymn.number}/sheet`}>
                  <Button
                    variant="default"
                    size="lg"
                    className="gap-2 rounded-full hover:-translate-y-0.5 transition-transform"
                  >
                    <Eye className="h-5 w-5" />
                    View Sheet Music
                  </Button>
                </Link>
              )}
              {hymn.sheetMusicUrl && (
                <Link href={hymn.sheetMusicUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2 rounded-full hover:-translate-y-0.5 transition-transform">
                    <Download className="h-5 w-5" />
                    Download PDF
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Lyrics Section */}
          <div className="w-full mt-4">
            <pre className="whitespace-pre-wrap font-sans text-xl sm:text-2xl leading-[1.8] text-center text-zinc-800 dark:text-zinc-200">
              {hymn.lyrics}
            </pre>
          </div>

          {/* Footer / Sheet Music Status Section */}
          {
            !hasLocalSheet && !hymn.sheetMusicUrl && (
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
                    <Button variant="default" className="rounded-full px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base font-semibold">
                      How to Contribute
                    </Button>
                  </Link>
                </div>
              </div>
            )
          }
        </motion.div>
      </AnimatePresence>
    </div >
  );
}
