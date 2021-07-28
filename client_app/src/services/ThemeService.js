import {createTheme, alpha} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

/**
 * Docs: https://material-ui.com/customization/theming/
 */
export const LightTheme = createTheme({
  palette: {
    primary: {
      light: "#8AD2AB",
      main: "#3CB474",
      dark: "#30905C",
      contrastText: "#FFF"
    },
    secondary: {
      light: "#03dac5",
      main: "#01A299",
      dark: "#017374",
    },
    text: {
      secondary: alpha("#000000", 0.60),
      primary: alpha("#000000", 0.80)
    },
    states: {
      selected: "#FFF",
      disabled: alpha("#000", 0.6)
    }
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    h1: {
      fontWeight: "550",
      fontSize: "72px",
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: "550",
      fontSize: "60px",
      letterSpacing: "-0.5px",
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
      fontSize: "42px",
    },
    h5: {
      fontWeight: "450",
      fontSize: "24px",
    },
    h6: {
      fontWeight: "bold",
      fontSize: "20px",
    },
    subtitle1: {
      fontWeight: "400",
      fontSize: "16px",
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontWeight: "400",
      fontSize: "16px",
      letterSpacing: "0.15px",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "400",
      fontStyle: "italic",
    },
    body2: {
      fontSize: "14px",
      fontWeight: "400",
      fontStyle: "italic",
    },
    button: {
      fontSize: "14px",
      letterSpacing: "1.25",
      fontWeight: "500",
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
  },
});

// TODO Create the dark theme once we know how the app
// Should look in dark mode
export const DarkTheme = createTheme({});
