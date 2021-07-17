/* eslint-disable react/prop-types */
import React from "react";
import { TextField } from "@material-ui/core";

const IntlPhoneInput = (props, ref) => {
  return (
    <TextField
      {...props}
      label="Phone Number" // TODO Localize
      inputRef={ref}
      size="small"
      fullWidth
      variant="outlined"
      style={{
        marginRight: "10px",
      }}
    >
    </TextField>
  );
};

export default IntlPhoneInput;