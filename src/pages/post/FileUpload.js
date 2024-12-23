import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";

export default function FileUpload({ setImageArr }) {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImageArr(images);
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center space-x-5">
        <p className="font-nanum text-xl font-bold">이미지 업로드</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        <div
          onClick={handleTriggerFileInput}
          className="cursor-pointer font-nanum font-semibold w-1/10 p-2 rounded-md bg-indigo-400 hover:bg-indigo-500 text-white flex items-center justify-center"
        >
          파일 선택
        </div>
      </div>

      {images.length !== 0 && (
        <div className="mt-2 p-4 flex flex-nowrap gap-5 max-w-full overflow-x-auto">
          {images.map((src, index) => (
            <div key={index} className="relative flex-shrink-0">
              <img
                src={URL.createObjectURL(src)}
                alt={`uploaded-${index}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-1 right-1 bg-gray-400 hover:bg-gray-500 opacity-50 text-white rounded-full w-6 h-6 flex justify-center items-center text-sm"
              >
                <FaXmark />
              </button>
            </div>
          ))}
          <div
            className="w-32 h-32 border border-dashed border-gray-400 rounded-lg flex-shrink-0 flex justify-center items-center text-5xl text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-500"
            onClick={handleTriggerFileInput}
          >
            <FaPlus />
          </div>
        </div>
      )}
    </div>
  );
}
