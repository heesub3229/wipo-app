import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

export default function PopRestList() {
  const restListState = useSelector((state) => state.rest.list);
  const [select, setSelect] = useState(null);
  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="w-4/5 min-h-[85vh] bg-white rounded-t-lg grid grid-cols-3 gap-4">
        <div className="p-5 h-[730px] overflow-auto mt-5">
          {restListState.length > 0 &&
            restListState.map((item) => (
              <div className="grid grid-cols-[0.5fr_1fr_1fr_0.5fr] grid-rows-2 shadow-md min-h-[5vh] content-center rounded-sm text-left p-3">
                <div className="place-self-center row-span-2 ">
                  <FaLocationDot fontSize={"45"} color="#818CF8" />
                </div>
                <div className="flex items-center col-span-2 gap-2">
                  <p className="font-semibold text-lg">{item.menuName}</p>
                  <div className="flex items-center gap-1">
                    {" "}
                    <FaStar color="#F7D100" fontSize={"20"} />
                    {item.rating}
                  </div>
                </div>
                <div className="cursor-pointer place-self-center row-span-2">
                  <FaEllipsisVertical fontSize={"25"} color="#868e96" />
                </div>
                <div className="flex items-end col-span-2">
                  <p className="italic text-sm text-[#BABEBE]">
                    Posting. {item.postCount}
                  </p>
                </div>
              </div>
            ))}
          {restListState.length > 0 &&
            restListState.map((item) => (
              <div className="grid grid-cols-[0.5fr_1fr_1fr_0.5fr] grid-rows-2 shadow-md min-h-[5vh] content-center rounded-sm text-left p-3">
                <div className="place-self-center row-span-2 ">
                  <FaLocationDot fontSize={"45"} color="#818CF8" />
                </div>
                <div className="flex items-center col-span-2 gap-2">
                  <p className="font-semibold text-lg">{item.menuName}</p>
                  <div className="flex items-center gap-1">
                    {" "}
                    <FaStar color="#F7D100" fontSize={"20"} />
                    {item.rating}
                  </div>
                </div>
                <div className="cursor-pointer place-self-center row-span-2">
                  <FaEllipsisVertical fontSize={"25"} color="#868e96" />
                </div>
                <div className="flex items-end col-span-2">
                  <p className="italic text-sm text-[#BABEBE]">
                    Posting. {item.postCount}
                  </p>
                </div>
              </div>
            ))}
          {restListState.length > 0 &&
            restListState.map((item) => (
              <div className="grid grid-cols-[0.5fr_1fr_1fr_0.5fr] grid-rows-2 shadow-md min-h-[5vh] content-center rounded-sm text-left p-3">
                <div className="place-self-center row-span-2 ">
                  <FaLocationDot fontSize={"45"} color="#818CF8" />
                </div>
                <div className="flex items-center col-span-2 gap-2">
                  <p className="font-semibold text-lg">{item.menuName}</p>
                  <div className="flex items-center gap-1">
                    {" "}
                    <FaStar color="#F7D100" fontSize={"20"} />
                    {item.rating}
                  </div>
                </div>
                <div className="cursor-pointer place-self-center row-span-2">
                  <FaEllipsisVertical fontSize={"25"} color="#868e96" />
                </div>
                <div className="flex items-end col-span-2">
                  <p className="italic text-sm text-[#BABEBE]">
                    Posting. {item.postCount}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-2 p-5">TST</div>
      </div>
    </div>
  );
}
