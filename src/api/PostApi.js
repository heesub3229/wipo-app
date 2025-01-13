import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_API;
export const postSave = createAsyncThunk(
  "post/postSave",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.post(
        `${serverUrl}/post/postSave`,
        formData,
        {
          headers: {
            Authorization: cookie.get("jwtToken"),
            "Content-Type": "multipart/form-data",
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

export const getPostMy = createAsyncThunk(
  "post/getPostMy",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/post/getPostMy?page=${formData}`,
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

export const getOtherPost = createAsyncThunk(
  "post/getOtherPost",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/post/getOtherPost?page=${formData}`,
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

export const getPostInfo = createAsyncThunk(
  "post/getPostInfo",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/post/getPostInfo?postSid=${formData}`,
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
