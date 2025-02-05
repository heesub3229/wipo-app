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
  const [defaultDay, setDefaultDay] = useState(3);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

  const getPeriod = () => {
    const prevMonthDate = new Date(currentYear, currentMonth - 2, defaultDay);
    const currentMonthLastDate = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    const startDate =
      defaultDay === 1
        ? `${currentYear}년 ${String(currentMonth).padStart(2, "0")}월 01일`
        : `${prevMonthDate.getFullYear()}년 ${String(
            prevMonthDate.getMonth() + 1
          ).padStart(2, "0")}월 ${String(defaultDay).padStart(2, "0")}일`;

    let endDateRaw =
      defaultDay === 1
        ? `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(
            currentMonthLastDate
          ).padStart(2, "0")}`
        : `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(
            defaultDay - 1
          ).padStart(2, "0")}`;

    const endDateObj = new Date(endDateRaw);

    let endDate =
      endDateObj > today
        ? "오늘"
        : `${currentYear}년 ${String(currentMonth).padStart(2, "0")}월 ${
            defaultDay === 1 ? currentMonthLastDate : defaultDay - 1
          }일`;

    return `${startDate} ~ ${endDate}`;
  };

  const handleListClick = (sid) => {
    setOpenModal(sid);
  };

  const handleCloseModal = () => {
    if (openModal !== null) {
      setOpenModal(null);
    }
  };

  const handlePrevClick = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 1) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 12;
      }
      return prevMonth - 1;
    });
  };

  const handleNextClick = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 12) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 1;
      }
      return prevMonth + 1;
    });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center pt-5">
      <div className="flex items-center text-xl font-bold space-x-7 select-none pb-7">
        <div className="rounded-full hover:bg-gray-100 p-2 cursor-pointer">
          <FaAngleLeft onClick={() => handlePrevClick()} />
        </div>
        <p>{getPeriod()}</p>
        <div className="rounded-full hover:bg-gray-100 p-2 cursor-pointer">
          <FaAngleRight onClick={() => handleNextClick()} />
        </div>
      </div>
      <div className="w-[90%] h-[440px] overflow-auto px-3">
        {data.map((item) => (
          <div
            key={item.sid}
            className="w-full flex flex-col space-y-2 border-b p-4 hover:bg-gray-100"
            onClick={() => {
              handleListClick(item.sid);
            }}
          >
            <p className="text-sm text-gray-600 mb-1">
              {formatDate(item.date, "MonthDay")}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LedgerChip category={item.category} />
                <p className="text-lg font-bold">{item.name}</p>
              </div>
              <div>
                <p className="text-right">
                  {item.payment === "C" ? "카드" : "현금"}
                </p>
                {item.type === "E" ? (
                  <p className="font-bold text-red-500">
                    -
                    {item.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </p>
                ) : (
                  <p className="font-bold text-blue-500">
                    {item.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
    </div>
  );
}
