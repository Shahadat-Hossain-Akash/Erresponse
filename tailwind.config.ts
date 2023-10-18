import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['var(--font-quicksand)']
      },
      colors: {
        "lightLime" : "#EA712E"
        
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          
          colors: {
            background: "#f2f2f2",
            primary: "#EA712E",
            content1: "#f2f2f2",
            secondary: "#FCAD81"
          },
          
        },
        dark: {
          // ...
          colors: {
            background: "#111111",
            primary: "#EA712E",
            secondary: "##FCAD81"
          },
        },
        // ... custom themes
      },
    }),
  ]
}
export default config
