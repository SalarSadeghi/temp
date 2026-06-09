// packages/shared-api/vite.config.ts
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "import.meta.env.VITE_DEVELOPMENT_API_URL": JSON.stringify(
        env.VITE_DEVELOPMENT_API_URL || "http://10.96.192.118:3000/gateway/"
      ),
    },
  };
});
