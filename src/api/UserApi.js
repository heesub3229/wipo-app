import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = process.env.REACT_APP_SERVER_API;
export const emailAuth = createAsyncThunk(
  "user/emailAuth",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}/user/emailAuth?email=${email}`
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
export const emailValid = createAsyncThunk(
  "user/emailValid",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}/user/emailValid?email=${email}&code=${encodeURIComponent(
          code
        )}`
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
export const asign = createAsyncThunk(
  "user/asign",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}/user/asign`, formData, {
        headers: {
          "Content-Type": "application/json",
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

export const login = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
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
      return rejectWithValue({
        status: 500,
        message: { data: "서버 오류 발생" },
      });
    }
  }
);

export const userInfo = createAsyncThunk(
  "user/userInfo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}/user/userInfo`, {
        headers: {
          Authorization: formData,
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

export const saveNameBirth = createAsyncThunk(
  "user/saveNameBirth",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}/user/saveNameBirth`, {
        headers: {
          Authorization: formData.jwt,
        },
        params: {
          name: formData.name != null ? formData.name : null,
          dateBirth: formData.dateBirth != null ? formData.dateBirth : null, // null로 변환
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
