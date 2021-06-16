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
      fontSize: "72px",
      lineHeight: "60px",
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: "550",
      fontSize: "60px",
      lineHeight: "60px",
      letterSpacing: "-0.5px",
    },
    h3: {
      fontStyle: "italic",
      fontSize: "48px",
      lineHeight: "56px",
    },
    h4: {
      fontWeight: "500",
      fontStyle: "italic",
      fontSize: "42px",
      lineHeight: "36px",
    },
    h5: {
      fontWeight: "450",
      fontStyle: "italic",
      fontSize: "32px",
      lineHeight: "24px",
    },
    h6: {
      fontWeight: "450",
      fontStyle: "italic",
      fontSize: "20px",
      lineHeight: "24px",
    },
    subtitle1: {
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    body1: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "400",
      fontStyle: "italic",
    },
    body2: {
      fontFamily: "Open Sans",
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: "400",
      fontStyle: "italic",
    },
    button: {
      fontFamily: "Open Sans",
      fontSize: "14px",
      lineHeight: "16px",
      letterSpacing: "1.25px",
      fontWeight: "400",
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
    overrides: {
      MuiButton: {
        root: {
          borderRadius: "8px !important",
        },
        outlined: {
          borderWidth: "2px !important",
        },
      },
    },
  },
});

// TODO Create the dark theme once we know how the app
// Should look in dark mode
export const DarkTheme = createMuiTheme({});
