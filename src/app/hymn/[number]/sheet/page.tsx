import { getHymnByNumber } from "@/lib/hymnal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, FileX } from "lucide-react";
import sheetMusicMapRaw from "@/data/sheet_music_map.json";

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
    <div className="flex min-h-screen flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 h-16 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href={`/hymn/${number}`}>
              <Button variant="ghost" size="sm" className="gap-1 rounded-full">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Hymn</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <h1 className="font-bold text-lg truncate max-w-[200px] sm:max-w-md">
              {hymn.number}. {hymn.title}
            </h1>
          </div>
          
          <div className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
            {images.length} {images.length === 1 ? 'Page' : 'Pages'}
          </div>
        </div>
      </header>

      {/* Sheet Music List */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-zinc-200/50 dark:bg-zinc-900/50">
        <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="w-full bg-white dark:bg-white p-2 sm:p-6 shadow-xl rounded-sm border border-zinc-300 dark:border-zinc-800"
            >
              <img 
                src={`/sheets/fil/${img}`} 
                alt={`${hymn.title} - Sheet Music Page ${index + 1}`}
                className="w-full h-auto"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="mt-4 pt-4 border-t border-zinc-100 text-center text-xs text-zinc-400 font-medium uppercase tracking-widest">
                Page {index + 1} of {images.length}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Back to Top / Navigation (Optional future addition) */}
    </div>
  );
}
