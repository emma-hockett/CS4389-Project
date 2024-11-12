// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  build: {
    outDir: '../server/public', // Output build directory for the React app
    emptyOutDir: true // Clear the output directory before each build
  },
  server: {
    https: true,
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3001', // Proxy API requests to your Express server
    //     // changeOrigin: true, // Change the origin of the host header to the target URL
    //     // secure: false
    //     // rewrite: (path) => path.replace(/^\/api/, '') // Rewrite the URL path
    //   }
    // }
  }
});
