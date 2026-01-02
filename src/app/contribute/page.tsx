"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload, CheckCircle2, FileText, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContributePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex w-full flex-col gap-12 py-8 px-[5%] sm:px-[10%] lg:px-[15%]">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex flex-col items-center gap-12 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              How to Contribute
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Help us complete the digital collection of the SDA Hymnal Philippine Edition. 
              We are currently looking for sheet music for many of our hymns.
            </p>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">1. Prepare File</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Scan or create a high-quality PDF of the sheet music. Ensure all lyrics and notes are clearly legible.
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">2. Upload</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Upload your file to your personal Google Drive and set the sharing permissions to "Anyone with the link can view".
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">3. Submit</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Send the shared link along with the hymn number and title via our submission channel.
              </p>
            </div>
          </div>

          <div className="w-full max-w-2xl space-y-8 py-12 border-t border-zinc-200 dark:border-zinc-800 text-left">
            <h2 className="text-3xl font-bold text-center">Submission Criteria</h2>
            
            <ul className="space-y-4">
              {[
                "High-resolution PDF format (preferred) or clear images.",
                "Must match the SDA Hymnal Philippine Edition version.",
                "Full lyrics must be included if applicable.",
                "Permission must be set to 'Anyone with the link' on Google Drive."
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Ready to help?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              If you have sheet music ready or want to coordinate a batch upload, 
              please reach out through the established maintainer contact.
            </p>
            <Button size="lg" className="rounded-full px-8">
              Contact Maintainer
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}