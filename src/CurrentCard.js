import React from 'react';
import './App.css';
import overcast from './Assets/overcast.png'
import sunny from './Assets/sunny.png'
import rain from './Assets/rain.png'
import snow from './Assets/snow.png'
import thunder from './Assets/thunder.png'
import atmosphere from './Assets/atmosphere.png'

const CurrentCard = ({ name, temp, desc, type }) => {
    let icon = '';
    if(type === 'Clouds') {
        icon = overcast;
    }
    if(type === 'Clear') {
        icon = sunny;
    }
    if(type === 'Atmosphere') {
        icon = atmosphere;
    }
    if(type === 'Snow') {
        icon = snow;
    }
    if(type === 'Rain' || type === 'Drizzle') {
        icon = rain;
    }
    if(type === 'Thunderstorm') {
        icon = thunder;
    }

    return(
        <div className="card-total-contain">
            <div className="card-container">
                <div className="city-name">{name}</div>
                <img className="card-icon" src={icon} alt="current-icon" />
                <div className="card-temp">{temp + '\u00B0'}</div>
            </div>
            <div className="card-desc">{desc}</div>
        </div>
    )
}

export default CurrentCard;