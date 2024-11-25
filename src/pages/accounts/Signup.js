import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import {
  LoginInput,
  LoginVerInput,
  VerCodeInput,
} from "../../components/TextField";
import { LoginDropDown } from "../../components/DropDown";
import {
  AccountButton,
  FilledButton,
  OutlinedButton,
} from "../../components/Buttons";
import { CheckboxS } from "../../components/Checkbox";
import { Modal } from "../../components/Modal";
import PrivacyPolicy from "./PrivacyPolicy";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiCalendar,
} from "react-icons/fi";
import { FaExclamation, FaCheck } from "react-icons/fa6";
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";
import { VerifyTimer } from "../../components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { emailAuth, emailValid, asign } from "../../api/UserApi";
import { clearState } from "../../slices/api";
import { addField, resetField } from "../../slices/field";

const key = "Signup";

export default function Signup() {
  const navigate = useNavigate();
  const [verCnt, setVerCnt] = useState(0);
  const dispatch = useDispatch();
  dispatch(resetField());
  const emailValidState = useSelector((state) => state.api.emailValid);
  const asignState = useSelector((state) => state.api.asign);
  const fieldState = useSelector((state) => state.field[key] || {});
  const pushFieldData = (fieldName, value) => {
    dispatch(addField({ key: key, fieldName: fieldName, value: value }));
  };

  useEffect(() => {
    if (emailValidState?.data === false) {
      pushFieldData("isVerified", true);
      dispatch(clearState());
    }
  }, [emailValidState]);

  useEffect(() => {
    if (asignState?.data !== null) {
      if (asignState?.data === false) {
        navigate("/");
      }
    }
  }, [asignState]);

  useEffect(() => {
    if (fieldState["year"]) {
      pushFieldData("yearErrFlag", false);
    }

    if (fieldState["month"]) {
      pushFieldData("monthErrFlag", false);
    }

    if (fieldState["date"]) {
      pushFieldData("dateErrFlag", false);
    }
  }, [fieldState]);
  const handleNameChange = (value) => {
    pushFieldData("name", value);
    pushFieldData("nameErrFlag", false);
  };

  const handleEmailChange = (value) => {
    pushFieldData("email", value);
    pushFieldData("emailErrFlag", false);
  };

  const handlePasswordChange = (value) => {
    pushFieldData("password", value);
    pushFieldData("pwErrFlag", false);
    if (fieldState["chkPassword"] && value !== fieldState["chkPassword"]) {
      pushFieldData("pwMissMatch", true);
    } else {
      pushFieldData("pwMissMatch", false);
    }
  };

  const handleChkPasswordChange = (value) => {
    pushFieldData("chkPassword", value);
    pushFieldData("chkPwErrFlag", false);

    if (fieldState["password"] && value !== fieldState["password"]) {
      pushFieldData("pwMissMatch", true);
    } else {
      pushFieldData("pwMissMatch", false);
    }
  };

  const handleSendMail = () => {
    if (fieldState["email"]) {
      dispatch(emailAuth(fieldState["email"]));
      setVerCnt((prev) => prev + 1);
    }
  };

  const handleClickVerify = () => {
    // 인증 되면
    if (fieldState["email"] && fieldState["code"]) {
      dispatch(
        emailValid({ email: fieldState["email"], code: fieldState["code"] })
      );
    }
  };

  const handlePwShowClick = () => {
    if (fieldState["showPwFlag"]) {
      pushFieldData("showPwFlag", !fieldState["showPwFlag"]);
    }
  };

  const handleCkPwShowClick = () => {
    if (fieldState["showCkPwFlag"]) {
      pushFieldData("showCkPwFlag", !fieldState["showCkPwFlag"]);
    }
  };

  const handleCheckboxChange = () => {
    if (fieldState["isChecked"]) {
      pushFieldData("isChecked", !fieldState["isChecked"]);
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleOpenModal = () => {
    pushFieldData("openModal", true);
  };

  const handleCloseModal = () => {
    pushFieldData("openModal", false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateType(fieldState["name"], "name")) {
      pushFieldData("nameErrFlag", true);

      return;
    } else {
      pushFieldData("nameErrFlag", false);
    }

    if (!validateType(fieldState["email"], "email")) {
      pushFieldData("emailErrFlag", true);

      return;
    } else {
      pushFieldData("emailErrFlag", false);
    }

    if (!validateType(fieldState["password"], "password")) {
      pushFieldData("pwErrFlag", true);

      return;
    } else {
      pushFieldData("pwErrFlag", false);
    }

    if (!validateType(fieldState["chkPassword"], "password")) {
      pushFieldData("chkPwErrFlag", true);
      return;
    } else {
      pushFieldData("chkPwErrFlag", false);
    }

    if (!fieldState["year"]) {
      pushFieldData("yearErrFlag", true);
      return;
    }
    if (!fieldState["month"]) {
      pushFieldData("monthErrFlag", true);
      return;
    }
    if (!fieldState["date"]) {
      pushFieldData("dateErrFlag", true);
      return;
    }

    const formData = {
      name: fieldState["name"],
      email: fieldState["email"],
      password: fieldState["password"],
      birthDate: fieldState["year"] + fieldState["month"] + fieldState["date"],
    };

    dispatch(asign(formData));
  };

  const validateType = (value, type) => {
    let pattern = null;
    if (type === "name") {
      pattern = /^[a-zA-Z가-힣\s]+$/;
    } else if (type === "email") {
      pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    } else if (type === "password") {
      pattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    }
    return pattern.test(value);
  };

  const emailCodeTxt = (value) => {
    pushFieldData("code", value);
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
        <AccountTitle text="SIGNUP" />
        <form onSubmit={handleSubmit} className="mt-8 w-full">
          <LoginInput
            id="name"
            placeholder="Name"
            value={fieldState["name"]}
            handleInputChange={handleNameChange}
            startIcon={FiUser}
            errFlag={fieldState["nameErrFlag"]}
          />
          <LoginVerInput
            id="email"
            placeholder="Email"
            value={fieldState["email"]}
            handleInputChange={handleEmailChange}
            startIcon={FiMail}
            clickVerify={handleSendMail}
            errFlag={fieldState["emailErrFlag"]}
          />
          {fieldState["isVerified"] ? (
            <div className="flex items-center font-nanum text-sm text-green-600 space-x-2">
              <FaCheck />
              <p>인증이 완료되었습니다.</p>
            </div>
          ) : (
            <div className="flex items-center font-nanum text-sm text-red-600 space-x-1">
              <FaExclamation />
              <p>이메일 인증을 진행해주세요.</p>
            </div>
          )}
          {verCnt > 0 && !fieldState["isVerified"] && (
            <div className="my-5">
              <VerCodeInput text={emailCodeTxt} />
              <VerifyTimer />
              <div className="w-full flex space-x-4">
                <OutlinedButton text="재전송" handleClick={handleSendMail} />
                <FilledButton text="인증하기" handleClick={handleClickVerify} />
              </div>
            </div>
          )}
          <LoginInput
            id="password"
            placeholder="Password"
            value={fieldState["password"]}
            type={fieldState["showPwFlag"] ? "text" : "password"}
            handleInputChange={handlePasswordChange}
            startIcon={FiLock}
            endIcon={fieldState["showPwFlag"] ? FiEyeOff : FiEye}
            clickEndIcon={handlePwShowClick}
            errFlag={fieldState["pwErrFlag"]}
          />
          <p className="font-nanum text-sm text-gray-700">
            * 영문, 숫자, 특수 기호를 포함하여 8글자 이상
          </p>
          <LoginInput
            id="chechkPassword"
            placeholder="Check Password"
            value={fieldState["chkPassword"]}
            type={fieldState["showCkPwFlag"] ? "text" : "password"}
            handleInputChange={handleChkPasswordChange}
            startIcon={FiCheck}
            endIcon={fieldState["showCkPwFlag"] ? FiEyeOff : FiEye}
            clickEndIcon={handleCkPwShowClick}
            errFlag={fieldState["chkPwErrFlag"]}
          />
          {fieldState["pwMissMatch"] && (
            <p className="font-nanum text-sm text-red-600">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <div className="flex space-x-2">
            <LoginDropDown
              id="year"
              type="year"
              value={fieldState["year"]}
              setData={(value) => pushFieldData("year", value)}
              startIcon={FiCalendar}
              placeholder="Year"
              errFlag={fieldState["yearErrFlag"]}
            />
            <LoginDropDown
              id="month"
              type="month"
              value={fieldState["month"]}
              setData={(value) => pushFieldData("month", value)}
              placeholder="Month"
              errFlag={fieldState["monthErrFlag"]}
            />
            <LoginDropDown
              id="date"
              type="date"
              value={fieldState["date"]}
              setData={(value) => pushFieldData("date", value)}
              placeholder="Date"
              errFlag={fieldState["dateErrFlag"]}
            />
          </div>
          <div className="w-full mt-3">
            <div onClick={() => handleOpenModal()}>
              <CheckboxS
                text="개인 정보 수집 동의"
                checked={fieldState["isChecked"]}
              />
            </div>
          </div>
          <AccountButton text="회원가입" />
        </form>
        <div className="w-full flex mt-3 ">
          <AccountText text="로그인" handleClick={handleLoginClick} />
        </div>
      </div>

      <Modal isOpen={fieldState["openModal"]} onClose={handleCloseModal}>
        <PrivacyPolicy
          isChecked={fieldState["isChecked"]}
          handleCheckboxChange={handleCheckboxChange}
        />
      </Modal>
    </div>
  );
}
