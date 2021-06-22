import {React} from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {ROUTES} from "../../utils/enums";
import {useHistory} from "react-router-dom";

import useStyles from "./styles";
import SearchBar from "../SearchBar/SearchBar";
import Icon from "../Icon";

MobileHeader.propTypes = {
  withSearchBar: PropTypes.bool
};

export default function MobileHeader(props){

  const {withSearchBar} = props;
  const classes = useStyles();
  const logo = process.env.PUBLIC_URL + "logo192.png";
  const history = useHistory();

  const handleLogoClick = () => {
    history.push(ROUTES.INIT);
  };

  const handleSettingsClick = () => {
    history.push(ROUTES.SETTINGS);
  };

  const handleAppNameClick = () => {
    history.push(ROUTES.WELCOME);
  };

  return(
    <>
      <AppBar position='static' color='primary' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} className={classes.logo} onClick={handleLogoClick} alt={"logo"}/>
          <Typography variant="h3" color='textPrimary' className={classes.appName} onClick={handleAppNameClick}>
                Rentix
          </Typography>
          <div className={classes.iconsContainer}>
            <IconButton onClick={handleSettingsClick} className={classes.icon}>
              <Icon name={"setting"}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {withSearchBar && <div className={classes.mobileSearchBar}> <SearchBar/> </div>}
    </>
  );
}
