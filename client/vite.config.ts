import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@Pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
      {
        find: "@Layouts",
        replacement: path.resolve(__dirname, "./src/layouts"),
      },
      {
        find: "@Components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@Redux",
        replacement: path.resolve(__dirname, "./src/redux"),
      },
      {
        find: "@Socket",
        replacement: path.resolve(__dirname, "./src/socket"),
      },
      {
        find: "@Hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@Utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
      {
        find: "@Types",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "@Sass",
        replacement: path.resolve(__dirname, "./src/sass"),
      },
      {
        find: "@Supabase",
        replacement: path.resolve(__dirname, "./src/supabase"),
      },
    ],
  },
  server: {
    host: "localhost",
    port: 4173,
  },
  plugins: [react(), eslint()],
});
