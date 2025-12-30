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
