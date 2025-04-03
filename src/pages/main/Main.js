import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import { Error } from "../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOtherPost, getPostMy } from "../../api/PostApi";
import { Cookies } from "react-cookie";
import Postings from "../posting/Postings";
import { saveUser } from "../../components/LoginIng";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postState_i = useSelector((state) => state.post.post_i);
  const postState_other = useSelector((state) => state.post.post_other);
  useEffect(() => {
    const cookie = new Cookies();
    if (cookie.get("jwtToken")) {
      dispatch(saveUser());
      if (postState_i && postState_i.length > 0) {
      } else {
        dispatch(getPostMy(0));
      }
      if (postState_other && postState_other.length > 0) {
      } else {
        dispatch(getOtherPost(0));
      }
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
