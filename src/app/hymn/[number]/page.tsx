import { getHymnByNumber } from "@/lib/hymnal";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import HymnView from "./HymnView";
import { ClientBackButton } from "./ClientBackButton";
import { AboutModal } from "@/components/AboutModal";
import { ReportIssueForm } from "@/components/ReportIssueForm";

interface PageProps {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params;
  const hymnNumber = parseInt(number, 10);
  const hymn = getHymnByNumber(hymnNumber);

  if (!hymn) {
    return {
      title: "Hymn Not Found | SDA Hymnal PH",
      description: "The requested hymn could not be found in the Seventh-day Adventist Hymnal (Philippine Edition).",
    };
  }

  const title = `Hymn ${hymn.number} - ${hymn.title} | SDA Hymnal PH`;

  // Create a clean description from lyrics (combine first few verses)
  const fullLyrics = hymn.verses.map(v => v.text).join(" ");
  const cleanLyrics = fullLyrics.replace(/\n+/g, " ").substring(0, 160).trim();
  const description = `Lyrics and music sheet for Hymn ${hymn.number}: ${hymn.title}. ${cleanLyrics}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "music.song",
      siteName: "SDA Hymnal Philippine Edition",
    },
    keywords: [
      "SDA Hymnal",
      "Philippine Edition",
      "Tagalog Hymns",
      "English Hymns",
      hymn.title,
      `Hymn ${hymn.number}`,
      "Seventh-day Adventist",
    ],
  };
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
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-2">
            <ClientBackButton />
            <AboutModal />
          </div>
        </div>

        <HymnView hymn={hymn} />

        <div className="w-full pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <ReportIssueForm />
        </div>
      </main>
    </div>
  );
}