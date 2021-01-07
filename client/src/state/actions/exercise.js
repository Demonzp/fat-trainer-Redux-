const addExercise = (exercise) => (dispatch) => {
  dispatch({
    type: "ADD_EXERCISE",
    payload: exercise
  });
}

export {
  addExercise
}