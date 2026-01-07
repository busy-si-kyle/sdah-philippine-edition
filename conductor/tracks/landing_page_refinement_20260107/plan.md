# Track Plan: Landing Page Animations & Virtualized Hymn List

## Phase 1: Setup & Virtualization [checkpoint: c05da3c]
- [x] Task: Install animation and virtualization dependencies (`framer-motion`, `react-virtuoso`) aa8b2b3
- [x] Task: Update Home page to display all hymns by default d1588ac
    - [x] Modify `applySearch` to handle empty queries by returning `getAllHymns()`
    - [x] Update state to show results even when `query` is empty
- [x] Task: Implement virtualized list for hymn results fc2639f
    - [x] Replace the `results.map` loop with `Virtuoso` component for performance
    - [x] **Critical:** Ensure the existing card styling (borders, hover effects, shadows, dark mode, highlights) is strictly preserved within the virtualized row items.
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Animations & Visual Polish
- [ ] Task: Implement staggered fade-in for header and search box
    - [ ] Wrap "SDA Hymnal" text and search box in `framer-motion` components
    - [ ] Configure `initial`, `animate`, and `transition` props for staggering
    - [ ] **Critical:** Verify that no scrollbars appear during the animation (using clean opacity/scale transitions)
- [ ] Task: Refine Home page layout for "All Hymns" view
    - [ ] Adjust the "results found" count display when showing all hymns
    - [ ] Ensure smooth transition between search states and the default view
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Testing & Final Verification
- [ ] Task: Write/Update unit tests for search behavior and initial state
    - [ ] Verify `Home` page renders all hymns on initial load
    - [ ] Verify search filtering still works correctly with virtualization
- [ ] Task: Verify mobile responsiveness of the virtualized list and animations
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
