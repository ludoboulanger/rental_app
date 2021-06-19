import React from "react";
import {
  Grid,
  Button,
  Typography,
  Container,
  TextField,
  Fab,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useTranslation } from "react-i18next";
import RentixLogo from "../../assets/RentixLogo.png";
import { useFormik } from "formik";
import useStyles from "./styles";

export default function CreateAccountPage() {
  const { t } = useTranslation();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  return (
    <Grid
      className={classes.topGrid}
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      wrap="nowrap"
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
          <Typography variant="body1" className={classes.welcomeText}>
            {t("welcomeToRentix")}
          </Typography>
        </Grid>

        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid item className={classes.userInputContainer}>
            <TextField
              required={true}
              id="firstName"
              name="firstName"
              variant="outlined"
              margin="dense"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              label={t("firstName")}
              className={classes.textField}
            ></TextField>

            <TextField
              required={true}
              id="lastName"
              name="lastName"
              variant="outlined"
              margin="dense"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              label={t("lastName")}
              className={classes.textField}
            ></TextField>

            <TextField
              required={true}
              id="email"
              name="email"
              variant="outlined"
              margin="dense"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              label={t("email")}
              className={classes.textField}
            ></TextField>

            <TextField
              required={true}
              id="phoneNumber"
              name="phoneNumber"
              variant="outlined"
              margin="dense"
              fullWidth
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              label={t("phoneNumber")}
              className={classes.textField}
            ></TextField>
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="center"
            style={{ flexGrow: "1" }}
          >
            <Button
              className={classes.nextButton}
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
            >
              {t("next")}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
