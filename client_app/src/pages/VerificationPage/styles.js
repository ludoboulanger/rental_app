import { makeStyles } from "@material-ui/core";


export default makeStyles(theme => ({
  topContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
    fontWeight: "550",
  },
  otpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 0",
    margin: "16px 0"
  },
  otpInput: {
    height: "54px",
    width: "36px !important",
    borderRadius: "8px",
    border: `2px solid ${theme.palette.primary.light}`,
    margin: "4px",
    [theme.breakpoints.down(theme.breakpoints.values.xxs)]: {
      height: "36px",
      width: "24px !important",
    }
  },
  otpInputFocus: {
    outline: "none !important",
    border: `2px solid ${theme.palette.primary.dark}`,
    height: "58px",
    width: "40px !important",
    [theme.breakpoints.down(theme.breakpoints.values.xxs)]: {
      height: "40px",
      width: "28px !important",
    }
  },
  item: {
    margin: "12px 0",
  },
  buttonContainer: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    flexGrow: "1",
    alignItems: "center",
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