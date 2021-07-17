/* eslint-disable react/prop-types */
import React from "react";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const IntlPhoneInput = (props, ref) => {
  const { t } = useTranslation(["General"]);
  return (
    <TextField
      {...props}
      label={t("Global:phoneNumber")}
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