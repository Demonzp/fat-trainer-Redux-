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
    case "EDIT_WORKOUT":{
      const idx = state.workouts.findIndex((work)=>work._id===payload._id);
      return{
        ...state,
        workouts:[
          ...state.workouts.slice(0, idx),
          payload,
          ...state.workouts.slice(idx+1)
        ]
      }
    }

    default:
      return state;
  }
};

export default workout;