import {createMuiTheme, fade} from "@material-ui/core/styles";

/**
 * Docs: https://material-ui.com/customization/theming/
 */
export const LightTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#8AD2AB",
      main: "#3CB474",
      dark: "#30905C",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#03dac5",
      main: "#01A299",
      dark: "#017374",
    },
    text: {
      primary:"#FFFFFF",
      secondary: fade("#000000", 0.80)
    }
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    h1: {
      fontWeight: "550",
      fontSize: "72",
      letterSpacing: "-0.5",
    },
    h2: {
      fontWeight: "550",
      fontSize: "60",
      letterSpacing: "-0.5",
    },
    h3: {
      fontStyle: "italic",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "24px",
      letterSpacing: "0.4px"
    },
    h4: {
      fontWeight: "500",
      fontStyle: "italic",
      fontSize: "42",
    },
    h5: {
      fontWeight: "450",
      fontStyle: "italic",
      fontSize: "24px",
    },
    h6: {
      fontWeight: "450",
      fontStyle: "italic",
      fontSize: "20",
    },
    subtitle1: {
      fontWeight: "400",
      fontSize: "16",
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontWeight: "400",
      fontSize: "16",
      letterSpacing: "0.15px",
    },
    body1: {
      fontSize: "16",
      fontWeight: "400",
      fontStyle: "italic",
    },
    body2: {
      fontSize: "14",
      fontWeight: "400",
      fontStyle: "italic",
    },
    button: {
      fontSize: "14",
      letterSpacing: "1.25",
      fontWeight: "400",
      fontStyle: "italic",
      textTransform: "uppercase",
    },

  },
  breakpoints: {
    values: {
      xxs: 350,
      xs: 400,
      sm: 500,
      md: 960,
      lg: 1280,
      xl: 1440,
      xxl: 1920,
    },
    globals: {
      // Here we can add the values to override default styling
      // MUI components
    },
  },
});

// TODO Create the dark theme once we know how the app
// Should look in dark mode
export const DarkTheme = createMuiTheme({});
