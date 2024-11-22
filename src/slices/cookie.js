import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const initialState = {
  cookie: cookies.getAll() || {},
};

const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    cookieSave: (state, action) => {
      const { key, value, options } = action.payload;
      cookies.set(key, value, { path: "/", ...options });
      state.cookie[key] = value;
    },
    removeCookie: (state, action) => {
      const { key } = action.payload;
      cookies.remove(key, { path: "/" });
      delete state.cookie[key];
    },
  },
});

export const { cookieSave, removeCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
