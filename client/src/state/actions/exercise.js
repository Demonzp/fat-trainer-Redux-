import { upInArray, downInArray } from "utils/global";
import { addMessage } from "./msg";
import MsgTypes from "constants/msgTypes.js";
import { isCan, setLockAuthApp } from "./auth";
import {
  FETCH_EXERCISE,
  ADD_EXERCISE,
  UPDATE_EXERCISES,
  DEL_EXERCISE
} from "state/reducers/exercise";
import { createReq, delReq, updateReq } from "services/exercises";

let zIndex = 0;

const _handlerError = (error) => (dispatch) => {
  dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
  dispatch(setLockAuthApp(false));
  throw error;
}

const _newExercise = (ex) => {
  let newEx = {
    ...ex,
    zIndex,
  }

  zIndex++;
  return newEx;
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

const loadedEx = (exs) => (dispatch) => {

  const newExs = exs.map((ex) => {
    return _newExercise(ex);
  });

  dispatch({
    type: FETCH_EXERCISE,
    payload: newExs
  });
}

const addExercise = (data) => async (dispatch) => {
  try {

    const token = await dispatch(_asyncAction);

    const resData = await createReq({ token, data });

    dispatch({
      type: ADD_EXERCISE,
      payload: _newExercise(resData.exercise)
    });

    dispatch(addMessage({ type: MsgTypes.success, txt: resData.message }));
    dispatch(setLockAuthApp(false));
    return resData;
  } catch (error) {
    dispatch(_handlerError(error));
  }

}

const updateExs = (data) => async (dispatch, getState) => {

  if(data.length<=0){
    return;
  }

  let token;
  try {
    token = await dispatch(_asyncAction);
  } catch (error) {
    throw error;
  }

  const arrResUpdate = [];
  const arrErrUpdate = [];

  for (const exercise of data) {
    try {
      const resData = await updateReq({token, data:exercise});
      arrResUpdate.push({data:resData, id:exercise._id});
    } catch (error) {
      arrErrUpdate.push({err:error, id:exercise._id});
    }
  }

  let errStr = '';

  arrErrUpdate.forEach((err,i)=>{
    errStr+=`${err.err} whis update: "${err.id}"`;
    if(arrErrUpdate.length>1 && i<arrErrUpdate.length-1){
      errStr+= ', ';
    }
  });

  if(arrResUpdate.length<=0){
    dispatch(_handlerError(errStr));
  }else{
    let successStr = 'success update: ';
    arrResUpdate.forEach((data,i)=>{
      successStr += data.id;
      if(arrResUpdate.length>1 && i<arrResUpdate.length-1){
        successStr+= ', ';
      }
    });

    if(arrErrUpdate.length>0){
      dispatch(addMessage({ type: MsgTypes.warning, txt: errStr+successStr }));
    }else{
      dispatch(addMessage({ type: MsgTypes.success, txt: successStr }));
    }
    
    const exercises = getState().exercise.exercises;
    let newExercises = [...exercises];

    arrResUpdate.forEach((exercise) => {
      const idx = exercises.findIndex(ex => ex._id === exercise.id);
      newExercises = [
        ...newExercises.slice(0, idx),
        exercise.data,
        ...newExercises.slice(idx + 1)
      ];
    });

    dispatch({ type: UPDATE_EXERCISES, payload: newExercises });
    dispatch(setLockAuthApp(false));

  }

  
}

const up = (id) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_EXERCISES,
    payload: upInArray({
      nameKey: '_id',
      key: id,
      array: getState().exercise.exercises
    })
  });
}

const down = (id) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_EXERCISES,
    payload: downInArray({
      nameKey: '_id',
      key: id,
      array: getState().exercise.exercises
    })
  });
}

const del = (id) => async (dispatch) => {
  try {
    const token = await dispatch(_asyncAction);

    const resData = await delReq({ token, data:id });

    dispatch({
      type: DEL_EXERCISE,
      payload: id
    });
    dispatch(addMessage({ type: MsgTypes.success, txt: `exercise: '${id}' has been deleted` }));
    dispatch(setLockAuthApp(false));
    return resData;
  } catch (error) {
    dispatch(_handlerError(error));
  }
}

export {
  updateExs,
  addExercise,
  loadedEx,
  up,
  down,
  del
}