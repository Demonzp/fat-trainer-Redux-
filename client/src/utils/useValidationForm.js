import { useState, useEffect, useReducer } from 'react';

const initState = {
  errors: {}, 
  isSubmitting: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ON_SUBMIT':
      return { 
        errors: action.payload,
        isSubmitting: true 
      };
    case 'OFF_SUBMIT':
      return { 
        ...state,
        isSubmitting: false 
      };
    case 'RESET':
      return initState;
    default:
      return state;
  }
}

const UseValidationForm = (callback, callbackError, initialState = {}, Validation) => {

  const [values, setValues] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    dispatch({type: 'ON_SUBMIT', payload:Validation(values)});
  };

  const handleReset = (event) => {
    dispatch({type: 'RESET'});
    setValues(initialState);
  };

  useEffect(() => {
    if (state.isSubmitting) {
      if (Object.keys(state.errors).length === 0) {
        callback();
      } else {
        callbackError(state.errors);
      }
      dispatch({type: 'OFF_SUBMIT'});
    }

  }, [callbackError, callback, state.isSubmitting]);

  return {
    handleChange,
    handleReset,
    handleSubmit,
    setValues,
    values,
    errors: state.errors
  };
};

export default UseValidationForm;
