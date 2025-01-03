import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: null, // JWT 토큰 초기값
  email: null,
  dateBirth: null,
  name: null,
  loginType: null,
  userSid: null,
  friendArray: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      const { jwtToken, loginType } = action.payload;
      state.jwtToken = jwtToken;
      state.loginType = loginType;
    },
    clearAuth: (state) => {
      state.jwtToken = null; // 토큰 초기화
      state.email = null;
      state.dateBirth = null;
      state.name = null;
      state.loginType = null;
      state.userSid = null;
    },
    saveUserInfo: (state, action) => {
      const { email, dateBirth, name, userSid } = action.payload;
      state.userSid = userSid;
      state.dateBirth = dateBirth;
      state.email = email;
      state.name = name;
    },
  },
});

export const { setToken, clearAuth, saveUserInfo } = authSlice.actions;
export default authSlice.reducer;
