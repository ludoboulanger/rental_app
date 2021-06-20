import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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
}));
