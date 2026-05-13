import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#F4EFE6',
        'paper-2': '#EBE4D5',
        ink: '#161623',
        'ink-2': '#2A2A3D',
        ember: '#C4471C',
        'ember-2': '#E55A23',
        slate: {
          'ink': '#2D4A6B',
        },
        sage: '#7A8569',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "paper-grain":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0 0.14 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        'brut': '4px 4px 0 0 #161623',
        'brut-sm': '2px 2px 0 0 #161623',
        'brut-lg': '6px 6px 0 0 #161623',
        'brut-ember': '4px 4px 0 0 #C4471C',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
