import { combineReducers } from "redux";
import auth from "./auth";
import api from "./api";
import error from "./error";
import post from "./post";
import alert from "./alert";

const rootReducer = combineReducers({ auth, api, error, post, alert });

export default rootReducer;
