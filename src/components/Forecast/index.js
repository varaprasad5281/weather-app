import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import './index.css'

const Forecast = ({ ctData, unit }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const fetchForecast = useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${ctData}&units=${unit}&appid=7aa60764d53fa84a94c6631fd0f52d32`
      );
      setForecastData(response.data);
      setError(null);
    } catch (err) {
      setError('Forecast data not available.');
      setForecastData(null);
    }
  },[ctData,unit])

  useEffect(() => {
    if (ctData) {
      fetchForecast();
    }
  }, [ctData, unit, fetchForecast]);
  console.log(forecastData)
  return (
    <div className="forecast">
      {error && <div className="error">{error}</div>}
      {forecastData && (
        <div>
          <h1 className='forecast-heading'>5 Day's Forecast</h1>
          <div className="forecast-list">
            {forecastData.list.map((item, index) => (
              <div key={index} className="forecast-item">
                <p className='date-para'>{item.dt_txt}</p>
                <p className='temp-para'>{item.main.temp}&deg;{unit === 'metric' ? 'C' : 'F'}</p>
                <p className='hum-para'>Humidity: {item.main.humidity}%</p>
                <p className='desc-para'>{item.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                  className='img-cloud'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
