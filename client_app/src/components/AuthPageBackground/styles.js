import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  topContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:"center",
  },
  titleContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
  }
}));