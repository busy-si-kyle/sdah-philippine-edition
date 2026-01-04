# Tech Stack - SDA Hymnal Philippine Edition

## Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS with Shadcn/UI for consistent, modern, and accessible components.
- **Language:** TypeScript for type safety and better developer experience.

## Data & Search
- **Data Storage:** Static JSON files containing hymn metadata (number, title, category), lyrics, and links.
- **Search Implementation:** Client-side search with specific logic: number queries match only hymn numbers (contains match), while text queries match titles and lyrics. Search is triggered via 'Enter' key or as-you-type.

## Sheet Music & Downloads
- **File Hosting:** PDF music sheets and images will be hosted/linked via Google Drive as per the maintainer's workflow.
- **Local Assets:** High-quality PNG sheet music assets are stored in the project and indexed via a build-time mapping script.
- **Contribution Workflow:** A standardized MuseScore transcription flow directing contributors to upload `.mscz` files to a specific project folder on Google Drive.

## Deployment
- **Platform:** Vercel (Recommended for Next.js) or similar static hosting providers.
- **Security Auditing:** Regular automated scans using `npm audit` and manual logic reviews to ensure project integrity.
