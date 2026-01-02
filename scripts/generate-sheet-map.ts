import * as fs from 'fs';
import * as path from 'path';

export interface SheetMusicMap {
  [hymnNumber: string]: string[];
}

export function groupSheetMusicFiles(files: string[]): SheetMusicMap {
  const map: SheetMusicMap = {};

  // Filter for PNG files
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

  pngFiles.forEach(file => {
    // Extract the hymn number from the filename
    // Naming convention examples: 009.png, 009_1.png, 1.png
    const match = file.match(/^(\d+)(?:_(\d+))?\.png$/i);
    if (match) {
      const hymnNumberStr = parseInt(match[1], 10).toString();
      
      if (!map[hymnNumberStr]) {
        map[hymnNumberStr] = [];
      }
      map[hymnNumberStr].push(file);
    }
  });

  // Sort files within each hymn number
  Object.keys(map).forEach(hymnNumber => {
    map[hymnNumber].sort((a, b) => {
      const matchA = a.match(/^(\d+)(?:_(\d+))?\.png$/i);
      const matchB = b.match(/^(\d+)(?:_(\d+))?\.png$/i);
      
      if (!matchA || !matchB) return a.localeCompare(b);
      
      const pageA = matchA[2] ? parseInt(matchA[2], 10) : 0;
      const pageB = matchB[2] ? parseInt(matchB[2], 10) : 0;
      
      return pageA - pageB;
    });
  });

  return map;
}

function main() {
  const sourceDir = path.join(process.cwd(), 'src', 'sheets', 'fil');
  const targetFile = path.join(process.cwd(), 'src', 'data', 'sheet_music_map.json');

  console.log(`Scanning ${sourceDir}...`);

  try {
    if (!fs.existsSync(sourceDir)) {
      console.error(`Source directory not found: ${sourceDir}`);
      process.exit(1);
    }

    const files = fs.readdirSync(sourceDir);
    const map = groupSheetMusicFiles(files);

    const jsonContent = JSON.stringify(map, null, 2);
    
    // Ensure data directory exists
    const dataDir = path.dirname(targetFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, jsonContent);
    console.log(`Successfully generated map at ${targetFile}`);
    console.log(`Found sheet music for ${Object.keys(map).length} hymns.`);
  } catch (error) {
    console.error('Error generating sheet music map:', error);
    process.exit(1);
  }
}

// Check if this script is being run directly
if (require.main === module || (process.argv[1] && process.argv[1].includes('generate-sheet-map'))) {
  main();
}
