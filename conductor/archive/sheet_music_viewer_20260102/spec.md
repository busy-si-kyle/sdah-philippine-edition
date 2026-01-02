# Specification: Local Sheet Music Viewer

## Overview
This track implements a dedicated viewer for sheet music stored locally within the project. It provides a full-page integrated experience for viewing PNG-based sheet music, supporting single and multi-page hymns. It also handles the "missing" state by conditionally showing either the viewer link or the contribution section.

## Functional Requirements
- **Sheet Music Mapping:**
    - Create a script to scan `public/sheets/fil/` and generate `src/data/sheet_music_map.json`.
    - Map hymn numbers to an array of available image filenames (sorted correctly, e.g., `009.png` before `009_1.png`).
- **Hymn Detail Page Integration (Conditional UI):**
    - **If sheet music exists:** Display a prominent "View Sheet Music" button that links to the dedicated viewer page.
    - **If sheet music is missing:** Display the "Missing Music Sheet" section (the existing message/UI encouraging contributions).
    - Ensure both states are mutually exclusive so the UI stays clean.
- **Full-Page Sheet Music Viewer:**
    - Implement a new route at `/hymn/[number]/sheet`.
    - Display all associated images for the hymn in a vertical scrollable list.
    - Ensure images are high-quality and fill the screen width appropriately.
    - Include a "Back" button to return to the hymn detail page.
    - Remove the previously proposed modal implementation to ensure maximum screen real estate for the music.

## Non-Functional Requirements
- **Build Integration:** The mapping script should run as part of the build process.
- **Asset Handling:** Images are served from the `public` directory.
- **User Experience:** The viewer should be distraction-free, focusing on the musical content.

## Acceptance Criteria
- [ ] Mapping script correctly groups and orders multi-page hymns.
- [ ] "View Sheet Music" button navigates to `/hymn/[number]/sheet`.
- [ ] The viewer page displays all pages for that hymn in a large, readable format.
- [ ] If no PNG files exist for a hymn, the "View Sheet Music" button is hidden and the "Missing Music Sheet" message is displayed.
- [ ] Viewer page includes a clear way to go back to the hymn details.

## Out of Scope
- Modifying the existing Google Drive sheet music links.
- PDF generation from local PNGs.