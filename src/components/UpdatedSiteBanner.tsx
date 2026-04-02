"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "updated-site-banner-dismissed";

export function UpdatedSiteBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="bg-zinc-900 dark:bg-zinc-800 text-zinc-50 rounded-lg shadow-lg p-4 pr-10 relative">
        <p className="text-sm font-medium">
          <Link
            href="https://sdah-philed.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-300"
          >
            Go to updated site
          </Link>
        </p>
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-zinc-700 rounded"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}