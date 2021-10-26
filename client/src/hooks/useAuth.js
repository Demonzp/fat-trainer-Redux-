import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { attemptAuth, signup, verification, signin, logOutAction } from "state/actions/auth";

const useAuth = () => {
  const { authAttempted, lockAuthApp, user, token, activRoutes } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptAuth);
  }, []);

  const register = async (data) => {
    return await dispatch(signup(data));
  };

  const verifyEmail = async (data) => {
    return await dispatch(verification(data));
  }

  const logIn = async (data) => {
    return await dispatch(signin(data));
  }

  const logOut = async () => {
    return await dispatch(logOutAction);
  }

  return {
    authAttempted,
    user,
    token,
    lockAuthApp,
    activRoutes,
    register,
    verifyEmail,
    logIn,
    logOut
  }
}

export default useAuth;