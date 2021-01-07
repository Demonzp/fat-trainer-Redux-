const exercise = (state, action) => {

  if (state === undefined) {
    return {
      exercises:[]
    };
  }

  switch (action.type) {
    case "ADD_EXERCISE": {
      return {
        exercises:[...state.exercise.exercises,action.payload]
      }
    }

    default:
      return state.exercise;
  }
};

export default exercise;