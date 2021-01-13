const workout = (state, action) => {

  if (state === undefined) {
    return {
      workouts: [],
      isLoaded: false
    };
  }

  const payload = action.payload;

  switch (action.type) {
    case "ADD_WORKOUT":{
      return {
        ...state,
        workouts:[
          ...state.workouts,
          payload
        ]
      }
    }
    case "FETCH_WORKOUTS": {
      return {
        workouts: payload,
        isLoaded: true
      }
    }

    default:
      return state;
  }
};

export default workout;