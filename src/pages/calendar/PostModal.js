import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "../main/ImageSlider";
import ProfileImg from "../myPage/ProfileImg";
import { formatTime } from "../../components/Common";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";

export default function PostModal({ tab, dataList, data, isOpen, isClosing }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [postData, setPostData] = useState([]);
  const [outPosition, setOutPosition] = useState("");
  const [bottomOffset, setBottomOffset] = useState(0);
  const authState = useSelector((state) => state.auth);
  const modalRef = useRef(null);

  useEffect(() => {
    setCurrentTab(tab);
  }, [tab]);

  useEffect(() => {
    setPostData(data);
  }, [data]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const modalRect = modalRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      if (
        modalRect.right + 100 > innerWidth &&
        modalRect.bottom + 150 > innerHeight
      ) {
        setOutPosition("rightBottom");
        setBottomOffset(
          Math.abs(Math.round(innerHeight - (modalRect.bottom + 200)))
        );
      } else if (modalRect.right + 100 > innerWidth) {
        setOutPosition("right");
      } else if (modalRect.bottom + 150 > innerHeight) {
        setOutPosition("bottom");
        setBottomOffset(
          Math.abs(Math.round(innerHeight - (modalRect.bottom + 200)))
        );
      }
    }
  }, [isOpen]);

  const handlePostClick = (data) => {
    setPostData(data.data);
    setCurrentTab(1);
  };

  const handleBackClick = () => {
    setCurrentTab(0);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className={`absolute w-[400px] h-[450px] p-3 bg-white rounded-md drop-shadow-lg z-50 ${
        !isClosing ? "animate-zoomIn" : "animate-zoomOut"
      }`}
      style={{
        top:
          outPosition === "bottom" || outPosition === "rightBottom"
            ? `calc(100% - ${bottomOffset}px)`
            : "0px",
        left: outPosition === "" || outPosition === "bottom" ? "100%" : "auto",
        right:
          outPosition === "right" || outPosition === "rightBottom"
            ? "100%"
            : "auto",
        marginLeft:
          outPosition === "" || outPosition === "bottom" ? "8px" : "0",
        marginRight:
          outPosition === "right" || outPosition === "rightBottom"
            ? "8px"
            : "0",
      }}
    >
      {currentTab === 0 && dataList && (
        <div className="p-2">
          <p className="text-base font-bold py-2">
            {dataList[0].year}년 {dataList[0].month + 1}월 {dataList[0].day}일
          </p>
          {dataList.map((item) => (
            <div
              className={`rounded-xl py-3 text-base my-2 ${
                item.createUserSid === authState.userSid
                  ? "bg-sky-100 hover:bg-sky-200"
                  : "bg-rose-100 hover:bg-rose-200"
              }`}
              onClick={() => handlePostClick(item)}
            >
              <p>{item.placeName}</p>
            </div>
          ))}
        </div>
      )}
      {currentTab === 1 && postData && (
        <>
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex space-x-3">
              {dataList && (
                <div>
                  <FaArrowLeft
                    onClick={() => handleBackClick()}
                    className="w-7 h-7 rounded-full p-1 hover:bg-gray-100 text-xl text-gray-700 flex justify-center items-center cursor-pointer"
                  />
                </div>
              )}

              <ProfileImg data={postData} size="12" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold">
                {postData.post?.create_user_sid?.name || ""}
              </p>
              <p className="text-gray-500 text-sm">
                {formatTime(postData.post?.create_at) || formatTime(new Date())}
              </p>
            </div>
          </div>
          <div className="h-[55%]">
            <ImageSlider images={postData.files} />
          </div>
          <div className="whitespace-pre-wrap break-all p-4 text-left">
            <p className="inline">{postData.post?.content || ""}</p>
          </div>
        </>
      )}
    </div>
  );
}
