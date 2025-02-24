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

const categoryMap = {
  F: { icon: FaUtensils, color: "bg-rose-400" },
  T: { icon: FaBusSimple, color: "bg-blue-400" },
  S: { icon: FaBuilding, color: "bg-yellow-400" },
  E: { icon: FaParachuteBox, color: "bg-orange-400" },
  H: { icon: FaHeartPulse, color: "bg-pink-400" },
  L: { icon: FaHouseChimney, color: "bg-teal-400" },
  A: { icon: FaCoins, color: "bg-lime-400" },
  O: { icon: FaEllipsis, color: "bg-neutral-400" },
  B: { icon: FaB, color: "bg-violet-400" },
};

export const LedgerChip = ({ category, disabled }) => {
  const item = categoryMap[category];
  if (!item) return null;

  const IconComponent = item.icon;

  return (
    <div
      className={`text-sm flex justify-center rounded-full p-2 ${
        disabled === "Y" ? "bg-gray-300" : item.color
      } font-bold text-white`}
    >
      <IconComponent />
    </div>
  );
};
