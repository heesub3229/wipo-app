import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: null, // JWT 토큰 초기값
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.jwtToken = action.payload;
    },
    clearToken: (state) => {
      state.token = null; // 토큰 초기화
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
