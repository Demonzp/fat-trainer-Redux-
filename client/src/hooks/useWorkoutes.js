import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReq, getReq, editReq } from "services/workout";
import { setLockAuthApp } from "state/actions/auth";
import { addMessage } from "state/actions/msg";
import { addWorkout, loaded, edit } from "state/actions/workout";
import MsgTypes from "../constants/msgTypes.js";
import useExercise from "./useExercise.js";

const useWorkouts = () => {
  const { workouts } = useSelector(state => state.workout);
  const { token, lockAuthApp, dataLoaded } = useSelector(state => state.auth);
  const { exercises } = useExercise();

  const dispatch = useDispatch();

  const _handlerError = (error) => {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }

  const setWorkouts = (workouts) => {
    // if (!isLoadedW) {
    //   getReq(token)
    //     .then((workouts) => {
    //       dispatch(loaded(workouts));
    //     })
    //     .catch((error) => {
    //       _handlerError(error);
    //     });
    // }
    dispatch(loaded(workouts));
  }

  // useEffect(() => {
  //   getWorkouts();
  // }, []);

  const createWorkout = async (workout) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await createReq({ token, data: workout });
      dispatch(addWorkout(resData.workout));
    } catch (error) {
      _handlerError(error);
    }
  }

  const editWorkout = async (workout) => {
    dispatch(setLockAuthApp(true));
    console.log('editWorkout = ', workout);
    try {
      const resData = await editReq({ token, data: workout });
      dispatch(edit(resData));
    } catch (error) {
      _handlerError(error);
    }
  }

  return {
    workouts,
    exercises,
    setWorkouts,
    createWorkout,
    editWorkout,
    lockAuthApp,
    dataLoaded
  }
}

export default useWorkouts;