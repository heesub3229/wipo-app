export const AccountButton = ({ text, handleClick }) => {
  return (
    <button
      type="submit"
      className="font-nanum font-semibold w-full p-3 mt-4 rounded-md bg-indigo-200 hover:bg-indigo-300"
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
    <button className="h-10 font-nanum font-semibold flex items-center justify-center rounded-md text-white bg-indigo-400 hover:bg-indigo-500 w-full">
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
    <button className="h-10 px-2 font-nanum font-semibold flex items-center rounded-md hover:bg-gray-50 w-full">
      {StartIcon && <StartIcon className="mr-2" />}
      {text}
      {EndIcon && <EndIcon className="ml-2" />}
    </button>
  );
};
