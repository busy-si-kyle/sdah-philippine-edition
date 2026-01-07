import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page - Default Hymns', () => {
  it('should display hymns by default when query is empty', () => {
    render(<Home />);
    
    // Expect some hymns to be rendered (e.g., #1)
    // Note: We'll need to check for titles that exist in the mock or real data
    // From src/app/page.test.tsx, we know "O Worship the Lord" is likely there.
    const results = screen.queryAllByText(/1\. /); // Looking for "1. Title"
    expect(results.length).toBeGreaterThan(0);
  });

  it('should filter hymns when searching', async () => {
    const { fireEvent, waitFor } = await import('@testing-library/react');
    render(<Home />);
    
    const input = screen.getByPlaceholderText(/search hymns/i);
    fireEvent.change(input, { target: { value: 'Worship' } });

    await waitFor(() => {
      // Should show results for "Worship"
      expect(screen.queryAllByText(/O Worship the Lord/i).length).toBeGreaterThan(0);
      // Should show the result count
      expect(screen.queryByText(/results found/i)).not.toBeNull();
    });
  });
});
