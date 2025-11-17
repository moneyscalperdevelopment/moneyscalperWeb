import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import config (using dynamic import for ES modules)
const config = await import('../src/config/seo-routes.ts');

const { COIN_MARKET_ROUTES, STATIC_ROUTES, BASE_URL } = config;

function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Add static routes
  STATIC_ROUTES.forEach(({ path, changefreq, priority }) => {
    xml += `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  // Add market coin routes
  COIN_MARKET_ROUTES.forEach((coin) => {
    xml += `
  <url>
    <loc>${BASE_URL}/market/${coin}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.90</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

// Generate and write sitemap
const sitemap = generateSitemap();
const outputPath = join(__dirname, '../public/sitemap.xml');

try {
  writeFileSync(outputPath, sitemap, 'utf-8');
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
