import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 4173,
    open: "http://localhost:4173",
  },
  plugins: [react()],
});
