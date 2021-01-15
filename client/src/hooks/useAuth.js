import { useEffect } from "react";
import MsgTypes from "../constants/msgTypes";
import { useSelector, useDispatch } from "react-redux";
import { registerReq, loginReq, verifyEmailReq, attemptReq } from "services/auth";
import { setToken, attempt, setLockAuthApp } from "state/actions/auth";
import { addMessage } from "state/actions/msg";
import useExercise from "./useExercise";
import useWorkouts from "./useWorkoutes";


let goForUser = false;

const useAuth = () => {
  const { authAttempted, lockAuthApp, user, token, activRoutes, dataLoaded } = useSelector(state => state.auth);
  const {setExercises} = useExercise();
  const {setWorkouts} = useWorkouts();

  const dispatch = useDispatch();

  const _setToken = (token) => {
    dispatch(setToken(token));

    localStorage.setItem('token', token);
  }

  const _setUser = ({user, token}) => {
    console.log('user = ', user);
    dispatch(attempt({
      user,
      token,
      dataLoaded: true
    }));
    setExercises(user.exercises);
    setWorkouts(user.workouts);
    dispatch(addMessage({ type: MsgTypes.success, txt: `Hello, ${user.email}!` }));
  }

  const _setGuest = () => {
    dispatch(attempt({
      user: null,
      token: null,
      dataLoaded: false
    }));
  }

  const initAuth = async (token) => {
    let t_token = localStorage.getItem('token');

    if(token){
      t_token = token;
    }

    if (t_token) {
      try {
        const resData = await attemptReq(t_token);
        if (!resData.email) {
          throw new Error('Something went wrong...!');
        }
        _setUser({user:resData, token:t_token});
        return resData;
      } catch (error) {
        localStorage.clear();
        console.error(error);
      }
    }
    goForUser = false;
    _setGuest();
  }

  useEffect(() => {
    if (token && !user && !goForUser) {
      goForUser = true;
      initAuth(token);
    }
  }, [token, user]);

  const _handlerError = (error) => {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }

  const register = async (data) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await registerReq(data);
      dispatch(addMessage({ type: MsgTypes.success, txt: `${resData.message} Please verify your email!` }));
      dispatch(setLockAuthApp(false));
      return resData;
    } catch (error) {
      _handlerError(error);
    }
  }

  const logIn = async (data) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await loginReq(data);
      _setToken(resData.signedToken);
      return resData;
    } catch (error) {
      _handlerError(error);
    }
  }

  const logOut = async () => {
    dispatch(setLockAuthApp(true));
    localStorage.clear();
    _setGuest();
    dispatch(addMessage({ type: MsgTypes.info, txt: `We hope you will be back soon` }));
    return true;
  }

  const verifyEmail = async (data) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await verifyEmailReq(data);
      dispatch(addMessage({ type: MsgTypes.success, txt: resData.message }));
      _setToken(resData.signedToken);
      return resData;
    } catch (error) {
      _handlerError(error);
    }

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
    activRoutes,
    verifyEmail
  }
}

export default useAuth;