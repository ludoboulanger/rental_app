import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../utils/enums";

export default function OutlinedButtons() {
  const classes = useStyles();
  const history = useHistory();

  function handleSignInClick(){
    history.push(ROUTES.SIGN_IN);
  }

  return (
    <div className={classes.root}>
      <Button onClick={handleSignInClick} variant="outlined" color="primary">
        Sign In
      </Button>

    </div>
  );
}
