import React, { useContext } from "react";

import sunny from "../assets/sunny.svg";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;
        {currentTemperatureUnit}
      </p>
      <img
        src={sunny}
        alt="Sunny bannar for the weather card"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
