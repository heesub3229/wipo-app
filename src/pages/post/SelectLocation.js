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
import { useDispatch, useSelector } from "react-redux";
import { async } from "q";
import { setFavMap } from "../../api/MapApi";
import { changeFavPage, pushFavList } from "../../slices/auth";

export default function SelectLocation({ onClose, setPlace }) {
  const authStateFavList = useSelector((state) => state.auth.favList);
  const [location, setLocation] = useState("");
  const [autoList, setAutoList] = useState([]);
  const [locationList, setLocationList] = useState({
    page: authStateFavList.page,
    data: authStateFavList.data,
  });
  const [selectedData, setSelectedData] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({});
  const dispatch = useDispatch();

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
      setLocationList({}); // 기존 데이터 초기화
      debouncedAddress(value, (addrData) => {
        debouncedSearch(
          { value: value, count: addrData.page.totalCount },
          (searchData) => {
            const mergeData = {
              data: [...addrData.data, ...searchData.data],
              page: {
                current: 1,
                totalCount:
                  searchData.page.totalCount + addrData.page.totalCount,
              },
            };
            const emptyArray =
              mergeData.page.totalCount - mergeData.data.length;
            for (var i = 0; i < emptyArray; i++) {
              const emptyData = {
                placeName: "",
                addressName: "",
                x: 0,
                y: 0,
                region_1depth_name: "",
                region_2depth_name: "",
                region_3depth_name: "",
                favFlag: "N",
                type: "T",
              };

              mergeData.data.push(emptyData);
            }

            mergeData.data.forEach((item) => {
              const findItem = authStateFavList.data.find(
                (itemB) =>
                  Number(itemB.x) === Number(item.x) &&
                  Number(itemB.y) === Number(item.y)
              );
              if (findItem) {
                item.favFlag = findItem.favFlag;
              }
            });

            setLocationList(mergeData);
          }
        );
      });
    } else {
      setLocationList({
        data: authStateFavList.data,
        page: authStateFavList.page,
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
    if (location) {
      if (locationList.page?.totalCount) {
        const count = Math.ceil(locationList.page?.totalCount / 10);
        if (count >= value && value > 1) {
          const filterData = locationList.data.filter(
            (item) => item.type === "R"
          );
          const result = await kakaoNextPage(location, value);
          const mergeArray = locationList.data.map((item, indexA) => {
            const mergeData = result.data.find(
              (itemB, indexB) =>
                indexA === indexB + filterData.length + (value - 1) * 10
            );
            if (mergeData) {
              const findFavData = authStateFavList.data.find(
                (itemC) =>
                  Number(itemC.x) === Number(mergeData.x) &&
                  Number(itemC.y) === Number(mergeData.y)
              );
              if (findFavData) {
                return { ...mergeData, favFlag: findFavData.favFlag };
              } else {
                return mergeData;
              }
            } else {
              return item;
            }
          });
          setLocationList((prevData) => ({
            data: mergeArray,
            page: { ...prevData.page, current: value },
          }));
        }
      }
    } else {
      dispatch(changeFavPage(value));
    }
  };

  const clickFag = (value) => {
    if (locationList) {
      const { data, page } = locationList;
      if (data) {
        const findData = data.find(
          (item) => item.x === value.x && item.y === value.y
        );
        if (findData) {
          const addData = {
            ...findData,
            favFlag: findData.favFlag === "Y" ? "N" : "Y",
          };

          dispatch(pushFavList(addData));

          const filterData = data.map((item) => {
            if (item.x === value.x && item.y === value.y) {
              return { ...item, favFlag: item.favFlag === "Y" ? "N" : "Y" };
            } else {
              return item;
            }
          });
          setSelectedLocation(addData);
          setLocationList({ data: filterData, page: page });
        }
      }
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
              setLocationList={clickFag}
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
