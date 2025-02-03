import React, { useState } from "react";
import { FaUser, FaUserXmark } from "react-icons/fa6";
import { Modal } from "../../components/Modal";
import Profile from "../myPage/Profile";
import { useSelector } from "react-redux";
import { getFile } from "../../components/Util";

export default function FriendsList() {
  const [selectedProfileSid, setSelectedProfileSid] = useState(null);
  const authStateFriend = useSelector((state) => state.auth.friend);
  const getUserInfo = (userSid) => {
    return authStateFriend.find((user) => user.sid === userSid);
  };

  const handleProfileClick = (userSid) => {
    setSelectedProfileSid(userSid);
  };

  const handleProfileClose = () => {
    setSelectedProfileSid(null);
  };
  return (
    <div className="w-[95%]">
      {authStateFriend &&
        authStateFriend.map((item) => (
          <div key={item.sid}>
            <div
              className="h-auto flex px-2 py-4 space-x-4 hover:bg-white hover:bg-opacity-10 select-none"
              onClick={() => handleProfileClick(item.sid)}
            >
              {!item.file?.filepath ? (
                <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-100 flex justify-center items-center text-xl text-gray-500">
                  <FaUser />
                </div>
              ) : (
                <img
                  className="w-12 h-12 bg-white rounded-full flex justify-center items-center "
                  src={getFile(item.file?.filepath)}
                  alt="Profile"
                />
              )}

              <div className="flex flex-col">
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-sm">{item.email}</p>
              </div>
            </div>
            {selectedProfileSid === item.sid && (
              <Modal isOpen={!!selectedProfileSid} onClose={handleProfileClose}>
                <Profile info={getUserInfo(item.sid)} />
              </Modal>
            )}
            <div className="w-full border-t my-2"></div>
          </div>
        ))}
    </div>
  );
}
