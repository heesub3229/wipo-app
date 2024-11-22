import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = process.env.REACT_APP_SERVER_API;
export const emailAuth = createAsyncThunk("user/emailAuth", async (email) => {
  const { data } = await axios.get(
    `${serverUrl}/user/emailAuth?email=${email}`
  );
  return data;
});
export const emailValid = createAsyncThunk(
  "user/emailValid",
  async ({ email, code }) => {
    const { data } = await axios.get(
      `${serverUrl}/user/emailValid?email=${email}&code=${encodeURIComponent(
        code
      )}`
    );
    return data;
  }
);
