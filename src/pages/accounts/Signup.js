import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import { LoginInput } from "../../components/TextField";
import { LoginDropDown } from "../../components/DropDown";
import { AccountButton } from "../../components/Buttons";
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
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const [showPwFlag, setShowPwFlag] = useState(false);
  const [showCkPwFlag, setShowCkPwFlag] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chkPassword, setChkPassword] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [nameErrFlag, setNameErrFlag] = useState(false);
  const [emailErrFlag, setEmailErrFlag] = useState(false);
  const [pwErrFlag, setPwErrFlag] = useState(false);
  const [chkPwErrFlag, setChkPwErrFlag] = useState(false);
  const [pwMissMatch, setPwMissMatch] = useState(false);
  const [yearErrFlag, setYearErrFlag] = useState(false);
  const [monthErrFlag, setMonthErrFlag] = useState(false);
  const [dateErrFlag, setDateErrFlag] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (year) {
      setYearErrFlag(false);
    }

    if (month) {
      setMonthErrFlag(false);
    }

    if (date) {
      setDateErrFlag(false);
    }
  }, [year, month, date]);
  const handleNameChange = (value) => {
    setName(value);
    setNameErrFlag(false);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailErrFlag(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPwErrFlag(false);
    if (value !== chkPassword) {
      setPwMissMatch(true);
    } else {
      setPwMissMatch(false);
    }
  };

  const handleChkPasswordChange = (value) => {
    setChkPassword(value);
    setChkPwErrFlag(false);

    if (value !== password) {
      setPwMissMatch(true);
    } else {
      setPwMissMatch(false);
    }
  };

  const handlePwShowClick = () => {
    setShowPwFlag((prev) => !prev);
  };

  const handleCkPwShowClick = () => {
    setShowCkPwFlag((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateType(name, "name")) {
      setNameErrFlag(true);
    } else {
      setNameErrFlag(false);
    }

    if (!validateType(email, "email")) {
      setEmailErrFlag(true);
    } else {
      setEmailErrFlag(false);
    }

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

    if (!year) {
      setYearErrFlag(true);
    }
    if (!month) {
      setMonthErrFlag(true);
    }
    if (!date) {
      setDateErrFlag(true);
    }

    if (!pwErrFlag) {
      // 로그인
    } else {
      // 에러
    }
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
          <div className="flex space-x-2">
            <LoginDropDown
              id="year"
              type="year"
              value={year && year}
              setData={setYear}
              startIcon={FiCalendar}
              placeholder="Year"
              errFlag={yearErrFlag}
            />
            <LoginDropDown
              id="month"
              type="month"
              value={month && month}
              setData={setMonth}
              placeholder="Month"
              errFlag={monthErrFlag}
            />
            <LoginDropDown
              id="date"
              type="date"
              value={date && date}
              setData={setDate}
              placeholder="Date"
              errFlag={dateErrFlag}
            />
          </div>
          <div className="w-full mt-3">
            <div onClick={() => handleOpenModal()}>
              <CheckboxS text="개인 정보 수집 동의" checked={isChecked} />
            </div>
          </div>
          <AccountButton text="회원가입" />
        </form>
        <div className="w-full flex mt-3 ">
          <AccountText text="로그인" handleClick={handleLoginClick} />
        </div>
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <PrivacyPolicy
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
      </Modal>
    </div>
  );
}
