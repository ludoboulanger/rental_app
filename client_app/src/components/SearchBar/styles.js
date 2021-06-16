import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>({
  search: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    transform:"translateY(-50%)",
    zIndex: 1,
    border: "2.5px solid",
    borderColor: theme.palette.primary.dark,
    boxSizing: "border-box",
    borderRadius: "10px",
    backgroundColor: "white",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    minWidth: "fit-content",
    maxWidth: "350px",
    width:"40%",
  },
  searchContent:{
    flexGrow:1,
    display:"flex",
    marginLeft: "16px",
    left: "25%"
  },
  searchIcon: {
    height: "100%",
    color: theme.palette.primary.dark,
  },
  inputRoot: {
    flexGrow:1,
    color: "inherit",
    alignSelf:"center",
    justifySelf: "center"
  },
  inputInput: {
    minWidth: "13ch",
    position: "relative",
    textAlign: "left",
    textOverflow:"clip",
  },

}));

export default useStyles;
