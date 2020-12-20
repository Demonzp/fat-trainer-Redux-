import auth from "./auth";
import msg from "./msg";

const reducer = (state, action) => {
  return {
    auth: auth(state, action),
    msg: msg(state, action),
  };
};

export default reducer;