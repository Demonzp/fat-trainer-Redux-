const message = (state, action) => {

  if (state === undefined) {
    return {
      msgs: []
    };
  }

  const payload = action.payload;

  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        msgs:[...state.msgs, payload]
      };

    case 'DEL_MESSAGE':
      return {
        msgs: [
          ...state.msgs.filter((msg) => msg.id !== payload)
        ]
      };

    case 'CLEAR_MESSAGES':
      return {
        msgs: []
      };

    default:
      return state;
  }
}

export default message;