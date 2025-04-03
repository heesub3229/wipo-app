import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CalendarIconButton } from "../../components/Buttons";

const SelectCalendar = ({ isOpen, setIsOpen, setDate }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarMode, setCalendarMode] = useState("Month");

  useEffect(() => {
    setDate(new Date(year, month, 1));
  }, [month, year]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

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

  const handleMonthClick = (month) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
    setMonth(month);
    setYear(currentMonth.getFullYear());

    setIsOpen(false);
  };

  const renderMonthPicker = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
      <>
        {months.map((month) => (
          <div
            key={month}
            className="text-center flex justify-center items-center cursor-pointer hover:bg-gray-300 rounded-md"
            onClick={() => handleMonthClick(month)}
          >
            {month + 1}월
          </div>
        ))}
      </>
    );
  };

  const renderYearPicker = () => {
    const currentYear = currentMonth.getFullYear();
    const startYear = currentYear - 4;

    const years = Array.from({ length: 9 }, (_, i) => startYear + i);

    return (
      <>
        {years.map((year) => (
          <div
            key={year}
            className={`text-center flex justify-center items-center cursor-pointer rounded-md ${
              year === currentYear
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-300 "
            }`}
            onClick={() => {
              setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
              setCalendarMode("Month");
            }}
          >
            {year}
          </div>
        ))}
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
                currentMonth.getFullYear() + 4
              }년`}
            </span>
            <CalendarIconButton
              icon={FaAngleRight}
              handleClick={handleNextYearBlock}
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

export default SelectCalendar;
