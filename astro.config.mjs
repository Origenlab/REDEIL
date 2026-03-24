import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://redeil.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
});
