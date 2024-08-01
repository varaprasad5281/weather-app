import React from 'react';
import './index.css'

const UnitToggle = ({ unit, setUnit }) => {
  return (
    <div className="unit-toggle">
      <label className='celsius'>
        <input
          type="radio"
          name="unit"
          value="metric"
          className='radio'
          checked={unit === 'metric'}
          onChange={() => setUnit('metric')}
        />
        Celsius
      </label>
      <label className='fahrenheit'>
        <input
          type="radio"
          className='radio'
          name="unit"
          value="imperial"
          checked={unit === 'imperial'}
          onChange={() => setUnit('imperial')}
        />
        Fahrenheit
      </label>
    </div>
  );
};

export default UnitToggle;
