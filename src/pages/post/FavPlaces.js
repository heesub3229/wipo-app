import React, { useEffect, useState } from "react";
import { IconButton } from "../../components/Buttons";
import { FaAngleLeft, FaAngleRight, FaStar, FaRegStar } from "react-icons/fa6";

const favEx = [
  {
    id: 1,
    addressName: "서울 종로구 세종로 1-1",
    placeName: "경복궁",
    favFlag: "Y",
  },
  {
    id: 2,
    addressName: "서울 강북구 우이동 산 40-1",
    placeName: "북한산둘레길 1구간소나무숲길",
    favFlag: "Y",
  },
  {
    id: 3,
    addressName: "서울 서대문구 홍은동",
    placeName: "북한산둘레길 7구간옛성길",
    favFlag: "Y",
  },
];

const FavPlaces = ({ setData }) => {
  const [favList, setFavList] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(favList.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    // 즐겨찾기 리스트 불러오기
    setFavList(favEx);
  }, []);

  const handleFavClick = () => {
    // 즐겨찾기 해제
  };

  return (
    <>
      <div className="h-[90%] overflow-auto">
        {Array.isArray(favList) && favList.length > 0 ? (
          <>
            {currentItems.map((item) => (
              <div key={item.id} onClick={() => setData(item.placeName)}>
                <div className="w-full h-auto flex flex-col justify-center px-1 py-2 hover:bg-gray-200 select-none">
                  <div className="flex items-center space-x-1">
                    <div
                      className="text-yellow-300 cursor-pointer"
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                      onClick={() => handleFavClick()}
                    >
                      {hoveredItemId === item.id ? (
                        <FaRegStar className="text-gray-700" />
                      ) : (
                        <FaStar />
                      )}
                    </div>

                    <p>{item.placeName}</p>
                  </div>
                  <p className="text-sm ml-5">{item.addressName}</p>
                </div>
                <div className="w-full border-t"></div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <div className="w-full h-auto flex flex-col justify-center p-2 hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="text-yellow-300">
                  <FaStar />
                </div>
                <p>
                  자주 가는 장소를
                  <br />
                  즐겨찾기로 등록해보세요.
                </p>
              </div>
            </div>
            <div className="w-full border-t"></div>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="h-[10%] flex justify-evenly items-center border-t bg-white">
          <IconButton
            icon={FaAngleLeft}
            handleClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <div className="flex space-x-3">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <p
                key={pageIndex}
                className={`cursor-pointer font-bold ${
                  currentPage === pageIndex + 1
                    ? "text-indigo-700"
                    : "text-gray-400"
                }`}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </p>
            ))}
          </div>
          <IconButton
            icon={FaAngleRight}
            handleClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
    </>
  );
};

export default FavPlaces;
