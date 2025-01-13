import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iPage: null,
  otherPage: null,
  post_i: [],
  post_other: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    pushPost_i: (state, action) => {
      const data = action.payload;
      state.post_i.unshift(data);
    },
    pustPost_other: (state, action) => {
      const data = action.payload;
      state.post_other.unshift(data);
    },
    clearPost: (state) => {
      state.iPage = null;
      state.otherPage = null;
      state.post_i = [];
      state.post_other = [];
    },
  },
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
              state.iPage = action.meta.arg;
              data.forEach((item) => state.post_i.unshift(item));
            }
          }
        } else if (type === "getOtherPost") {
          const { status } = action.payload;
          if (status === 200) {
            const { data, errFlag } = action.payload.data;
            if (errFlag === false) {
              state.otherPage = action.meta.arg;
              data.forEach((item) => state.post_other.unshift(item));
            }
          }
        }
      }
    );
  },
});

export const { pushPost, clearPost } = postSlice.actions;
export default postSlice.reducer;
