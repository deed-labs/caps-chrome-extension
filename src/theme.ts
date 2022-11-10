import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    gradients: {
      purpleGradient: React.CSSProperties["color"];
    };
  }
}

export const themeOptions = {
  gradients: {
    purpleGradient:
      "linear-gradient(276.21deg, #9381FF 4.18%, rgba(147, 129, 255, 0.7) 97.48%)",
  },
  palette: {
    type: "dark",
    primary: {
      main: "#EBEBEB",
      light: "#9381FF",
      dark: "#1B1735",
    },
    secondary: {
      main: "#000000",
      light: "#848484",
    },
    background: {
      default: "#1B1735",
    },
  },
  typography: {
    h1: {
      fontSize: 40,
    },
    subtitle1: {
      fontSize: 32,
    },
    subtitle2: {
      fontSize: 24,
    },
  },
};

export default createTheme(themeOptions);
