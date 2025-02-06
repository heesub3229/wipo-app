import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  select: { listSelect: 1, monthSelect: 1, daySelect: 1 },
  rcptList: [],
  rcptGraph_i_day: [],
  rcptGraph_e_day: [],
  rcptGraph_i_month: [],
  rcptGraph_e_month: [],
};

const rcptSlice = createSlice({
  name: "rcpt",
  initialState,
  reducers: {
    beforeSelect: (state) => {
      state.select.listSelect = state.select.listSelect + 1;
    },
    afterSelect: (state) => {
      if (state.select.listSelect > 1) {
        state.select.listSelect = state.select.listSelect - 1;
      }
    },
    saveRcptRes: (state, action) => {
      const { sid, amount, category, date, payment, type, listFlag, memo } =
        action.payload;
      //그래프 업데이트
      if (type === "I") {
        if (state.rcptGraph_i_day.length > 0) {
          const findData = state.rcptGraph_i_day.find(
            (item) => item.date === date
          );
          if (findData) {
            state.rcptGraph_i_day.forEach((item) => {
              if (item.date === date) {
                item.amount += amount;
              }
            });
          }
        } else {
          state.rcptGraph_i_day.push({ date: date, amount: amount });
        }

        if (state.rcptGraph_i_month.length > 0) {
          const findData = state.rcptGraph_i_month.find(
            (item) => item.date === String(date).substring(0, 6)
          );
          if (findData) {
            state.rcptGraph_i_month.forEach((item) => {
              if (item.date === String(date).substring(0, 6)) {
                item.amount += amount;
              }
            });
          }
        } else {
          state.rcptGraph_i_month.push({
            date: String(date).substring(0, 6),
            amount: amount,
          });
        }
      } else {
        if (state.rcptGraph_e_day.length > 0) {
          const findData = state.rcptGraph_e_day.find(
            (item) => item.date === date
          );
          if (findData) {
            state.rcptGraph_e_day.forEach((item) => {
              if (item.date === date) {
                item.amount += amount;
              }
            });
          }
        } else {
          state.rcptGraph_e_day.push({ date: date, amount: amount });
        }

        if (state.rcptGraph_e_month.length > 0) {
          const findData = state.rcptGraph_e_month.find(
            (item) => item.date === String(date).substring(0, 6)
          );
          if (findData) {
            state.rcptGraph_e_month.forEach((item) => {
              if (item.date === String(date).substring(0, 6)) {
                item.amount += amount;
              }
            });
          }
        } else {
          state.rcptGraph_e_month.push({
            date: String(date).substring(0, 6),
            amount: amount,
          });
        }
      }
      //리스트 업데이트
      if (listFlag) {
        state.rcptList.push({
          sid: sid,
          amount: amount,
          category: category,
          date: date,
          payment: payment,
          type: type,
          memo: memo,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"), // 모든 fulfilled 액션
      (state, action) => {
        const type = String(action.type).split("/")[1];
        if (type === "getRcpInfo") {
          const { status } = action.payload;
          if (status === 200) {
            const { data, errFlag } = action.payload.data;
            if (errFlag === false) {
              state.rcptList = data;
            }
          }
        }
      }
    );
  },
});

export const { saveRcptRes, beforeSelect, afterSelect } = rcptSlice.actions;
export default rcptSlice.reducer;
