# Specification: Metadata, About Section, and Issue Reporting

## Overview
This track involves updating project metadata for branding, adding an interactive "About" informational modal to key pages, and implementing a client-side issue reporting feature via email.

## Functional Requirements
- **Metadata Update:**
    - Modify `src/app/layout.tsx` metadata.
    - Change `title` from "Create Next App" to "SDAH Philippine Edition".
- **About Section (Modal):**
    - Create a reusable `AboutModal` React component.
    - **Trigger:** A help/question icon button (e.g., Lucide `HelpCircle`).
    - **Content:** A brief description of the website in a modal/dialog.
    - **Placement:**
        - Include at the top of `/hymn/[number]` pages.
        - Include at the top of the `/contribute` page.
        - **Exclude** from the home page (`/`).
- **Report Issue Feature:**
    - Create a "Report an Issue" form component.
    - **Fields:** 
        - Issue Title (Text Input)
        - Issue Description (Textarea)
    - **Functionality:** 
        - Submit button triggers an email client opening via `mailto:barangantrip@gmail.com`.
        - Pre-fill `subject` with the user-provided Issue Title.
        - Pre-fill `body` with the user-provided Issue Description.
        - Ensure both are correctly URL-encoded.
    - **Placement:** Add to the bottom of both the Hymn Detail and Contribute pages.

## Non-Functional Requirements
- **Validation:** Basic validation to ensure the Subject and Body are not empty before triggering the mailto link.
- **Styling:** Use Tailwind CSS and Shadcn/UI (Dialog) for the modal.

## Acceptance Criteria
- [ ] Browser tab title displays "SDAH Philippine Edition".
- [ ] A question icon is visible on Hymn and Contribute pages but hidden on the Home page.
- [ ] Clicking the question icon opens a modal with the project description.
- [ ] "Report an Issue" form appears at the bottom of Hymn and Contribute pages.
- [ ] Clicking Submit on the issue form opens the user's email app with the correct recipient, subject, and body.

## Out of Scope
- Backend API for storing issue reports.