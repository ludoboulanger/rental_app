import {React, useRef} from "react";
import {IconButton, InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import {ROUTES} from "../../utils/enums";
import {useTranslation} from "react-i18next";

export default function SearchBar(){
  const classes = useStyles();
  const history = useHistory();
  const input = useRef();
  const {t} = useTranslation();

  function handleSubmitSearch(){
    history.push(ROUTES.SEARCH + "?query=" + input.current.value);
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
          color={"primary"}
          placeholder={t("Search")}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          inputRef={input}

        />
        <IconButton onClick={handleSubmitSearch}>
          <SearchIcon className={classes.searchIcon} />
        </IconButton>

      </div>
    </div>
  );
}
