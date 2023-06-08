/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-roboto)",
        alt: "var(--font-lexend-deca)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "open-modal": {
          "0%": { opacity: 0, transform: "translateY(-100px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        open: {
          "0%": { height: "0px" },
          "100%": { height: "100px" },
        },
      },
      animation: {
        fade: "fade 1s",
        wiggle: "wiggle 1s ease-in-out infinite",
        open: "open 0.2s ease-in-out",
        "open-reverse": "open 0.2s ease-in-out reverse",
        "open-modal": "open-modal 0.2s ease-in-out",
      },
    },
  },
  plugins: [],
};
