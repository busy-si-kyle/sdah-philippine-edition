"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Send } from "lucide-react";

export function ReportIssueForm() {
  const [title, setTitle] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [description, setDescription] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: if this hidden field is filled, it's likely a bot
    if (honeypot) {
      console.log("Spam detected");
      return;
    }

    // Local rate limit: 60 seconds cooldown
    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      alert("Please wait a minute before submitting another report.");
      return;
    }

    if (!title || !description || !emailAddress) return;

    setLastSubmitTime(now);

    const r_part1 = "sdah.";
    const r_part2 = "philed";
    const r_domain = "gmail.com";
    const recipient = `${r_part1}${r_part2}@${r_domain}`;

    const subject = encodeURIComponent(`[Issue] ${title}`);
    const fullBody = `From: ${emailAddress}\n\nDescription:\n${description}`;
    const body = encodeURIComponent(fullBody);

    // Using Gmail web compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

    window.open(gmailUrl, '_blank');
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl border dark:border-zinc-800 shadow-sm space-y-6">
      <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100">
        <AlertCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Report an Issue</h2>
      </div>

      <p className="text-zinc-500 text-sm">
        Found a mistake or having technical trouble? Let us know!
        Clicking submit will open Google Gmail in a new tab.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <div className="hidden" aria-hidden="true">
          <Input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            placeholder="Do not fill this"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="issue-title">Issue Title</Label>
            <Input
              id="issue-title"
              placeholder="e.g., Typo in Hymn 123"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue-email">Your Email</Label>
            <Input
              id="issue-email"
              type="email"
              placeholder="your@email.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="issue-desc">Issue Description</Label>
          <Textarea
            id="issue-desc"
            placeholder="Please describe the issue in detail..."
            className="min-h-[120px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full gap-2 rounded-xl h-12" disabled={!title || !description || !emailAddress}>
          Submit via Gmail <Send className="h-4 w-4" />
        </Button>
      </form>
    </section>
  );
}
