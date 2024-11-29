import React, { useEffect, useState } from "react";
import Header from "../main/Header";
import DatePicker from "../../components/DatePicker";
import { ContentInput, TitleInput } from "../../components/TextField";
import { FaRegCalendar, FaLocationDot } from "react-icons/fa6";
import { LocationDropDown } from "../../components/DropDown";
import RegionFile from "../../data/regionList.csv";
import { fetchRegion } from "../../components/ReadCsv";
import FileUpload from "./FileUpload";
import { FilledButton, OutlinedButton } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";

export default function WritePost() {
  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [imageArr, setImageArr] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchRegion(RegionFile, setRegionList);
  }, []);

  console.log(imageArr);
  useEffect(() => {
    setProvinceList(
      Array.from(
        new Set(
          regionList
            .map((item) => item.province)
            .filter((province) => province && province.trim() !== "")
        )
      ).sort((a, b) => a.localeCompare(b))
    );
  }, [regionList]);

  useEffect(() => {
    setCityList(
      Array.from(
        new Set(
          regionList
            .filter((item) => item.province === province)
            .map((item) => item.city)
            .filter((city) => city && city.trim() !== "")
        )
      ).sort((a, b) => a.localeCompare(b))
    );
  }, [regionList, province]);

  useEffect(() => {
    setTownList(
      Array.from(
        new Set(
          regionList
            .filter((item) => item.city === city)
            .map((item) => item.town)
            .filter((town) => town && town.trim() !== "")
        )
      ).sort((a, b) => a.localeCompare(b))
    );
  }, [regionList, city]);

  const handleOpenDatePicker = () => {
    if (!openDatePicker) {
      setOpenDatePicker(true);
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSaveClick = () => {};

  const handleCancelClick = () => {
    navigator("/Main");
  };
  return (
    <div className="min-h-screen w-screen bg-back flex justify-center items-end pt-10vh">
      <Header />
      <div className="w-4/5 min-h-[90vh] bg-white rounded-t-lg p-10">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-nowrap font-nanum text-xl font-bold w-[90px]">
              언제
            </p>
            <div className="w-[350px] flex flex-col items-start relative">
              <TitleInput
                startIcon={FaRegCalendar}
                handleClick={handleOpenDatePicker}
                value={date.replace(
                  /^(\d{4})(\d{2})(\d{2})$/,
                  `$1년 $2월 $3일`
                )}
              />
              <div className="absolute top-full left-0 z-50">
                <DatePicker
                  isOpen={openDatePicker}
                  setIsOpen={setOpenDatePicker}
                  setDate={setDate}
                />
              </div>
            </div>
          </div>
          <div className="flex w-[12%] space-x-2">
            <FilledButton text="저장" handleClick={handleSaveClick} />
            <OutlinedButton text="취소" handleClick={handleCancelClick} />
          </div>
        </div>
        <div className="w-[800px] flex items-center mt-3">
          <p className="text-nowrap font-nanum text-xl font-bold w-[115px]">
            어디서
          </p>
          <div className="flex space-x-3">
            <LocationDropDown
              startIcon={FaLocationDot}
              list={provinceList}
              value={province}
              setData={setProvince}
              placeholder="도 / 시"
            />
            <LocationDropDown
              list={cityList}
              value={city}
              setData={setCity}
              placeholder="시 / 군 / 구"
            />
            <LocationDropDown
              list={townList}
              value={town}
              setData={setTown}
              placeholder="읍 / 면 / 동"
            />
          </div>
        </div>
        <FileUpload setImageArr={setImageArr} />
        <div className="mt-5">
          <ContentInput
            value={content}
            placeholder="추억을 기록해보세요 :)"
            handleInputChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
}
