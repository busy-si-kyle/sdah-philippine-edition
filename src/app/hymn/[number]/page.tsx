import { getHymnByNumber } from "@/lib/hymnal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ number: string }>;
}

export default async function HymnPage({ params }: PageProps) {
  const { number } = await params;
  const hymnNumber = parseInt(number, 10);
  const hymn = getHymnByNumber(hymnNumber);

  if (!hymn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Hymn not found</h1>
        <Link href="/">
          <Button variant="outline">Go back home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-zinc-50 dark:bg-zinc-950">
      <main className="flex w-full max-w-2xl flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {hymn.number}. {hymn.title}
            </h1>
          </div>
          {hymn.category && (
            <span className="inline-block text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
              {hymn.category}
            </span>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border dark:border-zinc-800 shadow-sm">
          <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
            {hymn.lyrics}
          </pre>
        </div>
      </main>
    </div>
  );
}
