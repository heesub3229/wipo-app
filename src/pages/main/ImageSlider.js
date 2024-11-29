import React, { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentTranslate.current = -currentIndex * 100;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const diff = e.clientX - startX.current;
    sliderRef.current.style.transform = `translateX(${
      currentTranslate.current + (diff / sliderRef.current.offsetWidth) * 100
    }%)`;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;

    const diff = e.clientX - startX.current;

    if (diff > 50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else if (diff < -50) {
      setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
    }

    sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    isDragging.current = false;
  };

  return (
    <div
      className="w-35vw h-50vh border border-dotted rounded-md mx-auto overflow-hidden relative bg-white"
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={sliderRef}
        className="flex transition-transform duration-300 ease-in-out"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // 현재 슬라이드 위치
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-35vw h-50vh" // 슬라이드 크기 설정
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>
      <div
        className="absolute top-1/2 left-1 transform -translate-y-1/2 p-2 rounded-full bg-gray-400 hover:bg-gray-500 flex justify-center items-center text-xl text-white cursor-pointer"
        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
      >
        <FaAngleLeft />
      </div>
      {/* 다음 버튼 */}
      <div
        className="absolute top-1/2 right-1 transform -translate-y-1/2 p-2 rounded-full bg-gray-400 hover:bg-gray-500 flex justify-center items-center text-xl text-white cursor-pointer"
        onClick={() =>
          setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))
        }
      >
        <FaAngleRight />
      </div>
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-indigo-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
