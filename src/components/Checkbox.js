import CheckIcon from "../images/common/check.png";

export const CheckboxS = ({ text, checked, handleCheckboxChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className={`h-4 w-4 bg-white checked:bg-indigo-300 border border-solid border-gray-300 rounded appearance-none ${
          checked ? "hover:bg-indigo-400" : "hover:bg-gray-100"
        }`}
        style={{
          backgroundImage: checked ? `url(${CheckIcon})` : "none",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <label htmlFor="checkbox" className="text-sm font-nanum  text-gray-700">
        {text}
      </label>
    </div>
  );
};

export const CheckboxM = ({ text, checked, handleCheckboxChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className={`h-5 w-5 bg-white checked:bg-indigo-300 border border-solid border-gray-300 rounded appearance-none ${
          checked ? "hover:bg-indigo-400" : "hover:bg-gray-100"
        }`}
        style={{
          backgroundImage: checked ? `url(${CheckIcon})` : "none",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <label htmlFor="checkbox" className="font-nanum text-gray-700">
        {text}
      </label>
    </div>
  );
};
