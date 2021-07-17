import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  topContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:"center",
    padding: "0 !important",
  },
  titleContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    padding: "12px !important",
    marginTop: "16px",
    marginBottom: "8px"
  },
  title: {
    gridColumn: "2 / -2",
    fontStyle: "italic",
    justifySelf: "center",
    alignSelf: "center",
  },
  backButton: {
    justifySelf: "start",
    alignSelf: "center",
    gridColumn: "1 / span 1",
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      display: "none",
    }
  },
  logo: {
    width: "35vh",
    maxWidth: "250px",
    height: "auto",
  }
}));