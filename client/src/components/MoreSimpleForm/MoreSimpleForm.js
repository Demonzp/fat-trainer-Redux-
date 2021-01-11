import React from "react";
import useSimpleForm from "hooks/useSimpleForm.js";
import { Grid } from "@material-ui/core";

const MoreSimpleForm = ({ handlerError = () => { }, submit, vals, validation = () => { return {} }, children, isLoading = false, direction = "column", isSubmit }) => {

  const { fields, btns, navs, handleSubmit } = useSimpleForm({ submit, vals, validation, children, isLoading, isSubmit, handlerError });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={direction} style={{ flexWrap: "nowrap" }}>
        {fields}
        {btns}
        {navs}
      </Grid>
    </form>
  );
};

export default MoreSimpleForm;