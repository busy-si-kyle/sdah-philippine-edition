import { getHymnByNumber } from "@/lib/hymnal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, FileX } from "lucide-react";
import sheetMusicMapRaw from "@/data/sheet_music_map.json";
import SheetCarousel from "./SheetCarousel";

const sheetMusicMap = sheetMusicMapRaw as Record<string, string[]>;

interface PageProps {
  params: Promise<{ number: string }>;
}

export default async function SheetMusicPage({ params }: PageProps) {
  const { number } = await params;
  const hymnNumber = parseInt(number, 10);
  const hymn = getHymnByNumber(hymnNumber);
  const images = sheetMusicMap[number];

  if (!hymn || !images || images.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <FileX className="h-16 w-16 text-zinc-300" />
          <h1 className="text-2xl font-bold">Sheet music not found</h1>
          <p className="text-zinc-500 max-w-xs">
            We couldn't find local sheet music for hymn #{number}.
          </p>
          <Link href={`/hymn/${number}`}>
            <Button variant="outline" className="mt-4">
              Back to Hymn
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* Sticky Header */}
      <header className="flex-shrink-0 z-10 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative flex items-center justify-between px-4 h-16 max-w-screen-2xl mx-auto">
          <div className="flex items-center">
            <Link href={`/hymn/${number}`}>
              <Button variant="ghost" size="sm" className="gap-1 rounded-full">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Hymn</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <h1 className="font-bold text-lg truncate max-w-[150px] sm:max-w-md">
              <span className="sm:hidden">#{hymn.number}</span>
              <span className="hidden sm:inline">{hymn.number}. {hymn.title}</span>
            </h1>
          </div>

          <div className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
            {images.length} {images.length === 1 ? 'Page' : 'Pages'}
          </div>
        </div>
      </header>

      {/* Sheet Music List / Carousel */}
      <main className="flex-1 min-h-0">
        <SheetCarousel images={images} hymnTitle={hymn.title} />
      </main>
    </div>
  );
}
