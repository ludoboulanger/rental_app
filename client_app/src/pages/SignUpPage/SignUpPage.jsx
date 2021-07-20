import {
  Container,
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import useStyles from "./styles";
import React, { forwardRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import IntlPhoneInput from "../../components/PhoneInput/PhoneInput";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { sendCreateAccountRequest } from "../../services/AuthenticationService";
import useSessionStorage from "../../utils/Hooks/useSessionStorage";
import { ROUTES } from "../../utils/enums";

const IntlPhoneRef = forwardRef(IntlPhoneInput);

export default function SignUpPage() {
  const classes = useStyles();
  const [ , setItem ] = useSessionStorage();
  const { t } = useTranslation([ "Global", "SignUp" ]);
  const history = useHistory();

  const handleSubmit = async values => {
    const [ result, error ] = await sendCreateAccountRequest(values);

    if (error) {
      // TODO Display error banner here RENT-57
      return;
    }
    setItem("accountId", result.id);
    history.push(ROUTES.VERIFICATION);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(50, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phoneNumber: Yup.string().required("Required")
    }),
    onSubmit: handleSubmit
  });

  const handlePhoneChange = value => {
    if (!value) {
      return;
    }
    formik.setFieldValue("phoneNumber", value);
  };

  const hasErrors = useCallback(() => {
    return !!formik.errors.firstName
    || !!formik.errors.lastName
    || !!formik.errors.email
    || !!formik.errors.phoneNumber
    || !isValidPhoneNumber(formik.values.phoneNumber);
  }, [ formik.errors, formik.values ]);

  // TODO make TextFields use FormikTextField RENT-67
  return (
    <Container className={classes.topContainer}>
      <form
        onSubmit={formik.handleSubmit}
        className={classes.formContainer}
      >

        <Grid item>
          <Typography
            variant="body1"
            className={classes.primaryText}
          >
            {t("SignUp:welcome")}
          </Typography>
        </Grid>

        <Grid
          item
          className={classes.items} >
          <TextField
            fullWidth
            name="firstName"
            id="firstName"
            variant="outlined"
            color="primary"
            margin="dense"
            label={t("Global:firstName")}
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            inputProps={{
              onBlur: formik.handleBlur
            }}
          >
          </TextField>
        </Grid>

        <Grid
          item
          className={classes.items}
        >
          <TextField
            fullWidth
            name="lastName"
            id="lastName"
            variant="outlined"
            color="primary"
            margin="dense"
            label={t("Global:lastName")}
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            inputProps={{
              onBlur: formik.handleBlur
            }}
          >
          </TextField>
        </Grid>

        <Grid
          item
          className={classes.items}
        >
          <TextField
            fullWidth
            name="email"
            id="email"
            variant="outlined"
            color="primary"
            margin="dense"
            label={t("Global:email")}
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            inputProps={{
              onBlur: formik.handleBlur
            }}
          >
          </TextField>
        </Grid>

        <Grid
          item
          className={classes.items}
        >
          <PhoneInput
            name="phone"
            id="phone"
            flags={flags}
            defaultCountry={"US"}
            value={formik.values.phoneNumber}
            onChange={handlePhoneChange}
            onBlur={formik.handleBlur}
            inputComponent={IntlPhoneRef}
            error={formik.values.phoneNumber !== "" && !isValidPhoneNumber(formik.values.phoneNumber)}
            style={{
              flexDirection: "row-reverse",
              "--PhoneInputCountryFlag-height": "1em",
            }}
          />
        </Grid>

        <Grid className={classes.buttonContainer}>
          <Button
            disabled={hasErrors()}
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
          >
            {t("Global:Next")}
          </Button>
        </Grid>

      </form>
    </Container>
  );
}