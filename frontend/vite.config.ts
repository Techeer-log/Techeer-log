import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/members": "http://localhost:8080",
      "/posts": "http://localhost:8080",
      "/api": "http://localhost:8080",
      "/post": "http://localhost:8080",
      "/board": "http://localhost:8080",
      "/login": "http://localhost:8080",
    },
  },
});
