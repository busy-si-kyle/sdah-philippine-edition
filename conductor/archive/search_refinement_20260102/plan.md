# Track Plan: Search UI Refinement & Logic Update

## Phase 1: Remove "Missing Music" Functionality (Home Page Only)
- [x] Task: Remove "Missing Music Sheet" button from Home page 23ab622
    - [ ] Remove button component/markup from `src/app/page.tsx`
    - [ ] Remove `showMissingSheet` state and toggle handler in the Home page context
- [x] Task: Remove filtering logic from Home/Search 23ab622
    - [ ] Update search/filtering logic to no longer support/expect a "missing sheet" filter
    - [ ] **Crucial:** Ensure `hasSheet` property remains available in the data model for the Hymn Detail page usage.
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Update Search Logic & Results UI [checkpoint: 1ab991d]
- [x] Task: Implement loose number matching in search 36ee4cc, ad6b81c
    - [ ] Create/Update tests in `src/lib/hymnal.test.ts` for loose number matching (e.g., "1" matches "1", "11", "121")
    - [ ] Update search function in `src/lib/hymnal.ts` to implement the new logic
- [x] Task: Simplify Search Result Item Component 4c9462b
    - [ ] Modify search result item to display ONLY `number` and `title`
    - [ ] Remove lyrics snippet rendering
    - [ ] Ensure "Missing Music" badges are removed from the *Search Results* list (if present).
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) 1ab991d

## Phase 3: Cleanup & Final Verification
- [x] Task: Remove unused code/assets related to "Missing Music" filtering (Home Page context only) 07a4a0b
    - [ ] Scan codebase for `missing` or `hasSheet` references used specifically for *filtering lists* and remove them.
    - [ ] **Note:** Preserve `hasSheet` logic used for displaying the "No Music Sheet Found" message on the individual `hymn/[number]` page.
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md) 07a4a0b