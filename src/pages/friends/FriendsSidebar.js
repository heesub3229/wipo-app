import React, { useEffect } from "react";
import { useState } from "react";
import { FaUserGroup, FaUserPlus, FaMagnifyingGlass } from "react-icons/fa6";
import { UnderLineInputW } from "../../components/TextField";
import FriendsList from "./FriendsList";
import AddFriends from "./AddFriends";
import { useSelector } from "react-redux";

export default function FriendsSideBar({ isOpen, setIsOpen }) {
  const [searchData, setSearchData] = useState("");
  const [addFriendsOpen, setAddFriendsOpen] = useState(false);
  const authStateFriend = useSelector((state) => state.auth.friend);

  useEffect(() => {
    setAddFriendsOpen(false);
  }, [isOpen]);

  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = "scroll";
    return currentScrollY;
  };

  const allowScroll = (prevScrollY) => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, prevScrollY);
  };

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  const handleSearchDataChange = (value) => {
    setSearchData(value);
  };

  const handleAddFriendClick = () => {
    setAddFriendsOpen((prev) => !prev);
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-10 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible " : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      ></div>
      <div
        className={`fixed top-0 right-0 p-10 pb-4 h-screen items-center z-50 w-[25vw] text-white bg-gray-800 flex flex-col transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center ">
          <div className="flex items-center text-2xl font-bold space-x-3">
            <FaUserGroup />
            <div className="flex items-end space-x-2">
              <p>친구 목록</p>
              <p className="text-base">( {authStateFriend.length} )</p>
            </div>
          </div>
          <div
            className="text-2xl p-2 hover:bg-white hover:bg-opacity-20 rounded-full cursor-pointer"
            onClick={() => handleAddFriendClick()}
          >
            <FaUserPlus />
          </div>
        </div>
        <UnderLineInputW
          startIcon={FaMagnifyingGlass}
          handleInputChange={handleSearchDataChange}
          textSize="text-xl"
        />
        <div className="mt-5 w-full flex justify-center overflow-auto">
          <FriendsList />
        </div>
        <AddFriends isOpen={addFriendsOpen} setIsOpen={setAddFriendsOpen} />
      </div>
    </>
  );
}
