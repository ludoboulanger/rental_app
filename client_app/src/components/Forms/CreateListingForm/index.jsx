import {React, useMemo, useState} from "react";
import { useFormik} from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography, useTheme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FileUploadButton from "../../FileUploadButton";
import Icon from "../../Icon";
import ImageUploader from "../../ImageUploader";

const MAX_NAME_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 256;
const MAX_TAGS = 5;
const categories = ["Sport", "Tools", "Entertainment", "Other"];
const useStyles = makeStyles((
  {
    paper: {
      margin: "15px",
      padding: "25px"
    },
  }
));

export default function CreateListingForm(){
  const classes = useStyles();
  const {t} = useTranslation(["Forms", "Global"]);
  const theme = useTheme();
  const [pictures, setPictures] = useState([]);



  //TODO: check to get this out of component. Maybe transform into a hook?
  const validationSchema = yup.object().shape({
    name: yup.string().max(MAX_NAME_LENGTH, t("Forms:fieldValueIsTooLong",
      {fieldName: t("Forms:CreateListingForm.itemName"), max: MAX_NAME_LENGTH})).required(t("Forms:requiredField")),
    description: yup.string().max(MAX_DESCRIPTION_LENGTH,  t("Forms:fieldValueIsTooLong",
      {fieldName: t("Forms:CreateListingForm.itemDescription"), max: MAX_DESCRIPTION_LENGTH})).required(t("Forms:requiredField")),
    category : yup.string().required("Forms:requiredField"),
    price : yup.number().positive().required("Forms:requiredField"),
    tags: yup.array().ensure().max(MAX_TAGS, t("Forms:CreateListingForm.tooManyTags", {max: MAX_TAGS})).of(yup.string().lowercase().matches(/[a-z0-9\\-]+/))
  });

  const formik = useFormik({
    initialValues: {
      name :"",
      description: "",
      category:"" ,
      price: 0,
      tags:[]
    },
    validationSchema: validationSchema,
    onSubmit:(values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <Paper elevation={3} className={classes.paper}>
      <form onSubmit={formik.handleSubmit} autoComplete={"off"}>
        <ImageUploader />
        <TextField
          id="name"
          name="name"
          label={t("Global:name")}
          fullWidth
          variant="outlined"
          color={"primary"}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        <TextField
          id="description"
          name="description"
          label={t("Global:description")}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
        />
        <FormControl>
          <TextField
            select
            id="category"
            name="category"
            label={t("Global:category")}
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            {categories.map(categoryName => <MenuItem key={categoryName} value={categoryName}>{categoryName}</MenuItem>)}
          </TextField>
        </FormControl>
        <TextField  id="price"
          name="price"
          label={t("Global:price")}
          variant="outlined"
          fullWidth
          type={"number"}
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
          }}
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}>

        </TextField>
        <Button color="primary" variant="contained" fullWidth type="submit">
          {t("Global:Submit")}
        </Button>
      </form>
    </Paper>
  );
}
