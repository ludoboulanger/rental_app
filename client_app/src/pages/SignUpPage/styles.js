import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  topContainer: {
    padding: "0 !important",
    height: "100%",
  },
  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mainGrid: {
    height: "100%",
  },
  primaryText: {
    color: theme.palette.primary.dark,
    fontWeight: "550",
  },
  items: {
    width: "100%",
    maxWidth: "350px",
    padding: "8px",
  },
  buttonContainer: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: "1",
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      marginTop: "24px",
    }
  },
  button: {
    justifySelf: "flex-end",
    width: "5vw",
    fontSize: "1rem",
  }
}));