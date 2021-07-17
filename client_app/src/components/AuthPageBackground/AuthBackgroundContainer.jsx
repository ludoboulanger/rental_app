import React from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Fab,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "./styles.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

AuthBackgroundContainer.propTypes = {
  children: PropTypes.element,
};

export default function AuthBackgroundContainer({ children }) {
  const classes = useStyles();
  const history = useHistory();

  const handleBackClick = () => {
    history.back();
  };

  return (
    <Container
      className={classes.topContainer}
    >
      <Container
        className={classes.titleContainer}
      >

        <Fab
          size="small"
          color="primary"
          onClick={handleBackClick}
        >
          <ArrowBackIcon />
        </Fab>

        <Typography variant="h3">
          Rentix
        </Typography>

      </Container>

      <Container
        className={classes.logoContainer}
      >
      </Container>

      <Container>
        { children }
      </Container>

    </Container>
  );
}