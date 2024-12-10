import React from "react";
import { FavButton } from "../../components/Buttons";

export default function MarkedPlace({ data }) {
  return (
    <div className="relative inline-block bg-indigo-400 text-white rounded-md py-3 px-5 min-h-[15%] max-w-[70%] break-words">
      {/* <div className="absolute top-1 right-1">
        <FavButton favFlag={data.favFlag} />
      </div>
      <p className="font-bold">{data.placeName}</p>
      <p className="text-sm">{data.addressName}</p> */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-[10px] border-transparent border-t-indigo-400"></div>
    </div>
  );
}
