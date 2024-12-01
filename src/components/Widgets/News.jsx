import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsNewspaper } from "react-icons/bs";

const NewsWidget = () => {
  const theme = useSelector((state) => state.theme.mode);

  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      const data = await response.json();
      console.log(data);
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div
      className={`widget flex-1 h-40 shadow-lg rounded-lg p-4 text-center flex flex-col gap-2 ${
        theme === "light" ? "bg-[#00000030]" : "bg-[#61546b]"
      }`}
    >
      <h2
        className={`text-xl font-bold ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        <BsNewspaper className="inline-block text-2xl mr-2" />
        Latest News
      </h2>
      <div className="flex flex-col gap-1 px-1 overflow-y-auto">
        {news.length === 0 ? (
          <p
            className={`text-sm ${
              theme === "light" ? "text-black" : "text-[#FFF9BF]"
            }`}
          >
            Loading news...
          </p>
        ) : (
          news.map((article, index) => (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className={`text-sm font-semibold hover:text-blue-900 ${
                theme === "light" ? "text-black" : "text-[#FFF9BF]"
              }`}
            >
              {article.title}
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsWidget;
