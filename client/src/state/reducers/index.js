import auth from "./auth";
import msg from "./msg";
import exercise from "./exercise";

const reducer = (state, action) => {
  return {
    auth: auth(state, action),
    msg: msg(state, action),
    exercise: exercise(state, action)
  };
};

export default reducer;