import { describe, it, expect } from 'vitest';
import { searchHymns, getHymnByNumber, getAllHymns } from './hymnal';

describe('Hymnal Utility', () => {
  it('should return all hymns', () => {
    const hymns = getAllHymns();
    expect(hymns.length).toBe(474);
  });

  it('should find hymn by number', () => {
    const hymn = getHymnByNumber(1);
    expect(hymn).toBeDefined();
    expect(hymn?.title).toBe('O Worship the Lord');
  });

  it('should search by exact number', () => {
    const results = searchHymns('1');
    expect(results[0].number).toBe(1);
  });

  it('should search by loose number (contains string)', () => {
    // Searching for '1' should match '1', '11', '21', '101', etc.
    const results = searchHymns('1');
    const numbers = results.map(h => h.number);
    expect(numbers).toContain(1);
    expect(numbers).toContain(11); // e.g., "The Morning Watch"
    expect(numbers).toContain(21); // e.g., "Immortal, Invisible, God Only Wise"
    expect(numbers.length).toBeGreaterThan(1);
  });

  it('should NOT match lyrics or title when query is a number', () => {
    // Hymn 2 has "1." in its lyrics but "2" does not contain "1"
    const results = searchHymns('1');
    const hasHymn2 = results.some(h => h.number === 2);
    expect(hasHymn2).toBe(false);
  });

  it('should search by title', () => {
    const results = searchHymns('Worship the Lord');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('Worship the Lord');
  });

  it('should search by lyrics', () => {
    const results = searchHymns('beauty of holiness');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(h => h.number === 1)).toBe(true);
  });

  it('should be case insensitive', () => {
    const resultsLower = searchHymns('worship');
    const resultsUpper = searchHymns('WORSHIP');
    expect(resultsLower.length).toBe(resultsUpper.length);
    expect(resultsLower.length).toBeGreaterThan(0);
  });

  it('should return all hymns for empty query', () => {
    const results = searchHymns('');
    expect(results.length).toBeGreaterThan(400); // There are 474 hymns in the file
  });
});
