import { combineReducers } from "redux";
import auth from "./auth";
import api from "./api";
import error from "./error";
import post from "./post";
import alert from "./alert";
import rcpt from "./rcpt";
import rest from "./rest";

const rootReducer = combineReducers({
  auth,
  api,
  error,
  post,
  alert,
  rcpt,
  rest,
});

export default rootReducer;
