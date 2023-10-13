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
        "lightLime" : "#e1ff53"
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {},
        },
        dark: {
          // ...
          colors: {
            background: "#111111",
            primary: "#e1ff53"
          },
        },
        // ... custom themes
      },
    }),
  ]
}
export default config
