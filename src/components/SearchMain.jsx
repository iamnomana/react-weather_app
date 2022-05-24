import React from "react";
import { useState, useEffect } from "react";

const SearchMain = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tempInfo, setTempInfo] = useState({});
  // const api_key = process.env.WEATHER_API_KEY;
  // console.log(api_key);
  const getWeatherInfo = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=af1724a407fb70cbbd0378db90e683db`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cod);
        if (data.cod === 200) {
          const { temp, humidity, pressure } = data.main;
          const { main: weatherType } = data.weather[0];
          const { lat, lon } = data.coord;
          const { speed } = data.wind;
          const { name } = data.name;
          const { sunset } = data.sys;

          const newWeatherInfo = {
            temp,
            humidity,
            pressure,
            weatherType,
            name,
            lat,
            lon,
            sunset,
            speed,
          };

          setTempInfo(newWeatherInfo);
        }
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };

  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          placeholder="Longitude"
          className="search"
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitutde"
          className="search"
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>

      <button className="searchBtn" onClick={getWeatherInfo}>
        Search
      </button>
    </div>
  );
};

export default SearchMain;
