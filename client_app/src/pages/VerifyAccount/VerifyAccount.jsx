import { Grid, Container, Typography, Fab } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import RentixLogo from "../../assets/RentixLogo.png";
import React from "react";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";

export default function VerifyAccount() {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleBackClick = () => {
    console.log("Back button clicked");
  };
  return (
    <Grid>
      <Container className={classes.headerContainer}>
        <Fab
          size="small"
          color="primary"
          className={classes.backButton}
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Fab>

        <Typography variant="h2" className={classes.appName}>
          Rentix
        </Typography>
      </Container>

      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{ flexGrow: "1" }}
      >
        <Grid item className={classes.logoContainer}>
          <img
            src={RentixLogo}
            alt="Rentix Logo"
            className={classes.logo}
          ></img>
        </Grid>

        <Grid item>
          <Typography variant="h5">{t("checkInbox")}</Typography>
        </Grid>

        <Grid>
          <Typography className={classes.mainText} variant="body1">
            {t("sentCode")}
          </Typography>
        </Grid>

        <Grid></Grid>
      </Grid>
    </Grid>
  );
}
