import React from "react";
import { useState } from "react";
import Header from "./Header";
import Post from "./Post";
import { Error } from "../../components/Common";

export default function Main() {
  return (
    <div className="min-h-screen w-screen bg-back flex justify-center pt-10vh pb-5 overflow-y-hidden">
      <Header />
      <div className="space-y-10 w-4/5">
        <Post />
      </div>
    </div>
  );
}
