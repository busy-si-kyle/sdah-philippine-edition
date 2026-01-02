import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContributePage from '@/app/contribute/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
  }),
}));

describe('Contribute Page - New Content', () => {
  it('should display the 3-step MuseScore process', () => {
    render(<ContributePage />);
    
    // Step 1: Transcribe
    expect(screen.getByText(/1\. Transcribe/i)).toBeDefined();
    expect(screen.getByText(/Transcribe the hymn into MuseScore/i)).toBeDefined();
    
    // Step 2: Format
    expect(screen.getByText(/2\. Format the Score/i)).toBeDefined();
    expect(screen.getByText(/Scaling:/i)).toBeDefined();
    expect(screen.getByText(/1\.850 mm/i)).toBeDefined();
    
    // Step 3: Upload
    expect(screen.getByText(/3\. Upload/i)).toBeDefined();
    expect(screen.getByText(/Upload your completed/i)).toBeDefined();
    expect(screen.getByText(/\.mscz/i)).toBeDefined();
  });

  it('should display the technical note about notation priority', () => {
    render(<ContributePage />);
    expect(screen.getByText(/If you find the formatting steps difficult/i)).toBeDefined();
    expect(screen.getByText(/notation of notes and lyrics/i)).toBeDefined();
  });

  it('should have the "Upload to Google Drive" button with correct link', () => {
    render(<ContributePage />);
    const ctaButton = screen.getByRole('link', { name: /Upload to Google Drive/i });
    expect(ctaButton.getAttribute('href')).toBe('https://drive.google.com/drive/folders/19XfpbBjHDGNiRGLcqJCe_ae1L2lxRSUa?usp=drive_link');
  });

  it('should NOT display the "Contact Maintainer" or "Ready to help?" sections', () => {
    render(<ContributePage />);
    expect(screen.queryByRole('button', { name: /Contact Maintainer/i })).toBeNull();
    expect(screen.queryByText(/Ready to help\?/i)).toBeNull();
  });
});
