let zIndex = 0;

const newExercise = (ex)=>{
  let newEx = {
    ...ex,
    zIndex,
  }
  
  zIndex++;
  return newEx;
}

const loadedEx = (exs) => (dispatch) => {

  const newExs = exs.map((ex)=>{
    return newExercise(ex);
  });

  dispatch({
    type:"FETCH_EXERCISE",
    payload: newExs
  });
}

const addExercise = (exercise) => (dispatch) => {
  dispatch({
    type: "ADD_EXERCISE",
    payload: newExercise(exercise)
  });
}

export {
  addExercise,
  loadedEx
}