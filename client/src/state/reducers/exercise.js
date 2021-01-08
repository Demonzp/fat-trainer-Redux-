const exercise = (state, action) => {

  if (state === undefined) {
    return {
      exercises: [],
      isLoaded: false
    };
  }

  const payload = action.payload;

  switch (action.type) {
    case "ADD_EXERCISE": {
      return {
        ...state,
        exercises: [...state.exercises, payload]
      }
    }

    case "FETCH_EXERCISE": {
      return {
        exercises: payload,
        isLoaded: true
      }
    }

    default:
      return state;
  }
};

export default exercise;