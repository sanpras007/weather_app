import React from 'react';
import './WeatherCard.css';

import clearImage from '../assets/clear.jpg';
import rainImage from '../assets/rain.jpg';
import hazeImage from '../assets/haze.jpg';
import cloudsImage from '../assets/cloud.jpg';

const WeatherCard = ({ weatherData, onRemove, onShowDetails }) => {
  if (!weatherData) return null;

  const { main, weather, name } = weatherData;
  const weatherCondition = weather[0].main.toLowerCase();
  const iconCode = weather[0].icon;
  const backgroundImages = {
    clear: `url(${clearImage})`,
    rain: `url(${rainImage})`,
    haze: `url(${hazeImage})`,
    clouds: `url(${cloudsImage})`,
  };

  const backgroundImage = backgroundImages[weatherCondition] || backgroundImages.clouds;

  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div
      className="weather-card"
      style={{ backgroundImage }}
    >
      <h2>{name}</h2>
      <img src={iconUrl} alt="weather icon" />
      <p>Temperature: {Math.round(main.temp - 273.15)}°C</p>
      <p>Weather: {weather[0].description}</p>
      <p>Humidity: {main.humidity}%</p>
    
      <button className="remove-btn" onClick={() => onRemove(name)}>
        &times;
      </button>
      <button className="more-options-btn" onClick={() => onShowDetails(weatherData)}>
        More Options
      </button>
    </div>
  );
};

export default WeatherCard;
