import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContributePage from '@/app/contribute/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
  }),
}));

describe('Contribution Page', () => {
  it('should render contribution guidelines', () => {
    render(<ContributePage />);
    expect(screen.getByText(/How to Contribute/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /About this project/i })).toBeDefined();
    expect(screen.getByText(/Report an Issue/i)).toBeDefined();
    expect(screen.getByText(/1\. Transcribe/i)).toBeDefined();
    expect(screen.getAllByText(/Google Drive/i).length).toBeGreaterThan(0);
  });
});
