import { combineReducers } from "redux";
import auth from "./auth";
import cookie from "./cookie";
import api from "./api";

const rootReducer = combineReducers({ auth, cookie, api });

export default rootReducer;
