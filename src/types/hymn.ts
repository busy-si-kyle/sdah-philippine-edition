export interface Hymn {
  number: number;
  title: string;
  lyrics: string;
  category?: string;
  sheetMusicUrl?: string; // Google Drive link
}

export interface HymnalData {
  hymns: Hymn[];
}
