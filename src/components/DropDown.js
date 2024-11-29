import React, { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const LoginDropDown = React.memo(
  ({
    id,
    value,
    type,
    placeholder,
    startIcon: StartIcon,
    errFlag,
    setData,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [typeArr, setTypeArr] = useState([]);
    const dropDownRef = useRef();
    useEffect(() => {
      if (type === "year") {
        const years = Array.from(
          { length: 100 },
          (_, i) => new Date().getFullYear() - i
        );
        setTypeArr(years);
      }

      if (type === "month") {
        const month = Array.from({ length: 12 }, (_, i) => i + 1);
        setTypeArr(month);
      }

      if (type === "date") {
        const date = Array.from({ length: 31 }, (_, i) => i + 1);
        setTypeArr(date);
      }
    }, [type]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropDownRef.current &&
          !dropDownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleClick = () => {
      setIsOpen((prev) => !prev);
    };
    return (
      <div className="w-full relative" ref={dropDownRef}>
        <div
          className={`flex items-center mt-3 bg-white p-3 border  rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none  ${
            errFlag ? "border-red-600" : "border-gray-300"
          }`}
        >
          {StartIcon && <StartIcon className="text-gray-400 mr-2" />}
          <input
            className="w-full focus:outline-none font-nanum text-sm"
            type="text"
            id={id}
            value={value}
            placeholder={placeholder}
            readOnly
            onClick={() => handleClick()}
          />
          {isOpen ? (
            <FiChevronUp
              className="text-gray-400 mr-2 cursor-pointer"
              onClick={() => handleClick()}
            />
          ) : (
            <FiChevronDown
              className="text-gray-400 mr-2 cursor-pointer"
              onClick={() => handleClick()}
            />
          )}
        </div>
        {isOpen && (
          <div className="absolute left-0 w-full max-h-60 overflow-y-auto p-2 mt-1 bg-white border rounded shadow-xl">
            {typeArr.map((item) => (
              <div
                key={item}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleClick();
                  setData(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.errFlag === nextProps.errFlag
    );
  }
);

export const LocationDropDown = ({
  id,
  value,
  placeholder,
  startIcon: StartIcon,
  list,
  setData,
  errFlag,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full relative" ref={dropDownRef}>
      <div
        className={`relative flex items-center bg-white p-3 border rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none ${
          errFlag ? "border-red-600" : "border-gray-300"
        }`}
      >
        {StartIcon && <StartIcon className="text-gray-600 mr-3" />}
        <input
          className="w-full focus:outline-none font-nanum text-lg font-bold text-center"
          id={id}
          value={value}
          placeholder={placeholder}
          onClick={() => handleClick()}
          readOnly
        />
        {isOpen ? (
          <FiChevronUp
            className="text-gray-400 mr-2 cursor-pointer"
            onClick={() => handleClick()}
          />
        ) : (
          <FiChevronDown
            className="text-gray-400 mr-2 cursor-pointer"
            onClick={() => handleClick()}
          />
        )}
      </div>
      {isOpen && (
        <div className="absolute left-0 w-full max-h-60 overflow-y-auto p-2 mt-1 bg-white border rounded shadow-xl font-nanum">
          {list.map((item) => (
            <div
              key={item}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                handleClick();
                setData(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
