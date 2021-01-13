import MsgTypes from "../../constants/msgTypes";
import { setLockAuthApp } from "./auth";
import { addMessage } from "./msg";

const addWorkout = (workout) => (dispatch) => {
  dispatch({ type: 'ADD_WORKOUT', workout });
  dispatch(addMessage({ type: MsgTypes.success, txt: `workout: '${workout._id}' has been create!` }));
  dispatch(setLockAuthApp(false));
}

const loaded = (workouts)=>(dispatch)=>{
  dispatch({type: 'FETCH_WORKOUTS', payload:workouts});
}

export {
  addWorkout,
  loaded
}