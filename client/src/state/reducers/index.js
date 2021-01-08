import {combineReducers} from "redux";
import auth from "./auth";
import msg from "./msg";
import exercise from "./exercise";

const reducer = combineReducers({
  auth,
  msg,
  exercise,
});

export default reducer;