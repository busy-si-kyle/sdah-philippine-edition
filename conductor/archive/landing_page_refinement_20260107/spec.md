# Specification: Landing Page Animations & "All Hymns" Display

## Overview
This track aims to enhance the landing page's visual appeal and utility. We will introduce a staggered fade-in animation for the header and search box while ensuring a clean transition (no scrollbars). Additionally, the landing page will now display all hymns by default (when the search box is empty) using a virtualized list for optimal performance.

## Functional Requirements
- **Staggered Fade-in Animation:**
    - The header text and search box will animate into view upon page load.
    - The header text will fade in first, followed by the search box.
    - **Visual Integrity:** Animations must not trigger temporary scrollbars on elements or the page layout.
- **Default Hymn List:**
    - When no search query is present, the landing page must display all hymns from the `hymns_philippine.json` dataset.
    - The list items must match the existing search result styling (Hymn Number and Title).
- **Performance Optimization (Virtualization):**
    - Implement a virtualized list (e.g., using `react-virtuoso` or a similar library) to render only visible hymn items, ensuring smooth scrolling and fast initial load for the ~400+ hymns.

## Non-Functional Requirements
- **Performance:** Maintain a high lighthouse score; virtualization should prevent DOM bloat.
- **UX:** The animation should feel modern and minimalist, consistent with the product vision.

## Acceptance Criteria
- [ ] Header text fades in smoothly on page load.
- [ ] Search box fades in with a slight delay after the header text.
- [ ] No overflow/scrollbars appear on the animating elements during the transition.
- [ ] Landing page displays the full list of hymns when the search input is empty.
- [ ] Scrolling through the list of 400+ hymns is fluid and performant.
- [ ] Search functionality still works as expected, filtering the list as the user types.

## Out of Scope
- Modifying the individual hymn detail pages.
- Changing the core search matching logic.
