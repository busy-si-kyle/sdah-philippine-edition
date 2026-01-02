# Track Plan: Local Sheet Music Viewer

## Phase 1: Sheet Music Mapping
- [x] Task: Create `scripts/generate-sheet-map.ts` 39b08e6
    - [x] Implement filesystem scanning for `public/sheets/fil/`.
    - [x] Logic to group files by hymn number (e.g., `009.png`, `009_1.png` -> `9: ["009.png", "009_1.png"]`).
    - [x] Output map to `src/data/sheet_music_map.json`.
- [x] Task: Add generation script to `package.json` and build process. 39b08e6
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) 39b08e6

## Phase 2: Full-Page Sheet Music Viewer
- [x] Task: Create `src/app/hymn/[number]/sheet/page.tsx` 6a20c9b
    - [x] Implement the layout for the full-page viewer.
    - [x] Fetch hymn details and sheet music images.
    - [x] Render images in a large, scrollable vertical list.
    - [x] Add a "Back" button to return to the main hymn page.
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) 6a20c9b

## Phase 3: Integration & Conditional UI
- [x] Task: Update `HymnView.tsx` with "View Sheet Music" link. 6a20c9b
    - [x] Condition: If hymn exists in map -> Show Button that links to `/hymn/[number]/sheet`.
    - [x] Condition: If hymn NOT in map -> Show "Missing sheet music" section.
- [x] Task: Cleanup 6a20c9b
    - [x] Remove `src/components/SheetMusicModal.tsx`.
    - [x] Ensure all unused imports and states are removed.
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md) 6a20c9b