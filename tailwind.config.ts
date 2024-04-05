import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      colors: {
        main1: "#fd9e0e",
        main2: "#fc4508",
        main3bg: "#fec372",
        main4bg: "#ff8f5f",
        // mainHover: "#e84a00",

        white: "#fefefe", //kolor tła
        bgWhite1: "#f1f5fc", //kolor tla elementu
        bgWhite1Hover: "#e2e2e2", //kolor tla elementu ale hover

        dark: "#0a0b0d", //kolor tła
        bgDark1: "#141519", //kolor tla elementu
        bgDark1Hover: "#2b2d35", //kolor tla elementu ale hover

        gray: "#b6b6b6",

        //&-rose-600 - to jest czerwony czasem
        //&-slate-300 - taki wyszarzony font

        // &-slate-200 - szary border light mode
        //&-stone-700 - szary border dark mode

        //&-green-500 - zielony
        //&-red-500 - czerwony wszedzie
        //&-yellow-500 - rzułty
      },
      screens: {
        xs: "320px",
        md400: "400px",
        md500: "500px",
        md600: "600px",
        md750: "750px",
        md800: "800px",
      },
      gridTemplateRows: {
        layout: " auto",
      },
      backgroundImage: {
        "hero-pattern": "url('/header.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
