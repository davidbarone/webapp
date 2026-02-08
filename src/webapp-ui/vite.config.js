import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    port: 3000, // Change the development server port
  },
  root: 'src',
  build: {
    outDir: '../dist', // Specify the output directory
  },
  resolve: {
    alias: {
      '@root': resolve(__dirname, './src'), // Alias for the src / root folder
      '@widgets': resolve(__dirname, './src/js/widgets'), // Alias for the src/js/widgets folder
      '@routes': resolve(__dirname, './src/js/routes'), // Alias for the src/js/routes folder
    },
  },
});
