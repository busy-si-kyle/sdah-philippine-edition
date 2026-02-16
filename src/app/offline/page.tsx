"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WifiOff, Home } from "lucide-react";

export default function OfflineFallbackPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <WifiOff className="h-10 w-10 text-zinc-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            You&apos;re offline
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            This page hasn&apos;t been cached yet. To make the entire hymnal available
            offline, open the <strong>About</strong> menu (ℹ️ icon) and tap{" "}
            <strong>&ldquo;Download Entire Hymnal for Offline&rdquo;</strong>.
          </p>
        </div>

        <Link href="/" className="inline-flex">
          <Button variant="outline" className="rounded-full gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
