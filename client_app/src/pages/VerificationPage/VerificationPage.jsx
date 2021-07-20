import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";
import useStyles from "./styles";

export default function VerificationPage() {
  const classes = useStyles();
  const { t } = useTranslation(["SignUp", "Global"]);
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: values => {
      console.log("Values.code: ", values.code);
    }
  });

  return (
    <Container
      className={classes.topContainer}
    >

      <Grid item className={classes.item} >
        <Typography
          variant="h3"
          className={classes.titleText}
        >
          {t("SignUp:checkSMS")}
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <Typography
          variant="body1"
          className={classes.primaryText}
        >
          {t("SignUp:verifyPhone")}
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.formContainer}
      >
        <OtpInput
          value={formik.values.code}
          onChange={formik.handleChange}
          separator={<span>-</span>}
          containerStyle={classes.otpContainer}
          inputStyle={classes.otpInput}
          focusStyle={classes.otpInputFocus}
          isInputNum={true}
          numInputs={6}
          shouldAutoFocus={true}
        />
      </Grid>

      <Grid
        className={classes.buttonContainer}
      >
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={formik.handleSubmit}
        >
          {t("Global:next")}
        </Button>
      </Grid>

    </Container>
  );
}