import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaLocationDot, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { LocationDropDown } from "../../components/DropDown";
import { getSearchedPlaces } from "../../api/PlaceApi";
import LocationPage from "./LocationPage";
import KakaoMap from "../../components/KakaoMap";
import {
  kakaoNextPage,
  kakaoSearchAddress,
  kakaoSearchKeyword,
} from "../../components/Util";

export default function SelectLocation({ onClose, setPlace }) {
  const [location, setLocation] = useState("");
  const [autoList, setAutoList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [selectedData, setSelectedData] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({});

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (location === "") {
        setAutoList([]);
      } else {
        // location 값으로 검색
        getSearchedPlaces(location)
          .then((result) => result && setAutoList(result))
          .catch((error) => setAutoList([]));
      }
    }, 200); // 1.5초 대기

    return () => clearTimeout(debounceTimeout);
  }, [location]);
  const debouncedSearch = useCallback(
    async ({ value, count }, callback) => {
      const result = await kakaoSearchKeyword(value, count);
      callback(result); // 결과를 콜백으로 전달
    },
    [] // 1500ms 지연
  );
  const debouncedAddress = useCallback(
    async (value, callback) => {
      const result = await kakaoSearchAddress(value);
      callback(result); // 결과를 콜백으로 전달
    },
    [] // 1500ms 지연
  );
  const searchProc = async (value) => {
    if (value) {
      setLocationList([]); // 기존 데이터 초기화
      debouncedAddress(value, (addrData) => {
        debouncedSearch(
          {
            value: value,
            count: addrData.data.length > 0 ? addrData.data.length : 0,
          },
          (searchData) => {
            const mergeData = {
              data: [...(addrData.data || []), ...(searchData.data || [])],
              page: {
                addrPagination: addrData.page,
                searchPagination: searchData.page,
              },
            };
            const addrCount = mergeData.page.addrPagination
              ? mergeData.page.addrPagination.totalCount
              : 0;
            const searchCount = mergeData.page.searchPagination
              ? mergeData.page.searchPagination.totalCount
              : 0;
            const emptyArray = addrCount + searchCount - mergeData.data.length;
            const mergeCount = mergeData.data.length;
            for (var i = 0; i < emptyArray; i++) {
              const emptyData = {
                id: mergeCount + i,
                placeName: "",
                addressName: "",
                x: 0,
                y: 0,
                region_1depth_name: "",
                region_2depth_name: "",
                region_3depth_name: "",
                favFlag: "N",
                type: "K",
              };

              mergeData.data.push(emptyData);
            }
            setLocationList(mergeData);
          }
        );
      });
    }
  };

  useEffect(() => {
    // 선택된 값으로 다시 검색? 아님 걍 남은 데이터
    if (selectedData !== "") {
      //자동완성 선택
      searchProc(selectedData);

      setLocation(selectedData);
    }
  }, [selectedData]);

  const handleSearch = () => {
    // location에 담긴 값으로 검색
    //서치
    searchProc(location);
  };

  const selectLocation = (value) => {
    if (value) {
      setPlace(value);
      setSelectedLocation(value);
    }
  };

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const changePage = async (value) => {
    if (locationList?.page?.searchPagination) {
      const filterCount = locationList.data.filter((item) => item.type !== "K");
      const result = await kakaoNextPage(location, value, filterCount.length);
      const mergeArray = locationList.data.map((item) => {
        const matchItem = result.data.find((itemB) => itemB.id === item.id);

        if (matchItem) {
          return { ...item, ...matchItem };
        }
        return item;
      });
      setLocationList((prevData) => ({
        ...prevData,
        data: mergeArray,
        page: { ...prevData.page, searchPagination: result.page },
      }));
    }
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
            value={location}
            startIcon={FaLocationDot}
            endIcon={FaMagnifyingGlass}
            placeholder="장소를 검색해보세요"
            handleInputChange={handleLocationChange}
            clickEndIcon={handleSearch}
            list={autoList}
            setData={setSelectedData}
          />
        </div>
        <div className="w-full mt-10 h-[50vh] flex space-x-3 relative justify-center">
          <div className="border w-1/3 h-full flex flex-col">
            <LocationPage
              locationList={locationList}
              setLocationList={setLocationList}
              setData={selectLocation}
              nextClick={changePage}
            />
          </div>

          <KakaoMap className="border w-2/3" selectLoc={selectedLocation} />
        </div>
      </div>
    </div>
  );
}
