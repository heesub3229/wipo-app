import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAlert, saveAlert } from "../slices/alert";
import { generateState } from "../components/Util";
import { Cookies } from "react-cookie";
import { pushFriend } from "../slices/auth";

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

export const otherLogin = createAsyncThunk(
  "user/otherLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}/user/${formData.type}?code=${formData.code}`
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

export const findEmail = createAsyncThunk(
  "user/findEmail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}/user/findEmail`, {
        params: {
          name: formData.name,
          dateBirth: formData.dateBirth, // null로 변환
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

export const findPass = createAsyncThunk(
  "user/findPass",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}/user/findPass`, {
        params: {
          email: formData.email,
          name: formData.name,
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

export const changePass = createAsyncThunk(
  "user/changePass",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}/user/changePass`, {
        params: {
          email: formData.email,
          password: formData.password,
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

export const PutStream = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = new Cookies();
  useEffect(() => {
    if (cookie.get("jwtToken")) {
      dispatch(clearAlert());
      const eventSource = new EventSource(
        `${serverUrl}/user/stream?jwtToken=${cookie.get("jwtToken")}`
      );

      eventSource.addEventListener("alert", (event) => {
        const data = JSON.parse(event.data);
        dispatch(saveAlert(data));
      });

      eventSource.addEventListener("friend", (event) => {
        const data = JSON.parse(event.data);
        dispatch(pushFriend(data));
      });

      eventSource.onerror = () => {
        eventSource.close();
        cookie.remove("jwtToken", { path: "/" });
        navigate("/");
      };
      return () => {
        if (cookie.get("jwtToken")) {
          dispatch(disconStream(cookie.get("jwtToken")));
          eventSource.close();
        }
      };
    }
  }, [cookie.get("jwtToken")]);
};

export const disconStream = createAsyncThunk(
  "user/disconStream",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}/user/disconStream?jwtToken=${formData}`
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

export const getFindByUser = createAsyncThunk(
  "user/getFindByUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}/user/getFindByUser?str=${formData.str}`,
        {
          headers: {
            Authorization: formData.jwtToken,
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

export const setFriendUser = createAsyncThunk(
  "user/setFriendUser",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/user/setFriendUser?friendSid=${formData}`,
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

export const getUserRelInfo = createAsyncThunk(
  "user/getUserRelInfo",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/user/getUserRelInfo?sid=${formData.sid}`,
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

export const setRelApprove = createAsyncThunk(
  "user/setRelApprove",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.get(
        `${serverUrl}/user/setRelApprove?sid=${formData.sid}&approveFlag=${formData.approveFlag}`,
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

export const setProfile = createAsyncThunk(
  "user/setProfile",
  async (formData, { rejectWithValue }) => {
    const cookie = new Cookies();
    try {
      const response = await axios.post(
        `${serverUrl}/user/setProfile`,
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
