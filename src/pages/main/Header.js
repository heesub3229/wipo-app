import React, { useEffect } from "react";
import { useState } from "react";
import { FaBars, FaUser, FaRegBell, FaUserGroup } from "react-icons/fa6";
import Logo from "../../images/accounts/Logo.png";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";
import { Modal } from "../../components/Modal";
import MyPage from "../myPage/MyPage";
import { useSelector } from "react-redux";
import FriendsSideBar from "../friends/FriendsSidebar";
import { getFile } from "../../components/Util";

export default function Header() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);

  const authState = useSelector((state) => state.auth);
  const alertState = useSelector((state) => state.alert);
  useEffect(() => {
    setUserInfo(authState);
  }, [authState]);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFriendsClick = () => {
    setFriendsOpen((prev) => !prev);
  };

  const handleLogoClick = () => {
    navigate("/Main");
  };

  const handleBellClick = () => {
    setAlertOpen((prevData) => !prevData);
  };

  const handleProfileClick = () => {
    setMyPageOpen((prev) => !prev);
  };

  const handleCloseMyPage = () => {
    setMyPageOpen(false);
  };

  return (
    <div className="w-screen h-7vh fixed top-0 pr-8 pl-8 bg-indigo-900 flex justify-between items-center z-50 ">
      <div className="flex items-center">
        <div
          className="p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-30 flex justify-center items-center text-xl text-gray-50 cursor-pointer"
          onClick={() => handleOpenClick()}
        >
          <FaBars />
        </div>
        <img
          src={Logo}
          alt="Logo"
          className="w-1/2 cursor-pointer"
          onClick={() => handleLogoClick()}
        />
      </div>
      <div className="flex items-center">
        <div
          className="p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-30 flex justify-center items-center text-xl text-gray-50 mr-5 cursor-pointer"
          onClick={() => handleBellClick()}
        >
          <div className="relative">
            <FaRegBell />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex h-2 w-2">
              {alertState.filter((item) => item.confirm_flag === "N").length >
                0 && (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </>
              )}
            </span>
            {alertOpen && (
              <div onClick={(e) => e.stopPropagation()}>
                <Alert isClosing={alertOpen} onClose={handleBellClick} />
              </div>
            )}
          </div>
        </div>
        <div
          className="p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-30 flex justify-center items-center text-xl text-gray-50 mr-5 cursor-pointer"
          onClick={() => handleFriendsClick()}
        >
          <FaUserGroup />
        </div>
        {!userInfo.file?.filepath ? (
          <div
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex justify-center items-center text-gray-500 cursor-pointer"
            onClick={() => handleProfileClick()}
          >
            <FaUser />
          </div>
        ) : (
          <img
            className="w-8 h-8 rounded-full  justify-center items-center cursor-pointer"
            src={getFile(userInfo.file.filepath)}
            onClick={() => handleProfileClick()}
            alt="profile"
          />
        )}

        <Modal isOpen={myPageOpen} onClose={handleCloseMyPage}>
          <MyPage userInfo={userInfo} />
        </Modal>
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <FriendsSideBar isOpen={friendsOpen} setIsOpen={setFriendsOpen} />
    </div>
  );
}
