import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentCard from './CurrentCard';
import Search from './Search';
import FutureForecast from './FutureForecast';
import './App.css';

function App() {
  const [weather, setWeather] = useState({ currentWeather: null, futureWeather: null });
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Rexburg');
  const API_KEY = "5558c35373b8b9530daa4b1aef055dbc";

  //Calls async function when the state changes
  useEffect(() => {
    fetchData();
  }, [city]);

  //Makes an API call to gather data
  const fetchData = async () => {
    const currentForecast = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`);
    const futureForecast = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`);

    setWeather({ currentWeather: currentForecast.data, futureForecast: futureForecast.data })
  
    if(weather) {
      setLoading(false);
    }
  }

  //Changes city upon user request
  const changeCity = (e) => {
    setCity(e.target.value);
    if(city === '') {
      setLoading(true);
    }
  }

  //Generate the current forecast component
  const generateCurrentCard = () => {
    if(!loading) {
      let temp = parseInt(weather.currentWeather.main.temp);
      return(
        <CurrentCard name={weather.currentWeather.name} temp={temp} desc={weather.currentWeather.weather[0].description} type={weather.currentWeather.weather[0].main}/>
      )
    }
  }

  //Generates future forecast component
  const generateFutureCards = () => {
    let items = [];
    if(!loading) {
      for(let i = 0; i < 40; i+=8) {
        const date = weather.futureForecast.list[i].dt_txt;
        console.log(date);
        const split = date.split('-');
        const splitTwo = split[2].split(" ")

        const month = split[1];
        const day = splitTwo[0];
        const finalDate = month + "/" + day;

        const type = weather.futureForecast.list[i].weather[0].main;
        const temp = parseInt(weather.futureForecast.list[i].main.temp);
        const desc = weather.futureForecast.list[i].weather[0].description;
        console.log(weather);
        items.push(<FutureForecast key={i} date={finalDate} type={type} temp={temp} desc={desc} />)
      }
      return items;
    }
  }

  const current = generateCurrentCard();
  const future = generateFutureCards();

  return (
    <div>
      <div className="container">
        <h1 id="app-title">Weather App</h1>
        <Search changeCity={changeCity} />
        
        <div className="current-card-container">
          {current}
        </div>

        <div className="future-card-container">
          {future}
        </div>
      </div>
    </div>
  );
}

export default App;
