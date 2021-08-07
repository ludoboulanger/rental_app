import { React, useEffect, useRef, useState } from "react";
import { ButtonBase, useTheme } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    border: "2px dashed",
    borderRadius: "12px",
    flexDirection: "column",
    padding: "15px",
    width: "100%",
    height: "100%"
  },
  highlight: {
    backgroundColor: alpha(theme.palette.primary.light, 0.2)
  }
}));

FileUploadButton.propTypes = {
  color: PropTypes.oneOf(["secondary", "primary"]),
  onFilesAdded: PropTypes.func.isRequired,
  children: PropTypes.node,
  fileTypes: PropTypes.string,
  className: PropTypes.string,
  component: PropTypes.elementType,
  componentProps: PropTypes.object
};

export default function FileUploadButton(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [color, setColor] = useState("");
  const [highlight, setHighlight] = useState(false);


  //Effect that set the color state based on prop
  useEffect(() => {
    if (props.color === "primary") setColor(theme.palette.primary.main);
    else if (props.color === "secondary") setColor(theme.palette.secondary.main);
    else setColor("inherit");
  }, [props.color]);

  const inputRef = useRef();

  function openFileDialog() {
    inputRef.current.click();
  }

  function onDrop(event) {
    event.preventDefault();
    setHighlight(false);
    sendFilesToParent(event.dataTransfer.files);

  }

  function sendFilesToParent(filesList) {
    const filesArray = fileListToArray(filesList);
    props.onFilesAdded(filesArray);
  }

  function onFilesAdded(event) {
    sendFilesToParent(event.target.files);
    event.target.value = "";
  }

  function onDragOver(event) {
    event.preventDefault();
    setHighlight(true);
  }

  function onDragLeave() {
    setHighlight(false);
  }

  function fileListToArray(list) {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }
  if (props.component) {
    const Component = props.component;
    return (
      <>
        <Component
          {...props.componentProps}
          id="dropZone"
          className={props.className}
          style={{ borderColor: color }}
          onClick={openFileDialog}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}>
          {props.children}
        </Component>
        <input
          ref={inputRef}
          type={"file"}
          onChange={onFilesAdded}
          multiple
          style={{ display: "none" }}
          accept={props.fileTypes}
        />
      </>);
  }
  return (
    <div className={props.className}>
      <ButtonBase
        id="dropZone"
        className={`${classes.root} ${highlight && classes.highlight}`}
        style={{ borderColor: color }}
        onClick={openFileDialog}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {props.children}
      </ButtonBase>
      <input
        ref={inputRef}
        type={"file"}
        onChange={onFilesAdded}
        multiple
        style={{ display: "none" }}
        accept={props.fileTypes}
      />
    </div>
  );
}
