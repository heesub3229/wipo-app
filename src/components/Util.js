import moment from "moment-timezone";
import MarkedPlace from "../pages/post/MarkedPlace";
import ReactDOMServer from "react-dom/server";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const place = new window.kakao.maps.services.Places();
const geocoder = new window.kakao.maps.services.Geocoder();
const serverUrl = process.env.REACT_APP_SERVER_API;
export const generateState = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const nowDate = () => {
  return moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
};

//YYYYMMDD
export const changeDateStr = (year, month, date) => {
  return (
    String(year) +
    String(month).padStart(2, "0") +
    String(date).padStart(2, "0")
  );
};

export const pageAndDate = async (page, date, defaultDay) => {
  const now = new Date();
  const nowDay = now.getDate();
  const tempDate = new Date(
    date.substring(0, 4),
    date.substring(4, 6) - 1,
    date.substring(6, 8)
  );
  let start;
  if (nowDay < defaultDay) {
    start = new Date(now.getFullYear(), now.getMonth() - page, defaultDay);
  } else {
    start = new Date(
      now.getFullYear(),
      now.getMonth() - (page - 1),
      defaultDay
    );
  }
  const end = new Date(
    start.getFullYear(),
    start.getMonth() + 1,
    defaultDay - 1
  );
  if (start <= tempDate && tempDate <= end) {
    return true;
  } else {
    return false;
  }
};
//yyyy-mm-dd
export const changeStr_date_yyyymmdd = (date) => {
  return (
    date.substring(0, 4) +
    "-" +
    date.substring(4, 6) +
    "-" +
    date.substring(6, 8)
  );
};
//yyyy-mm
export const changeStr_date_yyyymm = (date) => {
  return date.substring(0, 4) + "-" + date.substring(4, 6);
};
//mm-dd
export const changeStr_date_mmdd = (date) => {
  return date.substring(4, 6) + "-" + date.substring(6, 8);
};

export const kakaoSearchKeyword = (search, count) => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      const searchCallback = (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const array = data.map((item) => ({
            placeName: item.place_name,
            addressName: item.address_name,
            x: Number(item.x),
            y: Number(item.y),
            region_1depth_name: "",
            region_2depth_name: "",
            region_3depth_name: "",
            favFlag: "N",
            type: "K",
          }));

          resolve({ data: array, page: { totalCount: pagination.totalCount } }); // 모든 결과 반환
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          resolve({ data: [], page: { totalCount: 0 } }); // 결과 없음
        } else {
          if (status) {
            reject(status);
          } else {
            reject(data);
          }
        }
      };

      place.keywordSearch(search, searchCallback, { size: 10 + count }); // 첫 검색 요청
    } else {
      reject("");
    }
  });
};

export const kakaoNextPage = (search, nextPage) => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      const searchCallback = (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const array = data.map((item) => ({
            //id: index + originCount + (nextPage - 1) * 10,
            placeName: item.place_name,
            addressName: item.address_name,
            x: Number(item.x),
            y: Number(item.y),
            region_1depth_name: "",
            region_2depth_name: "",
            region_3depth_name: "",
            favFlag: "N",
            type: "K",
          }));
          resolve({ data: array, page: { totalCount: pagination.totalCount } }); // 모든 결과 반환
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          resolve([]); // 결과 없음
        } else {
          if (status) {
            reject(status);
          } else {
            reject(data);
          }
        }
      };

      place.keywordSearch(search, searchCallback, { size: 10, page: nextPage }); // 첫 검색 요청
    } else {
      reject("");
    }
  });
};

export const kakaoSearchAddress = (search) => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      const searchCallback = (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const filterArray = data.filter((item) =>
            item.address ? item : item.road_address.road_name === search
          );
          const array = filterArray.map((item) => ({
            //id: index,
            placeName: item.address
              ? item.address.address_name
              : item.road_address?.road_name,
            addressName: item.address
              ? item.address.address_name
              : item.road_address?.address_name,
            x: item.address
              ? Number(item.address.x)
              : Number(item.road_address?.x),
            y: item.address
              ? Number(item.address.y)
              : Number(item.road_address?.y),
            region_1depth_name: item.address
              ? item.address.region_1depth_name
              : item.road_address?.region_1depth_name,
            region_2depth_name: item.address
              ? item.address.region_2depth_name
              : item.road_address?.region_2depth_name,
            region_3depth_name: item.address
              ? item.address.region_3depth_name
              : item.road_address?.region_3depth_name,
            favFlag: "N",
            type: "R",
          }));
          const pageData = {
            totalCount: array.length,
          };

          resolve({ data: array, page: pageData }); // 모든 결과 반환
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          resolve({
            data: [],
            page: {
              totalCount: 0,
            },
          }); // 결과 없음
        } else {
          if (status) {
            reject(status);
          } else {
            reject(data);
          }
        }
      };
      geocoder.addressSearch(search, searchCallback, {
        size: 10,
      });
    } else {
      reject("");
    }
  });
};

