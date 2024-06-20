import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        install: resolve(__dirname, 'index_install.html'),
        index: resolve(__dirname, 'index_home.html'),
        offline: resolve(__dirname, 'offline.html'),
        'preview/index': resolve(__dirname, 'preview/index.html'),
      },
    },
  },
});
