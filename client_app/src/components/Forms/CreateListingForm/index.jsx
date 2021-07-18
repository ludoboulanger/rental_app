import {React} from "react";
import { useFormik} from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Button, Card, CardContent, CardHeader, Chip,
  InputAdornment,
  MenuItem, TextField, useTheme,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ImageUploader from "../../ImageUploader";
import FormikTextField from "../FormikTextField";
import ChipInput from "material-ui-chip-input";
const MAX_NAME_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 256;
const MAX_TAGS = 5;
const useStyles = makeStyles(theme =>(
  {
    paper: {
      margin: "12px auto",
      padding: "25px",
      maxWidth: "700px",
      justifySelf: "center",
    },
    form: {
      "& > *":{
        marginBottom:theme.spacing(2)
      }
    },
    errorText: {
      color: theme.palette.error.main + " !important"
    }

  }
));

export default function CreateListingForm(){
  const theme = useTheme();
  const classes = useStyles();
  const {t} = useTranslation(["Forms", "Global"]);
  const categories = [t("Global:Categories.sport"), t("Global:Categories.tools"), t("Global:Categories.entertainment"), t("Global:Categories.other")];



  //TODO: check to get this out of component. Maybe transform into a hook?
  const validationSchema = yup.object().shape({
    name: yup.string().max(MAX_NAME_LENGTH, t("Forms:fieldValueIsTooLong",
      {fieldName: t("Forms:CreateListingForm.itemName"), max: MAX_NAME_LENGTH})).required(t("Forms:requiredField")),
    description: yup.string().max(MAX_DESCRIPTION_LENGTH,  t("Forms:fieldValueIsTooLong",
      {fieldName: t("Forms:CreateListingForm.itemDescription"), max: MAX_DESCRIPTION_LENGTH})).required(t("Forms:requiredField")),
    category : yup.string().required(t("Forms:requiredField")),
    price : yup.number().positive().required("Forms:requiredField"),
    tags: yup.array().ensure().of(yup.string().lowercase().matches(/^[a-z0-9\\-]+$/, t("Forms:invalidCharacters"))),
    pictures: yup.array().ensure()
  });

  const formik = useFormik({
    initialValues: {
      name :"",
      description: "",
      category:"",
      price: 0,
      tags:[],
      pictures :[]
    },
    validationSchema: validationSchema,
    onSubmit:(values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  function addTag(tag){
    if(formik.values.tags.length < 5){
      formik.setFieldValue("tags", formik.values.tags.concat(tag));
    }
  }
  function removeTag(tag){
    formik.setFieldValue("tags", formik.values.tags.filter((t)=> t !== tag));
  }

  const tagErrorText = Boolean(formik.errors.tags) && formik.touched.tags && String(formik.errors.tags.filter(error=> error !== ""));



  return (
    <Card  className={classes.paper} >
      <CardHeader title={t("Forms:CreateListingForm.title")}/>
      <CardContent>
        <form onSubmit={formik.handleSubmit} autoComplete={"off"} className={classes.form}>
          <ImageUploader onPicturesChanged={pictures => formik.values.pictures = pictures}/>
          <FormikTextField
            id="name"
            name="name"
            label={t("Global:name")}
            fullWidth
            variant="outlined"
            color={"primary"}
            formik={formik}
          />
          <FormikTextField
            id="description"
            name="description"
            label={t("Global:description")}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            formik={formik}
          />
          <FormikTextField
            select
            id="category"
            name="category"
            label={t("Global:category")}
            formik={formik}
            fullWidth
          >
            {categories.map(categoryName => <MenuItem key={categoryName} value={categoryName}>{categoryName}</MenuItem>)}
          </FormikTextField>
          <FormikTextField  id="price"
            name="price"
            label={t("Global:price")}
            variant="outlined"
            fullWidth
            type={"number"}
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
            formik={formik}/>
          <ChipInput classes={{helperText: tagErrorText ? classes.errorText : undefined, label: tagErrorText ? classes.errorText : undefined }} value={formik.values.tags} helperText={tagErrorText || t("Forms:CreateListingForm.tagsHelperText", {max: MAX_TAGS})} onAdd={addTag} onDelete={removeTag} newChipKeys={["Enter", " "]} fullWidth label={(t("Global:tags"))}
            chipRenderer={ ({ text, isFocused, handleClick, handleDelete, className }, key) => (
              <Chip
                key={key}
                className={className}
                style={{
                  backgroundColor: isFocused ? theme.palette.primary.light : undefined
                }}
                onClick={handleClick}
                onDelete={handleDelete}
                label={text}
              />
            )}/>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {t("Global:Submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
