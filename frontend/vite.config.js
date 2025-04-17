// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // 👈 import 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 tell Vite that '@' means 'src'
    },
  },
});
