import React from "react";
import { ModalTitle } from "../../components/Typography";
import { FaCalendarDays, FaLocationDot, FaXmark } from "react-icons/fa6";
import ImageSlider from "../main/ImageSlider";

export default function Posting({ post, images, onClose }) {
  return (
    <div className="w-[70vw] max-h-[80vh] bg-white p-10 rounded-md shadow-lg flex flex-col overflow-y-auto relative">
      <div className="absolute inset-0 w-full h-[4vh] bg-indigo-900 flex items-center justify-end px-2">
        <div
          className="text-white text-xl hover:bg-indigo-700 rounded-full p-1 cursor-pointer"
          onClick={() => onClose()}
        >
          <FaXmark />
        </div>
      </div>
      <div className="flex items-center justify-center text-2xl space-x-3 mt-7">
        <ModalTitle
          text={post.date.replace(/^(\d{4})(\d{2})(\d{2})$/, `$1년 $2월 $3일`)}
        />
      </div>
      <div className="flex items-center text-xl space-x-3 font-nanum mt-10 justify-end">
        <FaLocationDot />
        <p>{post.location}</p>
      </div>
      <div className="mt-10">
        <ImageSlider images={images} />
      </div>
      <div className="mt-14">
        <p className="font-nanum whitespace-pre-wrap break-all">
          {post.content}
        </p>
      </div>
    </div>
  );
}
