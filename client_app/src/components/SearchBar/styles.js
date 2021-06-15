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
    transition:theme.transitions.create(["width"]),
    width: "fit-content",
    maxWidth: "220px",
    "&:hover": {
      minWidth: "40%",
    },
    "&:focus-within": {
      minWidth: "40%",
    },
  },
  searchContent:{
    width: "100%",
    display:"flex",
    marginLeft: "16px",
    left: "25%"
  },
  searchIcon: {
    height: "100%",
    color: theme.palette.primary.dark,
    cursor: "pointer"
  },
  inputRoot: {
    width:"100%",
    color: "inherit",
    alignSelf:"center",
    justifySelf: "center"
  },
  inputInput: {
    position: "relative",
    textAlign: "left",
    textOverflow:"clip",
  },

}));

export default useStyles;
