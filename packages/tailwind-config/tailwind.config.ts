import type { Config } from "tailwindcss";

// Each package has responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
