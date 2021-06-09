import { createMuiTheme } from "@material-ui/core/styles";

const LightTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#8AD2AB",
      main: "#3CB474",
      dark: "#30905C",
    },
    secondary: {
      light: "#03DAC5",
      main: "#01A299",
      dark: "#017374",
    },
  },
  typography: {
    h1: {
      fontFamily: "Open Sans",
      fontWeight: "550",
      fontSize: "72",
      lineHeight: "60",
      letterSpacing: "-0.5",
    },
    h2: {
      fontFamily: "Open Sans",
      fontWeight: "550",
      fontSize: "60",
      lineHeight: "60",
      letterSpacing: "-0.5",
    },
    h3: {
      fontFamily: "Open Sans",
      fontWeight: "550",
      fontStyle: "italic",
      fontSize: "48",
      lineHeight: "56",
    },
    h4: {
      fontFamily: "Open Sans",
      fontWeight: "500",
      fontStyle: "italic",
      fontSize: "42",
      lineHeight: "36",
    },
    h5: {
      fontFamily: "Open Sans",
      fontWeight: "450",
      fontStyle: "italic",
      fontSize: "32",
      lineHeight: "24",
    },
    h6: {
      fontFamily: "Open Sans",
      fontWeight: "450",
      fontStyle: "italic",
      fontSize: "20",
      lineHeight: "24",
    },
    subtitle1: {
      fontFamily: "Open Sans",
      fontWeight: "400",
      fontSize: "16",
      lineHeight: "24",
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontFamily: "Open Sans",
      fontWeight: "400",
      fontSize: "16",
      lineHeight: "24",
      letterSpacing: "0.15px",
    },
    body1: {
      fontFamily: "Open Sans",
      fontSize: "16",
      lineHeight: "24",
      fontWeight: "400",
      fontStyle: "italic",
    },
    body2: {
      fontFamily: "Open Sans",
      fontSize: "14",
      lineHeight: "24",
      fontWeight: "400",
      fontStyle: "italic",
    },
    button: {
      fontFamily: "Open Sans",
      fontSize: "14",
      lineHeight: "16",
      letterSpacing: "1.25",
      fontWeight: "400",
      fontStyle: "italic",
      textTransform: "uppercase",
    },
  },
});

// TODO Create the dark theme once we know how the app
// Should look in dark mode
const DarkTheme = createMuiTheme({});

export default {
  LightTheme,
  DarkTheme,
};
