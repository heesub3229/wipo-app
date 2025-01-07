import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaUserPlus,
  FaUserCheck,
  FaRegEnvelope,
  FaCakeCandles,
  FaUserXmark,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";
import { CancelBtn } from "../../components/Buttons";
import { formatDate } from "../../components/Common";
import { useDispatch } from "react-redux";
import { setFriendUser, setRelApprove } from "../../api/UserApi";
import { pushFriend } from "../../slices/auth";
import { delAlert } from "../../slices/alert";
import { getFile } from "../../components/Util";
const colorMap = {
  Red: "bg-red-200",
  Yellow: "bg-yellow-200",
  Green: "bg-green-200",
  Blue: "bg-blue-200",
  Purple: "bg-purple-200",
};
export default function Profile({ info, type, onClose, alertSid, alertType }) {
  const dispatch = useDispatch();
  const setFriend = async () => {
    await dispatch(setFriendUser(info.sid));
    onClose();
  };

  const approveClick = async (value) => {
    const res = await dispatch(
      setRelApprove({ sid: alertSid, approveFlag: value })
    );
    const { data, status } = res.payload;
    if (status === 200) {
      if (value === "Y") {
        await dispatch(pushFriend(data.data));
        await dispatch(delAlert({ sid: alertSid, type: alertType }));
      } else {
        await dispatch(delAlert({ sid: alertSid, type: alertType }));
      }
    }
    onClose();
  };

  return (
    <div className="relative w-[500px] h-[680px] bg-white mt-5 shadow-md rounded-md">
      <div
        className={`absolute w-full ${
          colorMap[info.profileColor] || "bg-purple-200"
        }  h-[220px] rounded-t-md px-2 pt-2 flex justify-end space-x-1`}
      >
        <CancelBtn handleClick={() => onClose()} />
      </div>

      <div className="absolute w-52 h-52 bg-white rounded-full shadow-md top-32 left-5 flex justify-center items-center">
        {!info.file?.filepath ? (
          <div className="w-48 bg-gray-100 h-48 rounded-full flex justify-center items-center text-8xl text-gray-600">
            <FaUser />
          </div>
        ) : (
          <img
            className="w-48 h-48 rounded-full flex justify-center items-center "
            src={getFile(info.file?.filepath)}
            alt="Profile"
          />
        )}
      </div>
      <div className="pt-[250px] ">
        <div className="flex items-center space-x-4">
          <p className="pl-[270px] font-bold text-2xl">{info.name}</p>
          {type === "S" && (
            <FaUserPlus
              onClick={() => setFriend()}
              className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          )}
          {type === "R" && (
            <div className="flex space-x-1">
              <FaCheck
                onClick={() => approveClick("Y")}
                className="w-7 h-7 rounded-full p-1 hover:bg-gray-200 text-lg text-green-700 flex justify-center items-center cursor-pointer"
              />
              <FaXmark
                onClick={() => approveClick("N")}
                className="w-7 h-7 rounded-full p-1 hover:bg-gray-200 text-lg text-red-700 flex justify-center items-center cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="mt-[80px] w-full flex justify-center items-center">
          <div className="w-4/5">
            <div className="flex items-center mt-3 bg-white w-full p-3 border-b text-lg">
              <FaRegEnvelope className="text-gray-400 mr-3" />
              <p className="w-full">{info.email}</p>
            </div>
            <div className="flex items-center mt-3 bg-white w-full p-3 border-b text-lg">
              <FaCakeCandles className="text-gray-400 mr-3" />
              <p className="w-full">{formatDate(info.dateBirth, "birth")}</p>
            </div>
          </div>
        </div>
        <div className="pt-[70px] flex justify-evenly items-center">
          <div className="flex flex-col justify-center items-center space-y-2">
            <p className="font-bold text-gray-700">Posting</p>
            <p>포스팅 수</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <p className="font-bold text-gray-700">Following</p>
            <p>{info.friendsLength}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
