import React from "react";
import { useState } from "react";
import { FaBars, FaUser, FaRegBell } from "react-icons/fa6";
import Logo from "../../images/accounts/Logo.png";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogoClick = () => {
    navigate("/Main");
  };

  return (
    <div className="w-screen h-7vh fixed top-0 pr-8 pl-8 bg-indigo-900 flex justify-between items-center z-50 ">
      <div className="flex items-center">
        <div
          className="p-2 rounded-full hover:bg-indigo-700 flex justify-center items-center text-xl text-gray-50 cursor-pointer"
          onClick={() => handleOpenClick()}
        >
          <FaBars />
        </div>
        <img
          src={Logo}
          alt="Logo"
          className="w-1/2 cursor-pointer"
          onClick={() => handleLogoClick()}
        />
      </div>
      <div className="flex items-center">
        <div className="p-2 rounded-full hover:bg-indigo-700 flex justify-center items-center text-xl text-gray-50 mr-5 cursor-pointer">
          <div className="relative">
            <FaRegBell />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
        </div>

        <div className="p-2 rounded-full bg-white flex justify-center items-center text-gray-500">
          <FaUser />
        </div>
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
