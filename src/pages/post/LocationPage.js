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
    locationList.page?.current ? locationList.page.current : 1
  );
  const itemsPerPage =
    10 +
    (locationList?.data && currentPage === 1
      ? locationList?.data.filter((item) => item.type === "R").length
      : 0);
  const indexOfLastItem =
    currentPage * itemsPerPage +
    (locationList?.data && currentPage !== 1
      ? locationList?.data.filter((item) => item.type === "R").length
      : 0);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locationList.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    (locationList?.page?.totalCount ? locationList?.page?.totalCount : 0) /
      itemsPerPage
  );
  useEffect(() => {
    if (locationList.page?.current) {
      setCurrentPage(locationList.page.current);
    }
  }, [locationList.page?.current]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      nextClick(page);
    }
  };

  const handleFavClick = (value) => {
    setLocationList(value);
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
            {currentItems.map((item, index) => (
              <div key={index} onClick={() => setData(item)}>
                <div className="w-full h-auto flex flex-col justify-center px-1 py-2 hover:bg-gray-200 select-none">
                  <div className="flex items-center space-x-1">
                    <div
                      className="text-yellow-300 cursor-pointer"
                      onMouseEnter={() => setHoveredItemId(index)}
                      onMouseLeave={() => setHoveredItemId(null)}
                      onClick={(event) => {
                        handleFavClick(item);
                        event.stopPropagation();
                      }}
                    >
                      {item.favFlag === "Y" ? (
                        <>
                          {hoveredItemId === index ? (
                            <FaRegStar className="text-gray-700" />
                          ) : (
                            <FaStar />
                          )}
                        </>
                      ) : (
                        <>
                          {hoveredItemId === index ? (
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
