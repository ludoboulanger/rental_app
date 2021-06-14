import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../utils/enums";

export default function DisableElevation() {
  const classes = useStyles();
  const history = useHistory();
  let state = true;


  //setup new route: french vs. english version of app
  function handleLanguageChange(){
    state = !state;
    history.push(ROUTES.WELCOME);
  }

  if(state){
    return(
      <div className={classes.root}>
        <ButtonGroup disableElevation color="primary">
          <Button onClick={handleLanguageChange} variant="contained">En</Button>
          <Button onClick={handleLanguageChange} variant="outlined">Fr</Button>
        </ButtonGroup>
      
      </div>);
  } 
  else {
    return (
      <div className={classes.root}>
        <ButtonGroup disableElevation color="primary">
          <Button onClick={handleLanguageChange} variant="outlined">En</Button>
          <Button onClick={handleLanguageChange} variant="contained">Fr</Button>
        </ButtonGroup>
        
      </div>
    );
  }
  
}
