import React from 'react';
import FormTextField from './FormTextField';

const EmailInput = (props)=>{
  return (
    <FormTextField {...props} name="email" label="Email address"/>
  );
}

export default EmailInput;