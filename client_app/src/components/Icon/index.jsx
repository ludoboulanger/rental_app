import {React} from "react";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/ChatBubble";
import PropTypes from "prop-types";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/FavoriteOutlined";
import AccountIcon from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/AddCircleOutlined";
import SearchIcon from "@material-ui/icons/Search";
import SettingIcon from "@material-ui/icons/Settings";
import * as assert from "assert";
import AddToPhotos from "@material-ui/icons/AddToPhotos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const iconMap = {
  close: CloseIcon,
  chat : ChatIcon,
  home : HomeIcon,
  heart : FavoriteIcon,
  account : AccountIcon,
  create : CreateIcon,
  setting : SettingIcon,
  search : SearchIcon,
  addContent: AddToPhotos,
  back: ArrowBackIcon,
};


Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconMap))
};
export default function Icon({name, ...otherProps}){
  assert(Object.keys(iconMap).includes(name));
  const Icon = iconMap[name];

  return (<Icon {...otherProps}/>);
}
