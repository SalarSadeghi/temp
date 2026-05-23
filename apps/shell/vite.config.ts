import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// const getRemoteUrl = () => {
//   // Check if running on mobile/local network
//   const isDev = process.env.NODE_ENV === "development";
//   const hostIP = process.env.VITE_MFE_HOST || "10.186.18.89"; // Your IP

//   if (isDev) {
//     return `http://${hostIP}:4173/assets/remoteEntry.js`;
//   }
//   return "/api/mfe-temp/remoteEntry.js"; // For production
// };

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // const isDev = env.NODE_ENV === "development";
  return {
    server: {
      port: 3000,
      host: true,
      cors: true,
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate", // Updates the service worker automatically. Other options: prompt, manual
        includeAssets: ["vite.svg"], // Includes static assets from  public folder in the precache. For offline usage
        manifest: {
          name: "Super App",
          short_name: "Super App",
          description: "All in one platform",
          theme_color: "#ffffff", // Browser toolbar/address bar color
          background_color: "#ffffff", // Splash screen background color during loading
          display: "standalone", // How the app appears when running
          scope: "/",
          start_url: "/user", // Where the app opens when launched
          orientation: "portrait",
          //  what icon to show on the home screen when the app is installed (atleast two icons: 192 and 512)
          icons: [
            {
              src: "pwa-192.png",
              sizes: "192x192", //
              type: "image/png",
              purpose: "any", //
            },
            {
              src: "pwa-225.png",
              sizes: "225x225",
              type: "image/png",
              purpose: "any", // For Android adaptive icons with padding
            },
            {
              src: "pwa-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any", // For Android adaptive icons with padding
            },
          ],
        },
        //This is where you define caching strategies
        workbox: {
          // Tells Workbox which file types to precache during build
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
          // runtimeCaching: [
          //   {
          //     urlPattern:
          //       /^https:\/\/api\.example\.com\/.*\.(?:png|jpg|jpeg|svg)/,
          //     handler: "StaleWhileRevalidate", // Use cache, update in background
          //     options: {
          //       cacheName: "api-image-cache",
          //       expiration: {
          //         maxEntries: 50,
          //         maxAgeSeconds: 60 * 60 * 24, // 24 hours
          //       },
          //     },
          //   },
          // ],
        },
        devOptions: {
          enabled: false, // Disable service worker in development for easier debugging
        },
      }),
      federation({
        name: "shell",
        remotes: {
          temp: `${env.VITE_TEMP_URL}/assets/remoteEntry.js`,
          "mfe-soe-grn": `${env.VITE_SOE_GRN_URL}/assets/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: "^18.2.0" } as any,
          "react-dom": { singleton: true, requiredVersion: "^18.2.0" } as any,
          zustand: { singleton: true, requiredVersion: "^4.4.7" } as any,
          "@superapp/shared-store": {
            version: "0.0.0",
            singleton: true,
          } as any,
          "react-router-dom": {
            singleton: true,
            requiredVersion: "^6.22.0",
          } as any,
          "@superapp/tailwind-config": {
            singleton: true,
            version: "0.0.0",
          } as any,
        },
      }),
    ],
    build: {
      target: "esnext",
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
  };
});
