import React, { useEffect, useState } from "react";
import { FaLocationDot, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { LocationDropDown } from "../../components/DropDown";
import LocationPage from "./LocationPage";
// import FavPlaces from "./FavPlaces";

const autoEx = [
  {
    id: 1,
    addressName: "서울 종로구 세종로 1-1",
    placeName: "경복궁",
  },
  {
    id: 2,
    addressName: "서울 강북구 우이동 산 40-1",
    placeName: "북한산둘레길 1구간소나무숲길",
  },
  {
    id: 3,
    addressName: "서울 서대문구 홍은동",
    placeName: "북한산둘레길 7구간옛성길",
  },
];

const locationEx = [
  {
    id: 1,
    addressName: "서울 종로구 세종로 1-1",
    placeName: "경복궁",
  },
  {
    id: 2,
    addressName: "서울 강북구 우이동 산 40-1",
    placeName: "북한산둘레길 1구간소나무숲길",
  },
  {
    id: 3,
    addressName: "서울 서대문구 홍은동",
    placeName: "북한산둘레길 7구간옛성길",
  },
  {
    id: 4,
    addressName: "서울 종로구 세종로 1-1",
    placeName: "경복궁",
  },
  {
    id: 5,
    addressName: "서울 강북구 우이동 산 40-1",
    placeName: "북한산둘레길 1구간소나무숲길",
  },
  {
    id: 6,
    addressName: "서울 서대문구 홍은동",
    placeName: "북한산둘레길 7구간옛성길",
  },
  {
    id: 7,
    addressName: "서울 종로구 세종로 1-1",
    placeName: "경복궁",
  },
  {
    id: 8,
    addressName: "서울 강북구 우이동 산 40-1",
    placeName: "북한산둘레길 1구간소나무숲길",
  },
  {
    id: 9,
    addressName: "서울 서대문구 홍은동",
    placeName: "북한산둘레길 7구간옛성길",
  },
  {
    id: 10,
    addressName: "서울 종로구 세종로 1-1",
    placeName: "경복궁",
  },
  {
    id: 11,
    addressName: "서울 강북구 우이동 산 40-1",
    placeName: "북한산둘레길 1구간소나무숲길",
  },
  {
    id: 12,
    addressName: "서울 서대문구 홍은동",
    placeName: "북한산둘레길 7구간옛성길",
  },
];

export default function SelectLocation({ onClose, setPlace }) {
  const [location, setLocation] = useState("");
  const [autoList, setAutoList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [selectedData, setSelectedData] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    if (location === "") {
      setAutoList([]);
    } else {
      //location 값으로 검색
      setAutoList(autoEx);
    }
  }, [location]);

  useEffect(() => {
    // 선택된 값으로 다시 검색? 아님 걍 남은 데이터
    if (selectedData !== "") {
      setLocationList(locationEx);
    }
  }, [selectedData]);

  useEffect(() => {
    if (selectedLocation !== "") {
      setPlace(selectedLocation);
      //최종 선택 값 지도에 표시
    }
  }, [selectedLocation]);

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  return (
    <div className="w-[50vw] min-h-[80vh] max-h-[80vh] bg-white p-10 rounded-md shadow-lg flex flex-col justify-center items-center overflow-y-auto relative">
      <div className="absolute inset-0 w-full h-[4vh] bg-indigo-900 flex items-center justify-end px-2">
        <div
          className="text-white text-xl hover:bg-indigo-700 rounded-full p-1 cursor-pointer"
          onClick={() => onClose()}
        >
          <FaXmark />
        </div>
      </div>
      <div className="w-[90%] mt-5 flex flex-col items-center">
        <div className="w-full">
          <LocationDropDown
            startIcon={FaLocationDot}
            endIcon={FaMagnifyingGlass}
            placeholder="장소를 검색해보세요"
            handleInputChange={handleLocationChange}
            list={autoList}
            setData={setSelectedData}
          />
        </div>
        <div className="w-full mt-10 h-[50vh] flex space-x-3 relative justify-center">
          <div className="border w-1/3 h-full flex flex-col">
            <LocationPage
              locationList={locationList}
              setData={setSelectedLocation}
            />
            {/* {selectedData !== "" ? (
              <LocationPage
                locationList={locationList}
                setData={setSelectedLocation}
              />
            ) : (
              <FavPlaces setData={setSelectedLocation} />
            )} */}
          </div>

          <div className="border w-2/3">
            {/* 너무 횡해보여서 일단 넣어본 이미지 지도로 대체해주세여 */}
            <img
              className="w-full h-full"
              src="https://i.namu.wiki/i/VeP1_Nyz7btM5HnLJJ7vkAjLITQcQk4ISx6GC13LRMH8cpBT3lrU1g15DYstyoBFpEqwYSZRS0Dvraes8pDkCg.webp"
              alt="test"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
