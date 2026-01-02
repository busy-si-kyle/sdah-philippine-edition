# Track Plan: Search UX Refinement & Hymn Navigation

## Phase 1: Search UX Refinement (Home Page)
- [x] Task: Remove "Search" button from Home page 14c2e01
    - [ ] Remove the button component from `src/app/page.tsx`.
    - [ ] Wrap search input in a `<form>` to handle "Enter" key press natively (if not already).
    - [ ] Update tests in `src/app/page.test.tsx` to remove dependencies on the "Search" button.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Hymn Navigation (Hymn Detail Page) [checkpoint: fb912b1]
- [x] Task: Implement Navigation Arrows in `src/app/hymn/[number]/HymnView.tsx` 3c76b7a
    - [x] Calculate `prevNumber` and `nextNumber`.
    - [x] Determine max hymn number from dataset.
    - [x] Add fixed-position arrow icons (Lucide `ChevronLeft`, `ChevronRight`).
    - [x] Add conditional rendering/logic for boundary conditions (#1 and last).
- [x] Task: Implement Keyboard Shortcuts 3c76b7a
    - [x] Add `useEffect` with `keydown` event listener for Left/Right arrow keys.
    - [x] Ensure shortcuts don't fire when an input is focused.
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) 3c76b7a

## Phase 3: Final Polishing & Verification
- [x] Task: Verify responsive behavior of navigation arrows on mobile. 335f20c
- [x] Task: Run full test suite and ensure no regressions. 4cb3185
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md) 4cb3185
