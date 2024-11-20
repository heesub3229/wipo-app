import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import { LoginInput } from "../../components/TextField";
import { AccountButton } from "../../components/Buttons";
import { CheckboxS } from "../../components/Checkbox";
import { Divider } from "../../components/Common";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";
import Kakao from "../../images/accounts/Kakao.png";
import Naver from "../../images/accounts/Naver.png";
import Google from "../../images/accounts/Google.png";
import { generateState } from "../../components/Util";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function Login() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const KakaoApiKey = process.env.REACT_APP_KAKAO_API;

  const kakaoRectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL;

  const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const naverRedirectUri = process.env.REACT_APP_NAVER_REDIRECT_URL;
  const navigate = useNavigate();
  const [showPwFlag, setShowPwFlag] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrFlag, setEmailErrFlag] = useState(false);
  const [pwErrFlag, setPwErrFlag] = useState(false);
  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailErrFlag(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPwErrFlag(false);
  };

  const handleEndIconClick = () => {
    setShowPwFlag((prev) => !prev);
  };

  const handleCheckboxChange = () => {
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
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoApiKey}&redirect_uri=${kakaoRectUrl}&response_type=code`;

    window.location.href = kakaoURL;
  };

  const handleNaverLogin = () => {
    // const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${naverRedirectUri}&state=${generateState()}`;
    // window.location.href = naverAuthUrl;
  };

  const handleGoogleLogin = () => {};

  const handleSubmit = () => {
    const isValidEmail = validateEmail(email);
    setEmailErrFlag(!isValidEmail);

    if (!password) {
      setPwErrFlag(true);
    }

    if (isValidEmail && !pwErrFlag) {
      // 처음 로그인
      navigate("/FirstLogin");
      // 로그인
      // navigate("/Main");
    } else {
      // 에러
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  return (
    <div
      className="min-h-screen w-screen bg-center bg-contain bg-no-repeat flex justify-center items-center"
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
          <AccountButton text="로그인" handleClick={handleSubmit} />
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
            src={Naver}
            alt="kakao"
            className="w-1/8 cursor-pointer"
            onClick={handleNaverLogin}
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
