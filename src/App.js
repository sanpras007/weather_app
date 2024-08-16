import React, { useState,useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import './styles.css';

const App = () => {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedWeatherData, setSelectedWeatherData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = '145eec05471fab87b85230d0d1ede3a1'; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      const cityExists = weatherDataList.some(data => data.name.toLowerCase() === city.toLowerCase());

      if (!cityExists) {
        setWeatherDataList([response.data,...weatherDataList]);
        setError(null);
      } else {
        setError('City already searched');
      }
    } catch (err) {
      setError('City not found or API error');
    }
  };

  const handleRemove = (cityName) => {
    setWeatherDataList(weatherDataList.filter(data => data.name.toLowerCase() !== cityName.toLowerCase()));
  };

  const handleShowDetails = (weatherData) => {
    setSelectedWeatherData(weatherData);
  };

  const handleCloseDetails = () => {
    setSelectedWeatherData(null);
  };


  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <SearchBar onSearch={fetchWeatherData} />
      {error && <p className="error">{error}</p>}
      <div className="weather-cards-container">
        {selectedWeatherData && (
          <WeatherDetails weatherData={selectedWeatherData} onClose={handleCloseDetails} />
        )}
        {weatherDataList.map((data, index) => (
          <WeatherCard key={index} weatherData={data} onRemove={handleRemove} onShowDetails={handleShowDetails} />
        ))}
      </div>
    </div>
  );
};

export default App;
