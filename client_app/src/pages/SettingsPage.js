import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ROUTES } from "../utils/enums";
import { useHistory } from "react-router";
import SettingDividers from "../components/SettingsContainer/SettingsContainer";

const useStyles = makeStyles(() => ({
  button: {
    position: "relative",
    float: "left",
    marginLeft: 35
  },
}));

export default function SettingsPage() {

  const {t} = useTranslation();
  const history = useHistory();
  
  const classes = useStyles();

  const handleBackClick = () =>{
    history.push(ROUTES.WELCOME);
  };

  return (
    <div>

      <div className={classes.button}>
        <Button variant="outlined" color="primary" onClick={handleBackClick}>
          {t("Back")}
        </Button>
      </div>

      <SettingDividers></SettingDividers>

    </div>
  );
}
