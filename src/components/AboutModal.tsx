"use client"

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { HelpCircle, Github, DownloadCloud, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import sheetMusicMapRaw from "@/data/sheet_music_map.json";

const sheetMusicMap = sheetMusicMapRaw as Record<string, string[]>;

const SHEET_CACHE_NAME = "sheet-images";
const PAGES_CACHE_NAME = "pages-and-data";
const TOTAL_HYMNS = 474;

function buildAllHymnPageUrls(): string[] {
  const urls: string[] = ["/"];
  for (let i = 1; i <= TOTAL_HYMNS; i++) {
    const path = `/hymn/${i}`;
    urls.push(path);
    // Also cache the RSC (React Server Component) payload version.
    // Next.js fetches this during client-side navigation.
    // We add a special header in fetch() later, but for the cache key, 
    // we'll fetch them separately if needed.
  }
  for (const hymnNumber of Object.keys(sheetMusicMap)) {
    urls.push(`/hymn/${hymnNumber}/sheet`);
  }
  return urls;
}

function buildAllSheetUrls(): string[] {
  const urls: string[] = [];
  for (const files of Object.values(sheetMusicMap)) {
    for (const file of files) {
      urls.push(`/sheets/fil/${file}`);
    }
  }
  return Array.from(new Set(urls));
}

async function cacheInBatches(
  cacheName: string,
  urls: string[],
  opts: {
    batchSize: number;
    signal?: AbortSignal;
    onProgress?: (done: number, total: number) => void;
  }
) {
  const cache = await caches.open(cacheName);
  const total = urls.length;
  let done = 0;

  for (let i = 0; i < urls.length; i += opts.batchSize) {
    if (opts.signal?.aborted) throw new DOMException("Aborted", "AbortError");

    const batch = urls.slice(i, i + opts.batchSize);
    await Promise.all(
      batch.map(async (url) => {
        if (opts.signal?.aborted) return;

        // Skip if already cached to avoid unnecessary network noise during 'Update'
        const existing = await cache.match(url);
        if (existing) {
          done += 1;
          opts.onProgress?.(done, total);
          return;
        }

        try {
          const res = await fetch(url, {
            cache: "no-store",
            signal: opts.signal
          });
          if (res.ok) {
            await cache.put(url, res.clone());
          }
        } catch (err) {
          // ignore failures
        }

        done += 1;
        opts.onProgress?.(done, total);
      })
    );
  }
}

export function AboutModal() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const hymnPageUrls = useMemo(() => buildAllHymnPageUrls(), []);
  const sheetUrls = useMemo(() => buildAllSheetUrls(), []);

  // Check if already downloaded on mount
  React.useEffect(() => {
    const checkStatus = async () => {
      if (typeof window === "undefined" || !("caches" in window)) return;

      const hasFlag = localStorage.getItem("hymnal_downloaded") === "true";
      if (hasFlag) {
        setIsComplete(true);
        return;
      }

      // Secondary check: see if home page and a high-number hymn are cached
      try {
        const cache = await caches.open(PAGES_CACHE_NAME);
        const home = await cache.match("/");
        const lastHymn = await cache.match(`/hymn/${TOTAL_HYMNS}`);
        if (home && lastHymn) {
          setIsComplete(true);
          localStorage.setItem("hymnal_downloaded", "true");
        }
      } catch {
        // ignore
      }
    };
    checkStatus();
  }, []);

  const start = useCallback(async (isUpdate = false) => {
    // 1. Immediate UI Feedback
    setError(null);
    setIsDownloading(true);
    if (!isUpdate) setIsComplete(false);
    setDone(0);

    // 2. Setup Abort Controller
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // 3. Prepare URLs and Total
      const totalCount = hymnPageUrls.length + sheetUrls.length;
      setTotal(totalCount);

      // Phase 1: Cache all hymn pages (HTML for hard-navigation / direct visit)
      if (controller.signal.aborted) throw new DOMException("Aborted", "AbortError");
      await cacheInBatches(PAGES_CACHE_NAME, hymnPageUrls, {
        batchSize: 10,
        signal: controller.signal,
        onProgress: (d) => setDone(d),
      });

      // Phase 2: Cache all sheet music images
      if (controller.signal.aborted) throw new DOMException("Aborted", "AbortError");
      await cacheInBatches(SHEET_CACHE_NAME, sheetUrls, {
        batchSize: 10,
        signal: controller.signal,
        onProgress: (d) => setDone(hymnPageUrls.length + d),
      });

      setIsComplete(true);
      localStorage.setItem("hymnal_downloaded", "true");
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("Download cancelled.");
      } else if (e instanceof DOMException && e.name === "QuotaExceededError") {
        setError(
          "Storage is full. Try freeing device space."
        );
      } else {
        setError(
          "Download failed. Please check your connection."
        );
      }
    } finally {
      setIsDownloading(false);
      abortRef.current = null;
    }
  }, [hymnPageUrls, sheetUrls]);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:rotate-12 transition-transform duration-300">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">About this project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About this Project</DialogTitle>
          <DialogDescription className="sr-only">
            Description of the SDA Hymnal Philippine Edition digital project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A digital home for the SDA Hymnal Philippine Edition, facilitating worship and musical preparation.
            This platform aims to make hymns easily accessible for personal devotions and church services.
          </p>
          <p className="text-xs text-zinc-500 italic">
            Ensuring every hymn is preserved with its lyrics and sheet music for the community.
          </p>
          <a
            href="https://github.com/busy-si-kyle/sdah-philippine-edition"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>

          {/* Offline Download Section */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 space-y-3">
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Save the entire hymnal — all lyrics, pages, and sheet music — for offline use.
              Best done on Wi‑Fi.
            </p>

            {/* Progress bar */}
            {(isDownloading || isComplete) && (
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full transition-[width] duration-200 ${isComplete ? "bg-green-500" : "bg-primary"}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span className="font-medium">
                    {isDownloading && done === 0 ? "Preparing..." : `${done.toLocaleString()} / ${total.toLocaleString()}`}
                  </span>
                  <span>{percent}%</span>
                </div>
              </div>
            )}

            {/* Status messages */}
            {isComplete && !isDownloading && (
              <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Hymnal is saved and available offline!</span>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Download / Update / Cancel button */}
            {!isDownloading ? (
              <div className="flex flex-col gap-2">
                {!isComplete ? (
                  <Button
                    onClick={() => start(false)}
                    size="sm"
                    className="w-full rounded-full gap-2"
                    disabled={typeof navigator !== "undefined" && !navigator.onLine}
                  >
                    <DownloadCloud className="h-4 w-4" />
                    Download Entire Hymnal for Offline
                  </Button>
                ) : (
                  <Button
                    onClick={() => start(true)}
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full gap-2 border-zinc-200 dark:border-zinc-800"
                    disabled={typeof navigator !== "undefined" && !navigator.onLine}
                  >
                    <DownloadCloud className="h-4 w-4" />
                    Check for Updates
                  </Button>
                )}
              </div>
            ) : (
              <Button onClick={cancel} variant="outline" size="sm" className="w-full rounded-full gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Cancel ({percent}%)
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
