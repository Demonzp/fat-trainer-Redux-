
export const ADD_EXERCISE = 'ADD_EXERCISE';
export const FETCH_EXERCISE = 'FETCH_EXERCISE';
export const UPDATE_EXERCISES = 'UPDATE_EXERCISES';
export const DEL_EXERCISE = 'DEL_EXERCISE';

const exercise = (state, action) => {

  if (state === undefined) {
    return {
      exercises: [],
      isLoaded: false
    };
  }

  const payload = action.payload;

  switch (action.type) {
    case ADD_EXERCISE: {
      return {
        ...state,
        exercises: [...state.exercises, payload]
      }
    }

    case FETCH_EXERCISE: {
      return {
        exercises: payload,
        isLoaded: true
      }
    }

    case UPDATE_EXERCISES:{
      return{
        ...state,
        exercises: payload
      }
    }

    case DEL_EXERCISE:{
      const idx = state.exercises.findIndex((ex)=>ex._id===payload);

      const newExercises = [
        ...state.exercises.slice(0, idx),
        ...state.exercises.slice(idx+1)
      ];

      return{
        ...state,
        exercises: newExercises
      }
    }

    default:
      return state;
  }
};

export default exercise;