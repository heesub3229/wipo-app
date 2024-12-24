import React, { useEffect, useState } from "react";
import { FaUser, FaRegEnvelope, FaCakeCandles } from "react-icons/fa6";
import { CancelBtn } from "../../components/Buttons";
import { formatDate } from "../../components/Common";

const userInfoEx = [
  {
    userSid: 1,
    userName: "이주영",
    userEmail: "juyoung05@hanmail.net",
    userBirthday: "20000509",
    userPosting: 15,
    userFollowing: 106,
  },
  {
    userSid: 2,
    userName: "김희섭",
    userEmail: "heesub3229@naver.com",
    userBirthday: "19901204",
    userPosting: 1,
    userFollowing: 12,
  },
  {
    userSid: 3,
    userName: "흰둥이",
    userEmail: "siro@google.com",
    userBirthday: "20210505",
    userPosting: 125,
    userFollowing: 1006,
  },
];

const profileImgEx = [
  {
    id: 1,
    userSid: 1,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
  },
  {
    id: 2,
    userSid: 2,
    url: "",
  },
  {
    id: 3,
    userSid: 3,
    url: "https://dthezntil550i.cloudfront.net/si/latest/si2106191619359450018996635/b78c82b7-7c14-478f-bf70-1f326e613718.png",
  },
];

export default function Profile({ info, onClose }) {
  const [profileImg, setProfileImg] = useState("");

  return (
    <div className="relative w-[500px] h-[680px] bg-white mt-5 shadow-md rounded-md">
      <div className="absolute w-full bg-violet-200 h-[220px] rounded-t-md px-2 pt-2 flex justify-end space-x-1">
        <CancelBtn handleClick={onClose} />
      </div>
      <div className="absolute w-52 h-52 bg-white rounded-full shadow-md top-32 left-5 flex justify-center items-center">
        {!profileImg ? (
          <div className="w-48 bg-gray-100 h-48 rounded-full flex justify-center items-center text-8xl text-gray-600">
            <FaUser />
          </div>
        ) : (
          <img
            className="w-48 h-48 rounded-full flex justify-center items-center "
            src={profileImg}
            alt="Profile"
          />
        )}
      </div>
      <div className="pt-[250px] ">
        <p className="pl-[270px] font-bold text-2xl">{info.name}</p>
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
            <p>친구 수</p>
          </div>
        </div>
      </div>
    </div>
  );
}
