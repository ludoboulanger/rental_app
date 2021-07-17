import React, { forwardRef } from "react";
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
      InputProps={{ "data-cy": "input-phone"}}
    >
    </TextField>
  );
};

export default forwardRef(IntlPhoneInput);