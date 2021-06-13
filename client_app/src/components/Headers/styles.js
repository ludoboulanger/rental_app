import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appBar: {
    padding: "16px 20px",
    width:"100%"

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
  iconsContainer:{
    gridColumn: "3",
    gridRow: "1",
    justifySelf: "end",
  },
  icon:{
    padding: "0"
  }
});
export default useStyles;
