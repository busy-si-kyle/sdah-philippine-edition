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
    urls.push(`/hymn/${i}`);
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

        const existing = await cache.match(url);
        if (existing) {
          done += 1;
          opts.onProgress?.(done, total);
          return;
        }

        const res = await fetch(url, { cache: "no-store", signal: opts.signal });
        if (res.ok) {
          await cache.put(url, res.clone());
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

  const start = useCallback(async () => {
    setError(null);
    setIsDownloading(true);
    setIsComplete(false);
    setDone(0);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.ready;
        } catch {
          // ignore
        }
      }

      const totalCount = hymnPageUrls.length + sheetUrls.length;
      setTotal(totalCount);

      // Phase 1: Cache all hymn pages (home + all hymn detail + sheet pages)
      await cacheInBatches(PAGES_CACHE_NAME, hymnPageUrls, {
        batchSize: 10,
        signal: controller.signal,
        onProgress: (d) => setDone(d),
      });

      // Phase 2: Cache all sheet music images
      await cacheInBatches(SHEET_CACHE_NAME, sheetUrls, {
        batchSize: 25,
        signal: controller.signal,
        onProgress: (d) => setDone(hymnPageUrls.length + d),
      });

      setIsComplete(true);
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("Download cancelled.");
      } else if (e instanceof DOMException && e.name === "QuotaExceededError") {
        setError(
          "Storage is full. Try freeing device space and re-running the download."
        );
      } else {
        setError(
          "Download failed. Please try again while online."
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
                  <span>{done.toLocaleString()} / {total.toLocaleString()}</span>
                  <span>{percent}%</span>
                </div>
              </div>
            )}

            {/* Status messages */}
            {isComplete && (
              <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>All hymns are now available offline!</span>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Download / Cancel button */}
            {!isDownloading ? (
              <Button
                onClick={start}
                size="sm"
                className="w-full rounded-full gap-2"
                disabled={typeof navigator !== "undefined" && !navigator.onLine}
              >
                <DownloadCloud className="h-4 w-4" />
                {isComplete ? "Re-download" : "Download Entire Hymnal for Offline"}
              </Button>
            ) : (
              <Button onClick={cancel} variant="outline" size="sm" className="w-full rounded-full gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
