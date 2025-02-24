export const Expense = ({ title, amount, type }) => {
  return (
    <div className="w-1/2 border-2 rounded-md px-5 py-2 border-gray-300 bg-gray-50">
      <p className="font-bold mb-2">{title}</p>
      {type === "E" && (
        <p className="text-right text-xl font-bold text-red-500">
          - {amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </p>
      )}
      {type === "I" && (
        <p className="text-right text-xl font-bold text-blue-500">
          + {amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </p>
      )}
    </div>
  );
};
