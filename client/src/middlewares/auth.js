import React from "react";
import {Route, Redirect} from "react-router-dom";

import useAuth from "hooks/useAuth";
import Spinner from "components/Spinner";
import RoutNames from "../constants/routNames";

const AuthRoute = ({component:Component, ...rest})=> {
  const { authAttempted, user } = useAuth();

  return (
    <Route
      children={({ location }) => (
      authAttempted
      ?
      (
        user
        ?
        <Component {...rest}/>
        :
        <Redirect
          to={{
            pathname: RoutNames.login,
            state: { from: location }
          }}
        />
      )
      :
      <Spinner gorizont="center"/>
      )}
    />
  );
}

export default AuthRoute;