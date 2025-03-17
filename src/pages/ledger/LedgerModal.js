import React, { useEffect, useState } from "react";
import {
  LedgerAmount,
  LedgerConv,
  LedgerInput,
} from "../../components/TextField";
import { LedgerCategory, LedgerDropDown } from "../../components/DropDown";
import {
  LedgerBtn,
  LedgerCancel,
  LedgerSave,
  OutlinedButton,
} from "../../components/Buttons";
import { categoryList, paymentList, typeList } from "../../components/Lists";
import { changeDateStr, pageAndDate } from "../../components/Util";
import { useDispatch, useSelector } from "react-redux";
import { setRcptSave } from "../../api/RcptApi";
import { saveRcptRes } from "../../slices/rcpt";
import { pushError } from "../../slices/error";

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
  const dispatch = useDispatch();
  const authStateDay = useSelector((state) => state.auth.defaultDay);
  const rcptStateSelect = useSelector((state) => state.rcpt.select.listSelect);

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

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSaveClick = async () => {
    const formData = {
      sid: data?.sid ? data.sid : null,
      type: type,
      amount: amount,
      category: category,
      payment: payment,
      date: changeDateStr(year, month, date),
      memo: content,
    };

    const res = await dispatch(setRcptSave(formData));
    if (res.payload) {
      const { data, status } = res.payload;
      if (status === 200) {
        pageAndDate(rcptStateSelect, formData.date, authStateDay).then(
          (result) => {
            const cloneData = structuredClone(data.data);
            cloneData.listFlag = result;
            dispatch(saveRcptRes(cloneData));
          }
        );
      }
    }
    onClose();
  };

  const handleCancelClick = () => {};

  const handleChangePay = (value) => {
    const tmpAmount = Number(amount);
    const tmpValue = Number(value);
    setAmount(String(tmpAmount + tmpValue));
  };

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
      <div className="flex space-x-2">
        <LedgerAmount
          title="금액"
          value={amount}
          handleInputChange={handleAmountChange}
        />
        <div className="flex items-center justify-between">
          <LedgerBtn
            text={"+1만"}
            handleClick={() => handleChangePay("10000")}
          />
          <LedgerBtn
            text={"+5만"}
            handleClick={() => handleChangePay("50000")}
          />
          <LedgerBtn
            text={"+10만"}
            handleClick={() => handleChangePay("100000")}
          />
          <LedgerBtn
            text={"+100만"}
            handleClick={() => handleChangePay("1000000")}
          />
        </div>
      </div>

      <div className="absolute flex space-x-2 bottom-10 right-10">
        <LedgerSave handleClick={() => handleSaveClick()} />
        <LedgerCancel handleClick={() => onClose()} />
      </div>
    </div>
  );
}
