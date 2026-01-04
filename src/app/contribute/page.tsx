"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload, Music, Settings, Info, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AboutModal } from "@/components/AboutModal";
import { ReportIssueForm } from "@/components/ReportIssueForm";

export default function ContributePage() {
  const router = useRouter();

  const GDRIVE_LINK = "https://drive.google.com/drive/folders/19XfpbBjHDGNiRGLcqJCe_ae1L2lxRSUa?usp=drive_link";

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex w-full flex-col gap-12 py-8 px-[5%] sm:px-[10%] lg:px-[15%]">
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 pl-2 pr-4 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <AboutModal />
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              How to Contribute
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Help us complete the digital collection of the SDA Hymnal Philippine Edition by transcribing hymns into MuseScore format.
            </p>
          </div>

          {/* 3-Step Flow */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Music className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">1. Transcribe</h3>
              <p className="text-zinc-500 text-sm leading-relaxed flex-1">
                Transcribe the hymn into MuseScore. Your work must strictly match the SDA Hymnal Philippine Edition, including all notes, rests, and lyrics.
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">2. Format the Score</h3>
              <div className="text-zinc-500 text-xs space-y-3 leading-relaxed flex-1">
                <p>Apply these settings to ensure your submission is project-ready (Optional):</p>
                <ul className="space-y-1 list-disc pl-4">
                  <li><strong>Page Size:</strong> Letter / ANSI A</li>
                  <li><strong>Scaling:</strong> 1.850 mm (Staff Space)</li>
                  <li><strong>Margins:</strong> 10 mm (All sides)</li>
                </ul>
                <div className="pt-2 border-t dark:border-zinc-800">
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300">Typography:</p>
                  <ul className="space-y-1">
                    <li>Title: Edwin • Bold • 24 pt</li>
                    <li>Lyrics: Edwin • 10 pt • Centered</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">3. Upload</h3>
              <p className="text-zinc-500 text-sm leading-relaxed flex-1">
                Upload your completed <strong>.mscz</strong> file directly to our project folder via Google Drive.
              </p>
              <Link href={GDRIVE_LINK} target="_blank" rel="noopener noreferrer" className="pt-4">
                <Button className="w-full gap-2 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                  Upload to Google Drive <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Technical Note */}
          <div className="w-full max-w-3xl p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-left flex gap-4">
            <Info className="h-6 w-6 text-amber-600 dark:text-amber-500 shrink-0" />
            <div className="space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-400">Technical Note</h4>
              <p className="text-amber-800 dark:text-amber-500/80 text-sm leading-relaxed">
                If you find the formatting steps difficult, don't worry! As long as the <strong>notation of notes and lyrics</strong> are accurate and match the hymnal, your contribution is highly valued and will be accepted.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <ReportIssueForm />
        </div>
      </main>
    </div>
  );
}
