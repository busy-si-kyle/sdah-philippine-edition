# Specification: Contribution Flow Update

## Overview
This track updates the `/contribute` page to guide users through a standardized process for transcribing hymns using MuseScore and submitting them via Google Drive.

## Functional Requirements
- **New Three-Step Flow:**
    - **Step 1: Transcribe:** Guidelines for transcribing hymns into MuseScore, emphasizing accuracy in notes, rests, and lyrics.
    - **Step 2: Format the Score (Optional):** Specific MuseScore settings for Page Layout (Letter/ANSI A), Scaling (1.850mm), Margins (10mm), and Typography (Edwin font).
    - **Step 3: Upload:** Direct users to upload `.mscz` files to a specific Google Drive folder.
- **Content Updates:**
    - Replace current three-step descriptions with the new MuseScore-centric instructions.
    - Add a "Technical Note" section clarifying that while formatting is preferred, accurate notation is the primary requirement for valid contributions.
- **CTA Update:** 
    - Replace the "Contact Maintainer" button/section with a prominent "Upload to Google Drive" button linking to: `https://drive.google.com/drive/folders/19XfpbBjHDGNiRGLcqJCe_ae1L2lxRSUa?usp=drive_link`

## Non-Functional Requirements
- **Copywriting:** Use clear, instructional language.
- **Visuals:** Ensure the formatting settings are presented in a readable table or list.

## Acceptance Criteria
- [ ] The `/contribute` page displays the updated 3-step process.
- [ ] Formatting settings (Scaling, Margins, Font) are clearly listed.
- [ ] The technical note about "notation priority" is visible.
- [ ] The main CTA button correctly opens the designated Google Drive folder in a new tab.
- [ ] Old "Contact Maintainer" section is removed.

## Out of Scope
- Implementing an automated MuseScore file validator.
- Creating a dedicated web form for submissions.
