import React from "react";
import { getGreeting } from "../helpers/greeting";
import { useSelector } from "react-redux";

const Greeting = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`my-4 text-center font-semibold text-2xl ${
        theme === "light" ? "text-black" : "text-[#FFF9BF]"
      }`}
    >
      {getGreeting()}
    </div>
  );
};

export default Greeting;
