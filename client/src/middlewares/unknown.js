import React from "react";
import {Route, Redirect} from "react-router-dom";

import useAuth from "hooks/useAuth";
import Spinner from "components/Spinner";
import RoutNames from "../constants/routNames";

const UnknownRoute = ({...rest})=> {
  const { authAttempted, user } = useAuth();

  return (
    <Route
      {...rest}
        children={({ location }) => (
          authAttempted
          ?
          (
            user
            ?
            <Redirect
              to={{
                pathname: RoutNames.dashboard,
                state: { from: location }
              }}
            />
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

export default UnknownRoute;