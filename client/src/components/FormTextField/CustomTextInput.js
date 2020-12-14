import React from 'react';
import FormTextField from './FormTextField';

const CustomTextInput = ({name="input", label="text input", ...rest})=>{

  return (
    <FormTextField {...rest} name={name} label={label}/>
  );
}

export default CustomTextInput;