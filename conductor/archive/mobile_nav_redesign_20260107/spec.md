# Specification: Mobile Navigation Redesign & Gesture Removal

## Overview
This track focuses on refining the mobile user experience for the hymn detail page. We will remove the swipe gesture navigation to prevent accidental triggers and replace it with a more explicit button-driven navigation. The UI will be redesigned to separate the hymn number and title, centering them. The navigation arrows will be moved to the same line as the hymn number but positioned at the edges of the screen. Transitioning between hymns will use a "fade out fade in" animation.

## Functional Requirements
- **Remove Swipe Gestures:**
    - Disable/Remove the existing swipe gesture logic for navigating between previous and next hymns on the hymn detail page.
- **UI Redesign (Header):**
    - **Layout:** The hymn number and title must be displayed on separate lines.
    - **Alignment:** Both the hymn number and title must be center-aligned.
    - **Navigation Arrows:**
        - The "Previous" and "Next" arrow icons must be placed on the same line as the hymn number.
        - **Positioning:** The arrows must be positioned at the far left (Previous) and far right (Next) edges of the screen/container, with appropriate margin/padding.
        - **Contrast:** Improve the contrast of these arrow buttons using the existing color palette (e.g., using a darker shade from the `zinc` scale or `foreground` color in dark mode) to ensuring they are clearly visible.
- **Navigation Animation:**
    - Implement a "Content Crossfade" animation when navigating between hymns via the arrow buttons.
    - **Fallback:** If the crossfade proves to be performance-heavy or overly complex, implement a "Full Page Transition" (fade out, update data, fade in).

## Non-Functional Requirements
- **Performance:** The fade animation must be smooth (60fps target) and not introduce significant input latency.
- **Responsiveness:** The new centered header layout must look good on both mobile and desktop screens.
- **Accessibility:** Ensure the high-contrast arrow buttons pass WCAG contrast guidelines.

## Acceptance Criteria
- [ ] Swipe gestures no longer trigger navigation on the hymn detail page.
- [ ] Hymn number and title are displayed on separate, center-aligned lines.
- [ ] Navigation arrows are positioned on the same vertical line as the hymn number but pinned to the left and right edges.
- [ ] Arrow buttons have improved visibility/contrast without introducing new colors.
- [ ] Clicking an arrow button triggers a smooth fade-out/fade-in transition to the next/previous hymn.
- [ ] Tests verify that the navigation buttons correctly update the URL/content.

## Out of Scope
- Changing the layout of the lyrics or sheet music sections (beyond the fade animation).
- Adding new colors to the theme.