export const getCurrentLoc = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          resolve({ lat: lat, lon: lon });
        });
      } else {
        resolve({ lat: 33.450701, lon: 126.570667 });
      }
    } else {
      resolve({ lat: 33.450701, lon: 126.570667 });
    }
  });
};

export const getLocToAddr = (lat, lon) => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      geocoder.coord2Address(lon, lat, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          resolve(address);
        } else {
          reject(null);
        }
      });
    } else {
      reject(null);
    }
  });
};

export const setKakaoDefault = async (mapContainer) => {
  const loc = await getCurrentLoc();
  const mapOptions = {
    center: new window.kakao.maps.LatLng(loc.lat, loc.lon),
    level: 5,
  };
  const map = new window.kakao.maps.Map(mapContainer, mapOptions);

  const marker = new window.kakao.maps.Marker({
    map: map,
    position: new window.kakao.maps.LatLng(loc.lat, loc.lon),
  });

  marker.setMap(map);
  // const polygon = new window.kakao.maps.Polygon({
  //   map: map,
  // });
  // polygon.setMap(map);
  const place = new window.kakao.maps.services.Places();
  const geocoder = new window.kakao.maps.services.Geocoder();

  return {
    map: map,
    marker: marker,
    place: place,
    geocoder: geocoder,
  };
};

export const setArea = async (map, path) => {
  const polygon = new window.kakao.maps.Polygon({
    path: path,
    strokeWeight: 2,
    strokeColor: "#FF0000", // 경계선 색상
    strokeOpacity: 0.8, // 경계선 투명도
    strokeStyle: "solid",
    fillColor: "#FF4500", // 내부 채우기 색상
    fillOpacity: 0.4, // 내부 채우기 투명도
  });
  polygon.setMap(map);
  return polygon;
};

export const setMarker = async (map, loc, level) => {
  const mapOptions = new window.kakao.maps.LatLng(loc.y, loc.x);
  map.setCenter(mapOptions);
  const marker = new window.kakao.maps.Marker({
    map: map,
    position: mapOptions,
  });
  marker.setMap(map);
  map.setLevel(level);
  return marker;
};

export const setInfo = async (map, markers, placeName, loc) => {
  const mapOptions = new window.kakao.maps.LatLng(loc.y, loc.x);
  const info = ReactDOMServer.renderToString(
    <MarkedPlace
      data={{
        favFlag: loc.favFlag,
        placeName: placeName,
        addressName: loc.addressName,
      }}
    />
  );
  const infoWindow = new window.kakao.maps.InfoWindow({
    map: map,
    position: mapOptions,
    content: info,
  });

  // 마커와 연결하여 InfoWindow 표시
  infoWindow.open(map, markers);

  return infoWindow;
};

export const getFile = (filepath) => {
  const convFilepath = String(filepath).substring(1);

  return serverUrl + convFilepath;
};

export const moneyToStr = (value) => {
  var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var units = ["", "만", "억", "조"];
  var ret = "";
  if (value) {
    const str = String(value);

    if (str.length > 0) {
      for (let i = 0; i < str.length; i++) {
        const tmpNum = Number(str[i]);
        if (str.length - i - 1 >= 4) {
          if ((str.length - i - 1) % 4 === 0) {
            ret = ret + nums[tmpNum] + units[(str.length - i - 1) / 4] + " ";
          } else {
            ret = ret + nums[tmpNum];
          }
        } else {
          ret = ret + nums[tmpNum];
        }
      }
    }
  }

  return ret;
};

export const getPeriod = (defaultDay, select, selectedMonth) => {
  const today = new Date();
  const todayDate = today.getDate();

  let startDateRaw;
  if (todayDate >= defaultDay) {
    startDateRaw = new Date(
      today.getFullYear(),
      today.getMonth() + 1 - select,
      defaultDay
    );
  } else {
    if (today.getMonth() + 1 === 1) {
      startDateRaw = new Date(today.getFullYear() - 1, 11, defaultDay);
    } else {
      startDateRaw = new Date(
        today.getFullYear(),
        today.getMonth() - select,
        defaultDay
      );
    }
  }

  const startDate = `${startDateRaw.getFullYear()}년 ${String(
    startDateRaw.getMonth() + 1
  ).padStart(2, "0")}월 ${String(startDateRaw.getDate()).padStart(2, "0")}일`;

  let endDateRaw = new Date(
    startDateRaw.getFullYear(),
    startDateRaw.getMonth() + 1,
    defaultDay - 1
  );

  let endDate;
  if (select === 1) {
    endDate = "오늘";
  } else {
    endDate = `${endDateRaw.getFullYear()}년 ${String(
      endDateRaw.getMonth() + 1
    ).padStart(2, "0")}월 ${String(endDateRaw.getDate()).padStart(2, "0")}일`;
  }

  return {
    period: `${startDate} ~ ${endDate}`, // 기존 결과
    startDateRaw, // startDateRaw도 함께 반환!
  };
};
