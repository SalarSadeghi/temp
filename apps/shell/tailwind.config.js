// /** @type {import('tailwindcss').Config} */
const sharedConfig = require("@superapp/tailwind-config");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
  theme: {
    extend: {},
  },
  plugins: [],
};
