import React, { useEffect, useState } from "react";
import Header from "../main/Header";
import DatePicker from "../../components/DatePicker";
import { ContentInput, TitleInput } from "../../components/TextField";
import {
  FaRegCalendar,
  FaLocationDot,
  FaMagnifyingGlass,
  FaTags,
} from "react-icons/fa6";
import FileUpload from "./FileUpload";
import { FilledButton, OutlinedButton } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";
import SelectLocation from "./SelectLocation";
import { UserSelect } from "../../components/DropDown";

const userEx = [
  { id: 1, userName: "신짱구" },
  { id: 2, userName: "이맹구" },
  { id: 3, userName: "김철수" },
  { id: 4, userName: "신유리" },
];

export default function WritePost() {
  const [place, setPlace] = useState({});
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [content, setContent] = useState("");
  const [imageArr, setImageArr] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    // 친구 목록 불러오기
    setUserList(userEx);
  }, []);

  const handleOpenDatePicker = () => {
    if (!openDatePicker) {
      setOpenDatePicker(true);
    }
  };

  const handleUserChange = (value) => {
    setUser(value);
  };

  const handleAddUsers = (userName) => {
    setTaggedUsers((prev) => {
      if (Array.isArray(prev)) {
        return prev.includes(userName) ? prev : [...prev, userName];
      } else {
        return [userName];
      }
    });
  };

  const handleRemoveTag = (userName) => {
    setTaggedUsers((prev) => {
      if (Array.isArray(prev)) {
        return prev.filter((tag) => tag !== userName);
      } else {
        return [];
      }
    });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSaveClick = () => {};

  const handleCancelClick = () => {
    navigator("/Main");
  };
  return (
    <div className="min-h-screen w-screen bg-back flex justify-center items-end pt-10vh">
      <Header />
      <div className="w-4/5 min-h-[90vh] bg-white rounded-t-lg p-10">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-nowrap font-nanum text-xl font-bold w-[100px]">
              언제
            </p>
            <div className="w-[350px] flex flex-col items-start relative">
              <TitleInput
                startIcon={FaRegCalendar}
                handleClick={handleOpenDatePicker}
                value={date.replace(
                  /^(\d{4})(\d{2})(\d{2})$/,
                  `$1년 $2월 $3일`
                )}
              />
              <div className="absolute top-full left-0 z-50">
                <DatePicker
                  isOpen={openDatePicker}
                  setIsOpen={setOpenDatePicker}
                  setDate={setDate}
                />
              </div>
            </div>
          </div>
          <div className="flex w-[12%] space-x-2">
            <FilledButton text="저장" handleClick={handleSaveClick} />
            <OutlinedButton text="취소" handleClick={handleCancelClick} />
          </div>
        </div>
        <div className="flex">
          <div className="w-[530px] flex items-center mt-3">
            <p className="text-nowrap font-nanum text-xl font-bold w-[100px]">
              어디서
            </p>
            <div className="w-[350px]">
              <TitleInput
                startIcon={FaLocationDot}
                handleClick={handleOpenModal}
                endIcon={FaMagnifyingGlass}
                value={place}
                placeholder="장소를 검색해보세요"
              />
              <Modal isOpen={openModal} onClose={handleCloseModal}>
                <SelectLocation setPlace={setPlace} />
              </Modal>
            </div>
          </div>
          <div className="w-[800px] flex items-center mt-3">
            <p className="text-nowrap font-nanum text-xl font-bold w-[100px]">
              누구랑
            </p>
            <div className="w-[350px]">
              <UserSelect
                startIcon={FaTags}
                handleInputChange={handleUserChange}
                placeholder="친구를 태그해보세요"
                list={userList.filter(
                  (item) => item.userName.includes(user) // 입력값으로 필터링
                )}
                setData={handleAddUsers}
                taggedUsers={taggedUsers || []}
                removeTag={handleRemoveTag}
              />
            </div>
          </div>
        </div>
        <FileUpload setImageArr={setImageArr} />
        <div className="mt-5">
          <ContentInput
            value={content}
            placeholder="추억을 기록해보세요 :)"
            handleInputChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
}
