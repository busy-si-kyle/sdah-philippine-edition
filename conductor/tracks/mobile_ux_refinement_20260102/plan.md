# Track Plan: Navigation & Mobile UX Refinement

## Phase 1: Contribute Page Navigation Refinement
- [x] Task: Update `/contribute` page Back button b286c80
    - [ ] Modify `src/app/contribute/page.tsx` to use `useRouter` from `next/navigation`.
    - [ ] Update the Back button to trigger `router.back()`.
    - [ ] Update unit tests in `src/app/contribute/page.test.tsx`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Hymn Detail Page Fixes & Arrows Visibility
- [x] Task: Fix Mobile "Back" Button responsiveness 01277de
    - [x] Inspect `src/app/hymn/[number]/page.tsx` or `HymnView.tsx` for button implementation.
    - [x] Ensure the button uses a standard `Link` or correctly handles touch events.
- [x] Task: Conditional Visibility for Navigation Arrows 01277de
    - [x] Update `src/app/hymn/[number]/HymnView.tsx`.
    - [x] Apply Tailwind classes (e.g., `hidden lg:flex`) to the floating arrow containers to hide them on mobile/tablet.
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) 01277de, 7ccb9a4

## Phase 3: Mobile Swipe Navigation
- [ ] Task: Implement Touch Swipe Detection in `HymnView.tsx`
    - [ ] Install or implement a simple swipe hook/handler (e.g., using `onTouchStart` and `onTouchEnd`).
    - [ ] Logic: Swipe Left -> Next Hymn, Swipe Right -> Previous Hymn.
    - [ ] Ensure it doesn't trigger on small vertical scrolls.
- [ ] Task: Add Swipe Navigation Tests
    - [ ] Write integration tests for swipe functionality using `@testing-library/user-event` (simulating touch).
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
