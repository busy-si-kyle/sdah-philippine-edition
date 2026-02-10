"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, DownloadCloud, Loader2, WifiOff } from "lucide-react";
import sheetMusicMapRaw from "@/data/sheet_music_map.json";

const sheetMusicMap = sheetMusicMapRaw as Record<string, string[]>;

const SHEET_CACHE_NAME = "sheet-images";
const PAGES_CACHE_NAME = "pages-and-data";

function buildAllSheetUrls(): string[] {
  const urls: string[] = [];
  for (const files of Object.values(sheetMusicMap)) {
    for (const file of files) {
      urls.push(`/sheets/fil/${file}`);
    }
  }
  // de-dupe just in case
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

        // Skip if already cached.
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

export default function OfflineDownloadsPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sheetUrls = useMemo(() => buildAllSheetUrls(), []);
  const keyPageUrls = useMemo(
    () => [
      "/",
      "/hymn/1",
      "/hymn/1/sheet",
      // Note: additional routes will be cached on-demand by normal usage + SW.
    ],
    []
  );

  const start = useCallback(async () => {
    setError(null);
    setIsDownloading(true);
    setDone(0);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // Make sure SW has a chance to become active (best-effort).
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.ready;
        } catch {
          // ignore
        }
      }

      const totalCount = sheetUrls.length + keyPageUrls.length;
      setTotal(totalCount);

      // Cache a few key pages/data first (helps navigation once offline).
      await cacheInBatches(PAGES_CACHE_NAME, keyPageUrls, {
        batchSize: 5,
        signal: controller.signal,
        onProgress: (d) => setDone(d),
      });

      // Then cache all sheet images. Chunking is important for iOS reliability.
      await cacheInBatches(SHEET_CACHE_NAME, sheetUrls, {
        batchSize: 25,
        signal: controller.signal,
        onProgress: (d) => setDone(keyPageUrls.length + d),
      });
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("Download cancelled.");
      } else if (e instanceof DOMException && e.name === "QuotaExceededError") {
        setError(
          "Storage is full. iOS Safari can be strict about offline storage. Try freeing device space and re-running the download."
        );
      } else {
        setError(
          "Offline download failed. Please try again while online. If it keeps failing, your browser may be low on storage."
        );
      }
    } finally {
      setIsDownloading(false);
      abortRef.current = null;
    }
  }, [keyPageUrls.length, keyPageUrls, sheetUrls]);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Offline Downloads
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Download hymn sheet music for offline use. This is best done on Wi‑Fi.
            After downloading, the installed PWA can view lyrics and cached sheets
            even without an internet connection.
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-zinc-500">
              {navigator.onLine ? (
                <DownloadCloud className="h-5 w-5" />
              ) : (
                <WifiOff className="h-5 w-5" />
              )}
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                Full library download
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {sheetUrls.length.toLocaleString()} sheet images detected.
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-primary transition-[width] duration-200"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>
                {total > 0 ? `${done.toLocaleString()} / ${total.toLocaleString()}` : "—"}
              </span>
              <span>{total > 0 ? `${percent}%` : ""}</span>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
              <AlertCircle className="h-4 w-4 mt-0.5 text-zinc-500" />
              <div>{error}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {!isDownloading ? (
              <Button
                onClick={start}
                className="rounded-full gap-2"
                disabled={!navigator.onLine}
              >
                <DownloadCloud className="h-4 w-4" />
                Download for offline use
              </Button>
            ) : (
              <Button onClick={cancel} variant="outline" className="rounded-full gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Cancel
              </Button>
            )}

            <Link href="/" className="inline-flex">
              <Button variant="ghost" className="rounded-full">
                Back to Home
              </Button>
            </Link>
          </div>

          {!navigator.onLine && (
            <p className="text-xs text-zinc-500">
              You’re offline. Connect to the internet to download.
            </p>
          )}
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
            iOS note
          </p>
          <p>
            iOS can limit offline storage for PWAs. If the download stops partway
            through, free up storage space and try again. Even a partial download
            will still make the cached hymns available offline.
          </p>
        </div>
      </div>
    </div>
  );
}

