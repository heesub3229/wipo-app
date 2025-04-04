import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

const serverUrl = process.env.REACT_APP_SERVER_API;
export const restSave = createAsyncThunk(
  "rest/restSave",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.post(
        `${serverUrl}/rest/restSave`,
        formData,
        {
          headers: {
            Authorization: cookie.get("jwtToken"),
          },
        }
      );
      return { status: response.status, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || { data: "서버에러" };
        const status = error.response?.status || 500; // 상태 코드 추출

        // `rejectWithValue`로 에러 정보 반환
        return rejectWithValue({
          status,
          message,
        });
      }

      // AxiosError가 아닌 경우 기본 에러 반환
      return rejectWithValue({ status: 500, message: { data: "서버에러" } });
    }
  }
);

export const getRestList = createAsyncThunk(
  "rest/getRestList",
  async (_, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(`${serverUrl}/rest/getRestList`, {
        headers: {
          Authorization: cookie.get("jwtToken"),
        },
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || { data: "서버에러" };
        const status = error.response?.status || 500; // 상태 코드 추출

        // `rejectWithValue`로 에러 정보 반환
        return rejectWithValue({
          status,
          message,
        });
      }

      // AxiosError가 아닌 경우 기본 에러 반환
      return rejectWithValue({ status: 500, message: { data: "서버에러" } });
    }
  }
);
