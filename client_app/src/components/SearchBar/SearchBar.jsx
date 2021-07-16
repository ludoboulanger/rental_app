import {React,  useState} from "react";
import {IconButton, InputBase} from "@material-ui/core";

import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import {ROUTES} from "../../utils/enums";
import {useTranslation} from "react-i18next";
import {getURLWithParams} from "../../utils/queries";
import Icon from "../Icon";

export default function SearchBar(){
  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState("");
  const {t} = useTranslation(["Global"]);

  function handleSubmitSearch(){
    const params = {
      query: input,
    };
    history.push(getURLWithParams(ROUTES.SEARCH, params));
  }

  return(
    <div className={classes.search}>
      <div className={classes.searchContent}>
        <InputBase
          onKeyPress={(event => {
            if(event.key === "Enter")
            {
              handleSubmitSearch();
            }
          })}
          onChange={(event)=> { setInput(event.target.value);}}
          color={"primary"}
          placeholder={t("Global:search")}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton onClick={handleSubmitSearch}>
          <Icon name={"search"} className={classes.searchIcon} />
        </IconButton>

      </div>
    </div>
  );
}
