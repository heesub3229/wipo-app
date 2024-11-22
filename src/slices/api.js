import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    clearState: (state, action) => {
      const apiName = action.payload;
      if (apiName) {
        delete state[apiName]; // 특정 API 상태 삭제
      } else {
        return {}; // 모든 상태 초기화
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          const apiName = action.type.split("/")[1];
          state[apiName] = { loading: true, error: null, data: null };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"), // 모든 fulfilled 액션
        (state, action) => {
          const payload = action.payload;
          const apiName = action.type.split("/")[1];
          if (payload) {
            if (payload && payload.errFlag === false) {
              state[apiName] = {
                loading: false,
                error: null,
                data: action.payload.data ? action.payload.data : false,
              };
            } else {
              state[apiName] = {
                loading: false,
                error: action.payload.data,
                data: null,
              };
            }
          } else {
            state[apiName] = {
              loading: false,
              error: "데이터없음",
              data: null,
            };
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const apiName = action.type.split("/")[1];
          state[apiName] = {
            loading: false,
            error: action.error.message,
            data: null,
          };
        }
      );
  },
});
export const { clearState } = apiSlice.actions;
export default apiSlice.reducer;
