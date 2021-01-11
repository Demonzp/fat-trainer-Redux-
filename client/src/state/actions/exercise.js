import { upInArray, downInArray } from "utils/global";

let zIndex = 0;

const newExercise = (ex) => {
  let newEx = {
    ...ex,
    zIndex,
  }

  zIndex++;
  return newEx;
}

const loadedEx = (exs) => (dispatch) => {

  const newExs = exs.map((ex) => {
    return newExercise(ex);
  });

  dispatch({
    type: "FETCH_EXERCISE",
    payload: newExs
  });
}

const addExercise = (exercise) => (dispatch) => {
  dispatch({
    type: "ADD_EXERCISE",
    payload: newExercise(exercise)
  });
}

const updateExs = (arrEx) => (dispatch, getState) => {
  const exercises = getState().exercise.exercises;
  let newExercises = [...exercises];

  arrEx.forEach((exercise) => {
    const idx = exercises.findIndex(ex => ex._id === exercise.id);
    newExercises = [
      ...newExercises.slice(0, idx),
      exercise.data,
      ...newExercises.slice(idx + 1)
    ];
  });

  dispatch({ type: "UPDATE_EXERCISES", payload: newExercises });
}

const up = (id) => (dispatch, getState) => {
  dispatch({
    type: "UPDATE_EXERCISES",
    payload: upInArray({
      nameKey: '_id',
      key: id,
      array: getState().exercise.exercises
    })
  });
}

const down = (id) => (dispatch, getState) => {
  dispatch({
    type: "UPDATE_EXERCISES",
    payload: downInArray({
      nameKey: '_id',
      key: id,
      array: getState().exercise.exercises
    })
  });
}

export {
  updateExs,
  addExercise,
  loadedEx,
  up,
  down
}