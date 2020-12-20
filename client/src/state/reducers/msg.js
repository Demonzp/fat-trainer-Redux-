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
        msgs:[...state.msg.msgs, payload]
      };

    case 'DEL_MESSAGE':
      return {
        msgs: [
          ...state.msg.msgs.filter((msg) => msg.id !== payload)
        ]
      };

    case 'CLEAR_MESSAGES':
      return {
        msgs: []
      };

    default:
      return state.msg;
  }
}

export default message;