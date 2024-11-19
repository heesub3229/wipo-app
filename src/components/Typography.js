export const AccountTitle = ({ text }) => {
  return <p className="text-4xl font-bold font-gummy">{text}</p>;
};

export const AccountText = ({ text, handleClick }) => {
  return (
    <p
      className="font-nanum text-sm text-gray-700 text-right hover:text-blue-900 cursor-pointer"
      onClick={() => handleClick()}
    >
      {text}
    </p>
  );
};

export const ModalTitle = ({ text }) => {
  return <p className="text-2xl font-bold font-nanum text-center">{text}</p>;
};
