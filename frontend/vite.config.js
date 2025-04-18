// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path"; // 👈 import 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"), // 👈 tell Vite that '@' means 'src'
//     },
//   },
// });

// vite.config.js or vitest.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom', // <-- This is what fixes the "document is not defined" error
    globals: true,        // Optional: lets you avoid importing `test`, `expect`, etc.
    setupFiles: ['./src/setupTests.js'], // Optional if you want to configure test setup
  },
});