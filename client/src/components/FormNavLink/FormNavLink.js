import React from 'react';
import { NavLink } from "react-router-dom";
import { ListItem } from "@material-ui/core";

const FormNavLink = ({to, children}) => {
  return (
    <ListItem>
      <NavLink
        to={to}
      >
        {children}
      </NavLink>
    </ListItem>
  );
}

export default FormNavLink;