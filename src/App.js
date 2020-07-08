import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentCard from './CurrentCard';
import Search from './Search';
import FutureForecast from './FutureForecast';
import Chart from './Chart';
import Switch from './Switch';
import './App.css';

function App() {
  const [weather, setWeather] = useState({ currentWeather: null, futureWeather: null });
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Seattle');
  const [day, setDay] = useState(1);
  const [units, setUnits] = useState('imperial');
  const API_KEY = "5558c35373b8b9530daa4b1aef055dbc";

  /**************************************************************************
   * Calls async function when the state changes
   *************************************************************************/
  useEffect(() => {
    fetchData();
  }, [city, units]);

  /**************************************************************************
   * Makes an API call to gather data
   *************************************************************************/
  const fetchData = async () => {
    const currentForecast = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${units}`);
    const futureForecast = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`);

    setWeather({ currentWeather: currentForecast.data, futureForecast: futureForecast.data })
    if(weather) {
      setLoading(false);
    }
  }

  /**************************************************************************
   * Changes city upon user request
   *************************************************************************/
  const changeCity = (e) => {
    setCity(e.target.value);
    if(city === '') {
      setLoading(true);
    }
  }

  /**************************************************************************
   * Changes city upon user request
   *************************************************************************/
  const generateCurrentCard = () => {
    if(!loading) {
      let temp, desc, type;
      let name = weather.currentWeather.name;
      if(day === 1) {
        temp = parseInt(weather.currentWeather.main.temp);
        desc = weather.currentWeather.weather[0].description;
        type = weather.currentWeather.weather[0].main;
      }
      else {
        temp = parseInt(weather.futureForecast.list[day].main.temp);
        desc = weather.futureForecast.list[day].weather[0].description;
        type = weather.futureForecast.list[day].weather[0].main;
      }
      return(
        <CurrentCard name={name} temp={temp} desc={desc} type={type} />
      )
    }
  }

  /**************************************************************************
   * Generates future forecast component
   *************************************************************************/
  const generateFutureCards = () => {
    let items = [];
    if(!loading) {
      let count = 0;
      let temp = parseInt(weather.currentWeather.main.temp);
      items.push(<FutureForecast key={10} date="Today" type={weather.currentWeather.weather[0].main} temp={temp} desc={weather.currentWeather.weather[0].description} onClick={() => {setDay(1)}}/>);

      for(let i = 0; i < 32; i += 8) {
        const date = weather.futureForecast.list[i].dt_txt;
        const split = date.split('-');
        const splitTwo = split[2].split(" ")

        const month = split[1];
        const day = splitTwo[0];
        const finalDate = month + "/" + day;

        const type = weather.futureForecast.list[i].weather[0].main;
        const temp = parseInt(weather.futureForecast.list[i].main.temp);
        const desc = weather.futureForecast.list[i].weather[0].description;
        
        items.push(<FutureForecast key={i} id={count} date={finalDate} type={type} temp={temp} desc={desc} onClick={() => {setDay(i)}} />);
      }
      return items;
    }
  }

  /**************************************************************************
   * Gets line data for chart
   *************************************************************************/
  const getLineData = () => {
    if(!loading) {
      let line = [];
      if(day === 1) {
        for(let i = 0; i < 8; i++) {
          line.push(weather.futureForecast.list[i].main.temp);
        }
      }
      for(let i = day; i < day + 8; i++) {
        line.push(weather.futureForecast.list[i].main.temp);
      }
      return line;
    }
  }

  /**************************************************************************
   * Switch units between farenheit and celsius
   *************************************************************************/
  const switchUnits = () => {
    units === 'imperial' ? setUnits('metric') : setUnits('imperial');
    console.log(units);
  }

  const current = generateCurrentCard();
  const future = generateFutureCards();
  const data = getLineData();

  return (
    <>
      <div className="container">
        <Search changeCity={changeCity} name={city} />
        <Switch switchUnits={switchUnits} units={units} />
        <div className="current-card-container">
          {current}
          <Chart data={data} />
        </div>
        <div className="future-card-container">
          {future}
        </div>
      </div>
    </>
  );
}

export default App;
