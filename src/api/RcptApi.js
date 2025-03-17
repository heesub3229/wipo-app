import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

const serverUrl = process.env.REACT_APP_SERVER_API;
export const setRcptSave = createAsyncThunk(
  "rcpt/setRcptSave",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.post(
        `${serverUrl}/rcpt/setRcptSave`,
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

export const getRcpInfo = createAsyncThunk(
  "rcpt/getRcpInfo",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/rcpt/getRcpInfo?page=${formData}`,
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

export const getRcptGraphMonth = createAsyncThunk(
  "rcpt/getRcptGraphMonth",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/rcpt/getRcptGraphMonth?page=${formData}`,
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
export const getRcptGraphDay = createAsyncThunk(
  "rcpt/getRcptGraphDay",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/rcpt/getRcptGraphDay?page=${formData}`,
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
