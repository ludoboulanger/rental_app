import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appBar: {
    padding: "16px 20px 20px 20px",
    width:"100%",
  },
  toolBar: {
    padding:"0",
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "repeat(3, 1fr)"
  },
  logo: {
    maxHeight: "32px",
    objectFit: "contain",
    gridColumn: "1",
    gridRow: "1",
    justifySelf: "start",
    alignSelf: "center",
    cursor:"pointer",
  },
  appName: {
    flexGrow:1,
    gridColumn: "2",
    gridRow: "1",
    justifySelf: "center",
    alignSelf: "center",
    cursor:"pointer",
  },
  appNameDesktop: {
    cursor:"pointer",
    marginLeft:"5px",
  },
  iconsContainer:{
    gridColumn: "3",
    gridRow: "1",
    justifySelf: "end"
  },
  icon:{
    padding: "2.5px",
    color: "white"
  },
  mobileSearchBar: {
    marginLeft: "auto",
    marginRight: "auto",
    transform:"translateY(-50%)",
    minWidth: "fit-content",
    maxWidth: "350px",
    width:"40%",
  },
  desktopSearchBar: {
    marginRight:"5px"
  },
  links: {
    marginLeft: "10px"
  }
});
export default useStyles;
