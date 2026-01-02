import { describe, it, expect, vi } from 'vitest';
import { groupSheetMusicFiles } from './generate-sheet-map';

describe('Sheet Music Mapping Logic', () => {
  it('should group files by hymn number correctly', () => {
    const files = ['001.png', '002.png', '009.png', '009_1.png', '012.png', '012_1.png'];
    const result = groupSheetMusicFiles(files);
    
    expect(result['1']).toEqual(['001.png']);
    expect(result['2']).toEqual(['002.png']);
    expect(result['9']).toEqual(['009.png', '009_1.png']);
    expect(result['12']).toEqual(['012.png', '012_1.png']);
  });

  it('should sort multi-page files correctly', () => {
    const files = ['009_1.png', '009.png', '012_2.png', '012.png', '012_1.png'];
    const result = groupSheetMusicFiles(files);
    
    expect(result['9']).toEqual(['009.png', '009_1.png']);
    expect(result['12']).toEqual(['012.png', '012_1.png', '012_2.png']);
  });

  it('should handle single digit numbers in filenames if they exist', () => {
    const files = ['1.png', '001.png'];
    const result = groupSheetMusicFiles(files);
    
    // In this case, both map to 1. 
    // Usually filenames are padded, but we should be robust.
    expect(result['1']).toContain('1.png');
    expect(result['1']).toContain('001.png');
  });

  it('should ignore non-png files', () => {
    const files = ['001.png', 'README.md', '.DS_Store'];
    const result = groupSheetMusicFiles(files);
    
    expect(result['1']).toEqual(['001.png']);
    expect(Object.keys(result)).toHaveLength(1);
  });
});
