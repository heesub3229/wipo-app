import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CalendarIconButton } from "./Buttons";

const DatePicker = ({ isOpen, setIsOpen, setDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarMode, setCalendarMode] = useState("Date");
  const calendarRef = useRef();

  useEffect(() => {
    setDate(formatDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const handleChangeMode = (mode) => {
    if (mode === "Date") {
      setCalendarMode("Month");
    }

    if (mode === "Month") {
      setCalendarMode("Year");
    }

    if (mode === "Year") {
      setCalendarMode("Date");
    }
  };

  if (!isOpen) return null;

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
      12
    );
    setSelectedDate(newDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
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
    setCalendarMode("Date");
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="text-gray-300"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day;

      calendarDays.push(
        <div
          key={day}
          className={`cursor-pointer flex justify-center items-center rounded-md ${
            isSelected ? "bg-indigo-500 text-white" : "hover:bg-gray-300"
          }`}
          onClick={() => handleDateClick(day)}
        >
          <p>{day}</p>
        </div>
      );
    }

    return calendarDays;
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

  return (
    <div
      className="mt-2 bg-white border rounded-md shadow-lg p-4 w-96 h-72 font-nanum select-none"
      ref={calendarRef}
    >
      {calendarMode === "Date" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <CalendarIconButton
              icon={FaAngleLeft}
              handleClick={handlePrevMonth}
            />
            <span
              className="font-bold text-base hover:bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
              onClick={() => handleChangeMode("Date")}
            >
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </span>
            <CalendarIconButton
              icon={FaAngleRight}
              handleClick={handleNextMonth}
            />
          </div>
          <div className="grid grid-cols-7 text-center h-4/5">
            {daysOfWeek.map((day) => (
              <div key={day} className="font-bold mb-2">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </>
      )}
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

export default DatePicker;
