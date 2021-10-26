import MsgTypes from "constants/msgTypes";
import routes from "routes.js";
import { registerReq, verifyEmailReq, attemptReq, loginReq } from "services/auth";
import { AUTH_CHANGE, SET_TOKEN, ROUTES_CHANGE, SET_LOCK_AUTH_APP } from "state/reducers/auth";
import { loadedEx } from "./exercise";
import { addMessage } from "./msg";
import { fetchWorkouts } from "./workout";

const _getAuthRoutes = () => {
  return routes.filter((rout) => rout.middelware === 'guest');
}
const _getDashboardRoutes = () => {
  return routes.filter((rout) => rout.middelware === 'auth');
}

const _setToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
  localStorage.setItem('token', token);
  dispatch(setLockAuthApp(false));
}

const _setGuest = (dispatch) => {
  localStorage.clear();
  dispatch({ type: ROUTES_CHANGE, payload: _getAuthRoutes() });
  dispatch({ type: AUTH_CHANGE, payload: { user: null, token: null } });
};

const _setUser = (user, token) => (dispatch) => {
  dispatch({ type: ROUTES_CHANGE, payload: _getDashboardRoutes() });
  dispatch({ type: AUTH_CHANGE, payload: { user, token } });
  dispatch(fetchWorkouts(user.workouts));
  dispatch(loadedEx(user.exercises));
  dispatch(addMessage({ type: MsgTypes.success, txt: `Hello, ${user.email}` }));
}


const _getCurrentUser = (token) => async (dispatch) => {
  try {
    if (!await dispatch(isCan)) {
      return;
    }
    const currentUser = await attemptReq(token);
    dispatch(_setUser(currentUser, token));
    return currentUser;
  } catch (error) {
    throw error;
  }
};

export const isCan = async (dispatch, getState) => {
  const lockAuthApp = getState().auth.lockAuthApp;

  if (lockAuthApp) {
    return false;
  }
  dispatch({ type: SET_LOCK_AUTH_APP, payload: true });

  return true;
};

export const attemptAuth = async (dispatch, getState) => {
  try {
    const localToken = localStorage.getItem('token');
    const user = getState().auth.user;
    const authAttempted = getState().auth.authAttempted;

    if (!localToken || user || authAttempted) {
      if ((!localToken && !user) || (!user && authAttempted)) {
        dispatch(_setGuest);
      }
      return;
    }

    await dispatch(_getCurrentUser(localToken));
  } catch (error) {
    if (error.message !== "Unauthorized") {
      dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    }
    dispatch(_setGuest);
  }
};

export const signup = (data) => async (dispatch) => {
  try {

    if (!await dispatch(isCan)) {
      return;
    }

    const resData = await registerReq(data);

    dispatch(setLockAuthApp(false));
    return resData;
  } catch (error) {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }

};

export const signin = (data) => async (dispatch) => {
  try {

    if (!await dispatch(isCan)) {
      return;
    }
    const resData = await loginReq(data);
    dispatch(_setToken(resData.signedToken));
    await dispatch(_getCurrentUser(resData.signedToken));
  } catch (error) {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }
};

export const verification = (data) => async (dispatch) => {
  try {
    if (!await dispatch(isCan)) {
      return;
    }

    const resData = await verifyEmailReq(data);
    dispatch(_setToken(resData.signedToken));
    await dispatch(_getCurrentUser(resData.signedToken));
  } catch (error) {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }
};

export const logOutAction = async(dispatch)=>{
  try {
    dispatch(setLockAuthApp(true));
    dispatch(_setGuest);
    dispatch(addMessage({ type: MsgTypes.info, txt: `We hope you will be back soon` }));
    dispatch(setLockAuthApp(false));
    return true;
  } catch (error) {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }
};

export const setLockAuthApp = (status) => (dispatch) => {
  dispatch({
    type: SET_LOCK_AUTH_APP,
    payload: status
  });
};