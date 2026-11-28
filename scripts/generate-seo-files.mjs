import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(projectRoot, '..', 'dist');
const siteValue = process.env.SITE_URL ?? 'https://rangel.design';

if (!siteValue) {
  console.warn('SITE_URL no está configurado. Se omiten canonical absolutos y sitemap hasta que se defina el dominio de producción.');
  process.exit(0);
}

let site;
try {
  site = new URL(siteValue);
} catch {
  throw new Error(`SITE_URL no es una URL válida: ${siteValue}`);
}
if (!['http:', 'https:'].includes(site.protocol) || site.pathname !== '/' || site.search || site.hash) {
  throw new Error('SITE_URL debe ser el origen del sitio, por ejemplo https://dominio.com, sin una ruta adicional.');
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(fullPath);
  }
  return files;
}

const urls = [];
for (const file of await htmlFiles(dist)) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === '404.html' || relative.endsWith('/404.html')) continue;
  const html = await readFile(file, 'utf8');
  if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) continue;
  const route = relative === 'index.html'
    ? '/'
    : relative.endsWith('/index.html')
      ? `/${relative.slice(0, -'index.html'.length)}`
      : `/${relative.replace(/\.html$/, '')}`;
  const lastModified = html.match(/<meta\s+name=["']last-modified["']\s+content=["'](\d{4}-\d{2}-\d{2})["']/i)?.[1];
  urls.push({ url: new URL(route, site.origin).href, lastModified });
}

const uniqueUrls = [...new Map(urls.map((item) => [item.url, item])).values()]
  .sort((a, b) => a.url.localeCompare(b.url));
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...uniqueUrls.map(({ url, lastModified }) => `  <url><loc>${url.replaceAll('&', '&amp;')}</loc>${lastModified ? `<lastmod>${lastModified}</lastmod>` : ''}</url>`),
  '</urlset>',
  '',
].join('\n');
await writeFile(path.join(dist, 'sitemap.xml'), xml, 'utf8');

const robotsPath = path.join(dist, 'robots.txt');
let robots = await readFile(robotsPath, 'utf8').catch(() => 'User-agent: *\nAllow: /\n');
robots = robots.replace(/^Sitemap:\s*.*(?:\r?\n|$)/gim, '').trimEnd();
robots += `\nSitemap: ${new URL('/sitemap.xml', site.origin).href}\n`;
await writeFile(robotsPath, robots, 'utf8');
console.info(`Sitemap generado para ${uniqueUrls.length} URLs en ${new URL('/sitemap.xml', site.origin).href}`);
