import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const VerifyTimer = () => {
  const emailAuthState = useSelector((state) => state.api.emailAuth);
  const calculateTimeLeft = () => {
    const remainingTime = Math.floor(
      (new Date(emailAuthState?.data) - new Date()) / 1000
    );
    return remainingTime > 0 ? remainingTime : 0;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    // expTime 변경 시 타이머 초기화
    setTimeLeft(calculateTimeLeft());
  }, [emailAuthState?.data]);

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
  }, [emailAuthState?.data]);

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
