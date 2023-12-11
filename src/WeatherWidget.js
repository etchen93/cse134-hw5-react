import './WeatherWidget.css';

import { useState } from 'react';

const WeatherWidget = () => {

  const [early, setEarly] = useState(null);
  const [late, setLate] = useState(null);
  const [show, setShow] = useState(false);

  const handleSubmit = async () =>{
    try {
      let responseInfo = await fetch('https://api.weather.gov/points/32.8801,-117.234');
      let dataInfo = await responseInfo.json();
      let responseForecast = await fetch(dataInfo.properties.forecast);
      let dataForecast = await responseForecast.json();
      setEarly(dataForecast.properties.periods[0]);
      setLate(dataForecast.properties.periods[1]);
      setShow(true);
    }
    catch (e) {
      console.error(e);
    }
  }

  if (show) {
    return (
      <section id='weather-widget-container'>
        <h2>Current Weather</h2>
        <div>
          <section>
            <h3>{early.name}</h3>
            <p>
              &#127777;
              {early.shortForecast}
              {early.temperature}
              {early.temperatureUnit}
            </p>
            <div>
              <h4>Extra Info</h4>
              <div>Probability of Precipitation: {early.probabilityOfPrecipitation.value == null ? '0%' : `${early.probabilityOfPrecipitation.value}%`}</div>
              <div>Relative Humidity: {early.relativeHumidity.value}</div>
              <div>Wind Direction: {early.windDirection}</div>
              <div>Wind Speed: {early.windSpeed}</div>
            </div>
          </section>
          <section>
            <h3>{late.name}</h3>
            <p>
              &#127777;
              {late.shortForecast}
              {late.temperature}
              {late.temperatureUnit}
            </p>
            <div>
              <h4>Extra Info</h4>
              <div>Probability of Precipitation: {late.probabilityOfPrecipitation.value == null ? '0%' : `${late.probabilityOfPrecipitation.value}%`}</div>
              <div>Relative Humidity: {late.relativeHumidity.value}</div>
              <div>Wind Direction: {late.windDirection}</div>
              <div>Wind Speed: {late.windSpeed}</div>
            </div>
          </section>
        </div>
        <button onClick={handleSubmit}>Find out Weather Right Now</button>
      </section>
    )
  }
  else {
    return (
      <section id='weather-widget-container'>
        <h2>Current Weather</h2>
        <button onClick={handleSubmit}>Find out Weather Right Now</button>
      </section>
    )
  }
}

export default WeatherWidget;