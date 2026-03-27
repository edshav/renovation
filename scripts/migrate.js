import fs from 'fs';
import https from 'https';
import path from 'path';

const htmlPath = path.join(process.cwd(), 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const regex = /https:\/\/lh3\.googleusercontent\.com\/aida-public\/[a-zA-Z0-9_-]+/g;
const matches = [...new Set(htmlContent.match(regex))];

const publicImagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // simple redirect logic if needed
                https.get(response.headers.location, (res) => {
                    res.pipe(file);
                    file.on('finish', () => file.close(resolve));
                });
            } else {
                response.pipe(file);
                file.on('finish', () => file.close(resolve));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

function replaceAllPolyfill(str, find, replace) {
    return str.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
}

async function main() {
    console.log(`Found ${matches.length} unique images. Downloading...`);
    for (let i = 0; i < matches.length; i++) {
        const url = matches[i];
        // hero image gets specific name
        let filename;
        if (i === 0) {
            filename = 'hero-kitchen.jpg';
        } else {
            filename = `gallery-${i}.jpg`;
        }
        const dest = path.join(publicImagesDir, filename);
        try {
            await downloadImage(url, dest);
            console.log(`Downloaded ${filename}`);
            htmlContent = replaceAllPolyfill(htmlContent, url, `/images/${filename}`);
        } catch(e) {
            console.error(`Failed to download ${url}: ${e}`);
        }
    }

    // Remove inline tailwind CDN
    htmlContent = htmlContent.replace(/<script src="https:\/\/cdn\.tailwindcss\.com\?plugins=[^>]+><\/script>\n?/g, '');
    
    // Remove tailwind config
    htmlContent = htmlContent.replace(/<script id="tailwind-config">[\s\S]*?<\/script>\n?/g, '');
    
    // Remove inline style block
    htmlContent = htmlContent.replace(/<style>[\s\S]*?<\/style>\n?/g, '');

    // Inject our Vite CSS link
    if (!htmlContent.includes('<link rel="stylesheet" href="/src/style.css"')) {
        htmlContent = htmlContent.replace(/<\/title>\n/, '</title>\n    <link rel="stylesheet" href="/src/style.css" />\n');
    }

    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log('Done mapping images and updating index.html!');
}

main().catch(console.error);
