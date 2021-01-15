import MsgTypes from "../../constants/msgTypes";
import { setLockAuthApp } from "./auth";
import { addMessage } from "./msg";

const addWorkout = (workout) => (dispatch) => {
  dispatch({ type: 'ADD_WORKOUT', payload:workout });
  dispatch(addMessage({ type: MsgTypes.success, txt: `workout: '${workout._id}' has been create!` }));
  dispatch(setLockAuthApp(false));
}

const loaded = (workouts)=>(dispatch)=>{
  dispatch({type: 'FETCH_WORKOUTS', payload:workouts});
}

const edit = (workout)=>(dispatch)=>{
  dispatch({ type: 'EDIT_WORKOUT', payload:workout });
  dispatch(addMessage({ type: MsgTypes.success, txt: `workout: '${workout._id}' has been change!` }));
  dispatch(setLockAuthApp(false));
}

export {
  addWorkout,
  loaded,
  edit
}