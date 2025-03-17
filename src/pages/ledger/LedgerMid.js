import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaCalendarDays } from "react-icons/fa6";
import { RiFilterFill } from "react-icons/ri";
import { LedgerChip } from "../../components/Chips";
import { formatDate, ToggleBtn } from "../../components/Common";
import { Modal } from "../../components/Modal";
import LedgerModal from "./LedgerModal";
import { useDispatch, useSelector } from "react-redux";
import { getPeriod } from "../../components/Util";
import {
  afterSelectList,
  beforeSelectList,
  moveSelect,
} from "../../slices/rcpt";
import LedgerDaySelect from "./LedgerDaySelect";
import LedgerFilter from "./LedgerFilter";
import LedgerMonthSelect from "./LedgerMonthSelect";

export default function LedgerMid() {
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.rcpt);
  const defaultDay = useSelector((state) => state.auth.defaultDay);
  const [totalE, setTotalE] = useState();
  const [totalI, setTotalI] = useState();
  const [openMonthSelect, setOpenMonthSelect] = useState(false);
  const [openDaySelect, setOpenDaySelect] = useState(false);
  const [isShowDay, setIsShowDay] = useState(false);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [clickedCategory, setClickedCategory] = useState([]);
  const { period, startDateRaw } = getPeriod(
    defaultDay,
    selectState.select.listSelect,
    month
  );
  const calendarRef = useRef();
  const categoryRef = useRef();
  const monthRef = useRef();

  useEffect(() => {
    if (selectState?.rcptList) {
      if (isShowDay) {
        setFilteredData(
          selectState.rcptList.filter((item) => item.date === date)
        );
      } else {
        setFilteredData(selectState.rcptList);
      }

      if (clickedCategory.length > 0) {
        setFilteredData((prevData) =>
          prevData.filter((item) =>
            clickedCategory.some((cat) => cat === item.category)
          )
        );
      }
    }
  }, [selectState, date, isShowDay, clickedCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthRef.current && !monthRef.current.contains(event.target)) {
        setOpenMonthSelect(false);
      }

      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpenDaySelect(false);
      }

      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTotalE(
      filteredData
        .filter((item) => item.type === "E")
        .reduce((sum, item) => sum + item.amount, 0)
    );
    setTotalI(
      filteredData
        .filter((item) => item.type === "I")
        .reduce((sum, item) => sum + item.amount, 0)
    );
  }, [filteredData]);

  const handleListClick = (sid) => {
    setOpenModal(sid);
  };

  const handleCloseModal = () => {
    if (openModal !== null) {
      setOpenModal(null);
    }
  };

  const handlePrevClick = () => {
    setTimeout(() => {
      dispatch(beforeSelectList(selectState));
    }, 500);
  };

  const handleNextClick = () => {
    if (selectState.select === 1) {
      return;
    }
    setTimeout(() => {
      dispatch(afterSelectList(selectState));
    }, 500);
  };

  const handleopenMonthSelect = () => {
    setOpenMonthSelect((prev) => !prev);
  };

  const handleopenDaySelect = () => {
    setOpenDaySelect((prev) => !prev);
    if (!isShowDay) {
      setIsShowDay(true);
    }
  };

  const handleToggle = () => {
    setIsShowDay((prev) => !prev);
    if (isShowDay) {
      setOpenDaySelect(false);
    } else {
      setOpenDaySelect(true);
    }
  };

  const handleopenFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  const getMonthDifference = (date1, date2) => {
    return (
      date1 &&
      date2 &&
      (date1.getFullYear() - date2.getFullYear()) * 12 +
        (date1.getMonth() - date2.getMonth())
    );
  };

  useEffect(() => {
    if (month !== null) {
      setTimeout(() => {
        dispatch(moveSelect(getMonthDifference(startDateRaw, month)));
        setTimeout(() => setMonth(null), 300);
      }, 1000);
    }
  }, [month]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="relative flex items-center" ref={monthRef}>
        <div className="flex items-center text-xl font-bold space-x-7 select-none pt-3 pb-3">
          <div className="rounded-full hover:bg-gray-100 p-2 cursor-pointer">
            <FaAngleLeft onClick={() => handlePrevClick()} />
          </div>
          <p
            className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer"
            onClick={() => handleopenMonthSelect()}
          >
            {period}
          </p>
          <div
            className={`rounded-full ${
              selectState.select.listSelect === 1
                ? "text-gray-400"
                : "hover:bg-gray-100 cursor-pointer"
            }  p-2`}
          >
            <FaAngleRight onClick={() => handleNextClick()} />
          </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full z-50">
          <LedgerMonthSelect
            isOpen={openMonthSelect}
            setIsOpen={setOpenMonthSelect}
            setDate={setMonth}
            defaultDay={defaultDay}
            select={selectState.select.listSelect}
          />
        </div>
      </div>
      <div className="w-[90%] flex justify-between py-2">
        <div className="relative flex items-center" ref={calendarRef}>
          <div
            className="flex items-center select-none space-x-1 text-gray-700 font-bold px-2 cursor-pointer"
            onClick={() => handleopenDaySelect()}
          >
            <FaCalendarDays />
            <p>일별</p>
          </div>

          <ToggleBtn isOn={isShowDay} handleToggle={handleToggle} />

          <div className="absolute top-full left-0 z-50">
            <LedgerDaySelect
              isOpen={openDaySelect}
              setIsOpen={setOpenDaySelect}
              setDate={setDate}
              defaultDay={defaultDay}
              select={selectState.select.listSelect}
            />
          </div>
        </div>
        <div className="relative flex items-center" ref={categoryRef}>
          <div
            className="p-2 hover:bg-gray-100 cursor-pointer rounded-full"
            onClick={() => handleopenFilter()}
          >
            <RiFilterFill className="text-lg text-gray-700" />
          </div>
          <LedgerFilter
            isOpen={openFilter}
            clickedCategory={clickedCategory}
            setClickedCategory={setClickedCategory}
          />
        </div>
      </div>
      <div className="w-[90%] flex justify-center text-center border-t border-b py-2">
        <div className="w-full space-y-1">
          <p>수입</p>
          <p className="font-bold text-blue-500">
            {totalI?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </p>
        </div>
        <div className="w-full space-y-1">
          <p>지출</p>
          <p className="font-bold text-red-500">
            {totalE?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </p>
        </div>
        <div className="w-full space-y-1">
          <p>합계</p>
          <p className="font-bold">
            {(totalI - totalE)
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
        </div>
      </div>
      <div className="w-[90%] h-[550px] overflow-auto px-3 mt-3">
        {filteredData.map((item) => (
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
