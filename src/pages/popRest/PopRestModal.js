import React, { useCallback, useEffect, useState } from "react";
import {
  LedgerInput,
  LedgerInputFile,
  TitleInput,
} from "../../components/TextField";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LedgerCategory, LocationDropDown } from "../../components/DropDown";
import { useDispatch } from "react-redux";
import { getSearchedPlaces } from "../../api/PlaceApi";
import {
  kakaoNextPage,
  kakaoSearchAddress,
  kakaoSearchKeyword,
  objToStr,
} from "../../components/Util";
import PopRestPage from "./PopRestPage";
import StarRating from "./StarRating";
import {
  LedgerBtnBg,
  LedgerBtnNoBg,
  LedgerCancel,
  LedgerSave,
} from "../../components/Buttons";
import KakaoMap from "../../components/KakaoMap";
import { restSave } from "../../api/RestApi";
import { pushList } from "../../slices/rest";

const categoryData = [
  { code: "A", name: "패스트푸드" },
  { code: "B", name: "카페.디저트" },
  { code: "C", name: "치킨" },
  { code: "D", name: "피자" },
  { code: "E", name: "돈까스.회" },
  { code: "F", name: "찜.탕" },
  { code: "G", name: "중식" },
  { code: "H", name: "한식" },
  { code: "I", name: "분식" },
  { code: "J", name: "고기" },
  { code: "K", name: "양식" },
  { code: "L", name: "족발.보쌈" },
  { code: "M", name: "아시안" },
  { code: "N", name: "야식" },
  { code: "O", name: "도시락" },
];

const initFormData = {
  name: "",
  address: "",
  menu: "",
  category: "",
  remark: "",
  file: null,
  rating: 0,
};

const initLocationList = {
  page: null,
  data: null,
};

export default function PopRestModal({ data, onClose }) {
  const [location, setLocation] = useState("");
  const [autoList, setAutoList] = useState([]);
  const [locationList, setLocationList] = useState(initLocationList);
  const [selectedData, setSelectedData] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({});
  const [step, setStep] = useState(1);
  const [formData, setFromData] = useState(initFormData);
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
      setLocationList(initLocationList); // 기존 데이터 초기화
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

            setLocationList(mergeData);
          }
        );
      });
    } else {
      setLocationList(initLocationList);
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
      if (Object.keys(value).includes("placeName")) {
        setLocation(value.placeName);
        setFromData((item) => ({ ...item, name: value.placeName }));
      }
      if (Object.keys(value).includes("addressName")) {
        setFromData((item) => ({ ...item, address: value.addressName }));
      }
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
              return mergeData;
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
    }
  };

  const fileUp = (value) => {
    if (value) {
      setFromData((item) => ({ ...item, file: value }));
    } else {
      setFromData((item) => ({ ...item, file: null }));
    }
  };

  const saveClick = async () => {
    const saveData = new FormData();

    const dto = {
      restaurant: {
        category: formData.category,
        placeName: formData.address,
        menuName: formData.menu,
        memo: formData.remark,
        rating: formData.rating,
      },
      map: selectedLocation,
    };

    saveData.append(
      "data",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    saveData.append("file", formData.file);

    const res = await dispatch(restSave(saveData));

    if (res.payload) {
      const { status } = res.payload;
      if (status === 200) {
        const { data, errFlag } = res.payload.data;
        if (errFlag === false) {
          const restRes = dispatch(pushList(data)).payload;
          if (!restRes) {
            onClose();
          }
        }
      }
    }
  };

  return (
    <div className="relative grid p-10 overflow-hidden w-[500px] h-[680px] bg-white shadow-md rounded-md">
      <div
        className={`col-start-1 row-start-1 inset-0 transition-all duration-500 ${
          step === 1
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
        }
        `}
      >
        <div className="h-[8%]">
          <LocationDropDown
            value={location}
            endIcon={FaMagnifyingGlass}
            placeholder="맛집 검색하기"
            handleInputChange={handleLocationChange}
            clickEndIcon={handleSearch}
            list={autoList}
            setData={setSelectedData}
          />
        </div>
        <div className="mt-1 justify-items-center w-full">
          <KakaoMap
            className="border w-[20vw] h-[27vh]"
            selectLoc={selectedLocation}
          />
        </div>
        <div className="w-full mt-1 h-[27vh] flex space-x-3 relative justify-center">
          <div className="border w-full flex flex-col">
            <PopRestPage
              locationList={locationList}
              setData={selectLocation}
              nextClick={changePage}
            />
          </div>
        </div>
        <div className="absolute flex space-x-2 bottom-1 right-1">
          <LedgerBtnBg
            text={"다음"}
            handleClick={() => {
              setStep(2);
            }}
          />
          <LedgerCancel handleClick={() => onClose()} />
        </div>
      </div>
      <div
        className={`col-start-1 row-start-1 inset-0 transition-all duration-500  ${
          step === 2
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        }`}
      >
        <div className="flex space-x-2">
          <div className="flex-1">
            <LedgerInput
              title="상호명"
              value={objToStr(formData, "name", "")}
              handleInputChange={(value) => {
                setFromData((item) => ({ ...item, name: value }));
              }}
            />
          </div>
          <div className="flex-1 ">
            <div className="py-2">
              <p className="font-bold text-indigo-500 ml-1 mb-2">별점</p>
              <StarRating
                value={formData.rating}
                handleClick={(value) => {
                  setFromData((item) => ({ ...item, rating: value }));
                }}
              />
            </div>
          </div>
        </div>

        <LedgerInput
          title="주소"
          value={objToStr(formData, "address", "")}
          handleInputChange={(value) => {
            setFromData((item) => ({ ...item, address: value }));
          }}
        />
        <div className="flex space-x-2">
          <div className="flex-1">
            <LedgerInput
              title="메뉴"
              value={objToStr(formData, "menu", "")}
              handleInputChange={(value) => {
                setFromData((item) => ({ ...item, menu: value }));
              }}
            />
          </div>
          <div className="flex-1">
            <LedgerCategory
              title="분류"
              value={objToStr(formData, "category", "")}
              list={categoryData}
              setData={(value) => {
                setFromData((item) => ({ ...item, category: value }));
              }}
            />
          </div>
        </div>
        <LedgerInput
          title="한 줄 평"
          value={objToStr(formData, "remark", "")}
          handleInputChange={(value) =>
            setFromData((item) => ({ ...item, remark: value }))
          }
        />
        <LedgerInputFile
          title={"사진업로드"}
          value={objToStr(formData, "file", null)}
          handleInputChange={(event) => fileUp(event)}
        />

        <div className="absolute flex space-x-2 bottom-1 right-1">
          <LedgerBtnNoBg
            text={"이전"}
            handleClick={() => {
              setStep(1);
              setSelectedLocation({});
              setSelectedData("");
              setLocation("");
              setFromData(initFormData);
              setLocationList(initLocationList);
            }}
          />
          <LedgerSave handleClick={() => saveClick()} />
          <LedgerCancel handleClick={() => onClose()} />
        </div>
      </div>
    </div>
  );
}
