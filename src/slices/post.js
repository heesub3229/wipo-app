import { createSlice } from "@reduxjs/toolkit";

const initialState = { beforePages: [], nowPages: [], afterPages: [] };

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"), // 모든 fulfilled 액션
      (state, action) => {
        const type = String(action.type).split("/")[1];
        if (type === "getPostMy") {
          const { status } = action.payload;
          if (status === 200) {
            const { data, errFlag } = action.payload.data;
            if (errFlag === false) {
              const nowPage = action.meta.arg.formData;
              data.forEach((item) => {
                if (nowPage === 0) {
                  state.afterPages = [];
                  state.beforePages = [];
                  state.nowPages = [];
                  if (item.page === 0) {
                    state.nowPages.push(item);
                  } else {
                    state.afterPages.push(item);
                  }
                } else {
                  state.afterPages.push(item);
                }
              });
            }
          }
        }
      }
    );
  },
});

export const { setClear } = postSlice.actions;
export default postSlice.reducer;
