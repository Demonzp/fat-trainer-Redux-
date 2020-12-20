import React from 'react';
import Button from "components/CustomButtons/Button.js";
import { ListItem } from "@material-ui/core";

const FormBtn = ({ type = "button", fn = () => { }, isLoading, children }) => {
  return (
    <ListItem>
      <Button 
        color="primary"
        disabled={isLoading ? true : false}
        type={type}
        onClick={fn}
      >{isLoading ? "loading..." : children}</Button>
    </ListItem>
  );
}

export default FormBtn;