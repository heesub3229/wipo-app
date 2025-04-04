import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const restSlice = createSlice({
  name: "rest",
  initialState,
  reducers: {
    pushList: (state, action) => {
      const data = action.payload;
      if (data?.sid) {
        const exists = state.list.some((item) => item.sid === data.sid);
        if (exists) {
          state.list = state.list.map((item) =>
            item.sid === data.sid ? data : item
          );
        } else {
          state.list.push(data);
        }
        action.payload = false;
      } else {
        action.payload = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"), // 모든 fulfilled 액션
      (state, action) => {
        const type = String(action.type).split("/")[1];
        if (type === "getRestList") {
          const { status } = action.payload;
          if (status === 200) {
            const { data, errFlag } = action.payload.data;
            if (errFlag === false) {
              state.list = data;
            }
          }
        }
      }
    );
  },
});

export const { pushList } = restSlice.actions;
export default restSlice.reducer;
