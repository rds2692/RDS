import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL,
  trailingSlash: 'always',
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
