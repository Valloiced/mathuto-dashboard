import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      montserrat: ['var(--font-montserrat)'],
      poppins: ['var(--font-poppins)'],
      torus: ['var(--font-torus)']
    },
    colors: {
      'primary-blue': '#4D92FF',
      'secondary-blue': '#E7F8F8',
      'tertiary-blue': '#DAE8FF',
      'blue': '#2A287A',
      'dark-blue': '#1E2142',
      'primary-theme': '#48B2FF',
      'secondary-theme': '#A4D9FF',
      'tertiary-theme': '#609CFF',
      'dark-red': '#B63D3D',
      'red': '#F87662',
      'light-red': '#FEBCB2',
      'black': '#000000',
      'white': '#FFF',
      'lightWhite': '#F0F0F0',
      'gradientWhite': 'rgba(255,255,255, 0.65)',
      'disabled': '#7D96C0',
    }
  },
  plugins: [],
};
export default config;
