import { combineReducers } from "redux";
import auth from "./auth";
import cookie from "./cookie";
import api from "./api";
import error from "./error";
import post from "./post";

const rootReducer = combineReducers({ auth, cookie, api, error, post });

export default rootReducer;
