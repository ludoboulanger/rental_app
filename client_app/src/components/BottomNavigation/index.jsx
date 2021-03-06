import {React, useState} from "react";
import MaterialBottomNavigation from "@material-ui/core/BottomNavigation";
import {BottomNavigationAction} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/enums";
import Icon from "../Icon";
const useStyles = makeStyles(theme=>({
  root: {
    width:"100%",
    position: "fixed",
    bottom:0,
    left:0,
    backgroundColor: theme.palette.primary.main,
    justifyContent: "space-evenly",
    zIndex: 99
  },
  actions: {
    flexGrow: 1,
    minWidth: 0,
    color:theme.palette.states.disabled + "!important"
  },
  selected: {
    color:theme.palette.states.selected + "!important"
  }
}));

export default function BottomNavigation(){
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const {t} = useTranslation(["Pages"]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(

    <MaterialBottomNavigation value={value}
      onChange={handleChange}
      className={classes.root}>
      <BottomNavigationAction icon={<Icon name={"home"}/>} label={t("Pages:Home")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.WELCOME}/>
      <BottomNavigationAction icon={<Icon name={"chat"}/> } label={t("Pages:Chat")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.CHAT}/>
      <BottomNavigationAction icon={<Icon name={"create"}/>} label={t("Pages:Create")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.CREATE_LISTING}/>
      <BottomNavigationAction icon={<Icon name={"heart"}/>} label={t("Pages:Saved")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.SAVED_ITEMS}/>
      <BottomNavigationAction icon={<Icon name={"account"}/>} label={t("Pages:Account")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.PROFILE}/>
    </MaterialBottomNavigation>

  );
}
