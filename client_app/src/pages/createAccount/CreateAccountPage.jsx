import React from "react";
import {
  Grid,
  makeStyles,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  appName: {
    gridRow: "1 / span 1",
    gridColumn: "2 / span 2",
    justifySelf: "center",
    alignSelf: "center",
  },
  backButton: {
    color: "#FFFFFF",
    gridRow: "1 / span 1",
    gridColumn: "1 / span 1",
    alignSelf: "center",
    justifySelf: "start",
    padding: "4px",
    backgroundColor: theme.palette.primary.main,
    width: "90%",
    height: "32px",
  },
  nextButton: {},
}));

export default function CreateAccountPage() {
  const { t } = useTranslation();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Container className={classes.headerContainer}>
        <Button
          className={classes.backButton}
          variant="contained"
          color="primary"
        >
          <ChevronLeftIcon />
          {t("back")}
        </Button>

        <Typography variant="h2" className={classes.appName}>
          Rentix
        </Typography>
      </Container>
    </Grid>
  );
}
