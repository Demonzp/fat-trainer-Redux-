import {combineReducers} from "redux";
import auth from "./auth";
import msg from "./msg";
import exercise from "./exercise";
import workout from "./workout";

const reducer = combineReducers({
  auth,
  msg,
  exercise,
  workout
});

export default reducer;