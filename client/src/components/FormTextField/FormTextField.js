import React from 'react';
import { ListItem, TextField } from "@material-ui/core";

const FormTextField = ({name, label, handleChange, type='text', values, errors}) => {
  return (
    <ListItem>
      <TextField
        error={errors[name] ? true : false}
        onChange={handleChange}
        name={name}
        value={values[name]}
        label={label}
        type={type}
        helperText={errors[name]}
      />
    </ListItem>
  );
}

export default FormTextField;