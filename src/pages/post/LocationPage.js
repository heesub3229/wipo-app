import React, { useEffect, useState } from "react";
import { IconButton } from "../../components/Buttons";
import { FaAngleLeft, FaAngleRight, FaStar, FaRegStar } from "react-icons/fa6";

const LocationPage = ({
  locationList,
  setLocationList,
  setData,
  nextClick,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    locationList.page?.searchPagination
      ? locationList.page.searchPagination.current
      : 1
  );
  const itemsPerPage = 10;
  const indexOfLastItem =
    currentPage * itemsPerPage +
    (locationList?.page?.addrPagination && currentPage !== 1
      ? locationList.page.addrPagination.totalCount
      : 0);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locationList?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    (locationList.page
      ? locationList.page.addrPagination
        ? locationList.page.addrPagination.totalCount +
          locationList.page.searchPagination.totalCount
        : 0 + locationList.page?.searchPagination &&
          locationList.page.searchPagination.totalCount
      : 0) / itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      if (page !== 1) {
        const count = locationList?.page?.addrPagination
          ? locationList?.page?.addrPagination.totalCount - 1
          : 0;
        const validPage = locationList?.data.filter(
          (item) =>
            item.id > (page - 1) * 10 + count &&
            item.id < page * 10 + count &&
            item.x > 0 &&
            item.y > 0
        );
        if (validPage.length === 0) {
          nextClick(page);
        }
      }
    }
  };

  const handleFavClick = (id) => {
    // 즐겨찾기 상태 변화
    setLocationList((prevFavList) =>
      prevFavList.map((favItem) =>
        favItem.id === id
          ? { ...favItem, favFlag: favItem.favFlag === "Y" ? "N" : "Y" }
          : favItem
      )
    );
  };
  if (!locationList.data || locationList.data.length === 0) {
    return (
      <>
        <div className="h-[90%] overflow-auto">
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
        </div>
      </>
    );
  }
  return (
    <>
      <div className="h-[90%] overflow-auto">
        {Array.isArray(locationList.data) && locationList.data.length > 0 && (
          <>
            {currentItems.map((item) => (
              <div key={item.id} onClick={() => setData(item)}>
                <div className="w-full h-auto flex flex-col justify-center px-1 py-2 hover:bg-gray-200 select-none">
                  <div className="flex items-center space-x-1">
                    <div
                      className="text-yellow-300 cursor-pointer"
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                      onClick={() => handleFavClick(item.id)}
                    >
                      {item.favFlag === "Y" ? (
                        <>
                          {hoveredItemId === item.id ? (
                            <FaRegStar className="text-gray-700" />
                          ) : (
                            <FaStar />
                          )}
                        </>
                      ) : (
                        <>
                          {hoveredItemId === item.id ? (
                            <FaStar />
                          ) : (
                            <FaRegStar className="text-gray-700" />
                          )}
                        </>
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

export default LocationPage;
