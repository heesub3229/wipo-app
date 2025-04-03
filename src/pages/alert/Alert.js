import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../components/Common";
import { Modal } from "../../components/Modal";
import Notice from "./Notice";
import Profile from "../myPage/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getUserRelInfo } from "../../api/UserApi";
import { Cookies } from "react-cookie";
import Posting from "../posting/Posting";
import { changeAlert } from "../../slices/alert";
import { getPostInfo } from "../../api/PostApi";

export default function Alert({ isClosing, onClose }) {
  const [openModal, setOpenModal] = useState({
    type: null,
    profileFlag: "",
    data: null,
    alertSid: null,
    alertType: null,
  });
  const [flag, setFlag] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [filteredList, setFilteredList] = useState([]);
  const alertRef = useRef();
  const alertState = useSelector((state) => state.alert || []);
  const dispatch = useDispatch();

  const tabArr = [{ name: "읽지않음" }, { name: "읽음" }];

  useEffect(() => {
    if (isClosing) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [isClosing]);

  useEffect(() => {
    if (currentTab === 0) {
      setFilteredList(alertState.filter((item) => item.confirm_flag === "N"));
    } else if (currentTab === 1) {
      setFilteredList(alertState.filter((item) => item.confirm_flag === "Y"));
    }
  }, [alertState, currentTab]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!openModal.data) {
        if (alertRef.current && !alertRef.current.contains(event.target)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  const handleAlertClick = async (sid, type, approveFlag) => {
    if (type === "F") {
      const res = await dispatch(getUserRelInfo({ sid: sid }));
      const { data, status } = res.payload;
      if (status === 200) {
        if (approveFlag === "W") {
          setOpenModal({
            type: type,
            profileFlag: "R",
            data: data.data,
            alertSid: sid,
            alertType: type,
          });
        } else {
          setOpenModal({
            type: type,
            profileFlag: "",
            data: data.data,
            alertSid: sid,
            alertType: type,
          });
        }
        dispatch(changeAlert({ sid: sid, type: type, confirm_flag: "Y" }));
      }
    } else {
      const res = await dispatch(getPostInfo(sid));
      if (res) {
        const { data, status } = res.payload;
        if (status === 200) {
          setOpenModal({
            type: type,
            profileFlag: "",
            data: data.data,
            alertSid: null,
            alertType: null,
          });
          dispatch(changeAlert({ sid: sid, type: type, confirm_flag: "Y" }));
        }
      }
    }
  };

  const handleCloseProfile = () => {
    setOpenModal({
      type: null,
      data: null,
      alertSid: null,
      alertType: null,
      profileFlag: null,
    });
  };

  const handleTabClick = (idx) => {
    setCurrentTab(idx);
  };

  return (
    <>
      <div
        className={`absolute top-full right-0 transform translate-x-[10px] mt-4 ${
          flag ? "animate-zoomOut" : "animate-zoomIn"
        }`}
        ref={alertRef}
      >
        <div className="relative inline-block bg-indigo-50 text-black rounded-md py-3 pl-5 pr-2 min-w-[25vw] break-words shadow-lg">
          <div className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-[10px] border-transparent border-b-indigo-50 border-t-0"></div>
          <div className="max-h-[60vh] overflow-auto pr-3">
            <div className="flex items-center space-x-3 px-2 pt-2 border-b-2 border-indigo-300">
              {tabArr.map((item, idx) => (
                <div
                  className={`font-bold ${
                    currentTab === idx
                      ? "text-indigo-700 text-lg bg-indigo-100 bg-opacity-70 p-2 rounded-t-md"
                      : "text-indigo-500 text-base"
                  } `}
                  onClick={() => handleTabClick(idx)}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center text-base ">
              {filteredList.length === 0 && (
                <p className="my-5">알림이 없습니다.</p>
              )}
            </div>
            {filteredList.map((item) => (
              <div
                className="relative"
                key={item.sid}
                onClick={() => {
                  handleAlertClick(item.sid, item.type, item.approve_flag);
                }}
              >
                <div className="w-full h-auto flex flex-col justify-center px-2 py-4  hover:bg-indigo-100 select-none">
                  <div className="flex">
                    <p className="text-base">{item.title}</p>
                    {item.confirm_flag === "N" && (
                      <div className="w-2 h-2 rounded-full bg-red-500 ml-1 mt-[2px]" />
                    )}
                  </div>
                  <p className="text-sm">{item.content}</p>
                  <p className="text-xs absolute right-1 bottom-1">
                    {item.date}
                  </p>
                </div>
                <div className="w-full border-t"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModal.type === "P" ? true : false}
        onClose={() => handleCloseProfile()}
      >
        <Posting data={openModal.data} />
      </Modal>
      <Modal
        isOpen={openModal.type === "F" ? true : false}
        onClose={() => handleCloseProfile()}
      >
        <Profile
          type={openModal.profileFlag}
          info={openModal.data}
          alertSid={openModal.alertSid}
          alertType={openModal.alertType}
        />
      </Modal>
    </>
  );
}
