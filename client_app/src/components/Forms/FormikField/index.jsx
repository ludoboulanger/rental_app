import {React} from "react";
import PropTypes from "prop-types";

FormikField.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  component: PropTypes.elementType,
  defaultHelperText: PropTypes.string
};
/**
 * This component is used to avoid boiler plate code when creating fields for a form
 * @param name field's name, as it is defined in the formik
 * @param formik
 * @param component the component to render
 * @param defaultHelperText the helper text to show when there is no errors
 * @param otherProps
 */
export default function FormikField({name, formik, component, defaultHelperText, ...otherProps}) {
  const Component = component;
  const errorText = Boolean(formik.errors[name]) && formik.touched[name] && String(formik.errors[name]);
  return <Component
    name={name}
    onChange={formik.handleChange}
    value={formik.values[name]}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={errorText || defaultHelperText }
    {...otherProps}/>;

}
