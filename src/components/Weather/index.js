import React, { useState, useEffect, useCallback, memo } from 'react';
import Axios from 'axios';
import Loader from '../Loader';
import Error from '../Error';
import UnitToggle from '../UnitToggle';
import Forecast from '../Forecast';
import useFetch from '../Geolocation';

import './index.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [text, setText] = useState(""); // User input
  const [cityData] = useFetch("data"); // Fetched city data, if applicable
  const [city, setCity] = useState("Hyderabad"); // Default city
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  const onSubmitCity = () => {
    if (text.trim() !== "") {
      console.log("Submitting city:", text.trim());
      setCity(text.trim());
      setText(""); // Clear input field
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const dateText = date.toString();
      const spiceDate = dateText.slice(0, 25);
      setCurrentDate(spiceDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = useCallback(async () => {
    const cData = city || cityData;
    console.log("Fetching data for city:", cData);

    if (cData) {
      setLoad(true);
      try {
        const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cData}&units=${unit}&appid=7aa60764d53fa84a94c6631fd0f52d32`
        );
        console.log("API Response Data:", response.data);
        setWeatherData(response.data);
        setLoad(false);
        setError(null);
      } catch (err) {
        console.error("API Error:", err.response ? err.response.data : err.message);
        setLoad(false);
        setError('City not found or API request failed.');
        setWeatherData(null);
      }
    }
  }, [city, unit, cityData]);

  useEffect(() => {
    console.log("City or unit changed, triggering fetchData");
    fetchData();
  }, [city, unit, fetchData]);

  return (
    <div className="weather">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter city"
          value={text}
          className='search-bar'
          onChange={(e) => setText(e.target.value)}
        />
        <button type='button' className='btn-enter' onClick={onSubmitCity}>Enter</button>
      </form>
      {load && <Loader />}
      {error && <Error message={error} />}
      {weatherData && (
        <div>
          <h2 className='city-name'>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className='temp-container'>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className='img'
            />
            <p className='para-t'>{weatherData.main.temp}&deg;{unit === 'metric' ? 'C' : 'F'}</p>
          </div>
          <p className='para-description'>{weatherData.weather[0].description}</p>
          <div className='weather-container'>
            <div className='div'>
              <p className='p'>Feels Like</p>
              <p className='para'>{weatherData.main.feels_like}<sup>o</sup></p>
            </div>
            <div className='div'>
              <p className='p'>Humidity</p>
              <p className='para'>{weatherData.main.humidity}%</p>
            </div>
            <div className='div'>
              <p className='p'>Pressure</p>
              <p className='para'>{weatherData.main.pressure} Pa</p>
            </div>
            <div className='div'>
              <p className='p'>Wind Speed</p>
              <p className='para'>{weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
      <div className='dateTime'>
        <p className='time'>{currentDate}</p>
        {!load && <UnitToggle unit={unit} setUnit={setUnit} />}
      </div>
      <Forecast ctData={city || cityData} unit={unit} />
    </div>
  );
};

export default memo(Weather);
