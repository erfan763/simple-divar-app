import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "rgb(62, 80, 96)",
          },
          secondary: {
            main: "rgb(0, 127, 255)",
            "100": "rgb(240, 247, 255)",
          },
          warning: {
            main: "#F2BC18",
          },
          error: {
            main: "#bd0504",
          },
          success: {
            main: "#00CD67",
          },
          info: {
            main: "#3D9CCC",
          },

          background: {},
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#FFFFFF",
          },
          secondary: {
            main: "rgb(0, 127, 255)",
            "100": "rgb(240, 247, 255)",
          },
          warning: {
            main: "#F2BC18",
          },
          error: {
            main: "#bd0504",
          },
          success: {
            main: "#00CD67",
          },
          info: {
            main: "#3D9CCC",
          },

          background: {},
        }),
  },
});
