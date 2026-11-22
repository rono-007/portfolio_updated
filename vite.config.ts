import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
  },
  plugins: [
    tailwindcss(),
    vue(),
    robots(),
    sitemap({
      hostname: 'https://rono-007.github.io/',
      changefreq: 'hourly',
      priority: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['@tailwindcss/vite'],
    force: true,
  },
});
