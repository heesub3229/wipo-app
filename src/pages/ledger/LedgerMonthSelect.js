import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CalendarIconButton } from "../../components/Buttons";

const LedgerMonthSelect = ({ isOpen, setIsOpen, setDate }) => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarMode, setCalendarMode] = useState("Month");

  useEffect(() => {
    if (month !== null && year !== null) {
      setDate(new Date(year, month, 1));
    }
  }, [month, year]);

  const handleChangeMode = (mode) => {
    if (mode === "Month") {
      setCalendarMode("Year");
    }

    if (mode === "Year") {
      setCalendarMode("Month");
    }
  };

  const handlePrevYear = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1)
    );
  };

  const handlePrevYearBlock = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() - 9, currentMonth.getMonth(), 1)
    );
  };

  const handleNextYearBlock = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear() + 9, currentMonth.getMonth(), 1)
    );
  };

  const handleMonthClick = (item) => {
    setMonth((prevMonth) => {
      if (prevMonth === item) {
        setTimeout(() => setMonth(item), 100);
        return null;
      }
      return item;
    });
    setYear(currentMonth.getFullYear());
    setCurrentMonth(new Date(currentMonth.getFullYear(), item, 1));
    setIsOpen(false);
  };

  const renderMonthPicker = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
      <>
        {months.map((item) => {
          const isDisabled =
            currentMonth.getFullYear() === todayYear && item > todayMonth;
          return (
            <div
              key={item}
              className={`text-center flex justify-center items-center ${
                isDisabled
                  ? "text-gray-500"
                  : "cursor-pointer hover:bg-gray-300"
              }  rounded-md`}
              onClick={() => {
                if (!isDisabled) {
                  handleMonthClick(item);
                }
              }}
            >
              {item + 1}월
            </div>
          );
        })}
      </>
    );
  };

  const renderYearPicker = () => {
    const currentYear = currentMonth.getFullYear();
    const startYear = currentYear - 4;

    const years = Array.from({ length: 9 }, (_, i) => startYear + i);

    return (
      <>
        {years.map((item) =>
          item > todayYear ? (
            <div key={item} className="invisible">
              -
            </div>
          ) : (
            <div
              key={item}
              className={`text-center flex justify-center items-center cursor-pointer rounded-md ${
                item === currentYear
                  ? "bg-indigo-500 text-white"
                  : "hover:bg-gray-300 "
              }`}
              onClick={() => {
                setCurrentMonth(new Date(item, currentMonth.getMonth(), 1));
                setCalendarMode("Month");
              }}
            >
              {item}
            </div>
          )
        )}
      </>
    );
  };
  if (!isOpen) return null;
  return (
    <div className="mt-2 bg-white border rounded-md shadow-lg p-4 w-96 h-72 font-nanum select-none">
      {calendarMode === "Month" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <CalendarIconButton
              icon={FaAngleLeft}
              handleClick={handlePrevYear}
            />
            <span
              className="font-bold text-base hover:bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
              onClick={() => handleChangeMode("Month")}
            >
              {currentMonth.getFullYear()}년
            </span>
            <CalendarIconButton
              icon={FaAngleRight}
              handleClick={handleNextYear}
              disabled={currentMonth.getFullYear() >= todayYear}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 h-4/5">
            {renderMonthPicker()}
          </div>
        </>
      )}
      {calendarMode === "Year" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <CalendarIconButton
              icon={FaAngleLeft}
              handleClick={handlePrevYearBlock}
            />
            <span
              className="font-bold text-base hover:bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
              onClick={() => handleChangeMode("Year")}
            >
              {`${currentMonth.getFullYear() - 4} - ${
                currentMonth.getFullYear() + 4 >= todayYear
                  ? todayYear
                  : currentMonth.getFullYear() + 4
              }년`}
            </span>
            <CalendarIconButton
              icon={FaAngleRight}
              handleClick={handleNextYearBlock}
              disabled={currentMonth.getFullYear() + 4 >= todayYear}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 h-4/5">
            {renderYearPicker()}
          </div>
        </>
      )}
    </div>
  );
};

export default LedgerMonthSelect;
