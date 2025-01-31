import React, { useEffect, useState } from "react";
import { LedgerAmount, LedgerInput } from "../../components/TextField";
import { LedgerCategory, LedgerDropDown } from "../../components/DropDown";
import { LedgerCancel, LedgerSave } from "../../components/Buttons";

export default function LedgerModal({ data, onClose }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [date, setDate] = useState(today.getDate());
  const [payment, setPayment] = useState("C");
  const [type, setType] = useState("E");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (data) {
      setYear(data.date.slice(0, 4));
      setMonth(data.date.slice(4, 6));
      setDate(data.date.slice(6));
      setPayment(data.payment);
      setType(data.type);
      setCategory(data.category);
      setContent(data.name);
      setAmount(data.amount);
    }
  }, [data]);

  const typeList = [
    { code: "I", name: "수입" },
    { code: "E", name: "지출" },
  ];

  const paymentList = [
    { code: "C", name: "카드" },
    { code: "H", name: "현금" },
  ];

  const categoryList = [
    { code: "F", name: "식비" },
    { code: "T", name: "교통" },
    { code: "E", name: "문화/여가" },
    { code: "L", name: "생활" },
    { code: "H", name: "건강/미용" },
    { code: "S", name: "월급" },
    { code: "B", name: "상여금" },
    { code: "A", name: "용돈" },
    { code: "O", name: "기타" },
  ];

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSaveClick = () => {};

  const handleCancelClick = () => {};

  return (
    <div className="relative w-[500px] h-[680px] bg-white mt-5 shadow-md rounded-md p-12">
      <div>
        <p className="font-bold text-indigo-500 ml-1">날짜</p>
        <div className="flex space-x-2">
          <LedgerDropDown
            type="year"
            value={year}
            setData={setYear}
            placeholder="Year"
          />
          <LedgerDropDown
            id="month"
            type="month"
            value={month}
            setData={setMonth}
          />
          <LedgerDropDown
            id="date"
            type="date"
            value={date}
            setData={setDate}
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <LedgerCategory
          title="수입 / 지출"
          list={typeList}
          value={type === "E" ? "지출" : "수입"}
          setData={setType}
        />
        <LedgerCategory
          title="결제 수단"
          list={paymentList}
          value={payment === "C" ? "카드" : "현금"}
          setData={setPayment}
        />
      </div>
      <LedgerInput
        title="내용"
        value={content}
        handleInputChange={handleContentChange}
      />
      <LedgerCategory
        title="분류"
        list={categoryList}
        value={categoryList.find((item) => item.code === category)?.name || ""}
        setData={setCategory}
      />
      <LedgerAmount
        title="금액"
        value={amount}
        handleInputChange={handleAmountChange}
      />
      <div className="absolute flex space-x-2 bottom-10 right-10">
        <LedgerSave />
        <LedgerCancel handleClick={() => onClose()} />
      </div>
    </div>
  );
}
