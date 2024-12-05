import React, { useState } from "react";
import { IconButton } from "../../components/Buttons";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const LocationPage = ({ locationList, setData }) => {
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

  return (
    <>
      <div className="h-[90%] overflow-auto">
        {Array.isArray(locationList) && locationList.length > 0 && (
          <>
            {currentItems.map((item, index) => (
              <div key={item.id} onClick={() => setData(item.placeName)}>
                <div className="w-full h-auto flex flex-col justify-center px-1 py-2 hover:bg-gray-200 cursor-pointer">
                  <p>{item.placeName}</p>
                  <p className="text-sm">{item.addressName}</p>
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
