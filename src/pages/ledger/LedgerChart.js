import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
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
  { name: "24", expense: 1400, income: 0 },
  { name: "25", expense: 150000, income: 0 },
];

const DraggableLineChart = () => {
  const [startIndex, setStartIndex] = useState(data.length - 7);
  const [endIndex, setEndIndex] = useState(data.length - 1);

  const handleNext = () => {
    if (endIndex < data.length - 1) {
      setStartIndex((prev) => prev + 7);
      setEndIndex((prev) => prev + 7);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 7);
      setEndIndex((prev) => prev - 7);
    }
  };

  const getDisplayedData = () => {
    if (startIndex < 0) {
      const missingCount = Math.abs(startIndex);
      const paddedData = Array.from({ length: missingCount }, (_, i) => ({
        name: "",
        expense: null, // 이전 데이터는 null로 설정
        income: null,
      })).concat(data.slice(0, endIndex + 1));
      return paddedData;
    }
    return data.slice(startIndex, endIndex + 1);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between mb-4">
        <div
          className={`flex items-center font-bold px-2 rounded-md space-x-2 select-none ${
            startIndex <= 0
              ? "text-gray-400 cursor-default"
              : "text-indigo-500 cursor-pointer hover:bg-gray-200"
          }`}
          onClick={startIndex > 0 ? handlePrev : undefined}
        >
          <FaAngleLeft />
          <p>지난 주</p>
        </div>
        <p className="font-bold text-lg">이번 달 수입 지출 그래프</p>
        <div
          className={`flex items-center font-bold px-2 rounded-md space-x-2 select-none ${
            endIndex >= data.length - 1
              ? "text-gray-400 cursor-default"
              : "text-indigo-500 cursor-pointer hover:bg-gray-200"
          }`}
          onClick={endIndex < data.length - 1 ? handleNext : undefined}
        >
          <p>다음 주</p>
          <FaAngleRight />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={getDisplayedData()}
          margin={{ top: 10, left: 40, right: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickFormatter={(value) => `${value}일`} />
          <YAxis />
          <Tooltip labelFormatter={(label) => `${label}일`} />
          <Legend wrapperStyle={{ fontWeight: "bold" }} />
          <Line
            type="monotone"
            dataKey="income"
            name="수입"
            stroke="#84A1D8"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="expense"
            name="지출"
            stroke="#D88485"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            connectNulls={false} // 끊어진 데이터 처리
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DraggableLineChart;
