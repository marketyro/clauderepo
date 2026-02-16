import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        klf: {
          pink: "#ea4d80",
          "pink-light": "#f17da5",
          "pink-dark": "#d43a6d",
          blue: "#243391",
          "blue-light": "#3448b0",
          "blue-dark": "#1a2670",
          lavender: "#d8e0ff",
          "lavender-light": "#e8edff",
          "lavender-dark": "#b8c4ee",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
