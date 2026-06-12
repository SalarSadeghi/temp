const sharedConfig = require("@superapp/tailwind-config");
export default {
  ...sharedConfig,
  // Scan ALL source files - including remote MFEs sources
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../temp/src/**/*.{js, ts, jsx, tsx}",
    "../../packages/ui/src/**/*.{js, ts, jsx, tsx}",
    // Or use a pattern for all MFEs
    "../mfe-*/src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: true, // Shell provides the CSS reset
  },
  theme: {
    extend: {
      textColor: {
        primary: "#0f172a",
        secondary: "#64748b",
        disabled: "#94a3b8",
      },
      borderColor: {
        primary: "#E2E8F0",
      },
      backgroundColor: {
        default: "#f8fafc",
        paper: "#ffffff",
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#60a5fa",
          dark: "#1e3a8a",
        },
        secondary: { DEFAULT: "#475569", light: "#94a3b8", dark: "#1e293b" },
        success: { light: "#aaffc7", main: "#16a34a", dark: "#15803d" },
        error: { light: "#f48fb1", main: "#ff3737", dark: "#b91c1c" },
        info: { light: "#ebf5ff", main: "#0288d1", dark: "#01579b" },
        warning: { main: "#f59e0b", light: "#fde68a", dark: "#b45309" },
      },
    },
  },
  plugins: [],
};
