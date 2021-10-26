import React from "react";

import { useHistory } from "react-router-dom";

import { Registration as Validation } from "validation/registration";
import RoutNames from "../constants/routNames";
import CustomTextInput from "components/FormTextField/CustomTextInput";

import SimpleForm from "components/SimpleForm/SimpleForm";
import EmailInput from "components/FormTextField/EmaiInput";
import PasswordInput from "components/FormTextField/PasswordInput";
import FormBtn from "components/FormBtn/FormBtn";
import FormNavLink from "components/FormNavLink/FormNavLink";

import useAuth from "hooks/useAuth";


function SignupPage() {
  const history = useHistory();

  const { lockAuthApp, register } = useAuth();

  function submit(values) {
    register(values)
      .then((data) => {
        console.log('data = ', data);
        history.push(`${RoutNames.verification}?email=${values.email}&code=${data.code}`);
      });
  }

  return (
    <SimpleForm
      submit={submit}
      validation={Validation}
      title="Register whis Fir Trainer App"
      subTitle="Please, enter your email and password"
      vals={{email: '', password: '', confirmPassword: ''}}
      isLoading={lockAuthApp}
    >
      <EmailInput />
      <PasswordInput />
      <CustomTextInput name="confirmPassword" label="Repeat password" type="password" />
      <FormBtn type="submit">Sign up</FormBtn>
      <FormNavLink
        to={RoutNames.login}
      >already have an accaunt? sign-in</FormNavLink>
    </SimpleForm>
  );
}

export default SignupPage;