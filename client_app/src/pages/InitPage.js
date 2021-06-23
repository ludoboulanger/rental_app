import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ROUTES } from "../utils/enums";
import { useHistory } from "react-router";



export default function InitPage() {

  const {t} = useTranslation();
  const logo = process.env.PUBLIC_URL + "logo192.png";
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    button: {
      
      margin: theme.spacing(2),
      
    },
  }));
  const classes = useStyles();

  const handleLogoClick = () => {
    history.push(ROUTES.WELCOME);
  };

  const handleSignInClick = () => {
    history.push(ROUTES.SIGN_IN);
  };

  const handleSignUpClick = () => {
    history.push(ROUTES.SIGN_UP);
  };

  
  return (
    <div>

      <img src={logo} onClick={handleLogoClick} alt={"logo"}/>
    
      <Button variant= "contained" color="primary" onClick={handleSignInClick} className={classes.button} >
        {t("Sign in")}
      </Button>
    
      <Button variant= "outlined" color="primary" onClick={handleSignUpClick} className={classes.button}>
        {t("Sign up")}
      </Button>
      
    </div>
  );
}
