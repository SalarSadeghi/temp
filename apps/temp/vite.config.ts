import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  server: {
    port: 3002,
    cors: true,
  },
  preview: {
    port: 4173,
    host: true,
    cors: true,
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
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
        zustand: { singleton: true, requiredVersion: "^4.4.7" },
        "react-router-dom": { singleton: true, requiredVersion: "^6.22.0" },
        "@superapp/shared-store": { version: "0.0.0", singleton: true },
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
