import { combineReducers } from "redux";
import auth from "./auth";
import cookie from "./cookie";
import api from "./api";
import field from "./field";

const rootReducer = combineReducers({ auth, cookie, api, field });

export default rootReducer;
