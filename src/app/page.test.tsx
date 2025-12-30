import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('should render the search input', () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText(/search hymns/i);
    expect(searchInput).toBeDefined();
  });

  it('should display results when searching by number', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/search hymns/i);
    
    // Simulate user typing '1'
    fireEvent.change(input, { target: { value: '1' } });

    await waitFor(() => {
      // Expect hymn #1 to appear (title should be in a heading)
      const results = screen.getAllByText(/O Worship the Lord/i);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  it('should display results when searching by title', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/search hymns/i);
    
    // Simulate user typing 'Worship'
    fireEvent.change(input, { target: { value: 'Worship' } });

    await waitFor(() => {
      const results = screen.getAllByText(/O Worship the Lord/i);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  it('should clear results when input is cleared', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/search hymns/i);
    
    // Type something first
    fireEvent.change(input, { target: { value: 'Worship' } });
    await waitFor(() => {
      expect(screen.queryAllByText(/O Worship the Lord/i).length).toBeGreaterThan(0);
    });

    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    
    // Results should be gone (or not visible)
    await waitFor(() => {
      expect(screen.queryByText(/O Worship the Lord/i)).toBeNull();
    });
  });
});
