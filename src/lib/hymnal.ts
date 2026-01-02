import { Hymn, HymnalData } from "@/types/hymn";
import hymnalDataRaw from "@/data/hymns_philippine.json";

const hymnalData = hymnalDataRaw as HymnalData;

export function getAllHymns(): Hymn[] {
  return hymnalData.hymns;
}

export function getHymnByNumber(number: number): Hymn | undefined {
  return hymnalData.hymns.find((h) => h.number === number);
}

export function searchHymns(query: string): Hymn[] {
  const q = query.toLowerCase().trim();
  if (!q) return hymnalData.hymns;

  const isNumber = !isNaN(Number(q));

  return hymnalData.hymns.filter((hymn) => {
    if (isNumber) {
      // If query is a number, only match against hymn number (loose match)
      return hymn.number.toString().includes(q);
    }

    // Otherwise, match title or lyrics
    if (hymn.title.toLowerCase().includes(q)) {
      return true;
    }

    // Lyrics match
    if (hymn.lyrics.toLowerCase().includes(q)) {
      return true;
    }

    return false;
  }).sort((a, b) => {
    // 1. Prioritize exact number match if query is a number
    if (isNumber) {
      if (a.number === Number(q)) return -1;
      if (b.number === Number(q)) return 1;
    }

    // 2. Prioritize title matches
    const aTitleMatch = a.title.toLowerCase().includes(q);
    const bTitleMatch = b.title.toLowerCase().includes(q);

    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    // 3. Then sort by number
    return a.number - b.number;
  });
}

export function getCategories(): string[] {
  const categories = new Set<string>();
  hymnalData.hymns.forEach((h) => {
    if (h.category) {
      categories.add(h.category);
    }
  });
  return Array.from(categories).sort();
}

export function getHymnsByCategory(category: string): Hymn[] {
  return hymnalData.hymns.filter((h) => h.category === category);
}
