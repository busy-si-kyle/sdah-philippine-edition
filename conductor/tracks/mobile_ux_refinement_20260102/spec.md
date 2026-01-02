# Specification: Navigation & Mobile UX Refinement

## Overview
This track focuses on improving the navigation flow between the contribution page and hymn details, fixing mobile-specific UI bugs, and enhancing the mobile reading experience with gesture-based navigation.

## Functional Requirements
- **Contribute Page Navigation:**
    - Update the "Back" button on the `/contribute` page to trigger `router.back()`.
    - Ensure that if a user navigates to "Contribute" from a specific hymn, they return to that exact hymn.
- **Hymn Detail Page Fixes & Enhancements:**
    - **Fix Mobile Back Button:** Resolve the issue where the "Back" button (top left) does not respond to touch events on mobile.
    - **Conditional Arrow Visibility:** Use CSS media queries or React hooks to hide the floating "Previous" and "Next" navigation arrows on screens narrower than `1024px` (lg breakpoint).
    - **Swipe Navigation (Mobile):** 
        - Implement touch swipe detection.
        - Swipe Left: Navigate to the **Next** hymn.
        - Swipe Right: Navigate to the **Previous** hymn.
        - Ensure swipe gestures do not conflict with vertical scrolling.

## Non-Functional Requirements
- **Responsive UI:** The transition between arrow-based navigation (desktop) and swipe-based navigation (mobile) should be seamless.
- **Touch Accuracy:** Swiping should have a reasonable sensitivity threshold to avoid accidental navigation while scrolling.

## Acceptance Criteria
- [ ] Clicking "Back" on the Contribute page returns the user to their previous location.
- [ ] The "Back" button on the Hymn page works reliably on all mobile browsers.
- [ ] Navigation arrows are hidden on mobile but remain visible on desktop.
- [ ] Swiping left/right on a mobile device correctly navigates through hymns.
- [ ] Standard keyboard navigation (Left/Right arrows) still works on desktop.

## Out of Scope
- Adding animations to the swipe transition (can be a separate polish track).
- Multi-finger gestures.
