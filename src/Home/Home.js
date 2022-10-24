import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Background from "../Assets/bg.jpg";

const Home = () => {
  const [location, setLocation] = useState("");

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/history.json',
    params: {q: 'Adana', dt: '2022-10-23', lang: 'en'},
    headers: {
      'X-RapidAPI-Key': '13a3d1c5a5mshaeff5a105d97999p16a63bjsnd83ec29df07e',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      console.log(location);
      e.preventDefault();
    }
  };

  return (
    <div className="Home">
      <img src={Background} className="bgImage" alt="bg" />
      <div className="Header">
        <input
          className="searchInput"
          placeholder="Enter Location"
          type="text"
          onKeyDown={searchLocation}
          onChange={(e) => setLocation(e.target.value)}
          autoComplete=""
        />
        <label className="bi bi-search searchIcon"></label>
      </div>
      <div className="Container">
        <div className="Location">
          <span>Adana</span>
        </div>
        <div className="Temp">
          <span>31°C</span>
          <i className="bi bi-brightness-high-fill sunny"></i>
        </div>
        <div className="Description">
          <span>Güneşli</span>
        </div>
        <div className="Footer">
          <div className="FooterContain">
            <div className="Feels">
              <p className="FeelsHeader">35°C</p>
              <p className="FeelsBottom">Feels Like</p>
            </div>
            <div className="Humidity">
              <p className="HumidityHeader">70%</p>
              <p className="HumidityBottom">Humidity</p>
            </div>
            <div className="Wind">
              <p className="WindHeader">1.97 MPH</p>
              <p className="WindBottom">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
