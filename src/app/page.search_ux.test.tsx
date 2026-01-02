import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page - Search UX Refinement', () => {
  it('should NOT render the Search button', () => {
    render(<Home />);
    const searchButton = screen.queryByRole('button', { name: /search/i });
    expect(searchButton).toBeNull();
  });

  it('should trigger search on Enter key press', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/search hymns/i);
    
    // Type something
    fireEvent.change(input, { target: { value: '1' } });
    
    // Press Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // Verify results are displayed (Hymn 1)
    const results = screen.queryAllByText(/O Worship the Lord/i);
    expect(results.length).toBeGreaterThan(0);
  });
});
