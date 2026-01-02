import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page - Missing Music Removal', () => {
  it('should NOT display the "Missing Sheet Music" button', () => {
    render(<Home />);
    const toggle = screen.queryByText(/Missing Sheet Music/i);
    expect(toggle).toBeNull();
  });
});
