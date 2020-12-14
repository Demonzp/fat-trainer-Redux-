import { useSelector, useDispatch } from "react-redux";
import {attempt, setLockAuthApp} from "state/actions/auth";

const useAuth = () => {
  const { authAttempted, lockAuthApp, user, token, activRoutes } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const _setUser = (user) => {
    dispatch(attempt({
      user: user,
      token: user.token
    }));
  }

  const _setGuest = () => {
    dispatch(attempt({
      user: null,
      token: null
    }));
  }

  const initAuth = () => {
    let t_token = localStorage.getItem('token');

    dispatch(setLockAuthApp(true));
    _setGuest();

  }

  const register = async (data) => {

  }

  const logIn = async (data) => {

  }

  const logOut = async () => {

  }

  return {
    authAttempted,
    user,
    token,
    lockAuthApp,
    logIn,
    initAuth,
    logOut,
    register,
    activRoutes
  }
}

export default useAuth;