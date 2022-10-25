import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Background from "../Assets/bg.jpg";

const Home = () => {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState([]);
  const [info, setInfo] = useState([]);
  const initialState = {
    locationName: "Adana",
    locationTemp: "32.5 °C",
    locationIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    locationText: "Sunny",
    locationFeels: "36 °C",
    locationHumidity: "15",
    locationWind: "8.4 MPH",
  };

  const searchLocation = async (e) => {
    const today = new Date();
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        const options = {
          method: "GET",
          url: "https://weatherapi-com.p.rapidapi.com/history.json",
          params: { q: `${location}`, dt: today, lang: "en" },
          headers: {
            "X-RapidAPI-Key":
              "13a3d1c5a5mshaeff5a105d97999p16a63bjsnd83ec29df07e",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        };

        await axios
          .request(options)
          .then(function (response) {
            setForecast(response?.data?.forecast?.forecastday[0]);
            setInfo(response?.data?.location);
            setLocation("")
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Home">
      <img src={Background} className="bgImage" alt="bg"/>
      <form className="Header">
        <input
          className="searchInput"
          placeholder="Enter Location"
          type="text"
          onKeyDown={searchLocation}
          onChange={(e) => setLocation(e.target.value)}
          autoComplete=""
          value={location}
        />
        <label className="bi bi-search searchIcon"></label>
      </form>
      <div className="Container">
        <div className="Location">
          <span>{info?.name ? info?.name : initialState.locationName}</span>
        </div>
        <div className="Temp">
          <img
            src={
              forecast?.day?.condition?.icon
                ? forecast?.day?.condition?.icon
                : initialState.locationIcon
            }
            className="condition"
            alt="condition"
          />
          <span>
            {forecast?.day?.mintemp_c
              ? forecast?.day?.mintemp_c + " °C"
              : initialState.locationTemp}{" "}
          </span>
        </div>
        <div className="Description">
          <span>
            {forecast?.day?.condition?.text
              ? forecast?.day?.condition?.text
              : initialState.locationText}
          </span>
        </div>
        <div className="Footer">
          <div className="FooterContain">
            <div className="Feels">
              <p className="FeelsHeader">
                {forecast?.day?.avgtemp_c
                  ? forecast?.day?.avgtemp_c
                  : initialState.locationFeels}
              </p>
              <p className="FeelsBottom">Feels Like</p>
            </div>
            <div className="Humidity">
              <p className="HumidityHeader">
                {forecast?.day?.avghumidity
                  ? forecast?.day?.avghumidity
                  : initialState.locationHumidity}
              </p>
              <p className="HumidityBottom">Humidity</p>
            </div>
            <div className="Wind">
              <p className="WindHeader">
                {forecast?.day?.maxwind_mph
                  ? forecast?.day?.maxwind_mph + " MPH"
                  : initialState.locationWind}
              </p>
              <p className="WindBottom">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
