import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../utils/enums";

export default function ContainedButtons() {
  const classes = useStyles();
  const history = useHistory();
  
  function handleSignUpClick(){
    history.push(ROUTES.SIGN_UP);
  }

  return (
    <div className={classes.root}>
      <Button onClick={handleSignUpClick} variant="contained" color="primary">
        Sign Up
      </Button>

    </div>
  );
}
