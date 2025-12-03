import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const CONTENT_DIR = path.resolve(__dirname, '../content');
const BASE_URL = 'https://lionsmax.com';

async function generateSitemap() {
    console.log('Generating sitemap...');

    // 1. Static Routes
    const routes = [
        '/',
        '/blog',
        '/products',
        '/about',
        '/contact'
    ];

    // 2. Dynamic Routes (Blog Posts)
    if (fs.existsSync(CONTENT_DIR)) {
        const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
        files.forEach(file => {
            const slug = file.replace('.md', '');
            routes.push(`/blog/${slug}`);
        });
    }

    // 3. Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

    // 4. Write to dist/sitemap.xml
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    console.log(`Sitemap generated with ${routes.length} URLs.`);
}

generateSitemap();
