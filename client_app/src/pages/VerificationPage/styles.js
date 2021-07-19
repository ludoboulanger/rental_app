import { makeStyles } from "@material-ui/core";


export default makeStyles(theme => ({
  topContainer: {
    padding: "0 !important",
    height: "100%",
  },
  titleText: {
    color: theme.palette.primary.dark,
    fontStyle: "italic",
    fontWeight: "550",
  },
  primaryText: {
    color: theme.palette.primary.dark,
    fontStyle: "italic",
    fontWeight: "500",
  },
  formContainer: {
    flexGrow: "1",
  },
  otpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  otpInput: {
    height: "4vh",
    width: "3.7vh",
    maxHeight: "42px",
    maxWidth: "32px",
  },
  otpInputFocus: {

  },
  item: {
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