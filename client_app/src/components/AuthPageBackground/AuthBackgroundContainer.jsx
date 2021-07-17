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
import { ReactComponent as RentalLogo } from "../../assets/RentalLogo.svg";

AuthBackgroundContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
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
          className={classes.backButton}
          size="small"
          color="primary"
          onClick={handleBackClick}
        >
          <ArrowBackIcon />
        </Fab>

        <Typography
          className={classes.title}
          variant="h4"
        >
          Rentix
        </Typography>

      </Container>

      <Container>
        <RentalLogo className={classes.logo} />
      </Container>

      <Container>
        { children }
      </Container>

    </Container>
  );
}