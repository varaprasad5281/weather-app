import React from 'react';
import Weather from './components/Weather';
import './App.css';

function App() {
  return (
    <center>
    <div className="app">
      <h1 className='weather-head'>Weather App</h1>
      <Weather />
    </div></center>
  );
}

export default App;
