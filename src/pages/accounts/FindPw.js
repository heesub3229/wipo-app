import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import { LoginInput, VerCodeInput } from "../../components/TextField";
import {
  AccountButton2,
  FilledButton,
  OutlinedButton,
} from "../../components/Buttons";
import { FiUser, FiMail } from "react-icons/fi";
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { emailValid, findPass } from "../../api/UserApi";
import { VerifyTimer } from "../../components/Timer";
import { saveUserInfo } from "../../slices/auth";

export default function FindPw() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verCnt, setVerCnt] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameErrFlag, setNameErrFlag] = useState(false);
  const [emailErrFlag, setEmailErrFlag] = useState(false);
  const [code, setCode] = useState("");
  const findPassState = useSelector((state) => state.api.findPass);
  const handleNameChange = (value) => {
    setName(value);
    setNameErrFlag(false);
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

  const handleGetVerCodeClick = async () => {
    // 메일 보내지면
    const passAction = await dispatch(findPass({ email: email, name: name }));

    if (passAction.payload) {
      const passPayload = passAction.payload;
      if (passPayload.status === 200) {
        setVerCnt((prev) => prev + 1);
      }
    }
  };

  const handleVerifyClick = async () => {
    // 인증 되면
    const validAction = await dispatch(
      emailValid({ email: email, code: code })
    );
    if (validAction.payload) {
      const validPayload = validAction.payload;
      if (validPayload.status === 200 && validPayload.data?.errFlag === false) {
        await dispatch(
          saveUserInfo({ email: email, dateBirth: null, name: name })
        );
        navigate("/ResetPw");
      }
    }
  };

  const handleFindIdClick = () => {
    navigate("/FindId");
  };

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
        <AccountTitle text="PASSWORD RECOVERY" />
        <div className="mt-8 w-full">
          <LoginInput
            id="name"
            placeholder="Name"
            value={name}
            handleInputChange={handleNameChange}
            startIcon={FiUser}
            errFlag={nameErrFlag}
          />
          <LoginInput
            id="email"
            placeholder="Email"
            value={email}
            handleInputChange={handleEmailChange}
            startIcon={FiMail}
            errFlag={emailErrFlag}
          />
          {verCnt > 0 ? (
            <div className="mt-5">
              <VerCodeInput text={setCode} />
              <VerifyTimer time={findPassState} />
              <div className="w-full flex space-x-4 mt-4">
                <OutlinedButton
                  text="재전송"
                  handleClick={handleGetVerCodeClick}
                />
                <FilledButton text="인증하기" handleClick={handleVerifyClick} />
              </div>
            </div>
          ) : (
            <AccountButton2
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
          <AccountText text="계정 찾기" handleClick={handleFindIdClick} />
        </div>
      </div>
    </div>
  );
}
