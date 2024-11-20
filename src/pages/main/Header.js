import React from "react";
import { useState } from "react";
import { FaBars, FaUser, FaRegBell } from "react-icons/fa6";
import Logo from "../../images/accounts/Logo.png";
import Sidebar from "./Sidebar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-screen h-7vh fixed top-0 pr-8 pl-8 bg-indigo-900 flex justify-between items-center ">
      <div
        className="p-2 rounded-full hover:bg-indigo-700 flex justify-center items-center text-xl text-gray-50"
        onClick={() => handleOpenClick()}
      >
        <FaBars />
      </div>
      {/* <img src={Logo} alt="Logo" className="w-1/10" /> */}
      <div className="flex items-center">
        <div className="p-2 rounded-full hover:bg-indigo-700 flex justify-center items-center text-xl text-gray-50 mr-4">
          <FaRegBell />
        </div>
        <div className="p-2 rounded-full bg-white flex justify-center items-center text-gray-500">
          <FaUser />
        </div>
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
