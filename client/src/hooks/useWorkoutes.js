import { useSelector, useDispatch } from "react-redux";
import { addWorkout, fetchWorkouts, editWorkout as edit } from "state/actions/workout";
import useExercise from "./useExercise.js";

const useWorkouts = () => {
  const { workouts, isLoaded: dataLoaded  } = useSelector(state => state.workout);
  const { lockAuthApp } = useSelector(state => state.auth);
  const { exercises } = useExercise();

  const dispatch = useDispatch();

  const setWorkouts = (workouts) => {
    dispatch(fetchWorkouts(workouts));
  }

  const createWorkout = async (workout) => {
    return await dispatch(addWorkout(workout));
  }

  const editWorkout = async (workout) => {
    return await dispatch(edit(workout));
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