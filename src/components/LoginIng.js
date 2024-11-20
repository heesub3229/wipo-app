import axios from "axios";
import { useEffect } from "react";
import { Lodaing } from "./Common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../slices/auth";

export const KakaoLogin = () => {
  const serverUrl = process.env.REACT_APP_SERVER_API;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const kakaoAuth = async () => {
      const response = await axios.get(`${serverUrl}/user/kakaoLogin?code=123`);

      const res = await response.data;
      if (res) {
        if (res.errFlag === true) {
          //에러처리부분
          navigate("/");
        } else {
          if (res.data) {
            dispatch(setToken(res.data));
            navigate("/Main");
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
      <Lodaing />
    </>
  );
};

export const NaverLogin = () => {
  const serverUrl = process.env.REACT_APP_SERVER_API;
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
            dispatch(setToken(res.data));
            navigate("/Main");
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
      <Lodaing />
    </>
  );
};

export const GoogleLogin = () => {
  const serverUrl = process.env.REACT_APP_SERVER_API;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const kakaoAuth = async () => {
      const response = await axios.get(
        `${serverUrl}/user/googleLogin?code=${code}`
      );

      const res = await response.data;
      if (res) {
        if (res.errFlag === true) {
          //에러처리부분
          navigate("/");
        } else {
          if (res.data) {
            dispatch(setToken(res.data));
            navigate("/Main");
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
      <Lodaing />
    </>
  );
};
