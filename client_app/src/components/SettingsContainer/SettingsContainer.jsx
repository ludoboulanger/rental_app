import React from "react";
import { useTranslation } from "react-i18next";
import { Paper, Grid, Typography, List, ListItem, ListItemText, Divider} from "@material-ui/core";
import useStyles from "./styles";
import { ThemeProvider } from "@material-ui/styles";

export default function SettingDividers(){

  const classes = useStyles();
  const {t} = useTranslation();

  return(
    <div>

      <Grid container direction="column" justify="space-evenly">
        <Typography align ="left" variant="h6" className={classes.title}>
          {t("Account information")}
        </Typography>
        <List component="nav" className={classes.list} >
          <ListItem>
            <ListItemText primary={t("Name")} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={t("Email address")} />
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText primary={t("Phone number")} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={t("Change my Password")} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={t("Payment information")} />
          </ListItem>
        </List>
        
        <Typography align ="left" variant="h6" className={classes.title}>
          {t("Functionality")}
        </Typography>
        <List component="nav" className={classes.list} >
          <ListItem button>
            <ListItemText primary={t("Notifications")} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={t("Language")} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={t("Themes")} />
          </ListItem>
        </List>

        <Typography align ="left" variant="h6" className={classes.title}>
          {t("More information")}
        </Typography>
        <List component="nav" className={classes.list} >
          <ListItem button>
            <ListItemText primary={t("Privacy Policy")} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={t("Terms of Service")} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary={t("About Us")} />
          </ListItem>
        </List>
      </Grid>

      <Typography align="center" variant="subtitle2" className={classes.footer}>
          Rentix 0.0.0.1
      </Typography>
      <Typography align="center" variant="subtitle2" className={classes.footer2}>
      2021 Luvimo Industries
      </Typography>
      
    </div>
  );
}