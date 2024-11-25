import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    addField: (state, action) => {
      const { key, fieldName, value } = action.payload;
      if (!state[key]) {
        state[key] = {};
      }

      state[key][fieldName] = value;
    },
    resetField: (state, action) => {
      const { key, fieldName } = action.payload || {};
      if (key && fieldName) {
        if (state[key]) {
          delete state[key][fieldName];
          if (Object.keys(state[key]).length === 0) {
            delete state[key];
          }
        }
      } else if (key) {
        delete state[key];
      } else {
        return {};
      }
    },
  },
});

export const { addField, resetField } = fieldSlice.actions;
export default fieldSlice.reducer;
