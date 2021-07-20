import React, { useCallback, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";
import useStyles from "./styles";
import useSessionStorage from "../../utils/Hooks/useSessionStorage";
import { verifyPhoneNumber } from "../../services/AuthenticationService";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../utils/enums";

export default function VerificationPage() {
  const classes = useStyles();
  const { t } = useTranslation(["SignUp", "Global"]);
  const [ getItem, setItem, removeItem ] = useSessionStorage();
  const [ isLoading, setIsLoading ] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async values => {
      setIsLoading(true);

      const requestData = {
        accountId: getItem("accountId"),
        code: values.code,
      };
      
      const [ result, error ] = await verifyPhoneNumber(requestData);

      if(error) {
        setIsLoading(false);
        return;
        // TODO Display error banner here RENT-59
      }

      removeItem("accountId");
      // TEMPORARY, will change once that part of the backend is done
      setItem("token", "ThisWillBeAVerySecureToken");

      setTimeout(() => {
        setIsLoading(false);
        console.log("Verified!");
        history.push(ROUTES.CHANGE_PASSWORD);
      }, 2000);
    }
  });

  const handleChangeCode = useCallback(value => {
    formik.setFieldValue("code", value);

    if (value.length === 6) {
      formik.handleSubmit();
    }
  }, [] );

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
          onChange={handleChangeCode}
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
          {
            isLoading ?
              <CircularProgress size="28px" style={{color: "white"}} /> :
              t("Global:next")
          }
        </Button>
      </Grid>

    </Container>
  );
}