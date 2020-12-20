import React from "react";

import { useLocation } from "react-router-dom";
import { getUrlParams } from "utils/global";

import { Verification as Validation } from "validation/verificationCode";
import SimpleForm from "components/SimpleForm/SimpleForm";
import EmailInput from "components/FormTextField/EmaiInput";
import CustomTextInput from "components/FormTextField/CustomTextInput";
import FormBtn from "components/FormBtn/FormBtn";

import useAuth from "hooks/useAuth";

function VeryficationPage() {
  const location = useLocation();

  const { lockAuthApp, verifyEmail } = useAuth();

  const {email = '', code = ''} = getUrlParams(location);

  function submit(values) {
    verifyEmail(values);
  }

  return (
    <SimpleForm
      submit={submit}
      validation={Validation}
      title="Email verification to finish registration with Fit Trainer App"
      subTitle="Please, confirm Email address"
      vals={{email, verificationCode: code}}
      isLoading={lockAuthApp}
    >
      <EmailInput disabled />
      <CustomTextInput name="verificationCode" label="Verification Code" />
      <FormBtn type="submit">Verify email</FormBtn>
    </SimpleForm>
  );
}

export default VeryficationPage;