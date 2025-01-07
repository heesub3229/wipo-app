import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import { Error } from "../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostMy } from "../../api/PostApi";
import { Cookies } from "react-cookie";
import Postings from "../posting/Postings";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = new Cookies();
    if (cookie.get("jwtToken")) {
      //dispatch(getPostMy({ jwt: cookieState, formData: 0 }));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen w-screen bg-back flex justify-center pt-10vh pb-5 overflow-y-hidden">
      <Header />
      <div className="w-[70%]">
        <Postings />
      </div>
    </div>
  );
}
