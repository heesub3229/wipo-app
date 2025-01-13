import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import { LoginInput } from "../../components/TextField";
import { AccountButton } from "../../components/Buttons";
import { CheckboxS } from "../../components/Checkbox";
import { Divider, Loading } from "../../components/Common";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";
import Kakao from "../../images/accounts/Kakao.png";
import Google from "../../images/accounts/Google.png";
import { generateState, nowDate } from "../../components/Util";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../api/UserApi";
import { clearAuth, setToken } from "../../slices/auth";
import moment from "moment-timezone";
import { saveUser } from "../../components/LoginIng";
import { pushError } from "../../slices/error";
import { Cookies } from "react-cookie";
import { async } from "q";

export default function Login() {
  const cookie = new Cookies();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const KakaoApiKey = process.env.REACT_APP_KAKAO_API;

  const kakaoRectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL;

  const googleRedirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPwFlag, setShowPwFlag] = useState(false);
  const [isChecked, setIsChecked] = useState(
    cookie.get("wipoEmail") ? true : false
  );
  const [email, setEmail] = useState(cookie["wipoEmail"] || "");
  const [password, setPassword] = useState("");
  const [emailErrFlag, setEmailErrFlag] = useState(false);
  const [pwErrFlag, setPwErrFlag] = useState(false);

  useEffect(() => {
    const tokenLogin = async () => {
      const res = await dispatch(saveUser());
      if (res) {
        const { status, data } = res.payload;
        if (status === 200) {
          navigate(data);
        } else {
          cookie.remove("jwtToken", { path: "/" });
          navigate("/");
        }
      } else {
        cookie.remove("jwtToken", { path: "/" });
      }
    };

    if (cookie.get("jwtToken")) {
      tokenLogin();
    } else {
      navigate("/");
    }
  }, []);

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailErrFlag(false);
    if (isChecked) {
      cookie.set("wipoEmail", value, { maxAge: 30 * 24 * 60 * 60 });
    } else {
      cookie.remove("wipoEmail", { path: "/" });
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPwErrFlag(false);
  };

  const handleEndIconClick = () => {
    setShowPwFlag((prev) => !prev);
  };

  const handleCheckboxChange = (event) => {
    const target = event.target.checked;
    const date = new Date();
    if (target) {
      cookie.set("wipoEmail", email, {
        expires: date.setFullYear(date.getFullYear() + 10),
      });
    } else {
      cookie.remove("wipoEmail", { path: "/" });
    }
    setIsChecked((prev) => !prev);
  };

  const handleSignupClick = () => {
    navigate("/Signup");
  };

  const handleFindIdClick = () => {
    navigate("/FindId");
  };

  const handleFindPwClick = () => {
    navigate("/FindPw");
  };

  const handleKakaoLogin = () => {
    clearAuth();
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoApiKey}&redirect_uri=${kakaoRectUrl}&response_type=code`;

    window.location.href = kakaoURL;
  };

  const handleGoogleLogin = () => {
    clearAuth();
    const googleUri = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=consent&client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&access_type=offline&state=${generateState()}`;
    window.location.href = googleUri;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearAuth();
    const isValidEmail = validateEmail(email);
    setEmailErrFlag(!isValidEmail);

    if (!password) {
      setPwErrFlag(true);
    }
    try {
      if (isValidEmail && !pwErrFlag) {
        const formData = { email: email, password: password };
        const loginAction = await dispatch(login(formData)).unwrap();
        if (loginAction?.status === 200) {
          const tokenPayload = await tokenSave(loginAction?.data?.data);
          if (tokenPayload) {
            const ret = await dispatch(saveUser()).unwrap();
            const { status, data } = ret;
            if (status === 200) {
              navigate(data);
            }
          } else {
            pushError({
              type: "login",
              error: "토큰없음",
              status: 400,
              time: nowDate(),
            });
          }
        } else {
          return;
        }
      }
    } catch (error) {
      pushError({
        type: "login",
        error: error?.message?.data || "로그인에러",
        status: error?.status || 400,
        time:
          moment(error?.message?.resDate).format("YYYY-MM-DD HH:mm:ss") ||
          nowDate(),
      });
    }
  };

  const tokenSave = async (token) => {
    if (token) {
      const data = token.split(";");

      cookie.set("jwtToken", data[0], {
        httpOnly: false,
        expires: new Date(Date.now() + Number(data[1]) * 1000),
      });
      return "Y";
    } else {
      return null;
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };
  if (cookie.get("jwtToken")) return <Loading />;
  return (
    <div
      className="min-h-screen w-screen bg-white bg-center bg-contain bg-no-repeat flex justify-center items-center"
      style={{
        backgroundImage: `url(${LoginBack})`,
      }}
    >
      <img
        src={Logo}
        alt="Logo"
        className="absolute inset-7"
        style={{ width: "10%" }}
      />
      <div className="w-1/4 min-h-2/4 border border-gray-100 border-solid rounded-2xl backdrop-blur-md flex flex-col justify-center items-center p-8">
        <AccountTitle text="LOGIN" />
        <form onSubmit={handleSubmit} className="mt-8 w-full">
          <LoginInput
            id="email"
            placeholder="Email"
            value={email}
            handleInputChange={handleEmailChange}
            startIcon={FiUser}
            errFlag={emailErrFlag}
          />
          <LoginInput
            id="password"
            placeholder="Password"
            type={showPwFlag ? "text" : "password"}
            handleInputChange={handlePasswordChange}
            startIcon={FiLock}
            endIcon={showPwFlag ? FiEyeOff : FiEye}
            clickEndIcon={handleEndIconClick}
            errFlag={pwErrFlag}
          />
          <div className="w-full mt-3">
            <CheckboxS
              text="아이디 저장"
              checked={isChecked}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <AccountButton text="로그인" />
        </form>
        <div className="w-full flex justify-between mt-3 ">
          <AccountText text="회원가입" handleClick={handleSignupClick} />
          <div className="flex space-x-2">
            <AccountText text="계정 찾기" handleClick={handleFindIdClick} />
            <AccountText text="비밀번호 찾기" handleClick={handleFindPwClick} />
          </div>
        </div>
        <div className="w-full mt-10">
          <Divider text="간편 로그인" />
        </div>
        <div className="w-full mt-10 flex justify-evenly">
          <img
            src={Kakao}
            alt="kakao"
            className="w-1/8 cursor-pointer"
            onClick={handleKakaoLogin}
          />
          <img
            src={Google}
            alt="kakao"
            className="w-1/8 cursor-pointer"
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
}
