
const sharedConfig = require("@superapp/tailwind-config");
export default {
  ...sharedConfig,
  // Scan ALL source files - including remote MFEs sources
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../temp/src/**/*.{js, ts, jsx, tsx}",
    // Or use a pattern for all MFEs
    "../mfe-*/src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: true, // Shell provides the CSS reset
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
