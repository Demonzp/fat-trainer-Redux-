import MsgTypes from "../constants/msgTypes";
import { useSelector, useDispatch } from "react-redux";
import { registerReq, loginReq, verifyEmailReq, attemptReq } from "services/auth";
import { attempt, setLockAuthApp } from "state/actions/auth";
import { addMessage } from "state/actions/msg";

const useAuth = () => {
  const { authAttempted, lockAuthApp, user, token, activRoutes } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const _setUser = (newUser) => {
    dispatch(attempt({
      user: newUser,
      token: newUser.token
    }));

    localStorage.setItem('token', newUser.token);

    dispatch(addMessage({ type: MsgTypes.success, txt: `Hello, ${newUser.email}!` }));
  }

  const _setGuest = () => {
    dispatch(attempt({
      user: null,
      token: null
    }));
  }

  const initAuth = async () => {
    let t_token = localStorage.getItem('token');

    if(t_token){
      try {
        const resData = await attemptReq(t_token);
        if(!resData.email){
          throw new Error('Something went wrong...!');
        }
        _setUser({email:resData.email, token:t_token});
        return resData;
      } catch (error) {
        localStorage.clear();
        console.error(error);
      }
    }

    _setGuest();
  }

  const _handlerError = (error)=>{
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }

  const register = async (data) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await registerReq(data);
      dispatch(addMessage({ type: MsgTypes.success, txt: `${resData} Please verify your email!` }));
      return resData;
    } catch (error) {
      _handlerError(error);
    }
  }

  const logIn = async (data) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await loginReq(data);
      return _setUser({ email: data.email, token: resData.token });
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
      _setUser({ email: data.email, token: resData.token });
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