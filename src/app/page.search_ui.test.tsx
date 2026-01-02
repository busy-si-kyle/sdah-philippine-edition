import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page - Search UI', () => {
  it('should display ONLY number and title, NOT lyrics', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/search hymns/i);
    
    // Search for a hymn
    fireEvent.change(input, { target: { value: 'Worship' } });

    await waitFor(() => {
      // Title should be visible
      expect(screen.getAllByText(/O Worship the Lord/i).length).toBeGreaterThan(0);
      
      // Lyrics snippet (known from data) should NOT be visible
      // "O worship the Lord in the beauty of holiness" is the first line of hymn 1
      expect(screen.queryByText(/O worship the Lord in the beauty of holiness/i)).toBeNull();
    });
  });
});
