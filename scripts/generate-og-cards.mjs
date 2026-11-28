import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(projectRoot, 'dist');
const output = path.join(projectRoot, 'public', 'og');
const chrome = process.env.CHROME_BIN ?? 'google-chrome';

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

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const routeFor = (file) => {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
};

const template = ({ title, section, index }) => {
  const accents = ['#d8ff61', '#db6753', '#c7d8bf', '#f2d9ae', '#ecd4ca'];
  const accent = accents[index % accents.length];
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #252321; color: #f6f1e6; font-family: Lato, Arial, sans-serif; }
    .card { position: relative; display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 54px 64px 48px; }
    .card::before { content: ""; position: absolute; width: 420px; height: 420px; right: -120px; top: -170px; border: 1px solid rgb(246 241 230 / 22%); border-radius: 50%; }
    .card::after { content: "✳"; position: absolute; right: 54px; bottom: 95px; color: ${accent}; font-size: 120px; line-height: 1; transform: rotate(18deg); }
    .top { display: flex; justify-content: space-between; align-items: center; font-size: 17px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .brand { color: ${accent}; font-size: 54px; letter-spacing: -.08em; }
    .section { color: rgb(246 241 230 / 72%); }
    h1 { position: relative; z-index: 1; max-width: 930px; margin: 36px 0 0; font-size: ${title.length > 66 ? '65px' : title.length > 44 ? '76px' : '88px'}; line-height: .94; letter-spacing: -.055em; text-transform: uppercase; text-wrap: balance; }
    .bottom { display: flex; justify-content: space-between; align-items: flex-end; padding-top: 18px; border-top: 1px solid rgb(246 241 230 / 24%); font-size: 16px; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
    .tag { display: inline-block; padding: 12px 18px; background: ${accent}; color: #252321; }
    .url { color: ${accent}; }
  </style>
</head>
<body>
  <main class="card">
    <div class="top"><span class="brand">RDS®</span><span class="section">${escapeHtml(section)}</span></div>
    <h1>${escapeHtml(title)}</h1>
    <div class="bottom"><span class="tag">Diseño web · SEO · IA</span><span class="url">RANGEL.DESIGN</span></div>
  </main>
</body>
</html>`;
};

await mkdir(output, { recursive: true });
const files = (await htmlFiles(dist)).filter((file) => !file.endsWith(path.join('', '404.html')));
let generated = 0;

for (const [index, file] of files.entries()) {
  const html = await readFile(file, 'utf8');
  const route = routeFor(file);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
    ?.replace(/<[^>]+>/g, '')
    .replace(/\s*\|\s*(RDS|Rangel Designs Studio)\s*$/i, '')
    .trim();
  if (!title) continue;
  const section = route === '/' ? 'Estudio digital' : route.split('/').filter(Boolean)[0]?.replaceAll('-', ' ') ?? 'RDS';
  const slug = route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
  const target = path.join(output, `${slug}.png`);
  const page = template({ title, section, index });
  const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(page)}`;
  const result = spawnSync(chrome, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1200,630',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=250',
    `--screenshot=${target}`,
    dataUrl,
  ], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`No se pudo generar ${slug}: ${result.stderr}`);
  generated++;
}

const expected = new Set(files.map((file) => {
  const route = routeFor(file);
  return route === '/' ? 'home.png' : `${route.split('/').filter(Boolean).join('-')}.png`;
}));
for (const entry of await readdir(output)) {
  if (entry.endsWith('.png') && !expected.has(entry)) await rm(path.join(output, entry));
}

console.info(`Generadas ${generated} tarjetas sociales en ${path.relative(projectRoot, output)}`);
