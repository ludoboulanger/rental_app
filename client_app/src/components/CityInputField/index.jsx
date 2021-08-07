import {React, useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {TextField} from "@material-ui/core";
import {getURLWithParams} from "../../utils/queries";
import PropTypes from "prop-types";
const MIN_LETTERS_TO_FETCH = 2;

CityInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  textFieldProps: PropTypes.object
};

//TODO RENT-68 Choices should be sorted by relevance based on user's IP location
/**
 *
 * @param onChange
 * @param textFieldProps
 * @returns {JSX.Element}
 * @constructor
 */
export default function CityInputField({onChange, textFieldProps}){
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const {t} = useTranslation(["Global"]);

  async function fetchOptions(value) {
    //TODO RENT-66 Don't hardcode server adress
    return fetch(getURLWithParams("http://localhost:8000/api/location/search", {
      name_startsWith: value,
      featureClass: "P",
      sortBy: "relevance"
    })).then((response) => response.json());

  }

  async function updateOptions(value){
    if(value.length >= MIN_LETTERS_TO_FETCH) {
      const result = await fetchOptions(value);
      if (Array.isArray(result)) {
        setOptions(result.map(place => `${place.placeName}, ${place.adminName}, ${place.countryName}`));
      }
    }else{
      setOptions([]);
    }
  }

  function handleChange(event){
    setValue(event.target.value);
    updateOptions(event.target.value);
  }
  return(
    <Autocomplete
      autoComplete
      onChange={(event,value,reason)=>onChange(value)}
      onInputChange={handleChange}
      clearOnBlur={false}
      options={options}
      filterOptions={(x) => x}
      renderInput = {(params) =>
        <TextField
          label={t("Global:city")}
          variant={"outlined"}
          {...textFieldProps}
          {...params}
          value={value}
          inputProps={{
            ...textFieldProps?.inputProps, 
            ...params.inputProps, 
            autoComplete:"new-password"  // new-passord is kind of a hack to disable autocomplete and autofill
          }}
        />
      }
    />
  );
}
