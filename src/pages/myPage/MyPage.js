import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPen,
  FaRegEnvelope,
  FaCakeCandles,
  FaCheck,
  FaXmark,
  FaPaintbrush,
  FaWonSign,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { UnderLineDateInput, UnderLineInput } from "../../components/TextField";
import { formatDate } from "../../components/Common";
import { CancelBtn } from "../../components/Buttons";
import { setProfile } from "../../api/UserApi";
import { changeUserInfo } from "../../slices/auth";
import { getFile } from "../../components/Util";
import { UnderLineDropDown } from "../../components/DropDown";
// import { editUserInfo } from "../../slices/auth";

export default function MyPage({ userInfo, onClose }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [defaultDay, setDefaultDay] = useState(
    useSelector((state) => state.auth.defaultDay)
  );
  const [color, setColor] = useState(userInfo.profileColor || "Purple");
  const [showPalette, setShowPalette] = useState(false);
  const [onOffPalette, setOnOffPalette] = useState(false);

  useEffect(() => {
    if (userInfo?.name) {
      setName(userInfo?.name);
    }
    if (userInfo?.email) {
      setEmail(userInfo?.email);
    }
    if (userInfo?.dateBirth) {
      setYear(userInfo?.dateBirth.slice(0, 4));
      setMonth(userInfo?.dateBirth.slice(4, 6));
      setDate(userInfo?.dateBirth.slice(6));
    }
    if (userInfo?.color) {
      setColor(userInfo?.color);
    }
    if (userInfo?.defaultDay) {
      setDefaultDay(userInfo?.defaultDay);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.file.filepath) {
      const convTemp = getFile(userInfo.file.filepath);
      setImagePre(convTemp);
    }
  }, [userInfo.file]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      const fileURL = URL.createObjectURL(file);
      setImagePre(fileURL);
    }
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleDateChange = (value) => {
    value = value.replace(/[^0-9]/g, "");
    let formattedValue = value
      .slice(0, 8)
      .replace(/(\d{4})(\d{0,2})(\d{0,2})/, (_, y, m, d) => {
        return `${y}${m ? ` . ${m}` : ""}${d ? ` . ${d}` : ""}`;
      });
    setDate(formattedValue);
  };

  const colorMap = {
    Red: "bg-red-200",
    Yellow: "bg-yellow-200",
    Green: "bg-green-200",
    Blue: "bg-blue-200",
    Purple: "bg-purple-200",
  };

  const handlePaletteClick = () => {
    setShowPalette((prev) => !prev);
    setOnOffPalette(true);
    setTimeout(() => {
      setOnOffPalette(false);
    }, 400);
  };

  const handleColorChange = (value) => {
    setColor(value);
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    const cleanDate =
      String(year) +
      String(month).padStart(2, "0") +
      String(date).padStart(2, "0");

    if (cleanDate) {
      formData.append("dateBirth", cleanDate);
    }
    if (color) {
      formData.append("color", color);
    }
    if (image) {
      formData.append("image", image);
    }
    if (defaultDay) {
      formData.append("defaultDay", String(defaultDay));
    }

    const res = await dispatch(setProfile(formData));
    if (res) {
      const { data, status } = res.payload;
      if (status === 200) {
        dispatch(changeUserInfo(data.data));
        onClose();
      }
    }
  };

  return (
    <div className="relative w-[500px] h-[680px] bg-white mt-5 shadow-md rounded-md">
      <div
        className={`absolute w-full ${
          colorMap[color] || "bg-purple-200"
        } h-[220px] rounded-t-md px-2 pt-2 flex justify-end space-x-1`}
      >
        <div
          className="w-8 h-8 rounded-full hover:bg-gray-50 hover:bg-opacity-30 text-lg text-green-700 flex justify-center items-center cursor-pointer"
          onClick={() => handleSaveClick()}
        >
          <FaCheck />
        </div>
        <div
          className="w-8 h-8 rounded-full hover:bg-gray-50 hover:bg-opacity-30 text-lg text-red-700 flex justify-center items-center cursor-pointer"
          onClick={() => onClose()}
        >
          <FaXmark />
        </div>
        <div className="absolute bottom-2 right-2 flex items-center">
          <div
            className={`flex space-x-2 bg-gray-100 rounded-full py-1 px-3 bg-opacity-30 transform transition-all duration-500  ${
              showPalette ? "opacity-100" : "delay-[400ms] opacity-0"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full bg-red-200 cursor-pointer shadow-md transform transition-transform hover:-translate-y-1 duration-500  ${
                showPalette ? "delay-[400ms]  scale-100" : "delay-[0ms] scale-0"
              } ${!onOffPalette && "!delay-0 !duration-150"}`}
              onClick={() => handleColorChange("Red")}
            />
            <div
              className={`w-7 h-7 rounded-full bg-yellow-200 cursor-pointer shadow-md transform transition-transform hover:-translate-y-1  duration-500  ${
                showPalette
                  ? "delay-[300ms]  scale-100"
                  : "delay-[100ms] scale-0"
              } ${!onOffPalette && "!delay-0 !duration-150"}`}
              onClick={() => handleColorChange("Yellow")}
            />
            <div
              className={`w-7 h-7 rounded-full bg-green-200 cursor-pointer shadow-md transform transition-transform hover:-translate-y-1  duration-500  ${
                showPalette
                  ? "delay-[200ms]  scale-100"
                  : "delay-[200ms] scale-0"
              } ${!onOffPalette && "!delay-0 !duration-150"}`}
              onClick={() => handleColorChange("Green")}
            />
            <div
              className={`w-7 h-7 rounded-full bg-blue-200 cursor-pointer shadow-md transform transition-transform hover:-translate-y-1  duration-500  ${
                showPalette
                  ? "delay-[100ms]  scale-100"
                  : "delay-[300ms] scale-0"
              } ${!onOffPalette && "!delay-0 !duration-150"}`}
              onClick={() => handleColorChange("Blue")}
            />
            <div
              className={`w-7 h-7 rounded-full bg-purple-200 cursor-pointer shadow-md transform transition-transform hover:-translate-y-1  duration-500  ${
                showPalette ? "delay-[0ms]  scale-100" : "delay-[400ms] scale-0"
              } ${!onOffPalette && "!delay-0 !duration-150"}`}
              onClick={() => handleColorChange("Purple")}
            />
          </div>
          <div
            className="w-8 h-8 rounded-full text-lg text-gray-500 hover:text-gray-600 flex justify-center items-center cursor-pointer"
            onClick={() => handlePaletteClick()}
          >
            <FaPaintbrush />
          </div>
        </div>
      </div>
      <div className="absolute w-52 h-52 bg-white rounded-full shadow-md top-32 left-5 flex justify-center items-center">
        {!imagePre ? (
          <div className="w-48 bg-gray-100 h-48 rounded-full flex justify-center items-center text-8xl text-gray-600 select-none">
            <FaUser />
          </div>
        ) : (
          <img
            className="w-48 h-48 rounded-full flex justify-center items-center select-none"
            src={imagePre}
            alt="Profile"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="absolute bottom-0 right-0 text-2xl text-gray-600 p-4 bg-gray-200 rounded-full opacity-70 hover:opacity-90 cursor-pointer"
        >
          <FaPen />
        </label>
      </div>
      <div className="pt-[250px] ">
        <p className="pl-[270px] font-bold text-2xl">{name}</p>
        <div className="mt-[60px] w-full flex justify-center items-center">
          <div className="w-4/5">
            <UnderLineInput
              value={email}
              startIcon={FaRegEnvelope}
              handleInputChange={handleEmailChange}
              textSize="text-lg"
              readOnly={true}
            />
            <div className="flex space-x-2">
              <UnderLineDropDown
                id="year"
                type="year"
                value={year && year}
                setData={setYear}
                startIcon={FaCakeCandles}
                placeholder="Year"
                textSize="text-lg"
              />
              <UnderLineDropDown
                id="month"
                type="month"
                value={month && month}
                setData={setMonth}
                placeholder="Month"
                textSize="text-lg"
              />
              <UnderLineDropDown
                id="date"
                type="date"
                value={date && date}
                setData={setDate}
                placeholder="Date"
                textSize="text-lg"
              />
            </div>
            <div className="w-2/5">
              <UnderLineDropDown
                id="date"
                type="date"
                value={defaultDay && defaultDay}
                setData={setDefaultDay}
                startIcon={FaWonSign}
                textSize="text-lg"
              />
            </div>

            {defaultDay === 1 ? (
              <p className="text-sm mt-1">
                * 가계부 기준일 설정 | 현재 예시 : 5월 1일 ~ 4월 30일
              </p>
            ) : (
              <p className="text-sm mt-1">
                * 가계부 기준일 설정 | 현재 예시 : 5월 {defaultDay}일 ~ 6월{" "}
                {defaultDay - 1}일
              </p>
            )}
          </div>
        </div>
        {/* 총 포스팅 수, 친구 수 */}
        <div className="pt-[30px] flex justify-evenly items-center">
          <div className="flex flex-col justify-center items-center space-y-2">
            <p className="font-bold text-gray-700">Posting</p>
            <p>16</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <p className="font-bold text-gray-700">Following</p>
            <p>{userInfo?.friendsLength}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
