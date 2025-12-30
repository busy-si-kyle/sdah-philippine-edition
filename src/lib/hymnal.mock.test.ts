import { describe, it, expect, vi } from 'vitest';

// Mock the JSON data BEFORE importing the module under test
vi.mock("@/data/hymns_philippine.json", () => ({
  default: {
    hymns: [
      { number: 1, title: "Morning Joy", lyrics: "Evening tearfulness", category: "Worship" },
      { number: 2, title: "Evening Prayer", lyrics: "Morning light", category: "Praise" },
      { number: 3, title: "Sabbath Morning", lyrics: "Peaceful day", category: "Worship" },
    ]
  }
}));

import { getCategories, getHymnsByCategory, getAllHymns, searchHymns } from './hymnal';

describe('Hymnal Utility (Logic)', () => {
  it('should return unique sorted categories', () => {
    const categories = getCategories();
    expect(categories).toEqual(['Praise', 'Worship']);
  });

  it('should filter hymns by category', () => {
    const worshipHymns = getHymnsByCategory('Worship');
    expect(worshipHymns.length).toBe(2);
    expect(worshipHymns[0].number).toBe(1);
    expect(worshipHymns[1].number).toBe(3);
  });

  it('should return empty list for unknown category', () => {
    const unknown = getHymnsByCategory('Unknown');
    expect(unknown).toEqual([]);
  });

  it('should return all hymns from mock', () => {
    expect(getAllHymns().length).toBe(3);
  });

  it('should prioritize title matches over lyrics matches', () => {
    const results = searchHymns('Morning');
    // 'Morning' is in titles of 1 and 3.
    // 'Morning' is in lyrics of 2.
    // Results should be [1, 3, 2] (1 and 3 prioritized because they are in title)
    expect(results.map(h => h.number)).toEqual([1, 3, 2]);
  });
});