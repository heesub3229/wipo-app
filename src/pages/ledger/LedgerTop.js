import React from "react";
import { Expense } from "../../components/Box";
import LedgerChart from "./LedgerChart";
import LedgerMid from "./LedgerMid";

const dataM = [
  { name: "1", expense: 1200000, income: 2500000 },
  { name: "2", expense: 1457000, income: 2700000 },
  { name: "3", expense: 1236500, income: 2500000 },
  { name: "4", expense: 978000, income: 3400000 },
  { name: "5", expense: 1469000, income: 2540000 },
  { name: "6", expense: 2015300, income: 2600000 },
  { name: "7", expense: 1279600, income: 2500000 },
  { name: "8", expense: 1625000, income: 2900000 },
  { name: "9", expense: 1780000, income: 2500000 },
  { name: "10", expense: 1000000, income: 2500000 },
  { name: "11", expense: 1269000, income: 2160000 },
  { name: "12", expense: 980000, income: 2600000 },
];

const dataD = [
  { name: "1", expense: 10000, income: 100000 },
  { name: "2", expense: 120000, income: 0 },
  { name: "3", expense: 9000, income: 0 },
  { name: "4", expense: 11000, income: 0 },
  { name: "5", expense: 13000, income: 0 },
  { name: "6", expense: 1400, income: 0 },
  { name: "7", expense: 1500, income: 0 },
  { name: "8", expense: 0, income: 0 },
  { name: "9", expense: 17000, income: 0 },
  { name: "10", expense: 10000, income: 0 },
  { name: "11", expense: 12000, income: 2100000 },
  { name: "12", expense: 90000, income: 0 },
  { name: "13", expense: 0, income: 0 },
  { name: "14", expense: 130000, income: 0 },
  { name: "15", expense: 1400, income: 0 },
  { name: "16", expense: 15000, income: 0 },
  { name: "17", expense: 16000, income: 0 },
  { name: "18", expense: 1700, income: 0 },
  { name: "19", expense: 100000, income: 0 },
  { name: "20", expense: 12000, income: 300000 },
  { name: "21", expense: 9000, income: 0 },
  { name: "22", expense: 0, income: 0 },
  { name: "23", expense: 13000, income: 0 },
];

export default function LedgerTop() {
  return (
    <div className="flex space-x-5">
      <div className="w-full space-y-5">
        <LedgerMid />
      </div>
      <div className="w-full flex flex-col space-y-5">
        <div className="flex space-x-5">
          <Expense title="이번 달 수입" amount={2500000} type="I" />
          <Expense title="이번 달 지출" amount={763000} type="E" />
        </div>
        <div className="w-full h-[310px] border-2 rounded-md px-5 py-3 border-gray-300 bg-gray-50">
          <LedgerChart data={dataM} type="M" />
        </div>
        <div className="w-full h-[310px] border-2 rounded-md px-5 py-3 border-gray-300 bg-gray-50">
          <LedgerChart data={dataD} type="D" />
        </div>
      </div>
    </div>
  );
}
