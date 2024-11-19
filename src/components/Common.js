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
