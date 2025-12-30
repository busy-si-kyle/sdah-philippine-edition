import { getHymnByNumber } from "@/lib/hymnal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import HymnView from "./HymnView";

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
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex w-full flex-col gap-12 py-8 px-[5%] sm:px-[10%] lg:px-[15%]">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <HymnView hymn={hymn} />
      </main>
    </div>
  );
}