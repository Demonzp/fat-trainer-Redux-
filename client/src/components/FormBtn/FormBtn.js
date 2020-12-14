import React from 'react';
import Button from "components/CustomButtons/Button.js";
import { ListItem } from "@material-ui/core";

const FormBtn = ({ type = "button", fn = () => { }, children }) => {
  return (
    <ListItem>
      <Button 
        color="primary" 
        type={type}
        onClick={fn}
      >{children}</Button>
    </ListItem>
  );
}

export default FormBtn;