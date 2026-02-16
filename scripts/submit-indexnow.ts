import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://sdah-philippine-edition.vercel.app';
const PUBLIC_DIR = path.join(__dirname, '../public');
const DATA_DIR = path.join(__dirname, '../src/data');

async function submitToIndexNow() {
    console.log('🚀 Starting IndexNow submission...');

    // 1. Find API Key
    // Look for any 32-char hex file, ignoring known non-key files if any
    let keyFile = '';
    if (fs.existsSync(PUBLIC_DIR)) {
        const files = fs.readdirSync(PUBLIC_DIR);
        keyFile = files.find(f => f.match(/^[a-zA-Z0-9]{32}\.txt$/)) || '';
    }

    if (!keyFile) {
        console.error('❌ No IndexNow key file found in public/ directory.');
        console.warn('⚠️  Skipping submission.');
        return;
    }

    const apiKey = keyFile.replace('.txt', '');
    console.log(`🔑 Found API Key: ${apiKey}`);

    // 2. Generate URLs
    const urls: string[] = [];

    // Add home page
    urls.push(`${DOMAIN}/`);

    try {
        // Read English Hymns
        const englishPath = path.join(DATA_DIR, 'hymns_english.json');
        if (fs.existsSync(englishPath)) {
            const parsed = JSON.parse(fs.readFileSync(englishPath, 'utf-8'));
            // Handle both array and {hymns: []} format
            const englishHymns = Array.isArray(parsed) ? parsed : (parsed.hymns || []);

            console.log(`📚 Found ${englishHymns.length} English hymns.`);
            englishHymns.forEach((h: any) => {
                if (h.number) {
                    urls.push(`${DOMAIN}/hymn/${h.number}`);
                }
            });
        }

        // Read Philippine Hymns
        const philippinePath = path.join(DATA_DIR, 'hymns_philippine.json');
        if (fs.existsSync(philippinePath)) {
            const parsed = JSON.parse(fs.readFileSync(philippinePath, 'utf-8'));
            // Handle both array and {hymns: []} format
            const philippineHymns = Array.isArray(parsed) ? parsed : (parsed.hymns || []);

            console.log(`🇵🇭 Found ${philippineHymns.length} Philippine hymns.`);
            philippineHymns.forEach((h: any) => {
                if (h.number) {
                    urls.push(`${DOMAIN}/hymn/${h.number}`);
                }
            });
        } else {
            console.warn('⚠️ hymns_philippine.json not found.');
        }

    } catch (error) {
        console.error('❌ Error reading hymn data:', error);
        process.exit(1);
    }

    const uniqueUrls = [...new Set(urls)];
    console.log(`🔗 Generated ${uniqueUrls.length} unique URLs to submit.`);

    if (uniqueUrls.length === 0) {
        console.warn('⚠️ No URLs to submit.');
        return;
    }

    // 3. Submit to IndexNow
    const payload = {
        host: 'sdah-philippine-edition.vercel.app',
        key: apiKey,
        keyLocation: `${DOMAIN}/${keyFile}`,
        urlList: uniqueUrls,
    };

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('✅ Success! IndexNow submission received.');
        } else {
            console.error(`❌ Submission failed: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response:', text);
            // Don't exit 1 to allow build to pass if just IndexNow fails, 
            // using console.error is enough to flag it in logs.
        }
    } catch (error) {
        console.error('❌ Network error submitting to IndexNow:', error);
    }
}

submitToIndexNow();
