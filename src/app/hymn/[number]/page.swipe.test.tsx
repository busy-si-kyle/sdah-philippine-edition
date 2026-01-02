import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HymnPage from '@/app/hymn/[number]/page';

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock sheet map
vi.mock('@/data/sheet_music_map.json', () => ({
  default: {}
}));

describe('Hymn Detail Page - Swipe Navigation', () => {
  it('should navigate to next hymn on swipe left', async () => {
    const params = Promise.resolve({ number: '1' });
    // @ts-ignore
    render(await HymnPage({ params }));

    const container = screen.getByTestId('hymn-view-container');

    // Simulate swipe left (Start at 300, End at 100 -> distance 200 > 50)
    fireEvent.touchStart(container, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchMove(container, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(container);

    expect(mockPush).toHaveBeenCalledWith('/hymn/2');
  });

  it('should navigate to previous hymn on swipe right', async () => {
    const params = Promise.resolve({ number: '2' });
    // @ts-ignore
    render(await HymnPage({ params }));

    const container = screen.getByTestId('hymn-view-container');

    // Simulate swipe right (Start at 100, End at 300 -> distance -200 < -50)
    fireEvent.touchStart(container, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchMove(container, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(container);

    expect(mockPush).toHaveBeenCalledWith('/hymn/1');
  });
});