# Track Spec: Core Hymnal Functionality

## Overview
This track focuses on the foundational features of the SDA Hymnal Philippine Edition website. It covers the setup of the Next.js application, data integration from existing JSON assets, and the implementation of search, browsing, and viewing capabilities for hymns and their associated sheet music.

## User Stories
- As a **Worshipper**, I want to quickly find a hymn by its number or title so I can join in the singing.
- As a **Worshipper**, I want to read the full lyrics of a hymn clearly on my mobile device during a service.
- As a **Musician**, I want to search for hymns and download their sheet music as PDFs for rehearsal.
- As a **Contributor**, I want to see which hymns are missing sheet music and find instructions on how to submit them.

## Key Features
- **Search & Navigation:**
  - Real-time client-side search by hymn number, title, and lyrics.
  - Categorical browsing (based on JSON metadata).
- **Hymn Viewing:**
  - Responsive lyrics display with high readability.
  - "Presentation Mode" for distraction-free viewing.
- **Music Sheet Integration:**
  - Linking to Google Drive hosted PDFs.
  - Displaying available local sheet music images (`assets/sheets/fil/`).
- **Contribution Page:**
  - Guidelines for contributing sheet music.
  - List of hymns needing sheet music.

## Technical Requirements
- **Framework:** Next.js (App Router), TypeScript.
- **Styling:** Tailwind CSS, Shadcn/UI.
- **Data:** Static JSON from `assets/data/hymns_philippine.json`.
- **Search:** Client-side filtering of the loaded JSON data.

## Success Criteria
- Users can find any hymn within 3 seconds using the search bar.
- Lyrics are easily readable on both mobile and desktop.
- PDF downloads for available sheet music work correctly.
- The contribution page clearly lists missing materials.
