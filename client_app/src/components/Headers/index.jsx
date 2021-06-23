import {React, useEffect, useState} from "react";
import {useMediaQuery, useTheme} from "@material-ui/core";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import PropTypes from "prop-types";
Header.propTypes = {
  withSearchBar: PropTypes.bool
};

export default function Header({withSearchBar}){

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if(isMobile){
    return <MobileHeader withSearchBar={withSearchBar}/>;
  }else{
    return <DesktopHeader withSearchBar={withSearchBar}/>;
  }



}
