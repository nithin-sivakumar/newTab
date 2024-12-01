import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ClockWidget = () => {
  const theme = useSelector((state) => state.theme.mode);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`widget w-48 h-40 shadow-lg rounded-lg p-4 flex flex-col items-center justify-center ${
        theme === "light" ? "bg-[#00000030]" : "bg-[#61546b]"
      }`}
    >
      <h2
        className={`text-2xl font-bold ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </h2>
      <p
        className={`text-sm ${
          theme === "light" ? "text-gray-800" : "text-[#FFF9BF]"
        }`}
      >
        {time.toDateString()}
      </p>
    </div>
  );
};

export default ClockWidget;
