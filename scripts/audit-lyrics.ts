import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');
const PHILIPPINE_HYMNS_PATH = path.join(DATA_DIR, 'hymns_philippine.json');

interface Hymn {
    number: number;
    title: string;
    verses: { label: string; text: string }[];
}

function main() {
    if (!fs.existsSync(PHILIPPINE_HYMNS_PATH)) {
        console.error('File not found:', PHILIPPINE_HYMNS_PATH);
        process.exit(1);
    }

    const rawData = fs.readFileSync(PHILIPPINE_HYMNS_PATH, 'utf-8');
    const json = JSON.parse(rawData);
    const hymns: Hymn[] = Array.isArray(json) ? json : (json.hymns || []);

    const missing = hymns.filter(h => !h.verses || h.verses.length === 0 || h.verses.every(v => !v.text || v.text.trim() === ''));

    console.log(`Total hymns scanned: ${hymns.length}`);
    console.log(`Found ${missing.length} hymns with missing lyrics:`);

    missing.forEach(h => {
        console.log(`- #${h.number} ${h.title}`);
    });
}

main();
