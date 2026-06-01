import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
// import { federation } from "@module-federation/vite";
import path from "path";
import pkg from "./package.json";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3001,
      cors: {
        credentials: true,
        origin: [`${env.VITE_SHELL_URL}`],
      },
      headers: {
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
      },
    },
    preview: {
      port: 4174,
      host: true,
      cors: {
        origin: "*",
        credentials: true,
      },
    },
    plugins: [
      react(),
      federation({
        name: "soe-grn",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: pkg.peerDependencies.react,
          } as any,
          "react-dom": {
            singleton: true,
            requiredVersion: pkg.peerDependencies["react-dom"],
          } as any,
          zustand: {
            singleton: true,
            requiredVersion: pkg.peerDependencies.zustand,
          } as any,
          "react-router-dom": {
            singleton: true,
            requiredVersion: pkg.peerDependencies["react-router-dom"],
          } as any,
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
          "@superapp/tailwind-config": { singleton: true } as any,
          "react-hook-form": {
            singleton: true,
            requiredVersion: "^7.48.2",
          } as any,
          yup: { singleton: false, requiredVersion: pkg.peerDependencies.yup },
          "@hookform/resolvers": {
            singleton: false,
            requiredVersion: pkg.peerDependencies["@hookform/resolvers"],
          },
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
        {
          find: /^@type/,
          replacement: path.resolve(__dirname, "src/type"),
        },
        {
          find: /^@api/,
          replacement: path.resolve(__dirname, "src/api"),
        },
      ],
    },
  };
});
