import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  primaryText: {
    color: theme.palette.primary.dark,
    fontWeight: "550",
  },
  items: {
    width: "100%",
    maxWidth: "350px",
  }
}));