import {React} from "react";
import LibChipInput from "material-ui-chip-input";
import {Chip, useTheme} from "@material-ui/core";
import PropTypes from "prop-types";

ChipInput.propTypes = {
  chipColor: PropTypes.string
};

export default function ChipInput({chipColor: focusedChipColor, ...props}){
  const theme = useTheme();
  const defaultChipColor = theme.palette.primary.main;

  return(
    <LibChipInput
      chipRenderer={ ({ text, isFocused, handleClick, handleDelete, className }, key) => (
        <Chip
          key={key}
          className={className}
          style={{
            backgroundColor: isFocused ?  focusedChipColor || (defaultChipColor) : undefined
          }}
          onClick={handleClick}
          onDelete={handleDelete}
          label={text}
        />

      )}
      {...props}/>
  );
}
