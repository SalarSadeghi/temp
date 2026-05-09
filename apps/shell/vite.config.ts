import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    react(),
    // VitePWA({
    //   registerType: "autoUpdate", // Updates the service worker automatically
    //   includeAssets: ["favicon.ico", "apple-touch-icon.png", "vite.svg"],
    //   manifest: {
    //     name: "My Amazing PWA",
    //     short_name: "MyPWA",
    //     description: "My Progressive Web App built with Vite + React",
    //     theme_color: "#ffffff",
    //     background_color: "#ffffff",
    //     display: "standalone", // Makes it look like a native app
    //     scope: "/",
    //     start_url: "/",
    //     orientation: "portrait",
    //     // icons: [
    //     //   {
    //     //     src: '/icons/icon-192x192.png',
    //     //     sizes: '192x192',
    //     //     type: 'image/png',
    //     //   },
    //     //   {
    //     //     src: '/icons/icon-512x512.png',
    //     //     sizes: '512x512',
    //     //     type: 'image/png',
    //     //   },
    //     // ],
    //   },
    //   // workbox: {
    //   //   // Strategies for caching static and dynamic assets
    //   //   globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
    //   //   runtimeCaching: [
    //   //     // Example: Cache images from an external API with stale-while-revalidate
    //   //     {
    //   //       urlPattern:
    //   //         /^https:\/\/api\.example\.com\/.*\.(?:png|jpg|jpeg|svg)/,
    //   //       handler: "StaleWhileRevalidate",
    //   //       options: {
    //   //         cacheName: "api-image-cache",
    //   //         expiration: {
    //   //           maxEntries: 50,
    //   //           maxAgeSeconds: 60 * 60 * 24, // 24 hours
    //   //         },
    //   //       },
    //   //     },
    //   //   ],
    //   // },
    //   devOptions: {
    //     enabled: false, // Disable service worker in development for easier debugging
    //   },
    // }),
    federation({
      name: "shell",
      remotes: {
        temp: "http://localhost:4173/assets/remoteEntry.js",
      },
      shared: {
        react: {},
        "react-dom": {},
        zustand: {},
        "@superapp/shared-store": { version: "0.0.0" },
        "react-router-dom": {},
      },
    }),
  ],
  build: {
    target: "esnext",
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
