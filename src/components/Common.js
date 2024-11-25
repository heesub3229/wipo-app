import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

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

export const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 pointer-events-auto">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export const Error = ({ errFlag }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (errFlag) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errFlag]);

  if (!visible) return null;
  return (
    <div className="fixed bottom-2 right-2 bg-gray-600 min-w-1/6 max-w-1/4 min-h-1/15 rounded-md flex flex-col p-2">
      <p className="font-nanum text-white text-sm ml-2">{/* 에러 타이틀 */}</p>
      <div className="flex justify-center items-center space-x-3 p-1">
        <p className="text-red-400 text-xl">
          <FaCircleExclamation />
        </p>
        <p className="text-white font-nanum">{/* 에러 처리 */}</p>
      </div>
    </div>
  );
};
