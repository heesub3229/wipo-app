import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTitle, AccountText } from "../../components/Typography";
import { LoginInput } from "../../components/TextField";
import { LoginDropDown } from "../../components/DropDown";
import { AccountButton } from "../../components/Buttons";
import { FiUser, FiCalendar } from "react-icons/fi";
import LoginBack from "../../images/accounts/LoginBack.png";
import Logo from "../../images/accounts/Logo.png";
import { useDispatch } from "react-redux";
import { findEmail } from "../../api/UserApi";
import { changeDateStr } from "../../components/Util";

export default function FindId() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [findFlag, setFindFlag] = useState(false);
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [nameErrFlag, setNameErrFlag] = useState(false);
  const [yearErrFlag, setYearErrFlag] = useState(false);
  const [monthErrFlag, setMonthErrFlag] = useState(false);
  const [dateErrFlag, setDateErrFlag] = useState(false);
  const handleNameChange = (value) => {
    setName(value);
    setNameErrFlag(false);
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleSignupClick = () => {
    navigate("/Signup");
  };

  const handleFindPwClick = () => {
    navigate("/FindPw");
  };

  const handleFindIdClick = async (event) => {
    event.preventDefault();

    const dateBirth = changeDateStr(year, month, date);

    const findAction = await dispatch(
      findEmail({ name: name, dateBirth: dateBirth })
    );
    const retdata = findAction.payload;

    if (retdata?.status === 200) {
      const retEmail = retdata.data?.data;
      const [id, domain] = retEmail.split("@");
      const visibleId = id.slice(0, -3);
      const maskedId = "***";
      setAccount(`${visibleId}${maskedId}@${domain}`);
      setFindFlag(true);
    }
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
        <AccountTitle text="FIND ACCOUNT" />
        {!findFlag ? (
          <form onSubmit={handleFindIdClick}>
            <div className="mt-8 w-full">
              <LoginInput
                id="name"
                placeholder="Name"
                value={name}
                handleInputChange={handleNameChange}
                startIcon={FiUser}
                errFlag={nameErrFlag}
              />
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
              <AccountButton text="계정 찾기" />
            </div>
          </form>
        ) : (
          <div className="mt-8 w-full bg-gray-50 p-3 rounded-md mb-2">
            <p className="font-nanum text-base text-center mb-2">등록된 계정</p>
            <p className="font-nanum text-lg text-center text-indigo-800">
              {account}
            </p>
          </div>
        )}
        <div className="w-full flex justify-between mt-3 ">
          <div className="flex space-x-2">
            <AccountText text="로그인" handleClick={handleLoginClick} />
            <AccountText text="회원가입" handleClick={handleSignupClick} />
          </div>
          <AccountText text="비밀번호 찾기" handleClick={handleFindPwClick} />
        </div>
      </div>
    </div>
  );
}
