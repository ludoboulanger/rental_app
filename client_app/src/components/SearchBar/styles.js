import {  fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>({
  search: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    transform:"translateY(-50%)",
    top: "-50%",
    zIndex: 1,
    border: "2.5px solid",
    borderColor: theme.palette.primary.dark,
    boxSizing: "border-box",
    borderRadius: "10px",
    backgroundColor: "white",
    width: "fit-content",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",

  },
  searchContent:{
    display:"flex",
    marginLeft: "2ch",
    marginRight: "2ch",
    left: "25%",
    transition:theme.transitions.create(["width","left"]),
    width: "12ch",
    "&:hover": {
      width: "20ch",
      left: 0,
    },
    "&:focus": {
      width: "20ch",
      left: 0,
    },
  },
  searchIcon: {
    height: "100%",
    color: theme.palette.primary.dark,
    cursor: "pointer"
  },
  inputRoot: {
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
