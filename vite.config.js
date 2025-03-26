import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // Set a fixed port
    strictPort: false, // Allows fallback to another available port
    host: 'localhost', // Ensure it's always accessible on localhost
  }, // ✅ Added missing comma here
  resolve: { // ✅ Wrapped alias inside resolve
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // ✅ Fixed alias path
    }
  }
});

