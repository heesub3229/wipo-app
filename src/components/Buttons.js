export const AccountButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="font-nanum font-semibold w-full p-3 mt-4 rounded-md bg-indigo-200 hover:bg-indigo-300"
    >
      {text}
    </button>
  );
};

export const AccountButton2 = ({ text, handleClick }) => {
  return (
    <button
      className="font-nanum font-semibold w-full p-3 mt-4 rounded-md bg-indigo-200 hover:bg-indigo-300"
      onClick={() => {
        handleClick();
      }}
    >
      {text}
    </button>
  );
};

export const FilledButton = ({ text, handleClick }) => {
  return (
    <button
      className="font-nanum font-semibold w-full p-2 rounded-md bg-indigo-400 hover:bg-indigo-500 text-white"
      onClick={() => {
        handleClick();
      }}
    >
      {text}
    </button>
  );
};

export const OutlinedButton = ({ text, handleClick }) => {
  return (
    <button
      className="font-nanum font-semibold w-full p-2 rounded-md hover:bg-indigo-100 border-2 border-indigo-400 text-indigo-400"
      onClick={() => {
        handleClick();
      }}
    >
      {text}
    </button>
  );
};

export const TextButton = ({ text, endIcon: EndIcon, handleClick }) => {
  return (
    <button
      className="font-nanum font-semibold mt-4 text-indigo-800 flex items-center rounded-md hover:bg-gray-50 p-2"
      onClick={() => {
        handleClick();
      }}
    >
      {text}
      {EndIcon && <EndIcon className="text-indigo-800 ml-1" />}
    </button>
  );
};

export const SideFilledButton = ({
  text,
  startIcon: StartIcon,
  handleClick,
}) => {
  return (
    <button
      className="h-10 font-nanum font-semibold flex items-center justify-center rounded-md text-white bg-indigo-400 hover:bg-indigo-500 w-full"
      onClick={() => handleClick()}
    >
      {StartIcon && <StartIcon className="mr-2" />}
      {text}
    </button>
  );
};

export const SideButton = ({
  text,
  startIcon: StartIcon,
  endIcon: EndIcon,
  handleClick,
}) => {
  return (
    <button
      className="h-10 px-2 font-nanum font-semibold flex items-center rounded-md hover:bg-gray-50 w-full"
      onClick={() => handleClick()}
    >
      {StartIcon && <StartIcon className="mr-2" />}
      {text}
      {EndIcon && <EndIcon className="ml-2" />}
    </button>
  );
};

export const SideBottomButton = ({
  text,
  startIcon: StartIcon,
  endIcon: EndIcon,
  handleClick,
}) => {
  return (
    <button
      className="h-10 px-2 text-sm font-nanum font-semibold flex items-center rounded-md hover:bg-gray-50 w-full"
      onClick={() => handleClick()}
    >
      {StartIcon && <StartIcon className="mr-2" />}
      {text}
      {EndIcon && <EndIcon className="ml-2" />}
    </button>
  );
};

export const IconButton = ({ icon: Icon, handleClick }) => {
  return (
    <div
      className="p-2 rounded-full hover:bg-calendarHover flex justify-center items-center text-xl text-gray-600 mr-4 cursor-pointer"
      onClick={handleClick}
    >
      <Icon />
    </div>
  );
};

export const VerifyButton = ({ text, handleClick }) => {
  return (
    <button
      className="font-nanum font-semibold p-2 mt-2 rounded-md hover:bg-indigo-50"
      onClick={() => {
        handleClick();
      }}
    >
      {text}
    </button>
  );
};
