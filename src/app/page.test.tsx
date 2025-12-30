import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('should render the search input', () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText(/search hymns/i);
    expect(searchInput).toBeDefined();
  });
});
