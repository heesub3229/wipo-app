import { combineReducers } from "redux";
import auth from "./auth";
import cookie from "./cookie";
import api from "./api";
import error from "./error";

const rootReducer = combineReducers({ auth, cookie, api, error });

export default rootReducer;
