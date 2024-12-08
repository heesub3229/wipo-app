import React, { useState } from "react";
import { IconButton } from "../../components/Buttons";
import { FaAngleLeft, FaAngleRight, FaStar, FaRegStar } from "react-icons/fa6";

const LocationPage = ({ locationList, setLocationList, setData }) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locationList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(locationList.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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

  return (
    <>
      <div className="h-[90%] overflow-auto">
        {Array.isArray(locationList) && locationList.length > 0 && (
          <>
            {currentItems.map((item) => (
              <div key={item.id} onClick={() => setData(item.placeName)}>
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
