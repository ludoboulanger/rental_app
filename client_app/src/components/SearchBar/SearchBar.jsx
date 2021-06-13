import {React, useRef} from "react";
import {InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import {ROUTES} from "../../utils/enums";
export default function SearchBar(){
  const classes = useStyles();
  const history = useHistory();
  const input = useRef();

  function handleSubmitSearch(){
    history.push(ROUTES.SEARCH + "?search=" + input.current.value);
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
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          inputRef={input}

        />
        <SearchIcon className={classes.searchIcon} onClick={handleSubmitSearch}/>
      </div>
    </div>
  );
}
