import React, { useEffect } from "react";
import { useState } from "react";
import {
  SideBottomButton,
  SideButton,
  SideFilledButton,
} from "../../components/Buttons";
import { IoReceiptOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import {
  FaPlus,
  FaRegCalendarCheck,
  FaRegMap,
  FaListCheck,
  FaUtensils,
  FaLocationArrow,
  FaWonSign,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../slices/auth";
import { useDispatch } from "react-redux";
import { disconStream } from "../../api/UserApi";
import { Cookies } from "react-cookie";
import { clearPost } from "../../slices/post";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddclick = () => {
    navigate("/WritePost");
  };
  const handleCalendarClick = () => {
    navigate("/Calendar");
  };
  const handleMapClick = () => {};
  const handleChkListClick = () => {};
  const handleLedgerClick = () => {
    navigate("/Ledger");
  };
  const handlePopRest = () => {
    navigate("/PopRest");
  };
  const handleNavClick = () => {};
  const handleLogoutClick = async () => {
    const cookie = new Cookies();
    const res = await dispatch(disconStream(cookie.get("jwtToken")));
    if (res.payload) {
      const { status } = res.payload;
      if (status === 200) {
        cookie.remove("jwtToken", { path: "/" });
        dispatch(clearAuth());
        dispatch(clearPost());
        navigate("/");
      }
    }
  };
  return (
    <>
      <div
        className={` fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible " : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      ></div>
      <div
        className={`fixed top-0 left-0 px-4 pt-10 pb-4 h-screen z-50 w-1/8 bg-white flex flex-col transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <SideFilledButton
          text="게시물 추가"
          startIcon={FaPlus}
          handleClick={handleAddclick}
        />
        <div className="flex flex-col space-y-2 mt-10">
          <SideButton
            text="달력"
            startIcon={FaRegCalendarCheck}
            handleClick={handleCalendarClick}
          />
          <SideButton
            text="지도"
            startIcon={FaRegMap}
            handleClick={handleMapClick}
          />
          <SideButton
            text="체크리스트"
            startIcon={FaListCheck}
            handleClick={handleChkListClick}
          />
          <SideButton
            text="가계부"
            startIcon={FaWonSign}
            handleClick={handleLedgerClick}
          />
          <SideButton
            text="맛집 기록"
            startIcon={FaUtensils}
            handleClick={handlePopRest}
          />
        </div>
        <div className="mt-5">
          <SideButton
            text="길 찾기"
            startIcon={FaLocationArrow}
            handleClick={handleNavClick}
          />
        </div>
        <div className="flex-grow"></div>
        <SideBottomButton
          text="로그아웃"
          endIcon={MdLogout}
          handleClick={handleLogoutClick}
        />
      </div>
    </>
  );
}
