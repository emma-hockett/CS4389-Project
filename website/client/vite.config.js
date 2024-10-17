// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public', // Output build directory for the React app
    emptyOutDir: true // Clear the output directory before each build
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy API requests to your Express server
        changeOrigin: true, // Change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, '') // Rewrite the URL path
      }
    }
  }
});
