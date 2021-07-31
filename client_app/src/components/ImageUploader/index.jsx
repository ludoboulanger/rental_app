import {React, useEffect, useState} from "react";
import Cropper from "react-easy-crop";
import Icon from "../Icon";
import {
  AppBar, Badge,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import FileUploadButton from "../FileUploadButton";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {getCroppedImage} from "../../utils/Images";

const useStyles = makeStyles(theme =>(
  {
    badge: {
      cursor: "pointer",
      margin: "0px 10px",
      width:"300px",
      height:"300px",
    },
    imagesContainer:{
      display: "flex",
      overflowX: "auto",
      paddingTop:10,
      "&::-webkit-scrollbar":
        {
          height : 12,
        },
      "&::-webkit-scrollbar-thumb":
        {
          borderRadius: 10,
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,.3)",
          backgroundColor: "rgba(138,138,138,0.5)"
        }
    },
    imageUploadButton: {
      minWidth: 300,
      height: 300,
      flexGrow: 1
    },
    image: {
      objectFit:"cover",
    },
    cropper: {
      position : "relative !important",
      width: "60vw",
      height: "50vh",
      [theme.breakpoints.down("sm")]:{
        width: "100vw"
      }
    }
  }
));

ImageUploader.propTypes = {
  title: PropTypes.string,
  onPicturesChanged : PropTypes.func.isRequired
};

export default function ImageUploader(props){
  const classes = useStyles();
  const {t} = useTranslation(["Global","ImageUploader"]);
  const theme = useTheme();
  const [pictures, setPictures] = useState([]);
  const [croppedPictures, setCroppedPictures] = useState([]);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [currentCropedArea, setCurrentCropedArea] = useState();
  const [picturesToCrop, setPicturesToCrop] = useState([]);
  const [openCropper, setOpenCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const isMobile = useMediaQuery( theme.breakpoints.down("sm"));
  const DEFAULT_TITLE = t("ImageUploader:picturesResizingDialogTitle");
  const title = isMobile ? <AppBar>{props.title || DEFAULT_TITLE}</AppBar> : <DialogTitle>{props.title || DEFAULT_TITLE}</DialogTitle>;

  function revokeAllPicturesURL(){
    pictures.forEach(picture => URL.revokeObjectURL(picture));
    picturesToCrop.forEach(picture => URL.revokeObjectURL(picture));
    croppedPictures.forEach(picture => URL.revokeObjectURL(picture));
    setCroppedPictures([]);
  }

  useEffect(() => {
    return(revokeAllPicturesURL);
  },[]);

  useEffect(() => {
    props.onPicturesChanged(pictures);
  }, [pictures]);

  function onPicturesAdded(newPictures){
    setCroppedPictures([]);
    setCurrentPictureIndex(0);
    resetCrop();
    setPicturesToCrop(newPictures.map(picture => URL.createObjectURL(picture)));
    setOpenCropper(true);
  }

  function onCropComplete (croppedArea, croppedAreaPixels) {
    setCurrentCropedArea(croppedAreaPixels);
  }

  async function onConfirm(){
    const lastPicture = await doCrop(picturesToCrop[currentPictureIndex], currentCropedArea);
    setOpenCropper(false);
    setPictures(pictures.concat(croppedPictures, lastPicture));
    picturesToCrop.forEach(picture =>  URL.revokeObjectURL(picture));
  }

  async function onNext(){
    const croppedPicture = await doCrop(picturesToCrop[currentPictureIndex], currentCropedArea);
    setCurrentPictureIndex(currentPictureIndex + 1);
    resetCrop();
    setCroppedPictures(croppedPictures.concat(croppedPicture));
  }

  function onBack(){
    const newCroppedPictures = [...croppedPictures];
    newCroppedPictures.pop();
    setCroppedPictures(newCroppedPictures);
    resetCrop();
    setCurrentPictureIndex(currentPictureIndex - 1);
  }

  function resetCrop(){
    setCrop({x:0,y:0});
    setZoom(1);
  }

  async function doCrop(pictureUrl, croppedArea){
    try {
      return await getCroppedImage(pictureUrl, croppedArea);
    }catch(e){
      //TODO show error dialog
      console.error(e);
    }
  }

  function onDeletePictureClick(picture){
    const newPictures = pictures.filter(p => p !== picture);
    setPictures(newPictures);
    URL.revokeObjectURL(picture);
  }

  return(
    <>
      <div className={classes.imagesContainer}>
        {/*TODO RENT-65 Add image viewer on click on image*/}
        {pictures.map((picture, index) => <Badge className={classes.badge} key={`badge${index}`} color={"primary"} badgeContent={"X"} onClick={()=>onDeletePictureClick(picture)}><img key={`picture${index}`} className={classes.image} src={picture}/></Badge>)}
        {!isMobile && <FileUploadButton className={classes.imageUploadButton} color={"primary"} onFilesAdded={onPicturesAdded} fileTypes={"image/*"}>
          <Icon name={"addContent"} color="primary"/>
          <Typography color="primary" >{t("ImageUploader:addPictures")}</Typography>
        </FileUploadButton>}
      </div>
      {isMobile && <FileUploadButton component={Button} componentProps={{variant:"outlined", endIcon:<Icon name={"addContent"}/>, color:"primary"}} color={"primary"} onFilesAdded={onPicturesAdded} fileTypes={"image/*"}>
        {t("ImageUploader:addPictures")}
      </FileUploadButton>}
      <Dialog open={openCropper} maxWidth={false} fullScreen={isMobile}>
        {title}
        <span style={{flexGrow:1}}/>
        <Cropper classes={{containerClassName:classes.cropper}} image={picturesToCrop[currentPictureIndex]}  crop={crop}
          zoom={zoom} onCropChange={setCrop} onZoomChange={setZoom} aspect={1} onCropComplete={onCropComplete}/>
        <span style={{flexGrow:1}}/>
        <DialogActions>
          {currentPictureIndex > 0 ?
            <Button color={"secondary"} variant={"contained"} onClick={onBack}>{t("Global:back")}</Button> : <></>}
          {currentPictureIndex === picturesToCrop.length - 1 ?
            <Button color={"primary"} variant={"contained"} onClick={onConfirm}>{t("Global:confirm")}</Button> :
            <Button color={"primary"} variant={"contained"} onClick={onNext}>{t("Global:next")}</Button>}
        </DialogActions>
      </Dialog>

    </>
  );
}
