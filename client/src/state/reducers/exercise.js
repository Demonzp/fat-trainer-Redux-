const exercise = (state, action) => {

  if (state === undefined) {
    return {
      exercises:[]
    };
  }

  switch (action.type) {
    case "ADD_EXERCISE": {
      return {
        exercises:[...state.exercises, action.payload]
      }
    }

    default:
      return state;
  }
};

export default exercise;