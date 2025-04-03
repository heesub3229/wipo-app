import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { getFile } from "../../components/Util";
import { Modal } from "../../components/Modal";
import Profile from "./Profile";

export default function ProfileImg({ data, size }) {
  const [selectedProfileSid, setSelectedProfileSid] = useState(null);

  const getProfileImg = (fileArray) => {
    const handleProfileClick = () => {
      if (fileArray?.sid) {
        setSelectedProfileSid(fileArray?.sid);
      } else {
        setSelectedProfileSid(null);
      }
    };

    return (
      <>
        {!fileArray?.filepath ? (
          <div
            className={`rounded-full bg-gray-100 flex justify-center items-center text-2xl text-gray-500 cursor-pointer w-${size} h-${size}`}
            onClick={handleProfileClick}
          >
            <FaUser />
          </div>
        ) : (
          <img
            className={`w-${size} h-${size} bg-gray-50 rounded-full cursor-pointer`}
            src={getFile(fileArray?.filepath)}
            alt="profile"
            onClick={handleProfileClick}
          />
        )}
      </>
    );
  };
  const handleProfileClose = () => {
    setSelectedProfileSid(null);
  };

  return (
    <>
      {getProfileImg(data.post?.create_user_sid?.file)}
      {selectedProfileSid && (
        <Modal isOpen={!!selectedProfileSid} onClose={handleProfileClose}>
          <Profile info={data.post?.create_user_sid} />
        </Modal>
      )}
    </>
  );
}
