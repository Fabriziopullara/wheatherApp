// Import React, useState, useEffect, axios, and the CSS file
import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

// Function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Main App component
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch weather data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5bb5ee008756be8e7777598abe7e58b9`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch weather data for the default city on component mount
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Event handler for city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Event handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <div className="background-image"></div>

      {/* Container for the main content */}
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <label>
            Enter city:
            <input type="text" value={city} onChange={handleCityChange} />
          </label>
          <button type="submit">Get Weather</button>
        </form>
        {loading && <p>Loading...</p>}
        {weatherData && (
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              <h1>{kelvinToCelsius(weatherData.main.temp).toFixed(2)}°C</h1>
            </div>
            <div className="description">{weatherData.weather[0].description}</div>
          </div>
        )}
        {weatherData && (
          <div className="bottom">
            <div className="feels">
              <p>Feels like {kelvinToCelsius(weatherData.main.feels_like).toFixed(2)}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
