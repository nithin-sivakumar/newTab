import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { quotes } from "../../data/quotes"; // Import the quotes array

const QuoteWidget = () => {
  const theme = useSelector((state) => state.theme.mode);

  // Randomly select a quote from the quotes array
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    // Update the quote when the component mounts or refreshes
    setQuote(getRandomQuote());
  }, []);

  return (
    <div
      className={`widget flex-1 h-48 shadow-lg rounded-lg p-4 text-center flex flex-col justify-center ${
        theme === "light" ? "bg-[#00000030]" : "bg-[#61546b]"
      }`}
    >
      <h2
        className={`text-xl font-bold ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        Quote of the Day
      </h2>
      <p
        className={`text-lg font-semibold ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        "{quote.quote}"
      </p>
      <p
        className={`text-sm ${
          theme === "light" ? "text-gray-800" : "text-[#FFF9BF]"
        }`}
      >
        - {quote.author}
      </p>
    </div>
  );
};

export default QuoteWidget;
