import React from "react";
import { Expense } from "../../components/Box";
import LedgerChart from "./LedgerChart";

export default function LedgerTop() {
  return (
    <div className="flex space-x-5 h-72">
      <div className="w-full space-y-5">
        <div className="flex space-x-5">
          <Expense title="이번 달 지출" amount={763000} type="E" />
          <Expense title="지난 달 지출" amount={1356000} type="E" />
        </div>
        <div className="flex space-x-5">
          <Expense title="이번 달 수입" amount={2500000} type="I" />
          <Expense title="지난 달 수입" amount={2600000} type="I" />
        </div>
      </div>
      <div className="w-full border-2 rounded-md px-5 py-3 border-gray-300 bg-gray-50">
        <LedgerChart />
      </div>
    </div>
  );
}
