import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Pacifico", "cursive"],
        sans: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#92C6C4",
          light: "#B8DED9",
          dark: "#6FA9A7",
          50: "#EFF8F7",
          100: "#D9EFED",
          200: "#B8DED9",
          300: "#92C6C4",
          400: "#6FA9A7",
          500: "#5A8C8A",
          600: "#477170",
          700: "#355756",
          800: "#243D3C",
          900: "#152423",
        },
        secondary: {
          DEFAULT: "#F7C8C8",
          light: "#FBE5E5",
          dark: "#F0A5A5",
          50: "#FEF7F7",
          100: "#FBE5E5",
          200: "#F7C8C8",
          300: "#F0A5A5",
          400: "#E98383",
          500: "#E26161",
          600: "#D43B3B",
          700: "#A62E2E",
          800: "#782121",
          900: "#4A1414",
        },
        accent: {
          yellow: "#F6E08B",
          olive: "#98A88B",
        },
        background: {
          DEFAULT: "#FAF6EF",
          light: "#FFFFFF",
          card: "#FFFFFF",
        },
        text: {
          DEFAULT: "#4C4C4C",
          light: "#6B6B6B",
          lighter: "#8A8A8A",
          dark: "#2B2B2B",
        },
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
        medium: "0 8px 24px rgba(0, 0, 0, 0.12)",
        large: "0 16px 48px rgba(0, 0, 0, 0.16)",
        glow: "0 0 20px rgba(146, 198, 196, 0.3)",
        "glow-pink": "0 0 20px rgba(247, 200, 200, 0.3)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth-in": "cubic-bezier(0.4, 0, 1, 1)",
        "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
        "smooth-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
