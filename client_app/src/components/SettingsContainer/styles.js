import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

  button: {
    alignContent: "left",
    alignItems: "left",
  
  },
  title: {
    alignItems: "left",
    alignContent: "left",
    padding: 10,
    paddingTop: 70
  },
  list:{
    outlineStyle: "solid",
    outlineColor: theme.palette.primary.main,
    marginLeft: 8,
    marginRight: 8,
  },
  footer:{
    paddingTop: 70,
  },
  footer2:{
    paddingBottom: 70,
  }

}));

export default useStyles;