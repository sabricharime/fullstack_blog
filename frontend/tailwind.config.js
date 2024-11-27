import { nextui } from "@nextui-org/react";
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {},
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Tajawal: ["Tajawal", "sans-serif"],
    },
  },
  darkMode: "class",

  teal: {
    100: "#d1f2eb",
    200: "#a3e4d7",
    300: "#76d7c4",
    400: "#48c9b0",
    500: "#1abc9c",
    600: "#15967d",
    700: "#10715e",
    800: "#0a4b3e",
    900: "#05261f"
},


  plugins: [    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#1abc9c",
    100: "#d1f2eb",
    200: "#a3e4d7",
    300: "#76d7c4",
    400: "#48c9b0",
    500: "#1abc9c",
    600: "#15967d",
    700: "#10715e",
    800: "#0a4b3e",
    900: "#05261f"
            },
            secondary: {
              DEFAULT: "#FF9800",
              100: "#ffeacc",
              200: "#ffd699",
              300: "#ffc166",
              400: "#ffad33",
              500: "#ff9800",
              600: "#cc7a00",
              700: "#995b00",
              800: "#663d00",
              900: "#331e00",
            },

            background: {
              DEFAULT: "#FAFAFA",
              100: "#fcfcfc",
              200: "#f8f8f8",
              300: "#f5f5f5",
              400: "#f1f1f1",
              500: "#eeeeee",
              600: "#bebebe",
              700: "#8f8f8f",
              800: "#5f5f5f",
              900: "#303030",
            },
            foreground: {
              DEFAULT: "#212121",
              900: "#d3d3d3",
              800: "#a6a6a6",
              700: "#7a7a7a",
              600: "#4d4d4d",
              500: "#212121",
              400: "#1a1a1a",
              300: "#141414",
              200: "#0d0d0d",
              100: "#070707",
            },

            grayColor: {
              DEFAULT: "#ecf0f1",
  100: "#fbfcfc",
  200: "#f7f9f9",
  300: "#f4f6f7",
  400: "#f0f3f4",
  500: "#ecf0f1",
  600: "#bdc0c1",
  700: "#8e9091",
  800: "#5e6060",
  900: "#2f3030"
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#4CAF50",
              900: "#dbefdc",
              800: "#b7dfb9",
              700: "#94cf96",
              600: "#70bf73",
              500: "#4caf50",
              400: "#3d8c40",
              300: "#2e6930",
              200: "#1e4620",
              100: "#0f2310",
            },
            secondary: {
              DEFAULT: "#FF9800",
              900: "#ffeacc",
              800: "#ffd699",
              700: "#ffc166",
              600: "#ffad33",
              500: "#ff9800",
              400: "#cc7a00",
              300: "#995b00",
              200: "#663d00",
              100: "#331e00",
            },

            background: {
              DEFAULT: "#111",
              900: "#d1d1d1",
              800: "#a3a3a4",
              700: "#767676",
              600: "#484849",
              500: "#1a1a1b",
              400: "#151516",
              300: "#101010",
              200: "#0a0a0b",
              100: "#050505",
            },
            foreground: {
              DEFAULT: "#d3d3d3",
              100: "#d3d3d3",
              200: "#a6a6a6",
              300: "#7a7a7a",
              400: "#4d4d4d",
              500: "#212121",
              600: "#1a1a1a",
              700: "#141414",
              800: "#0d0d0d",
              900: "#070707",
            },

            grayColor: {
              DEFAULT: "#9E9E9E",
              900: "#ececec",
              800: "#d8d8d8",
              700: "#c5c5c5",
              600: "#b1b1b1",
              500: "#9e9e9e",
              400: "#7e7e7e",
              300: "#5f5f5f",
              200: "#3f3f3f",
              100: "#202020",
            },
          },
        },
      },
    }),],
}
