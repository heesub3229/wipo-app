import { useEffect, useState } from "react";

export const VerifyTimer = ({ expTime }) => {
  const calculateTimeLeft = () => {
    const remainingTime = Math.floor((new Date(expTime) - new Date()) / 1000);
    return remainingTime > 0 ? remainingTime : 0;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [expTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <p className="font-nanum text-right text-red-600 mt-1">
      {formatTime(timeLeft)}
    </p>
  );
};
