import {React} from "react";
import {TextField} from "@material-ui/core";
import PropTypes from "prop-types";

FormikTextField.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired
};

export default function FormikTextField({name, formik,...otherProps}) {

  return <TextField
    name={name}
    onChange={formik.handleChange}
    value={formik.values[name]}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={ Boolean(formik.errors[name]) && formik.touched[name] && String(formik.errors[name])}
    {...otherProps}/>;

}
