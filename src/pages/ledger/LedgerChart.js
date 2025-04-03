import React, { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
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
import {
  afterSelectDay,
  afterSelectMonth,
  beforeSelectDay,
  beforeSelectMonth,
} from "../../slices/rcpt";
import {
  changeStr_date_mmdd,
  changeStr_date_yyyymm,
  changeStr_date_yyyymmdd,
} from "../../components/Util";

export default function LedgerChart({ type }) {
  const dispatch = useDispatch();
  const rcptGraphMonth = useSelector((state) => state.rcpt.rcptGraph_month);
  const rcptGraphDay = useSelector((state) => state.rcpt.rcptGraph_day);
  const rcptStateSelect = useSelector((state) => state.rcpt.select);
  const data = useMemo(
    () => (type === "M" ? rcptGraphMonth : rcptGraphDay),
    [type, rcptGraphMonth, rcptGraphDay]
  );

  const handleNext = () => {
    if (type === "M") {
      dispatch(afterSelectMonth());
    }

    if (type === "D") {
      dispatch(afterSelectDay());
    }
  };

  const handlePrev = () => {
    if (type === "M") {
      dispatch(beforeSelectMonth());
    }

    if (type === "D") {
      dispatch(beforeSelectDay());
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between mb-4">
        <div
          className={`flex items-center font-bold px-2 rounded-md space-x-2 select-none ${"text-indigo-500 cursor-pointer hover:bg-gray-200"}`}
          onClick={handlePrev}
        >
          <FaAngleLeft />
          <p>이전</p>
        </div>
        <p className="font-bold text-lg">
          {type === "M" ? "월별 수입 지출 그래프" : "일별 수입 지출 그래프"}
        </p>
        <div
          className={`flex items-center font-bold px-2 rounded-md space-x-2 select-none ${
            (
              type === "M"
                ? rcptStateSelect.monthSelect === 1
                : rcptStateSelect.daySelect === 1
            )
              ? "text-gray-400 cursor-default"
              : "text-indigo-500 cursor-pointer hover:bg-gray-200"
          }`}
          onClick={
            (
              type === "M"
                ? rcptStateSelect.monthSelect > 1
                : rcptStateSelect.daySelect > 1
            )
              ? handleNext
              : undefined
          }
        >
          <p>다음</p>
          <FaAngleRight />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="75%">
        <LineChart data={data} margin={{ top: 10, left: 40, right: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              type === "M"
                ? `${changeStr_date_yyyymm(value)}월`
                : `${changeStr_date_mmdd(value)}일`
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) =>
              type === "M"
                ? `${changeStr_date_yyyymm(label)}월`
                : `${changeStr_date_yyyymmdd(label)}일`
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
