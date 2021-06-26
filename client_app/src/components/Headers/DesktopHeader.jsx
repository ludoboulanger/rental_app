import {React} from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import PropTypes from "prop-types";
import useStyles from "./styles";
import {Link, useHistory} from "react-router-dom";
import {ROUTES} from "../../utils/enums";
import {useTranslation} from "react-i18next";
import Icon from "../Icon";
DesktopHeader.propTypes = {
  withSearchBar: PropTypes.bool
};

export default function DesktopHeader(props){

  const {t} = useTranslation();
  const {withSearchBar} = props;
  const classes = useStyles();
  const logo = process.env.PUBLIC_URL + "logo192.png";
  const history = useHistory();

  const handleLogoClick = () => {
    history.push(ROUTES.WELCOME);
  };

  const handleSettingsClick = () => {
    history.push(ROUTES.SETTINGS);
  };

  const handleAppNameClick = () => {
    history.push(ROUTES.WELCOME);
  };



  return (
    <>
      <AppBar position='static' color='primary' className={classes.appBar}>
        <Toolbar>
          <img edge="start" src={logo} className={classes.logo} onClick={handleLogoClick} alt={"logo"}/>
          <Typography variant="h3" color='textPrimary' className={classes.appNameDesktop} onClick={handleAppNameClick}>
            Rentix
          </Typography>
          <Button  component={Link} to={ROUTES.SETTINGS} className={classes.links}>{t("My listings")}</Button>
          <Button  component={Link} to={ROUTES.SETTINGS} className={classes.links}>{t("Autre chose")}</Button>
          <span style={{flexGrow: 1}}/>
          {withSearchBar && <div className={classes.desktopSearchBar}><SearchBar/></div>}
          <div>
            <IconButton onClick={handleSettingsClick} className={classes.icon}>
              <Icon name={"create"}/>
            </IconButton>
            <IconButton onClick={handleSettingsClick} className={classes.icon}>
              <Icon name={"account"}/>
            </IconButton>
            <IconButton component={Link} to={ROUTES.SETTINGS} className={classes.icon}>
              <Icon name={"setting"}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

    </>
  );
}
