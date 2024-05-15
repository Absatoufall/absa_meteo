import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [city, setCity] = useState('');
  const [isReady, setReady] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    if (!latitude || !longitude) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=20b987d5a3a8f6a7a0445e53be60c108&units=metric`)
      .then(result => result.json())
      .then(jsonresult => {
        updateWeatherData(jsonresult);
      })
      .catch(err => console.error(err));
  }, [latitude, longitude]);

  useEffect(() => {
    if (!searchCity) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=b2759598c5f3c8f49255a4120a5706d8&units=metric`)
      .then(result => result.json())
      .then(jsonresult => {
        updateWeatherData(jsonresult);
      })
      .catch(err => console.error(err));
  }, [searchCity]);

  const updateWeatherData = (data) => {
    setTemp(data.main.temp);
    setDesc(data.weather[0].description);
    setIcon(data.weather[0].icon);
    setSunrise(new Date(data.sys.sunrise * 1000).toLocaleTimeString());
    setSunset(new Date(data.sys.sunset * 1000).toLocaleTimeString());
    setCity(data.name);
    setReady(true);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleSearchCityChange = (event) => {
    setSearchCity(event.target.value);
    setReady(false); // Reset the ready state when typing in the city search field
  };

  const handleSubmit = () => {
    setReady(false);
  };

  const temperatureColor = temp < 15 ? 'alert-primary' : temp < 25 ? 'alert-warning' : 'alert-danger';

  return (
    <div className="container mt-5">
      <div className="bg-dark text-white p-4">
        <h1 className="text-center mb-4">My Weather App</h1>
      </div>
      <div className="row justify-content-center">
        <div align="center" className="col-lg-6">
          <div className="form-group">
            <h2 className="text-primary">Search by City</h2>
            <label htmlFor="searchCity" className="text-primary">City:</label>
            <input type="text" className="form-control" id="searchCity" value={searchCity} onChange={handleSearchCityChange} />
          </div>
          <div className="form-group">
            <h2 className="text-primary">Enter Coordinates</h2>
            <div className="row">
              <div className="col">
                <label htmlFor="latitude" className="text-primary">Latitude:</label>
                <input type="text" className="form-control" id="latitude" value={latitude} onChange={handleLatitudeChange} />
              </div>
              <div className="col">
                <label htmlFor="longitude" className="text-primary">Longitude:</label>
                <input type="text" className="form-control" id="longitude" value={longitude} onChange={handleLongitudeChange} />
              </div>
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={handleSubmit}>Search</button>
          {isReady ? (
            <div className={`alert ${temperatureColor}`} role="alert">
              <h4 className="alert-heading">City: {city}</h4>
              <p className="mb-1">Temperature: {temp} °C</p>
              <p className="mb-1">Weather: {desc}</p>
              <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather icon" className="weather-icon mb-3" />
              <p className="mb-1">Sunrise: {sunrise}</p>
              <p className="mb-0">Sunset: {sunset}</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
