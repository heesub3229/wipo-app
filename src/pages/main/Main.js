import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Post from "./Post";
import { Error } from "../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostMy } from "../../api/PostApi";
import { Cookies } from "react-cookie";

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
      <div className="space-y-10 w-4/5">
        <Post />
      </div>
    </div>
  );
}
