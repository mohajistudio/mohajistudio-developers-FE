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
        // Brand colors
        primary: "#0A0A0A",
        secondary: "#FFFFFF",
        third: "#FF9D00",
        // Background colors
        background: "#F2F3F5",
        surface: "#FFFFFF",
        // State colors
        error: "#FF3D5E",
        success: "#31CC93",
        "success-2": "#25996E",
        info: "#1E96FF",
        // Font colors
        black: "#000000",
        gray: {
          1: "#4D4D4D",
          2: "#666666",
          3: "#999999",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
