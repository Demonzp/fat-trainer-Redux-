import React from 'react';
import { ListItem, TextField } from "@material-ui/core";

const FormTextField = ({ name, label, handleChange, type = 'text', value, error, ...rest }) => {
  return (
    <ListItem>
      <TextField
        {...rest}
        error={error ? true : false}
        onChange={handleChange}
        name={name}
        value={value}
        label={label}
        type={type}
        helperText={error}
      />
    </ListItem>
  );
}

export default FormTextField;