import React, { useEffect, useState } from "react";
import { UnderLineInput } from "../../components/TextField";
import {
  FaUser,
  FaUserGroup,
  FaUserPlus,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { Modal } from "../../components/Modal";
import Profile from "../myPage/Profile";
import { useDispatch } from "react-redux";
import { getFindByUser } from "../../api/UserApi";
import { Cookies } from "react-cookie";

export default function AddFriends({ isOpen, setIsOpen }) {
  const [searchFriend, setSearchFriend] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [selectedProfileSid, setSelectedProfileSid] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const cookie = new Cookies();

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const thresholdExpand = window.innerHeight * 0.3; // 확장 기준
    const thresholdClose = window.innerHeight * 0.6; // 닫기 기준

    if (e.clientY < thresholdExpand) {
      // 위로 많이 올린 경우 확장
      setIsExpanded(true);
    } else if (e.clientY > thresholdClose) {
      // 아래로 많이 내린 경우 닫기
      setIsOpen(false);
    } else {
      // 중간 위치로 돌아가면 축소
      setIsExpanded(false);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const getUserInfo = (userSid) => {
    return searchList.find((user) => user.sid === userSid);
  };

  const handleProfileClick = (userSid) => {
    setSelectedProfileSid(userSid);
  };

  const handleProfileClose = () => {
    setSelectedProfileSid(null);
  };

  const handleSearchFriendChange = (value) => {
    setSearchFriend(value);
  };

  const handleSearchClick = async () => {
    //searchFriend으로 친구 검색
    if (searchFriend) {
      const res = await dispatch(
        getFindByUser({ jwtToken: cookie.get("jwtToken"), str: searchFriend })
      );

      const { status, data } = res.payload;

      if (status === 200) {
        setSearchList(data?.data);
      }
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible " : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      ></div>
      <div
        className={`w-[95%] bg-white absolute bottom-0 rounded-t-md flex flex-col items-center p-5 select-none transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${isExpanded ? "h-[90%]" : "h-[60%]"}`}
      >
        <div
          className="w-[40%] h-1 min-h-1 max-h-1 rounded-full bg-gray-400 hover:bg-gray-500 mb-5"
          onMouseDown={handleMouseDown}
        />
        <div className="w-[90%] flex space-x-5 items-end pb-4 text-black">
          <UnderLineInput
            placeholder="친구를 찾아보세요"
            startIcon={FaMagnifyingGlass}
            handleInputChange={handleSearchFriendChange}
            keyDownEvent={handleSearchClick}
          />
          <button
            className="whitespace-nowrap h-[70%] border px-4 rounded-md hover:bg-gray-200"
            onClick={() => handleSearchClick()}
          >
            검색
          </button>
        </div>
        <div className="w-full text-black overflow-auto px-4">
          {searchList &&
            searchList.map((item) => (
              <div key={item.sid}>
                <div
                  className="h-auto flex p-2 space-x-4 hover:bg-gray-200 select-none"
                  onClick={() => handleProfileClick(item.sid)}
                >
                  <div className="w-11 h-11 rounded-full bg-gray-100 flex justify-center items-center text-xl text-gray-500">
                    <FaUser />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm">{item.email}</p>
                  </div>
                </div>
                {selectedProfileSid === item.sid && (
                  <Modal
                    isOpen={!!selectedProfileSid}
                    onClose={handleProfileClose}
                  >
                    <Profile info={getUserInfo(item.sid)} type={"S"} />
                  </Modal>
                )}
                <div className="w-full border-t my-1"></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
