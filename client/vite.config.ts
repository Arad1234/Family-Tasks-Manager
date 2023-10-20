import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@Components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@Socket",
        replacement: path.resolve(__dirname, "./src/socket"),
      },
      {
        find: "@Redux",
        replacement: path.resolve(__dirname, "./src/redux"),
      },
      {
        find: "@Hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@Utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
    ],
  },
  server: {
    host: "localhost",
    port: 4173,
  },
  plugins: [react()],
});
