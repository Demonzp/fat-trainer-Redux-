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

    case "UPDATE_EXERCISES":{
      return{
        ...state,
        exercises: payload
      }
    }

    default:
      return state;
  }
};

export default exercise;