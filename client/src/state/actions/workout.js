import { editReq } from "services/workout";
import { createReq } from "services/workout";
import { ADD_WORKOUT, EDIT_WORKOUT, FETCH_WORKOUTS } from "state/reducers/workout";
import MsgTypes from "../../constants/msgTypes";
import { isCan, setLockAuthApp } from "./auth";
import { addMessage } from "./msg";

const _handlerError = (error) => (dispatch) => {
  dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
  dispatch(setLockAuthApp(false));
  throw error;
}

const _asyncAction = async (dispatch, getState)=>{
  try {
    if(!await dispatch(isCan)){
      throw new Error('application is busy');
    }

    const token = getState().auth.token;

    if(!token){
      throw new Error('Unauthorized');
    }else{
      return token;
    }

  } catch (error) {
    throw error;
  }
}

const addWorkout = (workout) => async (dispatch) => {
  try {
    const token = await dispatch(_asyncAction);

    const resData = await createReq({ token, data: workout });
    dispatch({ type: ADD_WORKOUT, payload:resData.workout });
    dispatch(addMessage({ type: MsgTypes.success, txt: `workout: '${resData.workout._id}' has been create!` }));
    dispatch(setLockAuthApp(false));
  } catch (error) {
    dispatch(_handlerError(error));
  }
}

const fetchWorkouts = (workouts)=>(dispatch)=>{
  dispatch({type: FETCH_WORKOUTS, payload:workouts});
}

const editWorkout = (workout)=> async (dispatch)=>{
  try {
    const token = await dispatch(_asyncAction);
    
    const resData = await editReq({ token, data: workout });
    dispatch({ type: EDIT_WORKOUT, payload:resData });
    dispatch(addMessage({ type: MsgTypes.success, txt: `workout: '${workout._id}' has been change!` }));
    dispatch(setLockAuthApp(false));
  } catch (error) {
    dispatch(_handlerError(error));
  }
  
}

export {
  addWorkout,
  fetchWorkouts,
  editWorkout
}