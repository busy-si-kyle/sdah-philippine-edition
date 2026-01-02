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
    // The scaling text is split by strong/other tags potentially or just check for existence
    expect(screen.getByText(/Scaling:/i)).toBeDefined();
    expect(screen.getByText(/1\.850 mm/i)).toBeDefined();
    
    // Step 3: Upload
    expect(screen.getByText(/3\. Upload/i)).toBeDefined();
    expect(screen.getByText(/Upload your completed/i)).toBeDefined();
    expect(screen.getByText(/\.mscz/i)).toBeDefined();
  });

  it('should display the technical note about notation priority', () => {
    render(<ContributePage />);
    // Partial match since text is split by strong
    expect(screen.getByText(/If you find the formatting steps difficult/i)).toBeDefined();
    expect(screen.getByText(/notation of notes and lyrics/i)).toBeDefined();
  });

  it('should have the "Upload to Google Drive" buttons with correct link', () => {
    render(<ContributePage />);
    const ctaButtons = screen.getAllByRole('link', { name: /Upload to Google Drive/i });
    expect(ctaButtons.length).toBeGreaterThan(0);
    ctaButtons.forEach(btn => {
      expect(btn.getAttribute('href')).toBe('https://drive.google.com/drive/folders/19XfpbBjHDGNiRGLcqJCe_ae1L2lxRSUa?usp=drive_link');
    });
  });

  it('should NOT display the "Contact Maintainer" button', () => {
    render(<ContributePage />);
    const oldButton = screen.queryByRole('button', { name: /Contact Maintainer/i });
    expect(oldButton).toBeNull();
  });
});