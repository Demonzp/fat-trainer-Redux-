import React from 'react';
import FormTextField from './FormTextField';

const PasswordInput = (props)=>{

  return (
    <FormTextField {...props} name="password" label="Password" type="password"/>
  );
}

export default PasswordInput;