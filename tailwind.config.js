// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // <-- Enables Tailwind in your React files
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(240, 5%, 84%)",
        input: "hsl(240, 5%, 90%)",
        ring: "hsl(240, 5%, 64%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(240, 10%, 4%)",
        primary: "hsl(240, 100%, 50%)",
        "primary-foreground": "hsl(0, 0%, 100%)",
        muted: "hsl(240, 4%, 95%)",
        "muted-foreground": "hsl(240, 5%, 40%)",
        accent: "hsl(240, 5%, 96%)",
        "accent-foreground": "hsl(240, 5%, 20%)",
        destructive: "hsl(0, 100%, 50%)",
        "destructive-foreground": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
