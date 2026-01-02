# Specification: Search UX Refinement & Hymn Navigation

## Overview
This track aims to streamline the search experience by removing redundant UI elements and improving content discovery through sequential navigation between hymns, including keyboard accessibility.

## Functional Requirements
- **Search UX Refinement (Home Page):**
    - Remove the "Search" button next to the search input field.
    - Ensure the search input triggers result updates upon "Enter" key press.
- **Hymn Navigation (Hymn Detail Page):**
    - Implement "Previous" and "Next" navigation controls on the individual hymn pages.
    - **UI Positioning:** Icons fixed on the left (Previous) and right (Next) edges of the viewport, vertically centered.
    - **Navigation Logic:**
        - "Previous" -> `/hymn/[current_number - 1]`
        - "Next" -> `/hymn/[current_number + 1]`
    - **Boundary Handling:**
        - Hide or disable "Previous" on hymn #1.
        - Hide or disable "Next" on the last hymn.
    - **Keyboard Shortcuts:**
        - Pressing the **Left Arrow** key navigates to the previous hymn.
        - Pressing the **Right Arrow** key navigates to the next hymn.
        - Shortcuts should only trigger if no input field is focused.

## Non-Functional Requirements
- **Responsive Design:** Navigation arrows must be touch-friendly and visually balanced.
- **Accessibility:** Buttons must have clear ARIA labels.

## Acceptance Criteria
- [ ] "Search" button is removed from the home page.
- [ ] "Previous"/"Next" arrows are functional and correctly positioned.
- [ ] Left/Right arrow keys navigate between hymns on desktop.
- [ ] Boundary conditions are handled correctly.

## Out of Scope
- Swiping gestures for mobile navigation (can be a separate track).
