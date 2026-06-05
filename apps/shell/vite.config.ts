import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
// import { federation } from "@module-federation/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import pkg from "./package.json";
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
      port: 3001,
      host: true,
      cors: true,
    },
    preview: {
      port: 3000,
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
          "soe-grn": `${env.VITE_SOE_GRN_URL}/assets/remoteEntry.js`,
        },
        shared: {
          // React Singletons
          react: {
            singleton: true,
            requiredVersion: pkg.dependencies.react,
            eager: true,
          } as any,
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: pkg.dependencies["react-dom"],
          } as any,
          "react-router-dom": {
            singleton: true,
            requiredVersion: pkg.dependencies["react-router-dom"],
            eager: true,
          } as any,
          // State & API
          "@superapp/shared-store": {
            version: "0.0.0",
            singleton: true,
            eager: true,
          } as any,
          "@superapp/shared-api": {
            version: "0.0.0",
            singleton: true,
            eager: true,
          } as any,
          "@tanstack/react-query": {
            singleton: true,
            requiredVersion: pkg.dependencies["@tanstack/react-query"],
          } as any,
          zustand: {
            singleton: true,
            requiredVersion: pkg.dependencies.zustand,
          } as any,
          // Forms
          "react-hook-form": {
            singleton: true,
            requiredVersion: pkg.dependencies["react-hook-form"],
          } as any,
          "@hookform/resolvers": {
            singleton: false,
            requiredVersion: pkg.dependencies["@hookform/resolvers"],
          } as any,
          yup: {
            singleton: false,
            requiredVersion: pkg.dependencies.yup,
          } as any,
          // UI
          "@superapp/ui": {
            singleton: true,
            version: "0.0.0",
            eager: true,
          } as any,
          "@emotion/react": {
            singleton: true,
            requiredVersion: "^11.11.0",
            eager: true,
          } as any,
          "@emotion/styled": {
            singleton: true,
            requiredVersion: "^11.11.0",
            eager: true,
          } as any,
          "@emotion/cache": {
            singleton: true,
            requiredVersion: pkg.dependencies["@emotion/cache"],
            eager: true,
          } as any,
          stylis: {
            singleton: true,
            requiredVersion: "^4.3.0",
            eager: true,
          } as any,
          "date-fns": {
            singleton: true,
            requiredVersion: "^3.3.1",
            eager: true,
          } as any,
          "date-fns-jalali": {
            singleton: true,
            requiredVersion: "^4.1.0",
            eager: true,
          } as any,
          "stylis-plugin-rtl": {
            singleton: true,
            requiredVersion: "^2.1.1",
            eager: true,
          } as any,
          "@superapp/tailwind-config": {
            singleton: true,
            version: "0.0.0",
          } as any,
        },
      }),
    ],
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "zustand",
        "react-hook-form",
      ],
      // exclude: ['@superapp/shared-store', '@superapp/tailwind-config'],
    },
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
