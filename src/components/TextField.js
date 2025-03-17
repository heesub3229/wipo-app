import React, { useEffect, useRef, useState } from "react";
import { moneyToStr } from "./Util";

export const LoginInput = React.memo(
  function LoginInput({
    id,
    value,
    placeholder,
    type,
    handleInputChange,
    startIcon: StartIcon,
    endIcon: EndIcon,
    clickEndIcon,
    errFlag,
  }) {
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.errFlag === nextProps.errFlag &&
      prevProps.type === nextProps.type &&
      prevProps.EndIcon === nextProps.EndIcon
    );
  }
);

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

  const handleFocus = (index) => {
    inputRefs.current[index].setSelectionRange(0, 1); // 전체 선택
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
          value={inputs[index]}
          onFocus={() => handleFocus(index)}
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
  keyDownEvent,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickEndIcon,
  errFlag,
  textSize,
  readOnly,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      keyDownEvent();
    }
  };
  return (
    <div
      className={`flex items-center mt-3 w-full p-3 border-b focus-within:border-b-2 focus-within:border-gray-500 ${textSize} ${
        errFlag ? "border-red-600" : "border-gray-300"
      }`}
    >
      {StartIcon && <StartIcon className="text-gray-400 mr-3" />}
      <input
        className={`w-full focus:outline-none font-nanum bg-transparent ${
          textSize ? textSize : "text-sm"
        }`}
        type={type ? type : "text"}
        id={id}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder={placeholder}
        readOnly={readOnly}
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

export const UnderLineInputW = ({
  id,
  value,
  placeholder,
  type,
  handleInputChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickEndIcon,
  textSize,
  readOnly,
}) => {
  return (
    <div
      className={`flex items-center mt-3 w-full p-3 border-b focus-within:border-b-2 border-gray-50 focus-within:border--gray-50 ${textSize}`}
    >
      {StartIcon && <StartIcon className="text-white mr-3" />}
      <input
        className={`w-full focus:outline-none text-white bg-transparent ${
          textSize ? textSize : "text-sm"
        }`}
        type={type ? type : "text"}
        id={id}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {EndIcon && (
        <EndIcon
          className="text-white mr-2 cursor-pointer"
          onClick={() => clickEndIcon()}
        />
      )}
    </div>
  );
};

export const UnderLineDateInput = ({
  id,
  value,
  placeholder,
  type,
  handleInputChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickEndIcon,
  errFlag,
  textSize,
}) => {
  return (
    <div
      className={`flex items-center mt-3 bg-white w-full p-3 border-b focus-within:border-b-2 focus-within:border-gray-500 ${textSize} ${
        errFlag ? "border-red-600" : "border-gray-300"
      }`}
    >
      {StartIcon && <StartIcon className="text-gray-400 mr-3" />}
      <input
        className={`w-full focus:outline-none font-nanum ${
          textSize ? textSize : "text-sm"
        }`}
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

export const TitleInput = ({
  id,
  value,
  placeholder,
  handleClick,
  startIcon: StartIcon,
  endIcon: EndIcon,
  errFlag,
}) => {
  return (
    <div
      className={`flex items-center bg-white w-full p-3 border rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none ${
        errFlag ? "border-red-600" : "border-gray-300"
      }`}
    >
      {StartIcon && <StartIcon className="text-gray-600 mr-3" />}
      <input
        className="w-full focus:outline-none font-nanum text-lg font-bold"
        id={id}
        value={value}
        placeholder={placeholder}
        onClick={handleClick}
        readOnly
      />
      {EndIcon && <EndIcon className="text-gray-400 mr-2" />}
    </div>
  );
};

export const ContentInput = ({ value, placeholder, handleInputChange }) => {
  const textareaRef = useRef(null);

  const handleDivClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  return (
    <div
      className="h-[59vh] w-full p-4  font-nanum text-lg border border-gray-300 rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none"
      onClick={handleDivClick}
    >
      <textarea
        ref={textareaRef}
        className="resize-none w-full h-full focus:outline-none focus:border-none"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export const LedgerInput = ({ title, value, handleInputChange }) => {
  return (
    <div className="py-2">
      <p className="font-bold text-indigo-500 ml-1 mb-2">{title}</p>
      <div
        className={`flex items-center bg-gray-50 w-full p-3 border rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none`}
      >
        <input
          className="w-full bg-gray-50 focus:outline-none text-center"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export const LedgerAmount = ({ title, value, handleInputChange }) => {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    if (!isNaN(inputValue) && inputValue !== "") {
      handleInputChange(inputValue);
    } else if (inputValue === "") {
      handleInputChange("");
    }
  };

  return (
    <div className="py-2">
      <p className="font-bold text-indigo-500 ml-1 mb-2">{title}</p>
      <div
        className={`flex items-center bg-gray-50 w-full p-3 border rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none`}
      >
        <input
          className="w-full text-right bg-gray-50 focus:outline-none"
          value={value ? formatNumber(value) : ""}
          onChange={handleChange}
        />
        <p className="ml-2">원</p>
      </div>
      <div className="flex pr-3 pt-1">
        <input
          value={moneyToStr(value)}
          disabled={true}
          className="w-full text-sm text-right focus:outline-none focus:none bg-white"
        />
        <p className="ml-1">원</p>
      </div>
    </div>
  );
};
