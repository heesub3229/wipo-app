import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import { LoginInput, VerCodeInput } from "../../components/TextField";
import { LoginDropDown } from "../../components/DropDown";
import { AccountButton } from "../../components/Buttons";
import { FiUser, FiMail } from "react-icons/fi";
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";

export default function FindPw() {
  const navigate = useNavigate();
  const [verCnt, setVerCnt] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameErrFlag, setNameErrFlag] = useState(false);
  const [emailErrFlag, setEmailErrFlag] = useState(false);
  const handleNameChange = (value) => {
    setName(value);
    setNameErrFlag(false);
  };

  useEffect(() => {
    if (verCnt) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [verCnt]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailErrFlag(false);
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleSignupClick = () => {
    navigate("/Signup");
  };

  const handleGetVerCodeClick = () => {
    // 메일 보내지면
    setVerCnt((prev) => prev + 1);
  };

  const handleVerifyClick = () => {
    // 인증 되면
    navigate("/ResetPw");
  };

  const handleResendClick = () => {
    // 메일 보내지면
    setVerCnt((prev) => prev + 1);
    setTimeLeft(300);
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
        <AccountTitle text="PASSWORD RECOVERY" />
        <div className="mt-8 w-full">
          <LoginInput
            id="name"
            placeholder="Name"
            handleInputChange={handleNameChange}
            startIcon={FiUser}
            errFlag={nameErrFlag}
          />
          <LoginInput
            id="email"
            placeholder="Email"
            handleInputChange={handleEmailChange}
            startIcon={FiMail}
            errFlag={emailErrFlag}
          />
          {verCnt > 0 ? (
            <div className="mt-5">
              <VerCodeInput />
              <p className="font-nanum text-right text-red-600">
                {formatTime(timeLeft)}
              </p>
              {timeLeft === 0 ? (
                <AccountButton
                  text="인증번호 재전송"
                  handleClick={handleResendClick}
                />
              ) : (
                <AccountButton
                  text="인증하기"
                  handleClick={handleVerifyClick}
                />
              )}
            </div>
          ) : (
            <AccountButton
              text="인증번호 받기"
              handleClick={handleGetVerCodeClick}
            />
          )}
        </div>
        <div className="w-full flex justify-between mt-3 ">
          <div className="flex space-x-2">
            <AccountText text="로그인" handleClick={handleLoginClick} />
            <AccountText text="회원가입" handleClick={handleSignupClick} />
          </div>
          <AccountText text="계정 찾기" />
        </div>
      </div>
    </div>
  );
}
