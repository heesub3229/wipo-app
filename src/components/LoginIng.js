import axios from "axios";
import { useEffect } from "react";
import { LoginLoading } from "./Common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth, { saveUserInfo } from "../slices/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { otherLogin, userInfo } from "../api/UserApi";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
export const KakaoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const kakaoAuth = async () => {
      try {
        const result = await dispatch(
          otherLogin({ type: "kakaoLogin", code: code })
        ).unwrap();
        if (result) {
          const data = result.data.data.split(";");
          cookie.set("jwtToken", data[0], {
            httpOnly: false,
            expires: new Date(Date.now() + Number(data[1]) * 1000),
          });
        }
      } catch (error) {
        navigate("/");
      } finally {
        const ret = await dispatch(saveUser()).unwrap();
        const { status, data } = ret;
        if (status === 200) {
          navigate(data);
        } else {
          navigate("/");
        }
      }
    };
    kakaoAuth();
  }, []);

  return <></>;
};

export const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const googleAuth = async () => {
      try {
        const result = await dispatch(
          otherLogin({ type: "googleLogin", code: code })
        ).unwrap();
        if (result) {
          const data = result.data.data.split(";");
          cookie.set("jwtToken", data[0], {
            httpOnly: false,
            expires: new Date(Date.now() + Number(data[1]) * 1000),
          });
        }
      } catch (error) {
        navigate("/");
      } finally {
        const ret = await dispatch(saveUser()).unwrap();
        const { status, data } = ret;
        if (status === 200) {
          navigate(data);
        } else {
          navigate("/");
        }
      }
    };

    googleAuth();
  }, []);

  return <></>;
};

//로그인 후 유저정보셋팅
export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const cookie = new Cookies();
    if (!cookie.get("jwtToken")) {
      return { status: 500, message: { data: "토큰없음" } };
    }

    try {
      const result = await dispatch(userInfo(cookie.get("jwtToken"))).unwrap();
      const { status, data } = result;
      if (status === 200 && data?.data) {
        dispatch(saveUserInfo(data.data));

        if (data?.data?.name && data?.data?.dateBirth) {
          return { status: 200, data: "/Main" };
        }

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
