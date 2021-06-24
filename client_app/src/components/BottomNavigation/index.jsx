import {React, useState} from "react";
import MaterialBottomNavigation from "@material-ui/core/BottomNavigation";
import {BottomNavigationAction, Paper, Tab, Tabs, useTheme} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import {makeStyles} from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/ChatBubble";
import FavoriteIcon from "@material-ui/icons/FavoriteOutlined";
import AccountIcon from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/AddCircleOutlined";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/enums";
const useStyles = makeStyles(theme=>({
  root: {
    width:"100%",
    position: "fixed",
    bottom:0,
    left:0,
    backgroundColor: theme.palette.primary.main,
    justifyContent: "space-evenly"
  },
  actions: {
    flexGrow: 1,
    minWidth: "48px",
    color:theme.palette.states.disabled + "!important"
  },
  selected: {
    color:theme.palette.states.selected + "!important"
  }
}));

export default function BottomNavigation(){
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const {t} = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(

    <MaterialBottomNavigation value={value}
      onChange={handleChange}
      className={classes.root}>
      <BottomNavigationAction icon={<HomeIcon/>} label={t("Home")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.WELCOME}/>
      <BottomNavigationAction icon={<ChatIcon/>} label={t("Chat")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.CHAT}/>
      <BottomNavigationAction icon={<CreateIcon/>} label={t("Create")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.CREATE_LISTING}/>
      <BottomNavigationAction icon={<FavoriteIcon/>} label={t("Saved")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.SAVED_ITEMS}/>
      <BottomNavigationAction icon={<AccountIcon/>} label={t("Account")} classes={{root: classes.actions, selected: classes.selected}} component={Link} to={ROUTES.PROFILE}/>
    </MaterialBottomNavigation>

  );
}
