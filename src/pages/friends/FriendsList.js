import React, { useState } from "react";
import { FaUser, FaUserXmark } from "react-icons/fa6";
import { Modal } from "../../components/Modal";
import Profile from "../myPage/Profile";

export default function FriendsList({ friends }) {
  const [selectedProfileSid, setSelectedProfileSid] = useState(null);

  const getUserInfo = (userSid) => {
    return friends.find((user) => user.userSid === userSid);
  };

  const handleProfileClick = (userSid) => {
    setSelectedProfileSid(userSid);
  };

  const handleProfileClose = () => {
    setSelectedProfileSid(null);
  };
  return (
    <div className="w-[95%]">
      {friends &&
        friends.map((item) => (
          <div key={item.userSid}>
            <div
              className="h-auto flex px-2 py-4 space-x-4 hover:bg-white hover:bg-opacity-10 select-none"
              onClick={() => handleProfileClick(item.userSid)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-100 flex justify-center items-center text-xl text-gray-500">
                <FaUser />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-sm">{item.email}</p>
              </div>
            </div>
            {selectedProfileSid === item.userSid && (
              <Modal isOpen={!!selectedProfileSid} onClose={handleProfileClose}>
                <Profile info={getUserInfo(item.userSid)} />
              </Modal>
            )}
            <div className="w-full border-t my-2"></div>
          </div>
        ))}
    </div>
  );
}
