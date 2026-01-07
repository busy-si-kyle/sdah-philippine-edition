# Specification: Navigation Performance Improvements (Prefetching)

## Overview
This track aims to minimize navigation latency when users switch between hymns on the detail page. While local performance is near-instant, production deployments exhibit minor delays. We will optimize this by ensuring Next.js route prefetching is fully utilized and implementing a lightweight "warm-up" for the data/code of adjacent hymns.

## Functional Requirements
- **Route Prefetching:** 
    - Ensure the "Previous" and "Next" navigation buttons utilize the standard Next.js `<Link>` component prefetching behavior.
    - Verify that `prefetch={true}` (or the default automatic behavior) is correctly configured for these links.
- **Data & Resource Warm-up:**
    - Since the hymnal uses static JSON data, ensure that the data utility (`hymnal.ts`) is optimized for rapid access once the initial payload is loaded.
    - **Optimization:** Explicitly trigger a low-priority background fetch for the metadata of the next and previous hymns when a hymn detail page is mounted.
- **Visual Smoothness:**
    - The "fade" transition implemented in the previous track should continue to work seamlessly with the prefetching logic to provide a perceived instant transition.

## Non-Functional Requirements
- **Performance:** Prefetching must occur only when the browser is idle to avoid impacting the loading of the current hymn's lyrics or sheet music.
- **Efficiency:** Limit prefetching to only the immediate neighbors (one hymn back, one hymn forward) to save user bandwidth.

## Acceptance Criteria
- [ ] Navigation buttons (`ChevronLeft`, `ChevronRight`) correctly use Next.js `<Link>` with prefetching enabled.
- [ ] Navigating between hymns in a production-like environment (e.g., Vercel preview) feels significantly faster/near-instant.
- [ ] No performance degradation is observed on the initial load of a hymn page.
- [ ] The browser's network tab shows low-priority prefetch requests for adjacent routes after the main page is loaded.

## Out of Scope
- Pre-loading large sheet music images (PNGs) for adjacent hymns (this would consume too much bandwidth).
- Modifying the search algorithm.
