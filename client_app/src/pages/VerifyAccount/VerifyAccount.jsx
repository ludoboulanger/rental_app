import React, { useState } from "react";
import { Grid, Container, Typography, Fab, Button } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import RentixLogo from "../../assets/RentixLogo.png";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";

export default function VerifyAccount() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [code, setCode] = useState("");

  const handleChangeCode = (code) => {
    setCode(code);
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
  };
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      wrap="nowrap"
      className={classes.topGrid}
    >
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

        <Grid item>
          <Typography className={classes.mainText} variant="body1">
            {t("sentCode")}
          </Typography>
        </Grid>

        <Grid item>
          <OtpInput
            value={code}
            onChange={handleChangeCode}
            numInputs={6}
            separator={<span> - </span>}
            containerStyle={classes.otpContainer}
            inputStyle={classes.otpInput}
            focusStyle={classes.otpFocus}
            isInputNum={true}
          />
        </Grid>

        <Grid>
          <Typography variant="body2" className={classes.noCodeText}>
            {t("noCode")}
          </Typography>
        </Grid>

        <Button
          color="primary"
          variant="text"
          className={classes.linkButton}
          disableFocusRipple={true}
        >
          Resend Code
        </Button>
      </Grid>

      <Grid>
        <Button
          color="primary"
          variant="contained"
          className={classes.nextButton}
        >
          {t("next")}
        </Button>
      </Grid>
    </Grid>
  );
}
