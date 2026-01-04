"use client"

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutModal() {
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
