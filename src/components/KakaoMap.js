import React, { useEffect } from "react";
import { setArea, setInfo, setKakaoDefault, setMarker } from "./Util";
import firstJson from "../json/first.json";
import secondJson from "../json/seconds.json";
import thirdJson from "../json/third.json";

let maps = null;
let markers = null;
let infoWindow = null;
let polygons = [];
function KakaoMap({ className, selectLoc }) {
  const jsonIncludeStr = async (value) => {
    const { first, seconds, third } = value;
    let ret = null;
    if (third) {
      ret = thirdJson.features.filter((item) =>
        item.properties.name.includes(third.substring(0, 2))
      );
    } else if (seconds) {
      ret = secondJson.features.filter((item) =>
        item.properties.name.includes(seconds.substring(0, 2))
      );
    } else {
      ret = firstJson.features.filter((item) =>
        item.properties.name.includes(first.substring(0, 2))
      );
    }

    return ret;
  };

  const jsonToArray = async (data, value) => {
    const { first, seconds, third } = data;

    if (value.length > 0) {
      const area = value[value.length - 1].geometry.coordinates;
      if (value[value.length - 1].geometry.type === "MultiPolygon") {
        area.forEach((item) => {
          const filterArea = item.reduce((acc, curr, index) => {
            return acc;
          });
          const path = filterArea.map(
            (item) => new window.kakao.maps.LatLng(item[1], item[0])
          );
          const result = setArea(maps, path);
          result.then((poly) => polygons.push(poly));
        });
      } else {
        const path = area[0].map(
          (item) => new window.kakao.maps.LatLng(item[1], item[0])
        );
        await setArea(maps, path).then((result) => polygons.push(result));
      }

      if (third) {
        await setMarker(maps, selectLoc, 10).then((result) => {
          markers = result;
        });
        await setInfo(maps, markers, third, selectLoc).then((result) => {
          infoWindow = result;
        });
      } else if (seconds) {
        await setMarker(maps, selectLoc, 11).then((result) => {
          markers = result;
        });
        await setInfo(maps, markers, seconds, selectLoc).then((result) => {
          infoWindow = result;
        });
      } else {
        await setMarker(maps, selectLoc, 12).then((result) => {
          markers = result;
        });
        await setInfo(maps, markers, first, selectLoc).then((result) => {
          infoWindow = result;
        });
      }
    } else {
      await setMarker(maps, selectLoc, 10).then((result) => {
        markers = result;
      });
    }
  };

  useEffect(() => {
    if (maps) {
      const areaClick = async () => {
        const first = selectLoc.region_1depth_name;
        const seconds = selectLoc.region_2depth_name;
        const third = selectLoc.region_3depth_name;
        const data = { first: first, seconds: seconds, third: third };

        const json = await jsonIncludeStr(data);
        if (json) {
          await jsonToArray(data, json);
        }
      };

      const clickLoc = async () => {
        await setMarker(maps, selectLoc, 5).then((result) => {
          markers = result;
        });
        await setInfo(maps, markers, selectLoc.placeName, selectLoc).then(
          (result) => {
            infoWindow = result;
          }
        );
      };

      const clearMapElements = async () => {
        if (markers) {
          markers.setMap(null); // 기존 마커 제거
        }
        if (polygons && polygons.length > 0) {
          polygons.forEach((item) => item.setMap(null));
        }
        if (infoWindow) {
          infoWindow.close();
        }
        return Promise.resolve(); // 모든 작업이 끝났음을 명시
      };
      const processLocation = async () => {
        await clearMapElements(); // 기존 요소를 모두 삭제

        if (selectLoc.type === "A" || selectLoc.type === "R") {
          await areaClick(); // 순차적으로 영역 클릭 실행
        }
        if (selectLoc.type === "K") {
          await clickLoc(); // 순차적으로 클릭 위치 실행
        }
      };
      if (selectLoc) {
        processLocation();
      }
    }
  }, [selectLoc, markers, polygons, maps, infoWindow]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const mapElement = document.getElementById("map");
        setKakaoDefault(mapElement)
          .then((result) => {
            maps = result.map;
            markers = result.marker;
          })
          .catch((error) => console.error(error));
      });
    }
  }, []);

  return <div id="map" className={className}></div>;
}

export default React.memo(
  KakaoMap,
  (prevProps, nextProps) =>
    prevProps.selectLoc === nextProps.selectLoc &&
    prevProps.className === nextProps.className
);
