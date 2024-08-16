
import React from 'react';
import './WeatherDetails.css';

import clearImage from '../assets/clear.jpg';
import rainImage from '../assets/rain.jpg';
import hazeImage from '../assets/haze.jpg';
import cloudsImage from '../assets/cloud.jpg';

const WeatherDetails = ({ weatherData, onClose }) => {
  if (!weatherData) return null;

  const { main, weather, name, wind } = weatherData;
  const weatherCondition = weather[0].main.toLowerCase();
  const backgroundImages = {
    clear: `url(${clearImage})`,
    rain: `url(${rainImage})`,
    haze: `url(${hazeImage})`,
    clouds: `url(${cloudsImage})`,
  };
  const backgroundImage = backgroundImages[weatherCondition] || backgroundImages.clouds;

  return (
    <div className="weather-details" style={{ backgroundImage }}>
      <button className="close-details-btn" onClick={onClose}>
        &times;
      </button>
      <h2>{name} Detailed Weather Report</h2>
      <p>Temperature: {Math.round(main.temp - 273.15)}°C</p>
      <p>Weather: {weather[0].description}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Pressure: {main.pressure} hPa</p>
      <p>Feels Like: {Math.round(main.feels_like - 273.15)}°C</p>
    </div>
  );
};

export default WeatherDetails;
