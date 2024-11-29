import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import { LoginInput, VerCodeInput } from "../../components/TextField";
import { LoginDropDown } from "../../components/DropDown";
import { AccountButton, AccountButton2 } from "../../components/Buttons";
import { FiLock, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { changePass } from "../../api/UserApi";
import { nowDate } from "../../components/Util";
import { pushError } from "../../slices/error";

export default function ResetPw() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPwFlag, setShowPwFlag] = useState(false);
  const [showCkPwFlag, setShowCkPwFlag] = useState(false);
  const [password, setPassword] = useState("");
  const [chkPassword, setChkPassword] = useState("");
  const [pwErrFlag, setPwErrFlag] = useState(false);
  const [chkPwErrFlag, setChkPwErrFlag] = useState(false);
  const [pwMissMatch, setPwMissMatch] = useState(false);
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (!(authState?.email && authState?.name)) {
      navigate("/FindPw");
    }
  }, [authState]);

  useEffect(() => {
    if (password === chkPassword) {
      setPwMissMatch(false);
    } else {
      setPwMissMatch(true);
    }
  }, [password, chkPassword]);

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPwErrFlag(false);
  };

  const handleChkPasswordChange = (value) => {
    setChkPassword(value);
    setChkPwErrFlag(false);
  };

  const handlePwShowClick = () => {
    setShowPwFlag((prev) => !prev);
  };

  const handleCkPwShowClick = () => {
    setShowCkPwFlag((prev) => !prev);
  };

  const validateType = (value, type) => {
    let pattern = null;
    if (type === "password") {
      pattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    }
    return pattern.test(value);
  };

  const handleResetClick = async () => {
    if (!validateType(password, "password")) {
      setPwErrFlag(true);
    } else {
      setPwErrFlag(false);
    }

    if (!validateType(chkPassword, "password")) {
      setChkPwErrFlag(true);
    } else {
      setChkPwErrFlag(false);
    }
    if (!authState?.email) {
      pushError({
        type: "ResetPw",
        error: "에러",
        status: 400,
        time: nowDate(),
      });
      navigate("/");
      return;
    }
    const passAction = await dispatch(
      changePass({ email: authState?.email, password: password })
    );
    if (passAction?.payload) {
      const passPayload = passAction?.payload;
      if (!passPayload?.data?.errFlag) {
        navigate("/");
      }
    }
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
        <AccountTitle text="RESET PASSWORD" />
        <div className="mt-8 w-full">
          <LoginInput
            id="password"
            placeholder="Password"
            type={showPwFlag ? "text" : "password"}
            handleInputChange={handlePasswordChange}
            startIcon={FiLock}
            endIcon={showPwFlag ? FiEyeOff : FiEye}
            clickEndIcon={handlePwShowClick}
            errFlag={pwErrFlag}
          />
          <p className="font-nanum text-sm text-gray-700">
            * 영문, 숫자, 특수 기호를 포함하여 8글자 이상
          </p>
          <LoginInput
            id="chechkPassword"
            placeholder="Check Password"
            type={showCkPwFlag ? "text" : "password"}
            handleInputChange={handleChkPasswordChange}
            startIcon={FiCheck}
            endIcon={showCkPwFlag ? FiEyeOff : FiEye}
            clickEndIcon={handleCkPwShowClick}
            errFlag={chkPwErrFlag}
          />
          {pwMissMatch && (
            <p className="font-nanum text-sm text-red-600">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>
        <AccountButton2 text="비밀번호 재설정" handleClick={handleResetClick} />
      </div>
    </div>
  );
}
