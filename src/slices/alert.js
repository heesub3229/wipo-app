import { createSlice } from "@reduxjs/toolkit";
import { generateState } from "../components/Util";

const initialState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    clearAlert: (state) => {
      state.splice(0, state.length);
    },
    delAlert: (state, action) => {
      const { sid, type } = action.payload;
      return state.filter((item) => !(item.sid === sid && item.type === type));
    },
    saveAlert: (state, action) => {
      const { sid, type, title, content, date, confirm_flag, approve_flag } =
        action.payload;
      const filter = state.find(
        (item) => item.sid === sid && item.type === type
      );
      if (filter) {
        filter.title = title;
        filter.content = content;
        filter.date = date;
        filter.confirm_flag = confirm_flag;
        filter.approve_flag = approve_flag;
      } else {
        state.push({
          sid: sid,
          type: type,
          title: title,
          content: content,
          confirm_flag: confirm_flag,
          date: date,
          approve_flag: approve_flag,
        });
      }
      state.sort((a, b) => {
        if (a.confirm_flag === "N" && b.confirm_flag === "Y") return -1;
        if (a.confirm_flag === "Y" && b.confirm_flag === "N") return 1;
        return new Date(b.date) - new Date(a.date);
      });
    },
    changeAlert: (state, action) => {
      const { sid, type, confirm_flag } = action.payload;
      state.forEach((item) => {
        if (item.sid === sid && item.type === type) {
          item.confirm_flag = confirm_flag;
        }
      });
      state.sort((a, b) => {
        if (a.confirm_flag === "N" && b.confirm_flag === "Y") return -1;
        if (a.confirm_flag === "Y" && b.confirm_flag === "N") return 1;
        return new Date(b.date) - new Date(a.date);
      });
    },
  },
});

export const { saveAlert, clearAlert, changeAlert, delAlert } =
  alertSlice.actions;
export default alertSlice.reducer;
