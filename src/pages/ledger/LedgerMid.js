import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LedgerChip } from "../../components/Chips";
import { formatDate } from "../../components/Common";
import { Modal } from "../../components/Modal";
import LedgerModal from "./LedgerModal";

const data = [
  {
    sid: 1,
    category: "F",
    payment: "C",
    type: "E",
    amount: 14000,
    name: "동대문 엽기떡볶이",
    date: "20250120",
  },
  {
    sid: 2,
    category: "T",
    payment: "C",
    type: "E",
    amount: 1500,
    name: "버스",
    date: "20250119",
  },
  {
    sid: 3,
    category: "S",
    payment: "",
    type: "I",
    amount: 2500000,
    name: "월급",
    date: "20250117",
  },
  {
    sid: 4,
    category: "E",
    payment: "C",
    type: "E",
    amount: 16000,
    name: "영화",
    date: "20250117",
  },
  {
    sid: 5,
    category: "H",
    payment: "C",
    type: "E",
    amount: 800000,
    name: "필라테스",
    date: "20250115",
  },
  {
    sid: 6,
    category: "L",
    payment: "H",
    type: "E",
    amount: 400000,
    name: "월세",
    date: "20250114",
  },
  {
    sid: 7,
    category: "A",
    payment: "H",
    type: "I",
    amount: 100000,
    name: "용돈",
    date: "20250113",
  },
  {
    sid: 8,
    category: "O",
    payment: "H",
    type: "E",
    amount: 10000,
    name: "잃어버림",
    date: "20250110",
  },
  {
    sid: 9,
    category: "B",
    payment: "H",
    type: "I",
    amount: 500000,
    name: "상여금",
    date: "2025018",
  },
];

export default function LedgerMid() {
  const [openModal, setOpenModal] = useState(null);

  const handleListClick = (sid) => {
    setOpenModal(sid);
  };

  const handleCloseModal = () => {
    if (openModal !== null) {
      setOpenModal(null);
    }
  };

  const handlePrevClick = () => {};

  const handleNextClick = () => {};

  return (
    <div className="flex flex-col w-full justify-center items-center pt-12">
      <div className="flex items-center text-xl font-bold space-x-7 select-none pb-14">
        <div className="rounded-full hover:bg-gray-100 p-2 cursor-pointer">
          <FaAngleLeft onClick={() => handlePrevClick()} />
        </div>
        <p>2025년 1월 1일 ~ 오늘</p>
        <div className="rounded-full hover:bg-gray-100 p-2 cursor-pointer">
          <FaAngleRight onClick={() => handleNextClick()} />
        </div>
      </div>
      {data.map((item) => (
        <div
          className="w-3/5 flex flex-col space-y-2 border-b p-5 hover:bg-gray-100"
          onClick={() => {
            handleListClick(item.sid);
          }}
        >
          <p className="text-gray-600 mb-1">
            {formatDate(item.date, "MonthDay")}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LedgerChip category={item.category} />
              <p className="text-xl font-bold">{item.name}</p>
            </div>
            <div>
              <p className="text-right">
                {item.payment === "C" ? "카드" : "현금"}
              </p>
              {item.type === "E" ? (
                <p className="text-lg font-bold text-red-500">
                  -
                  {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </p>
              ) : (
                <p className="text-lg font-bold text-blue-500">
                  {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </p>
              )}
            </div>
          </div>
          {openModal === item.sid && (
            <Modal isOpen={!!openModal} onClose={handleCloseModal}>
              <LedgerModal data={item} />
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
}
