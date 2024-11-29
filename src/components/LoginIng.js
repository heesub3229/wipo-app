import axios from "axios";
import { useEffect } from "react";
import { LoginLoading } from "./Common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth, { saveUserInfo, setToken } from "../slices/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../api/UserApi";
const serverUrl = process.env.REACT_APP_SERVER_API;
export const KakaoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const kakaoAuth = async () => {
      const response = await axios.get(
        `${serverUrl}/user/kakaoLogin?code=${code}`
      );

      const res = await response.data;
      if (res) {
        if (res.errFlag === true) {
          //에러처리부분
          navigate("/");
        } else {
          if (res.data) {
            dispatch(setToken({ jwtToken: res.data, loginType: "K" }));
            const ret = await dispatch(saveUser()).unwrap();
            const { status, data } = ret;
            if (status === 200) {
              navigate(data);
            } else {
              navigate("/");
            }
          }
        }
      } else {
        navigate("/");
      }
    };

    kakaoAuth();
  }, []);

  return (
    <>
      <LoginLoading />
    </>
  );
};

export const NaverLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const kakaoAuth = async () => {
      const response = await axios.get(
        `${serverUrl}/user/naverLogin?code=${code}`
      );

      const res = await response.data;
      if (res) {
        if (res.errFlag === true) {
          //에러처리부분
          navigate("/");
        } else {
          if (res.data) {
            dispatch(setToken({ jwtToken: res.data, loginType: "N" }));
          }
        }
      } else {
        navigate("/");
      }
    };

    kakaoAuth();
  }, []);

  return (
    <>
      <LoginLoading />
    </>
  );
};

export const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const googleAuth = async () => {
      const response = await axios.get(
        `${serverUrl}/user/googleLogin?code=${code}`
      );

      const res = await response.data;

      if (response.status !== 200) {
        navigate("/");
      }

      if (res) {
        if (res.errFlag === true) {
          //에러처리부분
          navigate("/");
        } else {
          if (res.data) {
            dispatch(setToken({ jwtToken: res.data, loginType: "G" }));
            const ret = await dispatch(saveUser()).unwrap();
            const { status, data } = ret;
            if (status === 200) {
              navigate(data);
            } else {
              navigate("/");
            }
          }
        }
      } else {
        navigate("/");
      }
    };

    googleAuth();
  }, []);

  return (
    <>
      <LoginLoading />
    </>
  );
};

//로그인 후 유저정보셋팅
export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const authState = state.auth;
    if (!authState?.jwtToken) {
      return rejectWithValue({ status: 500, message: { data: "토큰없음" } });
    }

    try {
      const result = await dispatch(userInfo(authState.jwtToken)).unwrap();

      const { status, data } = result;
      if (status === 200 && data?.data) {
        dispatch(
          saveUserInfo({
            email: data?.data?.email,
            dateBirth: data?.data?.dateBirth,
            name: data?.data?.name,
          })
        );
        return { status: 200, data: "/FirstLogin" };
      } else {
        return rejectWithValue({
          status: 500,
          message: { data: "유저정보에러" },
        });
      }
    } catch (error) {
      return rejectWithValue({
        status: error.status || 500,
        message: { data: error.message } || { data: "유저저장실패" },
      });
    }
  }
);
