import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  server: {
    port: 3002,
  },
  plugins: [
    react(),
    federation({
      name: "temp",
      filename: "remoteEntry.js",
      exposes: {
        "./Temp": "./src/App.tsx",
      },
      shared: {
        react: {},
        "react-dom": {},
        zustand: {},
        "react-router-dom": {},
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: [
      {
        find: /^@assets/,
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: /^@components/,
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: /^@store/,
        replacement: path.resolve(__dirname, "src/store"),
      },
      {
        find: /^@routing/,
        replacement: path.resolve(__dirname, "src/routing"),
      },
      {
        find: /^@utils/,
        replacement: path.resolve(__dirname, "src/utils"),
      },
      {
        find: /^@pages/,
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: /^@hooks/,
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: /^@validations/,
        replacement: path.resolve(__dirname, "src/validations"),
      },
    ],
  },
});
