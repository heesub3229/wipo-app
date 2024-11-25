import React, { useEffect, useRef, useState } from "react";

export const LoginInput = ({
  id,
  value,
  placeholder,
  type,
  handleInputChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickEndIcon,
  errFlag,
}) => {
  return (
    <div
      className={`flex items-center mt-3 bg-white w-full p-3 border rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none ${
        errFlag ? "border-red-600" : "border-gray-300"
      }`}
    >
      {StartIcon && <StartIcon className="text-gray-400 mr-2" />}
      <input
        className="w-full focus:outline-none font-nanum text-sm"
        type={type ? type : "text"}
        id={id}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
      />
      {EndIcon && (
        <EndIcon
          className="text-gray-400 mr-2 cursor-pointer"
          onClick={() => clickEndIcon()}
        />
      )}
    </div>
  );
};

export const LoginVerInput = ({
  id,
  value,
  placeholder,
  type,
  handleInputChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickVerify,
  errFlag,
}) => {
  return (
    <div
      className={`flex items-center mt-3 bg-white w-full p-3 border rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none ${
        errFlag ? "border-red-600" : "border-gray-300"
      }`}
    >
      {StartIcon && <StartIcon className="text-gray-400 mr-2" />}
      <input
        className="w-full focus:outline-none font-nanum text-sm"
        type={type ? type : "text"}
        id={id}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
      />
      <div
        className="hover:bg-gray-100 rounded-md px-2 cursor-pointer"
        onClick={() => {
          clickVerify();
        }}
      >
        <p className="font-nanum text-sm whitespace-nowrap">인증번호 전송</p>
      </div>
    </div>
  );
};

export const VerCodeInput = ({ text }) => {
  const inputRefs = useRef([]);
  const [inputs, setInputs] = useState(Array(4).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newInputs = [...inputs];
      newInputs[index] = ""; // 현재 입력값 지우기
      setInputs(newInputs);

      // 이전 입력 필드로 포커스 이동
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    // 모든 입력값이 변경될 때 부모로 전달
    text(inputs.join(""));
  }, [inputs]);

  return (
    <div className="flex justify-around">
      {inputs.map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          className="bg-white h-20 p-3 w-1/6 border rounded-md border-gray-300 ring-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none font-nanum text-5xl text-center caret-transparent"
          placeholder="0"
          maxLength="1"
          value={inputs[index]} // 상태로 입력값 관리
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export const UnderLineInput = ({
  id,
  value,
  placeholder,
  type,
  handleInputChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickEndIcon,
  errFlag,
}) => {
  return (
    <div
      className={`flex items-center mt-3 bg-white w-full p-3 border-b focus-within:border-b-2 focus-within:border-gray-500 ${
        errFlag ? "border-red-600" : "border-gray-300"
      }`}
    >
      {StartIcon && <StartIcon className="text-gray-400 mr-2" />}
      <input
        className="w-full focus:outline-none font-nanum text-sm"
        type={type ? type : "text"}
        id={id}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
      />
      {EndIcon && (
        <EndIcon
          className="text-gray-400 mr-2 cursor-pointer"
          onClick={() => clickEndIcon()}
        />
      )}
    </div>
  );
};
