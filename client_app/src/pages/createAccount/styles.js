import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  topGrid: {
    maxWidth: "700px",
    margin: "0 auto",
    height: "100vh",
    padding: "12px",
  },
  headerContainer: {
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
  nextButton: {
    margin: "32px 0",
    color: "white",
    minWidth: "100px",
    width: "max-content",
  },
  logoContainer: {
    padding: "0",
  },
  logo: {
    height: "30vh",
    maxHeight: "300px",
    width: "auto",
  },
  textField: {
    marginTop: "2vh",
  },
  formContainer: {
    flexGrow: "1",
    padding: "12px",
    maxWidth: "500px",
  },
  welcomeText: {
    margin: "12px 0",
    fontWeight: "550",
    color: theme.palette.primary.dark,
  },
  userInputContainer: {
    padding: "0 50px",
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      padding: "0",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: "1",
  },
}));
