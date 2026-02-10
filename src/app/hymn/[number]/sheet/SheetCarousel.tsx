"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface SheetCarouselProps {
    images: string[];
    hymnTitle: string;
}

export default function SheetCarousel({ images, hymnTitle }: SheetCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [failed, setFailed] = useState<Record<number, boolean>>({});

    const scrollToPage = (index: number) => {
        if (containerRef.current) {
            const container = containerRef.current;
            const width = container.offsetWidth;
            container.scrollTo({
                left: index * width,
                behavior: "smooth",
            });
            setCurrentPage(index);
        }
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, offsetWidth } = containerRef.current;
            const index = Math.round(scrollLeft / offsetWidth);
            if (index !== currentPage) {
                setCurrentPage(index);
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                scrollToPage(Math.max(0, currentPage - 1));
            } else if (e.key === "ArrowRight") {
                scrollToPage(Math.min(images.length - 1, currentPage + 1));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentPage, images.length]);

    return (
        <div className="relative flex-1 flex flex-col h-full overflow-hidden bg-zinc-200/50 dark:bg-zinc-900/50">
            {/* Desktop Navigation Buttons (Mouse/Fine Pointer only) */}
            <div className="hidden lg:[@media(hover:hover)_and_(pointer:fine)]:block">
                {currentPage > 0 && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-lg border-zinc-200 dark:border-zinc-700"
                        onClick={() => scrollToPage(currentPage - 1)}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                )}
                {currentPage < images.length - 1 && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-lg border-zinc-200 dark:border-zinc-700"
                        onClick={() => scrollToPage(currentPage + 1)}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                )}
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none h-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full h-full snap-start overflow-y-auto"
                    >
                        <div className="flex flex-col items-center gap-4 sm:gap-8 max-w-5xl mx-auto py-0 sm:py-8 min-h-full">
                            <div className="w-full bg-white dark:bg-white p-0 sm:p-6 shadow-none sm:shadow-xl rounded-none sm:rounded-sm border-0 sm:border border-zinc-300 dark:border-zinc-800">
                                <img
                                    src={`/sheets/fil/${img}`}
                                    alt={`${hymnTitle} - Sheet Music Page ${index + 1}`}
                                    className="w-full h-auto object-contain"
                                    loading={index === 0 ? "eager" : "lazy"}
                                    onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
                                />
                                {failed[index] && (
                                    <div className="mt-4 px-4 pb-2 text-center text-sm text-zinc-600">
                                        {navigator.onLine ? (
                                            <span>
                                                This image failed to load. Please try again.
                                            </span>
                                        ) : (
                                            <span>
                                                This sheet isn&apos;t cached yet. Use the <strong>Download for Offline</strong> option in the <strong>About</strong> menu (ℹ️) to save the entire hymnal.
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className="mt-4 pb-8 sm:pb-0 text-center text-xs text-zinc-400 font-medium uppercase tracking-widest">
                                    Page {index + 1} of {images.length}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
