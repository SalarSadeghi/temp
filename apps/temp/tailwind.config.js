const sharedConfig = require("@superapp/tailwind-config");

export default {
  presets: [sharedConfig],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
