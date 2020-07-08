import React from 'react';
import overcast from './Assets/overcast.png'
import sunny from './Assets/sunny.png'
import rain from './Assets/rain.png'
import snow from './Assets/snow.png'
import thunder from './Assets/thunder.png'
import atmosphere from './Assets/atmosphere.png'

const FutureForecast = ({ date, type, temp, desc, onClick }) => {
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
        <div className="future-card" onClick={onClick}>
            <div className="future-card-title">{date}</div>
            <div className="future-row-container">
                <img className="future-card-icon" src={icon} alt="future-icon" />
                <div className="future-card-temp">{temp + '\u00B0'}</div> 
            </div>
            <div className="future-desc">{desc}</div>
        </div>
    )
}

export default FutureForecast;