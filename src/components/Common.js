import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../slices/api";
import { delError } from "../slices/error";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

export const Divider = ({ text }) => {
  return (
    <div className="flex items-center">
      <div className="w-full border-t border-solid border-gray-400"></div>
      <p className="w-full text-center text-gray-700 font-nanum text-sm">
        {text}
      </p>
      <div className="w-full border-t border-gray-400"></div>
    </div>
  );
};

export const LoginLoading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <p className="font-nanum text-lg mr-3">로그인 중 ...</p>
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export const Loading = () => {
  const isLoading = useSelector((state) =>
    Object.values(state.api).some((api) => api?.loading)
  );
  return (
    isLoading && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 pointer-events-auto">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    )
  );
};

export const Error = () => {
  const error = useSelector((state) => Object.entries(state.error) || {});
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    error.forEach(([key, value]) => {
      if (key) {
        if (value.status === 401) {
          navigate("/");
        }
        addError(key, value);
      }
    });
  }, [error]);

  const addError = (id, message) => {
    // 새로운 에러 추가
    setErrors((prevErrors) => [
      ...prevErrors,
      { id, message, timeoutId: null, visible: false },
    ]);

    // 바로 상태 삭제를 디스패치
    dispatch(delError(id));

    // 0.1초 후 에러 표시
    setTimeout(() => {
      setErrors((prevErrors) =>
        prevErrors.map((err) =>
          err.id === id ? { ...err, visible: true } : err
        )
      );
    }, 100);

    // 5초 후 에러 제거
    const timeoutId = setTimeout(() => removeError(id), 5000);

    // 타임아웃 ID 업데이트
    setErrors((prevErrors) =>
      prevErrors.map((err) => (err.id === id ? { ...err, timeoutId } : err))
    );
  };
  const removeError = (id) => {
    setErrors((prevErrors) => prevErrors.filter((err) => err.id !== id));
  };

  if (errors.length === 0) return null;
  return (
    <div
      className={`fixed bottom-2 right-2 flex flex-col space-y-2 min-w-1/8 max-w-1/4 min-h-1/15 max-h-60vh overflow-y-auto ${
        errors.length > 5 ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
    >
      {errors.map((err) => (
        <div
          key={err.id}
          className={`bg-gray-600 px-2 pt-2 pb-1 rounded-md cursor-pointer transition-all duration-300 ${
            err.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          onClick={() => dispatch(delError(err.id))}
        >
          <p className="font-nanum text-white text-sm ml-2">
            {err.message.status} Error
          </p>
          <div className="flex items-center space-x-3 p-1">
            <p className="text-red-400 text-xl">
              <FaCircleExclamation />
            </p>
            <p className="text-white font-nanum">{err.message.error}</p>
          </div>
          <p className="font-nanum text-[10px] text-white text-right">
            {err.message.time}
          </p>
        </div>
      ))}
    </div>
  );
};

export const formatFullDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString.split("[")[0]);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}. ${month}. ${day} ${hours}:${minutes}`;
};

export const formatDate = (dateString, type) => {
  if (!dateString) return "";

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  if (type === "dot") {
    return `${year}. ${month}. ${day}`;
  } else if (type === "birth") {
    return `${year} . ${month} . ${day}`;
  } else if (type === "kr") {
    return `${year}년 ${month}월 ${day}일`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

export const formatTime = (createTime) => {
  const isoString = createTime.split("[")[0];
  const now = new Date();
  const postTime = new Date(isoString);
  const diffInSeconds = Math.floor((now - postTime) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
};

export const ToggleBtn = ({ isOn, handleToggle }) => {
  return (
    <div
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        isOn ? "bg-indigo-500" : "bg-indigo-200"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};
