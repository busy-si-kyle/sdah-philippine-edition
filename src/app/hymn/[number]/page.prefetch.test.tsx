import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HymnView from './HymnView';
import { useRouter } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock next/link to capture prefetch prop
vi.mock('next/link', () => ({
  default: vi.fn(({ children, prefetch, ...props }) => (
    <a {...props} data-prefetch={prefetch}>
      {children}
    </a>
  )),
}));

// Mock sheet map
vi.mock('@/data/sheet_music_map.json', () => ({
  default: {}
}));

describe('Hymn Detail Page - Prefetching', () => {
  const mockHymn = {
    number: 2,
    title: 'Hymn Two',
    lyrics: 'Lyrics for hymn two',
    category: 'Worship',
  };

  const mockPrefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      prefetch: mockPrefetch,
      push: vi.fn(),
    });
  });

  it('should explicitly enable prefetching on navigation links', () => {
    render(<HymnView hymn={mockHymn} />);

    const prevLink = screen.getByTitle(/Previous Hymn/i);
    const nextLink = screen.getByTitle(/Next Hymn/i);

    expect(prevLink.getAttribute('data-prefetch')).toBe('true');
    expect(nextLink.getAttribute('data-prefetch')).toBe('true');
  });

  it('should programmatically prefetch adjacent hymns on mount', async () => {
    render(<HymnView hymn={mockHymn} />);

    await waitFor(() => {
      expect(mockPrefetch).toHaveBeenCalledWith('/hymn/1');
      expect(mockPrefetch).toHaveBeenCalledWith('/hymn/3');
    });
  });
});
