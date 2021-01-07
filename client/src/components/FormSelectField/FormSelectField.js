import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const styles = {
  formControl: {
    minWidth: 200,
  },
};

const useStyles = makeStyles(styles);

const FormSelectField = ({ name, label, error, value, arrValues, handleChange, ...rest }) => {
  const classes = useStyles();

  return (
    <ListItem>
      <FormControl className={classes.formControl} error={error ? true : false}>
        <InputLabel>{label}</InputLabel>
        <Select
          name="measureType"
          value={value}
          onChange={handleChange}
        >
          {value === "none" ?
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            :
            null
          }
          {arrValues.map((prop) => {
            return <MenuItem value={prop} key={prop}>{prop}</MenuItem>
          })}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </ListItem>
  );
}

export default FormSelectField;