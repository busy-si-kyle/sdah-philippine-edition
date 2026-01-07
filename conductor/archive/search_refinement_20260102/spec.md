# Specification: Search UI Refinement & Logic Update

## Overview
This track focuses on streamlining the user interface by removing the "Missing Music Sheet" functionality (which identifies hymns without sheet music) from the Home page/Search view and improving the hymn search experience. The search logic will be updated for more flexible number matching, and the results UI will be simplified for better readability.

## Functional Requirements
- **Remove Missing Music Functionality (Home Page):**
    - Remove the "Missing Music Sheet" button (used to find hymns without music) from the Home page.
    - Remove the logic that filters hymns to show only those missing sheet music from the main list.
    - Remove any "Missing Music" indicators or filters from the search results list.
    - **Constraint:** The "No sheet music available" indicator/message must remain on the individual **Hymn Detail** page.
- **Simplify Search Results UI:**
    - Update the search result items to show only `number` and `title`.
    - Remove the `lyrics` snippet from the search result cards.
- **Enhance Search Algorithm:**
    - Update the search logic to support loose number matching.
    - Searching for a string (e.g., "1") should match any hymn number that *contains* that string (e.g., "1", "11", "21", "101").
    - Title and lyric searching should remain functional but the results display will be limited to number and title.

## Non-Functional Requirements
- **Performance:** The updated search algorithm should remain responsive on client-side devices.
- **Cleanliness:** Remove unused code or components related to the "Missing Music" filter (specifically for the list view) to keep the codebase clean.

## Acceptance Criteria
- [ ] The "Missing Music Sheet" button is no longer visible on the main page.
- [ ] Searching for a number (e.g., "1") returns all hymns containing that digit in their number.
- [ ] Search results only display the hymn number and title.
- [ ] No lyrics snippets are visible in the search results.
- [ ] "Missing Music" filtering logic is removed from the search/home page context, but data integrity (knowledge of whether a sheet exists) is preserved for the detail page.

## Out of Scope
- Adding new hymn categories or data.
- Modifying the individual hymn detail pages (except for removing "Missing Music" badges if they exist).