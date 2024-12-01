import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { getGreeting } from "../helpers/greeting";
import Greeting from "../components/Greeting";
import ClockWidget from "../components/Widgets/Clock";
import WeatherWidget from "../components/Widgets/Weather";
import NewsWidget from "../components/Widgets/News";
import TodoWidget from "../components/Widgets/ToDo";
import NotesWidget from "../components/Widgets/Notes";
import QuoteWidget from "../components/Widgets/Quote";
import MusicPlayerWidget from "../components/Widgets/Player";

const Homepage = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`w-full h-screen flex items-center justify-center p-3 ${
        theme === "light" ? "bg-[#e0c2f8]" : "bg-[#61546b]"
      }`}
    >
      <div
        className={`w-full h-full rounded-xl shadow-2xl flex flex-col ${
          theme === "light" ? "bg-[#CB9DF0]" : "bg-[#84679c]"
        }`}
      >
        <Navbar />
        <Greeting />
        <div className="my-2 flex items-start justify-start px-4 gap-4">
          <ClockWidget />
          <WeatherWidget />
          <NewsWidget />
        </div>
        <div className="my-2 flex items-start justify-start px-4 gap-4">
          <TodoWidget />
          <QuoteWidget />
          {/* <NotesWidget /> */}
          <MusicPlayerWidget />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
