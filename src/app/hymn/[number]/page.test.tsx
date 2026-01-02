import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HymnPage from '@/app/hymn/[number]/page';
import * as hymnal from '@/lib/hymnal';

// Mock the hymnal module
vi.mock('@/lib/hymnal', () => ({
  getHymnByNumber: vi.fn((number) => {
    if (number === 1) {
      return { 
        number: 1, 
        title: 'O Worship the Lord', 
        lyrics: 'O worship the Lord in the beauty of holiness...', 
        category: 'Worship' 
      };
    }
    return undefined;
  }),
}));

// Mock the sheet music map
vi.mock('@/data/sheet_music_map.json', () => ({
  default: {}
}));

describe('Hymn Detail Page', () => {
  it('should render hymn details correctly', async () => {
    // In Next.js App Router, page components receive params as a promise in recent versions, 
    // or as a direct object. Let's assume the component takes params: { number: string }
    const params = Promise.resolve({ number: '1' });
    
    // @ts-ignore - Next.js Page components can be async
    render(await HymnPage({ params }));

    expect(screen.getByText(/1\. O Worship the Lord/i)).toBeDefined();
    expect(screen.getByText(/O worship the Lord in the beauty of holiness/i)).toBeDefined();
    // 'Worship' is in the title, lyrics, and category. 
    expect(screen.getAllByText(/Worship/i).length).toBeGreaterThan(1);
  });

  it('should toggle presentation mode', async () => {
    const params = Promise.resolve({ number: '1' });
    
    // @ts-ignore
    render(await HymnPage({ params }));

    const presentButton = screen.getByText(/Present/i);
    expect(presentButton).toBeDefined();

    // Click present button
    fireEvent.click(presentButton);

    // Should see "Exit Presentation" or similar
    const exitButton = screen.getByRole('button', { name: /Exit/i });
    expect(exitButton).toBeDefined();

    // Click exit button
    fireEvent.click(exitButton);

    // Should see "Present" button again
    expect(screen.getByText(/Present/i)).toBeDefined();
    
    // The lyrics should still be visible
    expect(screen.getByText(/O worship the Lord in the beauty of holiness/i)).toBeDefined();
  });

  it('should display sheet music download link if available', async () => {
    // Mock getHymnByNumber to return a hymn with a sheetMusicUrl
    vi.mocked(hymnal.getHymnByNumber).mockReturnValueOnce({
      number: 1,
      title: 'O Worship the Lord',
      lyrics: '...',
      sheetMusicUrl: 'https://drive.google.com/file/d/123/view'
    });

    const params = Promise.resolve({ number: '1' });
    // @ts-ignore
    render(await HymnPage({ params }));

    const downloadLink = screen.getByText(/Download PDF/i);
    expect(downloadLink).toBeDefined();
    expect(downloadLink.closest('a')).toHaveProperty('href', 'https://drive.google.com/file/d/123/view');
  });

  it('should show contribution message if sheet music is missing', async () => {
    // Mock getHymnByNumber to return a hymn WITHOUT a sheetMusicUrl
    vi.mocked(hymnal.getHymnByNumber).mockReturnValueOnce({
      number: 1,
      title: 'O Worship the Lord',
      lyrics: '...'
    });

    const params = Promise.resolve({ number: '1' });
    // @ts-ignore
    render(await HymnPage({ params }));

    expect(screen.getByText(/Missing sheet music/i)).toBeDefined();
    expect(screen.getByText(/Help us complete this hymn/i)).toBeDefined();
  });

  it('should show not found for non-existent hymn', async () => {
    const params = Promise.resolve({ number: '999' });
    
    // @ts-ignore
    render(await HymnPage({ params }));

    expect(screen.getByText(/Hymn not found/i)).toBeDefined();
  });
});
