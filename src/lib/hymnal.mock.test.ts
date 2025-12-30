import { describe, it, expect, vi } from 'vitest';

// Mock the JSON data BEFORE importing the module under test
vi.mock("@/data/hymns_philippine.json", () => ({
  default: {
    hymns: [
      { number: 1, title: "Hymn 1", lyrics: "Lyrics 1", category: "Worship" },
      { number: 2, title: "Hymn 2", lyrics: "Lyrics 2", category: "Praise" },
      { number: 3, title: "Hymn 3", lyrics: "Lyrics 3", category: "Worship" }, // Duplicate category
      { number: 4, title: "Hymn 4", lyrics: "Lyrics 4" }, // No category
    ]
  }
}));

import { getCategories, getHymnsByCategory, getAllHymns } from './hymnal';

describe('Hymnal Utility (Category Logic)', () => {
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
    expect(getAllHymns().length).toBe(4);
  });
});
