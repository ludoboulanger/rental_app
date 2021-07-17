import {
  Container,
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import useStyles from "./styles";
import React from "react";
import IntlPhoneInput from "../../components/PhoneInput/PhoneInput";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

export default function SignUpPage() {
  const classes = useStyles();

  return (
    <Container className={classes.topContainer}>
      <form className={classes.formContainer} >

        <Grid item>
          <Typography
            variant="body1"
            className={classes.primaryText}
          >
            {/* TODO Localize */}
            {"Welcome to Rentix, we will get you up and running in no time! Let's start by getting to know you"}
          </Typography>
        </Grid>

        <Grid
          item
          className={classes.items} >
          <TextField
            fullWidth
            variant="outlined"
            color="primary"
            margin="dense"
            label="First Name" // TODO Localize
            id="signup-firstname"
            type="text"
          >
          </TextField>
        </Grid>

        <Grid
          item
          className={classes.items}
        >
          <TextField
            fullWidth
            variant="outlined"
            color="primary"
            margin="dense"
            label="Last Name" // TODO Localize
            id="signup-firstname"
            type="text"
          >
          </TextField>
        </Grid>

        <Grid
          item
          className={classes.items}
        >
          <TextField
            fullWidth
            variant="outlined"
            color="primary"
            margin="dense"
            label="Email" // TODO Localize
            id="signup-firstname"
            type="text"
          >
          </TextField>
        </Grid>

        <Grid
          item
          className={classes.items}
        >
          <PhoneInput
            flags={flags}
            defaultCountry={"US"}
            value={""}
            onChange={() => { }}
            inputComponent={IntlPhoneInput}
            style={{
              flexDirection: "row-reverse",
              "--PhoneInputCountryFlag-height": "1em",
            }}
          />
        </Grid>

        <Grid className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => { }}
          >
            {"Next"}
          </Button>
        </Grid>

      </form>
    </Container>
  );
}