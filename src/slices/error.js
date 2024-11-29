import { createSlice } from "@reduxjs/toolkit";
import { generateState, nowDate } from "../components/Util";
import moment from "moment-timezone";

const initialState = {};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    pushError: (state, action) => {
      const { type, error, status, time } = action.payload;
      const id = generateState();
      state[id] = { type: type, error: error, status: status, time: time };
    },
    delError: (state, action) => {
      const id = action.payload || 0;
      if (id !== 0) {
        delete state[id];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        const { status, message } = action.payload || {};
        const apiName = action.type.split("/")[1];
        const id = generateState();
        state[id] = {
          type: apiName,
          error: message?.data,
          status: status,
          time:
            moment(message?.resDate).format("YYYY-MM-DD HH:mm:ss") || nowDate(),
        };
      }
    );
  },
});

export const { pushError, delError } = errorSlice.actions;
export default errorSlice.reducer;
