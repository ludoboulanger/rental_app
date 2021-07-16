import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ROUTES } from "../utils/enums";
import { useHistory } from "react-router";
import LandingSlideshow from "../components/Slideshows/LandingSlideshow";


const useStyles = makeStyles(() => ({
  button: {
    margin: "10px 60px"
  },
}));

export default function InitPage() {


  const {t} = useTranslation();
  const history = useHistory();
  const classes = useStyles();

  const handleSignInClick = () => {
    history.push(ROUTES.SIGN_IN);
  };

  const handleSignUpClick = () => {
    history.push(ROUTES.SIGN_UP);
  };

  
  return (
    <div>
      <LandingSlideshow></LandingSlideshow>
      <Button variant= "contained" color="primary" onClick={handleSignInClick} className={classes.button} >
        {t("Sign in")}
      </Button>
    
      <Button variant= "outlined" color="primary" onClick={handleSignUpClick} className={classes.button}>
        {t("Sign up")}
      </Button>
    </div>
  );
}
