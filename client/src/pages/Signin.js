import React from "react";

import RoutNames from "../constants/routNames";

import SimpleForm from "components/SimpleForm/SimpleForm";
import EmailInput from "components/FormTextField/EmaiInput";
import PasswordInput from "components/FormTextField/PasswordInput";
import FormBtn from "components/FormBtn/FormBtn";
import FormNavLink from "components/FormNavLink/FormNavLink";

import { Login as Validation } from "validation/login";
import useAuth from "hooks/useAuth";

function SigninPage() {

  const { lockAuthApp, logIn } = useAuth();

  // const [historyVals, setHistoryVals] = useState({
  //   email: '', password: ''
  // });

  function submit(values) {
    //setHistoryVals(values);
    logIn(values);
  }

  return (
    <SimpleForm
      submit={submit}
      validation={Validation}
      title="Sign intro Fit Trainer App"
      subTitle="Please, enter your email and password"
      vals={{email: '', password: ''}}
      isLoading={lockAuthApp}
    >
      <EmailInput />
      <PasswordInput />
      <FormBtn type="submit">Sign in</FormBtn>
      <FormNavLink
        to={RoutNames.registration}
      >first time user? sign-up</FormNavLink>
    </SimpleForm>
  );
}

export default SigninPage;