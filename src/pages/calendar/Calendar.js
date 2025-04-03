import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import { CalendarIconButton } from "../../components/Buttons";
import SelectCalendar from "./SelectCalendar";
import { useSelector } from "react-redux";
import PostModal from "./PostModal";

export default function Calendar() {
  const [postData, setPostData] = useState([]);
  const [openSelectCalendar, setOpenSelectCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openPost, setOpenPost] = useState(null);
  const [selcetedDate, setSelectedDate] = useState(null);
  const [closePost, setClosePost] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarRef = useRef(null);
  const postRef = useRef(null);
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    if (postState) {
      setPostData([...postState.post_i, ...postState.post_other]);
    }
  }, [postState]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpenSelectCalendar(false);
      }

      if (postRef.current && !postRef.current.contains(event.target)) {
        setClosePost(true);
        setTimeout(() => {
          setOpenPost(null);
          setSelectedDate(null);
          setClosePost(false);
        }, [250]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenSelectCalendar = () => {
    setOpenSelectCalendar((prevData) => !prevData);
  };

  const handlePrevYear = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear() - 1, prev.getMonth(), 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleNextYear = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear() + 1, prev.getMonth(), 1)
    );
  };

  const handlePlaceClick = (e, sid) => {
    if (!!openPost) {
      if (sid === openPost) {
        setClosePost(true);
        setTimeout(() => {
          setOpenPost(null);
          setClosePost(false);
        }, [250]);
      }
    } else {
      setOpenPost(sid);
    }
  };

  const handleMoreClick = (date) => {
    if (!!openPost) {
      if ("more" === openPost) {
        setClosePost(true);
        setTimeout(() => {
          setSelectedDate(null);
          setOpenPost(null);
          setClosePost(false);
        }, [250]);
      }
    } else {
      setSelectedDate(date);
      setOpenPost("more");
    }
  };

  const getCalendarDates = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0).getDate();
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const dates = [];

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      dates.push({ day: prevLastDay - i, currentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({ day: i, currentMonth: true });
    }

    let nextMonthDay = 1;
    while (dates.length < 42) {
      dates.push({ day: nextMonthDay++, currentMonth: false });
    }

    return dates;
  };

  const calendarDates = getCalendarDates();

  return (
    <div className="w-[1280px] h-[810px] bg-white font-nanum border border-gray-100 rounded-lg flex flex-col items-center p-5">
      <div className="flex w-[50%] items-center justify-evenly">
        <div className="flex space-x-2">
          <CalendarIconButton
            icon={FaAnglesLeft}
            handleClick={handlePrevYear}
          />
          <CalendarIconButton
            icon={FaAngleLeft}
            handleClick={handlePrevMonth}
          />
        </div>
        <div className="relative" ref={calendarRef}>
          <p
            className="font-bold text-xl text-gray-700 hover:bg-gray-100 rounded-full px-3 py-1 cursor-pointer select-none"
            onClick={() => handleOpenSelectCalendar()}
          >
            {year}년 {month + 1}월
          </p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50">
            <SelectCalendar
              isOpen={openSelectCalendar}
              setIsOpen={setOpenSelectCalendar}
              setDate={setCurrentDate}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <CalendarIconButton
            icon={FaAngleRight}
            handleClick={handleNextMonth}
          />
          <CalendarIconButton
            icon={FaAnglesRight}
            handleClick={handleNextYear}
          />
        </div>
      </div>
      <table className="mt-5 w-full h-full table-fixed select-none">
        <thead className="border">
          <tr>
            {weekDays.map((day, i) => (
              <th key={i} className="py-2 bg-indigo-50">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-right align-top">
          {Array.from({ length: calendarDates.length / 7 }, (_, weekIdx) => (
            <tr key={weekIdx}>
              {calendarDates
                .slice(weekIdx * 7, weekIdx * 7 + 7)
                .map((date, dateIdx) => {
                  const isToday =
                    today.getFullYear() === year &&
                    today.getMonth() === month &&
                    today.getDate() === date.day &&
                    date.currentMonth;

                  const specialDates = postData.map((data) => ({
                    data: data,
                    sid: data.post?.sid,
                    year: parseInt(data.post?.date.slice(0, 4)),
                    month: parseInt(data.post?.date.slice(4, 6)) - 1, // Adjust month to 0-based index
                    day: parseInt(data.post?.date.slice(6)),
                    placeName: data.map?.placeName,
                    createUserSid: data.post?.create_user_sid?.sid,
                  }));

                  const specialDate = specialDates.filter(
                    (d) =>
                      d.year === year && d.month === month && d.day === date.day
                  );

                  const handleDateClick = () => {
                    if (specialDate.length === 0) {
                      if (date.currentMonth) {
                        const sentData =
                          String(year) +
                          String(month + 1).padStart(2, "0") +
                          String(date.day).padStart(2, "0");
                        navigate("/WritePost", {
                          state: { sentDate: sentData },
                        });
                      }
                    }
                  };

                  return (
                    <td
                      key={dateIdx}
                      onClick={(e) => handleDateClick(e)}
                      className={`border ${
                        date.currentMonth &&
                        specialDate.length === 0 &&
                        "hover:bg-gray-100"
                      }
                      `}
                    >
                      <div>
                        <p
                          className={`m-1 w-8 h-8 inline-flex items-center justify-center ${
                            !date.currentMonth && "text-gray-300"
                          } ${
                            isToday &&
                            "bg-indigo-400 text-white font-bold rounded-full"
                          }`}
                        >
                          {date.day}
                        </p>
                      </div>
                      <div className="w-full flex justify-center relative">
                        <div className="absolute w-[96%] space-y-1">
                          {date.currentMonth &&
                            specialDate.slice(0, 2).map((item) => (
                              <>
                                <div
                                  className={`text-left relative ${
                                    item.createUserSid === authState.userSid
                                      ? "bg-sky-100 hover:bg-sky-200"
                                      : "bg-rose-100 hover:bg-rose-200"
                                  }  rounded-xl px-2 cursor-pointer text-sm`}
                                  key={item.sid}
                                  onClick={(e) => handlePlaceClick(e, item.sid)}
                                  ref={(el) => {
                                    if (openPost === item.sid) {
                                      postRef.current = el;
                                    }
                                  }}
                                >
                                  <p>{item.placeName}</p>

                                  {!!openPost && openPost === item.sid && (
                                    <PostModal
                                      tab={1}
                                      data={item.data}
                                      isOpen={openPost}
                                      isClosing={closePost}
                                    />
                                  )}
                                </div>
                              </>
                            ))}
                          {date.currentMonth && specialDate.length > 2 && (
                            <div
                              className="w-[50%] text-center bg-gray-100 hover:bg-gray-200 rounded-xl px-2 cursor-pointer text-sm"
                              onClick={() => handleMoreClick(date.day)}
                              ref={(el) => {
                                if (selcetedDate === date.day) {
                                  postRef.current = el;
                                }
                              }}
                            >
                              <p>+{specialDate.length - 2} more</p>
                              {!!openPost && selcetedDate === date.day && (
                                <PostModal
                                  tab={0}
                                  dataList={specialDate}
                                  isOpen={openPost}
                                  isClosing={closePost}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
