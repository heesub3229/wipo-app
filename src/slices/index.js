import { combineReducers } from "redux";
import auth from "./auth";
import api from "./api";
import error from "./error";
import post from "./post";
import alert from "./alert";
import rcpt from "./rcpt";

const rootReducer = combineReducers({ auth, api, error, post, alert, rcpt });

export default rootReducer;
