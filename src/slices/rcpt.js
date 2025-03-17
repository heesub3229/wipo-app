import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  select: { listSelect: 1, monthSelect: 1, daySelect: 1 },
  rcptList: [],
  rcptGraph_day: [],
  rcptGraph_month: [],
  rcptNowIncome: 0,
  rcptNowExpense: 0,
};

const rcptSlice = createSlice({
  name: "rcpt",
  initialState,
  reducers: {
    beforeSelectList: (state) => {
      state.select.listSelect = state.select.listSelect + 1;
    },
    afterSelectList: (state) => {
      if (state.select.listSelect > 1) {
        state.select.listSelect = state.select.listSelect - 1;
      } else {
        state.select.listSelect = 1;
      }
    },
    beforeSelectMonth: (state) => {
      state.select.monthSelect = state.select.monthSelect + 1;
    },
    afterSelectMonth: (state) => {
      if (state.select.monthSelect > 1) {
        state.select.monthSelect = state.select.monthSelect - 1;
      } else {
        state.select.monthSelect = 1;
      }
    },
    beforeSelectDay: (state) => {
      state.select.daySelect = state.select.daySelect + 1;
    },
    afterSelectDay: (state) => {
      if (state.select.daySelect > 1) {
        state.select.daySelect = state.select.daySelect - 1;
      } else {
        state.select.daySelect = 1;
      }
    },
    moveSelect: (state, action) => {
      state.select.listSelect = state.select.listSelect + action.payload;
    },
    saveRcptRes: (state, action) => {
      const { sid, amount, category, date, payment, type, listFlag, memo } =
        action.payload;
      //그래프 업데이트
      if (state.rcptGraph_day.length > 0) {
        const findData = state.rcptGraph_day.find((item) => item.date === date);
        if (findData) {
          state.rcptGraph_day.forEach((item) => {
            if (item.date === date) {
              if (type === "E") {
                item.expense += amount;
              } else {
                item.income += amount;
              }
            }
          });
        }
      } else {
        if (type === "E") {
          state.rcptGraph_day.push({ date: date, income: 0, expense: amount });
        } else {
          state.rcptGraph_day.push({ date: date, income: amount, expense: 0 });
        }
      }

      if (state.rcptGraph_month.length > 0) {
        const findData = state.rcptGraph_month.find(
          (item) => item.date === String(date).substring(0, 6)
        );
        if (findData) {
          state.rcptGraph_month.forEach((item) => {
            if (item.date === String(date).substring(0, 6)) {
              if (type === "E") {
                item.expense += amount;
              } else {
                item.income += amount;
              }
            }
          });
        }
      } else {
        if (type === "E") {
          state.rcptGraph_month.push({
            date: String(date).substring(0, 6),
            income: 0,
            expense: amount,
          });
        } else {
          state.rcptGraph_month.push({
            date: String(date).substring(0, 6),
            income: amount,
            expense: 0,
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
        } else if (type === "getRcptGraphMonth") {
          const { status } = action.payload;
          if (status === 200) {
            const { data, errFlag } = action.payload.data;
            if (errFlag === false) {
              state.rcptGraph_month = data;
              if (state.select.monthSelect === 1) {
                state.rcptNowIncome = data[data.length - 1].income;
                state.rcptNowExpense = data[data.length - 1].expense;
              }
            }
          }
        } else if (type === "getRcptGraphDay") {
          const { status } = action.payload;
          if (status === 200) {
            const { data, errFlag } = action.payload.data;
            if (errFlag === false) {
              state.rcptGraph_day = data;
            }
          }
        }
      }
    );
  },
});

export const {
  saveRcptRes,
  beforeSelectList,
  afterSelectList,
  beforeSelectMonth,
  afterSelectMonth,
  beforeSelectDay,
  afterSelectDay,
  moveSelect,
} = rcptSlice.actions;
export default rcptSlice.reducer;
