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

export default function Signup() {
  const navigate = useNavigate();
  const [verCnt, setVerCnt] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
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
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const emailValidState = useSelector((state) => state.api.emailValid);
  const asignState = useSelector((state) => state.api.asign);
  const emailAuthState = useSelector((state) => state.api.emailAuth);

  useEffect(() => {
    if (asignState?.data !== null) {
      if (asignState?.data === false) {
        dispatch(clearState());
        navigate("/");
      }
    }
  }, [asignState?.data]);

  useEffect(() => {
    if (year) {
      setYearErrFlag(false);
    }
  }, [year]);
  useEffect(() => {
    if (month) {
      setMonthErrFlag(false);
    }
  }, [month]);
  useEffect(() => {
    if (date) {
      setDateErrFlag(false);
    }
  }, [date]);
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

  const handleSendMail = () => {
    dispatch(emailAuth(email));
    setVerCnt((prev) => prev + 1);
  };

  const handleClickVerify = async () => {
    // 인증 되면
    const validAcion = await dispatch(emailValid({ email: email, code: code }));

    if (validAcion) {
      const validPayload = validAcion?.payload;
      if (validPayload.status === 200) {
        setIsVerified(true);
        dispatch(clearState());
      }
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
      return;
    } else {
      setNameErrFlag(false);
    }

    if (!validateType(email, "email")) {
      setEmailErrFlag(true);
      return;
    } else {
      setEmailErrFlag(false);
    }

    if (!validateType(password, "password")) {
      setPwErrFlag(true);
      return;
    } else {
      setPwErrFlag(false);
    }

    if (!validateType(chkPassword, "password")) {
      setChkPwErrFlag(true);
      return;
    } else {
      setChkPwErrFlag(false);
    }

    if (!year) {
      setYearErrFlag(true);
      return;
    }
    if (!month) {
      setMonthErrFlag(true);
      return;
    }
    if (!date) {
      setDateErrFlag(true);
      return;
    }

    const formData = {
      name: name,
      email: email,
      password: password,
      birthDate:
        String(year) +
        String(month).padStart(2, "0") +
        String(date).padStart(2, "0"),
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
    setCode(value);
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
            value={name}
            handleInputChange={handleNameChange}
            startIcon={FiUser}
            errFlag={nameErrFlag}
          />
          <LoginVerInput
            id="email"
            placeholder="Email"
            value={email}
            handleInputChange={handleEmailChange}
            startIcon={FiMail}
            clickVerify={handleSendMail}
            errFlag={emailErrFlag}
          />
          {isVerified ? (
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
          {verCnt > 0 && !isVerified && (
            <div className="my-5">
              <VerCodeInput text={emailCodeTxt} />
              <VerifyTimer time={emailAuthState} />
              <div className="w-full flex space-x-4 mt-4">
                <OutlinedButton text="재전송" handleClick={handleSendMail} />
                <FilledButton text="인증하기" handleClick={handleClickVerify} />
              </div>
            </div>
          )}
          <LoginInput
            id="password"
            placeholder="Password"
            value={password}
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
            value={chkPassword}
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
              value={year}
              setData={setYear}
              startIcon={FiCalendar}
              placeholder="Year"
              errFlag={yearErrFlag}
            />
            <LoginDropDown
              id="month"
              type="month"
              value={month}
              setData={setMonth}
              placeholder="Month"
              errFlag={monthErrFlag}
            />
            <LoginDropDown
              id="date"
              type="date"
              value={date}
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
