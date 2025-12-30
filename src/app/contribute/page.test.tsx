import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContributePage from '@/app/contribute/page';

describe('Contribution Page', () => {
  it('should render contribution guidelines', () => {
    render(<ContributePage />);
    expect(screen.getByText(/How to Contribute/i)).toBeDefined();
    expect(screen.getByText(/Submission Criteria/i)).toBeDefined();
    expect(screen.getAllByText(/Google Drive/i).length).toBeGreaterThan(0);
  });
});
