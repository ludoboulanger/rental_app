import {React} from "react";
import { useFormik} from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Button, Card, CardContent, CardHeader,
  InputAdornment,
  MenuItem, TextField,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ImageUploader from "../../ImageUploader";
import FormikField from "../FormikField";
import CityInputField from "../../CityInputField";
import ChipInput from "../../ChipInput";
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
    },
    submitButton: {
      marginTop: theme.spacing(2)
    }

  }
));
//TODO RENT-70: Keep data on refresh
export default function CreateListingForm(){
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
    price : yup.number().positive().required(t("Forms:requiredField")),
    tags: yup.array().ensure().of(yup.string().lowercase().matches(/^[a-z0-9\\-]+$/, t("Forms:invalidCharacters"))),
    pictures: yup.array().ensure(),
    place: yup.string().ensure().required(t("Forms:autocompleteValueNotSelected")).test("ensure-good-format", t("Forms:invalidValue"),(value)=> value.split(",").length === 3)
  });

  const formik = useFormik({
    initialValues: {
      name :"",
      description: "",
      category:"",
      price: 0,
      tags:[],
      pictures :[],
      place : ""
    },
    validationSchema: validationSchema,
    onSubmit:async ({place, ...otherValues}) => {
      const [city, area, country] = place.split(",");

      //TODO RENT-66 Don't hardcode server adress
      const rawResponse = await fetch("http://localhost:8000/api/listing", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({city, area, country, ...otherValues})
      }).catch((reason) =>alert(reason));
      const response = await rawResponse.json();
      alert(JSON.stringify(response,null,2));
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
          <FormikField
            component={TextField}
            id="name"
            name="name"
            label={t("Global:name")}
            fullWidth
            variant="outlined"
            color={"primary"}
            formik={formik}
          />
          <FormikField
            component={TextField}
            id="description"
            name="description"
            label={t("Global:description")}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            formik={formik}
          />
          <CityInputField
            onChange={(value)=>formik.setFieldValue("place", value)}
            textFieldProps={
              {
                fullWidth:true,
                error:formik.touched.place && Boolean(formik.errors.place),
                helperText: Boolean(formik.errors.place) && formik.touched.place && String(formik.errors.place)
              }
            }
          />
          <FormikField
            component={TextField}
            select
            id="category"
            name="category"
            label={t("Global:category")}
            formik={formik}
            fullWidth
            variant={"outlined"}
          >
            {categories.map(categoryName => <MenuItem key={categoryName} value={categoryName}>{categoryName}</MenuItem>)}
          </FormikField>
          <FormikField
            id="price"
            name="price"
            component={TextField}
            label={t("Global:price")}
            variant="outlined"
            fullWidth
            type={"number"}
            defaultHelperText={t("Forms:CreateListingForm.priceHelperText")}
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
            formik={formik}/>
          <ChipInput
            classes={{helperText: tagErrorText ? classes.errorText : undefined, label: tagErrorText ? classes.errorText : undefined }}
            value={formik.values.tags}
            helperText={tagErrorText || t("Forms:CreateListingForm.tagsHelperText", {max: MAX_TAGS})}
            onAdd={addTag} onDelete={removeTag}
            newChipKeys={["Enter", " "]}
            fullWidth
            label={(t("Global:tags"))}/>
          <Button color="primary" variant="contained" fullWidth type="submit" disabled={formik.isSubmitting} className={classes.submitButton}>
            {t("Global:Submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
