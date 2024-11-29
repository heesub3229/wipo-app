import { createSlice } from "@reduxjs/toolkit";
import moment from "moment-timezone";
import { nowDate } from "../components/Util";

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
          state[apiName] = {
            loading: true,
            error: null,
            data: null,
            status: null,
            time: nowDate(),
          };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"), // 모든 fulfilled 액션
        (state, action) => {
          const { status, data } = action.payload;
          const apiName = action.type.split("/")[1];
          state[apiName] = {
            loading: false,
            error: status !== 200 ? data?.data : null,
            data: status === 200 ? data?.data : null,
            status: status,
            time:
              moment(data?.resDate).format("YYYY-MM-DD HH:mm:ss") || nowDate(),
          };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const { status, message } = action.payload || {};
          const apiName = action.type.split("/")[1];
          state[apiName] = {
            loading: false,
            error: message,
            data: null,
            status: status,
            time: nowDate(),
          };
        }
      );
  },
});
export const { clearState } = apiSlice.actions;
export default apiSlice.reducer;
