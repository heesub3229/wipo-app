import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CalendarIconButton } from "../../components/Buttons";

const LedgerDaySelect = ({
  isOpen,
  setIsOpen,
  setDate,
  defaultDay,
  select,
}) => {
  const today = new Date();
  const todayDate = today.getDate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    let newStartDate;
    if (todayDate >= defaultDay) {
      newStartDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1 - select,
        defaultDay,
        12
      );
    } else {
      if (today.getMonth() + 1 === 1) {
        newStartDate = new Date(today.getFullYear() - 1, 11, defaultDay, 12);
      } else {
        newStartDate = new Date(
          today.getFullYear(),
          today.getMonth() - select,
          defaultDay,
          12
        );
      }
    }

    const newEndDate = new Date(
      newStartDate.getFullYear(),
      newStartDate.getMonth() + 1,
      defaultDay - 1,
      12
    );

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setCurrentDate(
      new Date(newStartDate.getFullYear(), newStartDate.getMonth(), 1)
    );
    if (today >= newStartDate && today <= newEndDate) {
      setSelectedDate(today);
    } else {
      setSelectedDate(newEndDate);
    }
  }, [select, defaultDay]);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // 월 (1~12)
    const day = String(selectedDate.getDate()).padStart(2, "0"); // 일 (1~31)
    setDate(`${year}${month}${day}`);
  }, [selectedDate]);

  if (!isOpen) return null;

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      12
    );

    if (newDate >= startDate && newDate <= endDate) {
      setSelectedDate(newDate);
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    if (
      prevMonth >= new Date(startDate.getFullYear(), startDate.getMonth(), 1)
    ) {
      setCurrentDate(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    if (nextMonth <= new Date(endDate.getFullYear(), endDate.getMonth(), 1)) {
      setCurrentDate(nextMonth);
    }
  };

  const prevDisabled =
    currentDate.getFullYear() === startDate.getFullYear() &&
    currentDate.getMonth() === startDate.getMonth();

  const nextDisabled =
    currentDate.getFullYear() === endDate.getFullYear() &&
    currentDate.getMonth() === endDate.getMonth();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="text-gray-300"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day, 12);
      const isSelected =
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day;

      const isDisabled =
        currentDay < startDate ||
        currentDay > endDate ||
        (startDate <= today && today <= endDate && currentDay > today);

      calendarDays.push(
        <div
          key={day}
          className={`flex justify-center items-center rounded-md ${
            isSelected && "bg-indigo-500 text-white hover:bg-indigo-500"
          } ${
            isDisabled && !isSelected
              ? "text-gray-400"
              : "cursor-pointer hover:bg-gray-300"
          }`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          <p>{day}</p>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="mt-2 bg-white border rounded-md shadow-lg p-4 w-96 h-72 font-nanum select-none">
      <div className="flex justify-between items-center mb-4">
        <CalendarIconButton
          icon={FaAngleLeft}
          handleClick={handlePrevMonth}
          disabled={prevDisabled}
        />
        <span className="font-bold text-base">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </span>
        <CalendarIconButton
          icon={FaAngleRight}
          handleClick={handleNextMonth}
          disabled={nextDisabled}
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
    </div>
  );
};

export default LedgerDaySelect;
