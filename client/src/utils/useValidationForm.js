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

// Cоздаём кастомный хук UseValidationForm.
const UseValidationForm = (callback, callbackError, initialState = {}, Validation) => {

  const [values, setValues] = useState(initialState);
  //const [errors, setErrors] = useState({});
  //const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, dispatch] = useReducer(reducer, initState);

  // Создаём функцию изменения.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  // Создаём функцию отправки.
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    // Обработчик ошибок.
    //setErrors(Validation(values));
    //setIsSubmitting(true);
    dispatch({type: 'ON_SUBMIT', payload:Validation(values)});
  };

  const handleReset = (event) => {

    //setIsSubmitting(false);
    //setErrors({});
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