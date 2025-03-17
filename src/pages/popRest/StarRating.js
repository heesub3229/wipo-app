import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function StarRating() {
  const [score, setScore] = useState(0);
  const [scoreFixed, setScoreFixed] = useState(score);

  const handleLeftHalfEnter = (idx) => {
    setScore(idx + 0.5);
  };

  const handleRightHalfEnter = (idx) => {
    setScore(idx + 1);
  };

  const handleStarClick = () => {
    setScoreFixed(score);
  };

  const handleStarLeave = () => {
    if (score !== scoreFixed) {
      setScore(scoreFixed);
    }
  };

  return (
    <div className="flex space-x-1">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer flex flex-col items-center"
            onMouseLeave={handleStarLeave}
            onClick={() => handleStarClick()}
          >
            <div className="relative">
              {score - Math.floor(score) === 0.5 &&
              Math.floor(score) === idx ? (
                <FaStarHalfAlt size={24} color="gold" />
              ) : idx + 1 > score ? (
                <FaStar size={24} color="lightGray" />
              ) : (
                <FaStar size={24} color="gold" />
              )}
            </div>
            <div className="absolute inset-0 flex">
              <div
                className="w-1/2 h-full"
                onMouseEnter={() => handleLeftHalfEnter(idx)}
              />
              <div
                className="w-1/2 h-full"
                onMouseEnter={() => handleRightHalfEnter(idx)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default StarRating;
