import React from "react";
import {
  FaUtensils,
  FaBusSimple,
  FaBuilding,
  FaParachuteBox,
  FaHeartPulse,
  FaHouseChimney,
  FaCoins,
  FaEllipsis,
  FaB,
} from "react-icons/fa6";

export const LedgerChip = ({ category }) => {
  return (
    <>
      {category === "F" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-rose-400 font-bold text-white">
          <FaUtensils />
        </div>
      )}
      {category === "T" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-blue-400 font-bold text-white">
          <FaBusSimple />
        </div>
      )}
      {category === "S" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-yellow-400 font-bold text-white">
          <FaBuilding />
        </div>
      )}
      {category === "E" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-orange-400 font-bold text-white">
          <FaParachuteBox />
        </div>
      )}
      {category === "H" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-pink-400 font-bold text-white">
          <FaHeartPulse />
        </div>
      )}
      {category === "L" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-teal-400 font-bold text-white">
          <FaHouseChimney />
        </div>
      )}
      {category === "A" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-lime-400 font-bold text-white">
          <FaCoins />
        </div>
      )}
      {category === "O" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-neutral-400 font-bold text-white">
          <FaEllipsis />
        </div>
      )}
      {category === "B" && (
        <div className="text-sm flex justify-center rounded-full p-2 bg-violet-400 font-bold text-white">
          <FaB />
        </div>
      )}
    </>
  );
};
