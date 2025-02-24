import React, { useState } from "react";
import { categoryList } from "../../components/Lists";
import { LedgerChip } from "../../components/Chips";

export default function LedgerFilter({
  isOpen,
  clickedCategory,
  setClickedCategory,
}) {
  const handleClickCategory = (code) => {
    setClickedCategory((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-[80%] left-full max-h-72 bg-white shadow-md p-3 overflow-auto z-50 select-none">
      {categoryList.map((item) => {
        const isSelected = clickedCategory.includes(item.code);
        return (
          <div
            key={item.code}
            className="flex items-center space-x-3 p-2 pr-10 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleClickCategory(item.code)}
          >
            <LedgerChip category={item.code} disabled={!isSelected && "Y"} />
            <p
              className={`text-lg text-nowrap ${
                !isSelected && "text-gray-500"
              }`}
            >
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
