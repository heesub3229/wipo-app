import React from "react";
import Calendar from "./Calendar";
import Header from "../main/Header";

export default function CalendarMain() {
  return (
    <div className="min-h-screen w-screen bg-back flex justify-center items-center">
      <Header />
      <div className="flex-grow flex justify-center items-center pt-7vh">
        <Calendar />
      </div>
    </div>
  );
}
