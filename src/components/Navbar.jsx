import React, { useState } from "react";
// import { AiFillHome } from "react-icons/ai";
// import { RiSettings2Fill } from "react-icons/ri";
// import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
// import { FaGoogle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RiSearchFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const navigate = useNavigate();

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const handleSearch = debounce((query) => {
    if (query.trim().length !== 0) {
      window.open(`https://www.google.com/search?q=${query}`);
    }
  }, 300);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(prompt);
    setPrompt("");
  };

  return (
    <div className="w-full px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <span
        className={`font-bold text-2xl cursor-pointer ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
        onClick={() => navigate("/")}
      >
        CozyTab
      </span>
      {/* Center */}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={`flex items-center justify-center gap-2 ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        <input
          aria-label="Search"
          type="text"
          name="search"
          id="search"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={`w-32 border-[2px] rounded-full placeholder:text-center placeholder:font-semibold cursor-pointer px-2 py-1 bg-[#00000010] focus-within:w-96 font-semibold duration-200 ease-in text-center focus-within:outline-none ${
            theme === "light"
              ? "text-black border-black placeholder:text-black"
              : "text-[#FFF9BF] border-[#FFF9BF] placeholder:text-[#FFF9BF]"
          }`}
          placeholder="Search"
        />
        <button>
          <RiSearchFill className="text-2xl" />
        </button>
      </form>
      {/* Right */}
      <div
        className={`flex items-center justify-center gap-4 text-2xl ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        <span
          onClick={() => {
            try {
              window.open("https://youtube.com", "_blank");
            } catch (error) {
              console.log(error);
              alert("Pop-ups are disabled. Kindly enable them and try again.");
            }
          }}
          className="cursor-pointer hover:scale-110 duration-200"
        >
          <FaYoutube />
        </span>
        <span className="cursor-pointer hover:scale-110 hover:rotate-[-90deg] duration-200">
          <IoSettings />
        </span>
        <span
          onClick={handleThemeToggle}
          className="cursor-pointer hover:scale-110 duration-200"
        >
          {theme === "light" ? (
            <BsFillLightbulbOffFill />
          ) : (
            <BsFillLightbulbFill />
          )}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
