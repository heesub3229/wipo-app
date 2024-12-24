import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../components/Common";
import { Modal } from "../../components/Modal";
import Notice from "./Notice";

const alertEx = [
  {
    alertSid: 1,
    title: "공지",
    content: "2024. 12. 9 업데이트 내용에 대해 공지드립니다.",
    date: "20241209",
    readFlag: "N",
  },
  {
    alertSid: 2,
    title: "공지",
    content: "2024. 12. 9 업데이트 내용에 대해 공지드립니다.",
    date: "20241209",
    readFlag: "N",
  },
  {
    alertSid: 3,
    title: "공지",
    content: "2024. 12. 9 업데이트 내용에 대해 공지드립니다.",
    date: "20241209",
    readFlag: "N",
  },
];

export default function Alert({ isClosing, onClose }) {
  const [alertList, setAlertList] = useState([]);
  const [selectedAlertSid, setSelectedAlertSid] = useState(null);
  const alertRef = useRef();

  useEffect(() => {
    setAlertList(alertEx);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        alertRef.current &&
        !alertRef.current.contains(event.target) &&
        selectedAlertSid === null
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedAlertSid]);

  const handleAlertClick = (alertSid) => {
    setAlertList((prev) =>
      prev.map((alert) =>
        alert.alertSid === alertSid ? { ...alert, readFlag: "Y" } : alert
      )
    );
    setSelectedAlertSid(alertSid);
  };

  const handleCloseNotice = () => {
    setSelectedAlertSid(null);
  };

  return (
    <div
      className={`absolute top-full right-0 transform translate-x-[10px] mt-4 ${
        isClosing ? "animate-zoomOut" : "animate-zoomIn"
      }`}
      ref={alertRef}
    >
      <div className="relative inline-block bg-indigo-50 text-black rounded-md py-3 pl-5 pr-2 min-w-[25vw] break-words shadow-lg">
        <div className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-[10px] border-transparent border-b-indigo-50 border-t-0"></div>
        <div className="max-h-[60vh] overflow-auto pr-3">
          {alertList.map((item) => (
            <div
              className="relative"
              key={item.alertSid}
              onClick={() => {
                handleAlertClick(item.alertSid);
              }}
            >
              <div className="w-full h-auto flex flex-col justify-center px-2 py-4  hover:bg-indigo-100 select-none">
                <div className="flex">
                  <p className="text-base">{item.title}</p>
                  {item.readFlag === "N" && (
                    <div className="w-2 h-2 rounded-full bg-red-500 ml-1 mt-[2px]" />
                  )}
                </div>
                <p className="text-sm">{item.content}</p>
                <p className="text-xs absolute right-1 bottom-1">
                  {formatDate(item.date, "dot")}
                </p>
              </div>
              <div className="w-full border-t"></div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={!!selectedAlertSid} onClose={handleCloseNotice}>
        <Notice />
      </Modal>
    </div>
  );
}
