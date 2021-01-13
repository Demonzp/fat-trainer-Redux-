import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReq, getReq } from "services/workout";
import { setLockAuthApp } from "state/actions/auth";
import { addMessage } from "state/actions/msg";
import { addWorkout, loaded } from "state/actions/workout";
import MsgTypes from "../constants/msgTypes.js";
import useExercise from "./useExercise.js";

const useWorkouts = () => {
  const { workouts, isLoaded } = useSelector(state => state.workout);
  const { token, lockAuthApp } = useSelector(state => state.auth);
  const {exercises} = useExercise();
  //const { exercises } = useSelector(state => state.exercise);

  const dispatch = useDispatch();

  const _handlerError = (error) => {
    dispatch(addMessage({ type: MsgTypes.error, txt: error }));
    dispatch(setLockAuthApp(false));
    throw error;
  }

  const getWorkouts = () => {
    if (!isLoaded) {
      getReq(token)
        .then((workouts) => {
          dispatch(loaded(workouts));
        })
        .catch((error) => {
          _handlerError(error);
        });
    }
  }

  useEffect(() => {
    getWorkouts();
  }, []);

  const createWorkout = async (workout) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await createReq({ token, data: workout });
      dispatch(addWorkout(resData.workout));
    } catch (error) {
      _handlerError(error);
    }
  }

  return {
    workouts,
    exercises,
    createWorkout,
    lockAuthApp
  }
}

export default useWorkouts;