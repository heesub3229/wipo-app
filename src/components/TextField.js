import React, { useRef } from "react";

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

export const VerCodeInput = () => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const inputs = Array(4)
    .fill(0)
    .map((_, index) => (
      <input
        key={index}
        ref={(el) => (inputRefs.current[index] = el)}
        className="bg-white h-20 p-3 w-1/6 border rounded-md border-gray-300 ring-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none font-nanum text-5xl text-center caret-transparent"
        placeholder="0"
        maxLength="1"
        onChange={(e) => handleChange(e, index)}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && index > 0 && !e.target.value) {
            inputRefs.current[index - 1].focus();
          }
        }}
      />
    ));

  return <div className="flex justify-around">{inputs}</div>;
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
