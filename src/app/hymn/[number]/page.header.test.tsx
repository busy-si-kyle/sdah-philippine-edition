import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HymnView from './HymnView';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock sheet map
vi.mock('@/data/sheet_music_map.json', () => ({
  default: {}
}));

describe('Hymn Detail Page - Header Layout', () => {
  const mockHymn = {
    number: 1,
    title: 'Praise God From Whom All Blessings Flow',
    lyrics: 'Praise God from whom all blessings flow...',
    category: 'Worship',
    markdownName: '1_praise_god_from_whom_all_blessings_flow'
  };

  it('should display hymn number and title on separate lines', () => {
    render(<HymnView hymn={mockHymn} />);

    // Check that title is in an H1
    const title = screen.getByRole('heading', { level: 1, name: mockHymn.title });
    expect(title).toBeDefined();

    // Check that number is displayed separately (not part of the H1 title text)
    // Note: If they are in the same element, getByText for just the title might fail or match partially.
    // We explicitly want them separated.
    
    // In the old version: "1. Praise God..." is the H1 text.
    // In the new version: "Praise God..." is the H1 text. "1" (or "Hymn 1") is separate.
    
    expect(title.textContent).toBe(mockHymn.title);
    expect(screen.getByText(new RegExp(`${mockHymn.number}`, 'i'))).toBeDefined();
  });
});