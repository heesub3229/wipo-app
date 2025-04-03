import React, { useState } from "react";
import { ModalTitle } from "../../components/Typography";
import { FaCalendarDays, FaLocationDot, FaXmark } from "react-icons/fa6";
import ImageSlider from "../main/ImageSlider";
import { FaUser } from "react-icons/fa6";
import { formatDate } from "../../components/Common";
import { getFile } from "../../components/Util";
import { Modal } from "../../components/Modal";
import Profile from "../myPage/Profile";

export default function Posting({ data, onClose }) {
  const [selectedProfileSid, setSelectedProfileSid] = useState(null);
  if (!data) return <></>;
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
            className="w-14 h-14 rounded-full bg-gray-100 flex justify-center items-center text-2xl text-gray-500 cursor-pointer"
            onClick={handleProfileClick}
          >
            <FaUser />
          </div>
        ) : (
          <img
            className="w-14 h-14 bg-gray-50 rounded-full cursor-pointer"
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
      <div className="relative bg-white h-[90vh] w-[60%] rounded-lg p-10 overflow-hidden">
        <div className="absolute inset-0 w-full h-[4vh] bg-indigo-900 flex items-center justify-end px-2">
          <div
            className="text-white text-xl hover:bg-indigo-700 rounded-full p-1 cursor-pointer"
            onClick={() => onClose()}
          >
            <FaXmark />
          </div>
        </div>
        <div className="w-full h-[10vh] border-b-2 border-gray-100 flex items-center justify-between px-10">
          <div className="flex items-center space-x-5">
            {getProfileImg(data.post?.create_user_sid?.file)}
            {selectedProfileSid && (
              <Modal isOpen={!!selectedProfileSid} onClose={handleProfileClose}>
                <Profile info={data.post?.create_user_sid} />
              </Modal>
            )}
            <div>
              <p className="text-xl font-bold">
                {data.post?.create_user_sid?.name || ""}
              </p>
              <p>{data.map?.placeName || ""}</p>
            </div>
          </div>
        </div>

        <div className="flex h-[60vh] space-x-10 mt-[5vh]">
          <div className="w-[55%] max-h-[60vh] overflow-auto">
            <div className="relative font-nanum whitespace-pre-wrap break-all">
              <p className="inline">{data.post?.content || ""}</p>
            </div>
          </div>
          <div className="w-[45%]">
            <ImageSlider images={data.files} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[5vh] border-t  flex items-center justify-end font-bold px-10 text-sm text-gray-600">
          <p>{formatDate(data.post?.date, "dot")}</p>
        </div>
      </div>
    </>
  );
}
