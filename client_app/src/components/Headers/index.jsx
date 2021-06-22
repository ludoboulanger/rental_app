import {React, useEffect, useState} from "react";
import {useMediaQuery, useTheme} from "@material-ui/core";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import PropTypes from "prop-types";

export default function Header({withSearchBar}){
  DesktopHeader.propTypes = {
    withSearchBar: PropTypes.bool
  };
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if(isMobile){
    return <MobileHeader withSearchBar={withSearchBar}/>;
  }else{
    return <DesktopHeader withSearchBar={withSearchBar}/>;
  }



}
