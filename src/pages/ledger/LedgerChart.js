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

export default function LedgerChart({ data, type }) {
  const [startIndex, setStartIndex] = useState(
    type === "M" ? data.length - 6 : data.length - 7
  );
  const [endIndex, setEndIndex] = useState(data.length - 1);

  const handleNext = () => {
    if (type === "M") {
      if (endIndex < data.length - 1) {
        setStartIndex((prev) => prev + 6);
        setEndIndex((prev) => prev + 6);
      }
    }

    if (type === "D") {
      if (endIndex < data.length - 1) {
        setStartIndex((prev) => prev + 7);
        setEndIndex((prev) => prev + 7);
      }
    }
  };

  const handlePrev = () => {
    if (type === "M") {
      if (startIndex > 0) {
        setStartIndex((prev) => prev - 6);
        setEndIndex((prev) => prev - 6);
      }
    }

    if (type === "D") {
      if (startIndex > 0) {
        setStartIndex((prev) => prev - 7);
        setEndIndex((prev) => prev - 7);
      }
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
          <p>이전</p>
        </div>
        <p className="font-bold text-lg">
          {type === "M" ? "월별 수입 지출 그래프" : "일별 수입 지출 그래프"}
        </p>
        <div
          className={`flex items-center font-bold px-2 rounded-md space-x-2 select-none ${
            endIndex >= data.length - 1
              ? "text-gray-400 cursor-default"
              : "text-indigo-500 cursor-pointer hover:bg-gray-200"
          }`}
          onClick={endIndex < data.length - 1 ? handleNext : undefined}
        >
          <p>다음</p>
          <FaAngleRight />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="75%">
        <LineChart
          data={getDisplayedData()}
          margin={{ top: 10, left: 40, right: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickFormatter={(value) =>
              type === "M" ? `${value}월` : `${value}일`
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) =>
              type === "M" ? `${label}월` : `${label}일`
            }
          />
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
}
