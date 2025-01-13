import React, { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";

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

export const UnderLineDropDown = React.memo(
  ({
    id,
    value,
    type,
    placeholder,
    startIcon: StartIcon,
    errFlag,
    textSize,
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
          className={`flex items-center mt-3 w-full p-3 border-b focus-within:border-b-2 focus-within:border-gray-500 ${textSize} ${
            errFlag ? "border-red-600" : "border-gray-300"
          }`}
        >
          {StartIcon && <StartIcon className="text-gray-400 mr-2" />}
          <input
            className={`w-full focus:outline-none font-nanum text-center bg-transparent ${
              textSize ? textSize : "text-sm"
            }`}
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
  handleInputChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickEndIcon,
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

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clickEndIcon();
    }
  };

  return (
    <div className="w-full relative z-50" ref={dropDownRef}>
      <div
        className={`relative flex items-center bg-white p-3 border-b focus-within:border-b-2 focus-within:border-gray-500 ${
          errFlag ? "border-red-600" : "border-gray-300"
        }`}
      >
        {StartIcon && <StartIcon className="text-gray-600 mr-3" />}
        <input
          className="w-full focus:outline-none font-nanum text font-bold text-center"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
          onClick={() => handleOpen()}
          onKeyDown={handleKeyDown}
        />
        {EndIcon && (
          <EndIcon
            className="text-gray-400 mr-2 cursor-pointer"
            onClick={() => clickEndIcon()}
          />
        )}
      </div>
      {isOpen && Array.isArray(list) && list.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-4/5 max-h-80 overflow-y-auto p-2 mt-1 bg-white border rounded shadow-xl font-nanum">
          {list.map((item, index) => (
            <div
              key={`place-${index}`}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                setData(item.placeName);
              }}
            >
              <p>{item.placeName}</p>
              <p className="text-sm">{item.addressName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const UserSelect = ({
  id,
  placeholder,
  handleInputChange,
  startIcon: StartIcon,
  endIcon: EndIcon,
  clickEndIcon,
  list,
  setData,
  taggedUsers,
  removeTag,
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

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full relative" ref={dropDownRef}>
      <div
        className={`flex items-center flex-wrap bg-white w-full p-3 border rounded-md ring-gray-600 focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-none ${
          errFlag ? "border-red-600" : "border-gray-300"
        }`}
        onClick={handleOpen}
      >
        {StartIcon && <StartIcon className="text-gray-600 mr-3" />}
        {taggedUsers.length === 0 && !isOpen && (
          <div className="text-gray-400 font-nanum text-lg font-bold ml-2">
            {placeholder}
          </div>
        )}
        {isOpen ? (
          <>
            {taggedUsers.map((tag, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm mr-1 mb-1"
              >
                <span>{tag.name}</span>
                <button
                  className="ml-2 text-gray-500 hover:text-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag.sid);
                  }}
                >
                  <FaXmark />
                </button>
              </div>
            ))}

            <input
              className="flex-grow focus:outline-none font-nanum text-lg font-bold ml-2"
              id={id}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
          </>
        ) : (
          <>
            {taggedUsers.slice(0, 2).map((tag, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm mr-1"
              >
                <span>{tag.name}</span>
                <button
                  className="ml-2 bg-gray-400 hover:bg-gray-500 opacity-50 text-white rounded-full w-4 h-4 flex justify-center items-center text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag.sid);
                  }}
                >
                  <FaXmark />
                </button>
              </div>
            ))}
            {taggedUsers.length > 2 && (
              <div className="flex items-center text-gray-500 text-sm m-1">
                +{taggedUsers.length - 2}
              </div>
            )}
          </>
        )}

        {EndIcon && (
          <EndIcon
            className="text-gray-400 ml-2 cursor-pointer"
            onClick={() => clickEndIcon()}
          />
        )}
      </div>
      {isOpen && Array.isArray(list) && list.length > 0 && (
        <div className="absolute left-0 w-full max-h-80 overflow-y-auto p-2 mt-1 bg-white border rounded shadow-xl font-nanum">
          {list.map((item, index) => (
            <div
              key={`place-${index}`}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setData(item);
                handleInputChange("");
                setIsOpen(false);
              }}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
