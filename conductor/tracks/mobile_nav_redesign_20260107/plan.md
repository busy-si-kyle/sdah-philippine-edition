# Track Plan: Mobile Navigation Redesign & Gesture Removal

## Phase 1: Cleanup & UI Structural Redesign
- [x] Task: Remove swipe gesture detection logic from `HymnView.tsx` d1b5d7b
    - [x] Update `HymnView.tsx` to remove `onTouchStart`, `onTouchMove`, and `onTouchEnd` handlers.
    - [x] Remove swipe-related state (`touchStart`, `touchEnd`).
- [ ] Task: Redesign Header Layout (Lines and Alignment)
    - [ ] Separate `hymn.number` and `hymn.title` into two distinct lines.
    - [ ] Apply center alignment to both the number and the title.
- [ ] Task: Reposition and Restyle Navigation Arrows
    - [ ] Move "Previous" and "Next" arrow buttons to the same vertical line as the hymn number.
    - [ ] Pin arrow buttons to the left and right edges of the container with appropriate padding.
    - [ ] Improve contrast of arrow buttons (e.g., using `text-zinc-900 dark:text-zinc-50` or increasing border thickness) without adding new colors.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Navigation Animation (Fade)
- [ ] Task: Implement Navigation Animation Logic
    - [ ] Wrap hymn content (header, actions, lyrics) in `framer-motion` components.
    - [ ] Implement a "Content Crossfade" (fade out old, fade in new) when the hymn number changes.
    - [ ] **Contingency:** Fallback to "Full Page Transition" if crossfade is too complex for the current data loading pattern.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Testing & Final Refinement
- [ ] Task: Update and Add Tests
    - [ ] Update `src/app/hymn/[number]/page.swipe.test.tsx` to ensure gestures no longer trigger navigation.
    - [ ] Add unit tests to verify the new header structure and navigation button presence.
- [ ] Task: Mobile Polish & Visual Verification
    - [ ] Verify layout on small screens (iPhone SE, etc.).
    - [ ] Ensure navigation arrows are easily tappable (44x44px min target).
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
