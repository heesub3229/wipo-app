import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UnderLineInput } from "../../components/TextField";
import { AccountTitle } from "../../components/Typography";
import { FiUser, FiCalendar, FiArrowRight } from "react-icons/fi";
import { LoginDropDown } from "../../components/DropDown";
import { TextButton } from "../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { saveNameBirth } from "../../api/UserApi";
import { saveUserInfo } from "../../slices/auth";
import { pushError } from "../../slices/error";
import { nowDate } from "../../components/Util";

export default function FirstLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [nameErrFlag, setNameErrFlag] = useState(false);
  const [yearErrFlag, setYearErrFlag] = useState(false);
  const [monthErrFlag, setMonthErrFlag] = useState(false);
  const [dateErrFlag, setDateErrFlag] = useState(false);

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("auth", authState);
    if (authState?.name) {
      setName(authState?.name);
    }
    if (authState?.name && authState?.dateBirth && step === 1) {
      navigate("/Main");
    }
  }, [authState, step]);

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

  const handleNextNameClick = async () => {
    const nameAction = await dispatch(
      saveNameBirth({ jwt: authState.jwtToken, name: name, dateBirth: null })
    );
    const retInfo = nameAction.payload?.data?.data;

    if (!retInfo) {
      pushError({
        type: "saveNameBirth",
        error: "정보저장에러",
        status: 400,
        time: nowDate(),
      });
    }

    const retUser = dispatch(saveUserInfo(retInfo));
    if (retUser.payload?.name) {
      setStep(2);
    }
  };

  const handleNextBirthClick = async () => {
    const dateBirth =
      String(year) +
      String(month).padStart(2, "0") +
      String(date).padStart(2, "0");
    const dateBirthAction = await dispatch(
      saveNameBirth({
        jwt: authState.jwtToken,
        name: null,
        dateBirth: dateBirth,
      })
    );
    const retInfo = dateBirthAction.payload?.data?.data;
    if (!retInfo) {
      pushError({
        type: "saveNameBirth",
        error: "정보저장에러",
        status: 400,
        time: nowDate(),
      });
    }
    const retUser = dispatch(saveUserInfo(retInfo));
    if (retUser.payload?.dateBirth) {
      setStep(3);
    }
  };

  const handleStartClick = () => {
    navigate("/Main");
  };

  const validateType = (value, type) => {
    let pattern = null;
    if (type === "name") {
      pattern = /^[a-zA-Z가-힣\s]+$/;
      return pattern.test(value);
    }
  };
  return (
    <div className="min-h-screen w-screen bg-back flex justify-center items-center">
      <div className="w-1/3 min-h-2/4 border border-gray-100 border-solid rounded-2xl bg-white flex flex-col justify-center items-center p-8 shadow-md">
        <AccountTitle text="WELCOME" />
        {step === 1 && (
          <>
            <p className="mt-8 font-nanum text-gray-900 font-semibold text-left">
              이름을 입력해주세요.
            </p>
            <UnderLineInput
              id="name"
              placeholder="Name"
              value={name}
              handleInputChange={handleNameChange}
              startIcon={FiUser}
              errFlag={nameErrFlag}
            />
            <TextButton
              text="다음"
              endIcon={FiArrowRight}
              handleClick={handleNextNameClick}
            />
          </>
        )}
        {step === 2 && (
          <>
            <p className="mt-8 font-nanum text-gray-900 font-semibold text-left">
              생년월일을 입력해주세요.
            </p>
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
            <TextButton
              text="다음"
              endIcon={FiArrowRight}
              handleClick={handleNextBirthClick}
            />
          </>
        )}
        {step === 3 && (
          <>
            <p className="mt-8 font-nanum text-gray-900 font-semibold">
              설정이 완료되었습니다.
            </p>
            <TextButton
              text="시작하기"
              endIcon={FiArrowRight}
              handleClick={handleStartClick}
            />
          </>
        )}
      </div>
    </div>
  );
}
