import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const WeatherWidget = () => {
  const theme = useSelector((state) => state.theme.mode);

  const [weather, setWeather] = useState({
    temp: null,
    description: "",
    icon: null,
    city: "Loading...",
  });
  const [location, setLocation] = useState({ lat: null, lon: null });

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${lat},${lon}`
      );
      const data = await response.json();

      // Map weather conditions to icons
      const weatherIcons = {
        Clear: <WiDaySunny className="text-4xl" />,
        Cloudy: <WiCloud className="text-4xl" />,
        Overcast: <WiCloud className="text-4xl" />,
        Rain: <WiRain className="text-4xl" />,
        Snow: <WiSnow className="text-4xl" />,
        Thunderstorm: <WiThunderstorm className="text-4xl" />,
      };

      setWeather({
        temp: data.current.temp_c,
        description: data.current.condition.text,
        icon: weatherIcons[data.current.condition.text] || (
          <WiCloud className="text-4xl" />
        ),
        city: data.location.name,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather((prev) => ({ ...prev, city: "Unavailable" }));
    }
  };

  useEffect(() => {
    // Get user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  return (
    <div
      className={`widget w-48 h-40 shadow-lg rounded-tl-[100px] rounded-br-[100px] rounded-tr-xl hover:rounded-tr-[100px] hover:rounded-tl-xl hover:rounded-br-none hover:rounded-bl-[100px] duration-200 p-4 flex flex-col items-center justify-center ${
        theme === "light" ? "bg-[#00000030]" : "bg-[#61546b]"
      }`}
    >
      <h2
        className={`text-lg font-bold mb-2 ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        {weather.city}
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div
            className={`text-4xl ${
              theme === "light" ? "text-black" : "text-[#FFF9BF]"
            }`}
          >
            {weather.icon}
          </div>
          <p
            className={`text-lg font-semibold ${
              theme === "light" ? "text-gray-800" : "text-[#FFF9BF]"
            }`}
          >
            {weather.temp !== null ? `${weather.temp}°C` : "Loading..."}
          </p>
        </div>
        <p
          className={`text-sm ${
            theme === "light" ? "text-gray-800" : "text-[#FFF9BF]"
          }`}
        >
          {weather.description}
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;
