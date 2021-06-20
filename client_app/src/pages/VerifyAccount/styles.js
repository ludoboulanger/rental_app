import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  topGrid: {
    maxWidth: "700px",
    margin: "0 auto",
    height: "100vh",
    padding: "12px",
  },
  headerContainer: {
    padding: "0",
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  appName: {
    gridRow: "1 / span 1",
    gridColumn: "2 / span 2",
    justifySelf: "center",
    alignSelf: "center",
  },
  backButton: {
    color: "white",
    gridRow: "1 / span 1",
    gridColumn: "1 / span 1",
    alignSelf: "center",
    justifySelf: "start",
    padding: "4px",
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      display: "none",
    },
  },
  logoContainer: {
    padding: "0",
  },
  logo: {
    height: "30vh",
    maxHeight: "300px",
    width: "auto",
  },
  mainText: {
    margin: "24px 0",
    fontWeight: "550",
    color: theme.palette.primary.dark,
  },
  otpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    margin: "24px auto",
  },
  otpInput: {
    height: "42px !important",
    width: "32px !important",
    border: `2px solid ${theme.palette.primary.light}`,
    borderRadius: "12px",
    ...theme.typography.body1,
  },
  otpFocus: {
    outline: "none !important",
    height: "32px",
    width: "24px",
    border: `2px solid ${theme.palette.primary.dark}`,
    boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.4)",
  },
  noCodeText: {
    opacity: "0.5",
    fontWeight: "450",
    fontStyle: "italic",
  },
  linkButton: {
    fontWeight: "600",
  },
  nextButton: {
    color: "white",
    margin: "24px auto",
  },
}));
