export interface HymnVerse {
  label: string;
  text: string;
}

export interface Hymn {
  number: number;
  title: string;
  verses: HymnVerse[];
  category?: string;
  sheetMusicUrl?: string; // Google Drive link
}

export interface HymnalData {
  hymns: Hymn[];
}
