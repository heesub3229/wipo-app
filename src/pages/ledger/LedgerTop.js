import React, { useEffect } from "react";
import { Expense } from "../../components/Box";
import LedgerChart from "./LedgerChart";
import LedgerMid from "./LedgerMid";
import { useDispatch, useSelector } from "react-redux";
import {
  getRcpInfo,
  getRcptGraphDay,
  getRcptGraphMonth,
} from "../../api/RcptApi";

export default function LedgerTop() {
  const dispatch = useDispatch();
  const rcptState = useSelector((state) => state.rcpt);
  const rcptStateSelect = useSelector((state) => state.rcpt.select);
  const rcptStateExp = useSelector((state) => state.rcpt.rcptGraph_month);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getRcpInfo(rcptStateSelect.listSelect));
    }, 500);

    return () => clearTimeout(timer);
  }, [rcptStateSelect.listSelect]);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getRcptGraphMonth(rcptStateSelect.monthSelect));
    }, 500);
    return () => clearTimeout(timer);
  }, [rcptStateSelect.monthSelect]);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getRcptGraphDay(rcptStateSelect.daySelect));
    }, 500);
    return () => clearTimeout(timer);
  }, [rcptStateSelect.daySelect]);
  return (
    <div className="flex space-x-5">
      <div className="w-full space-y-5">
        <LedgerMid />
      </div>
      <div className="w-full flex flex-col space-y-5">
        <div className="flex space-x-5">
          <Expense
            title="이번 달 수입"
            amount={rcptState.rcptNowIncome}
            type="I"
          />
          <Expense
            title="이번 달 지출"
            amount={rcptState.rcptNowExpense}
            type="E"
          />
        </div>
        <div className="w-full h-[310px] border-2 rounded-md px-5 py-3 border-gray-300 bg-gray-50">
          <LedgerChart type="M" />
        </div>
        <div className="w-full h-[310px] border-2 rounded-md px-5 py-3 border-gray-300 bg-gray-50">
          <LedgerChart type="D" />
        </div>
      </div>
    </div>
  );
}
