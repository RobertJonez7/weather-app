import React from 'react';
import './App.css';

const Switch = ({ switchUnits, units }) => {
    return(
        <div className="switch-container">
            <span className="switch-text">{units === 'imperial' ? '\u00B0' + 'F' : '\u00B0' + 'C'}</span>
            <label className="switch">
                <input type="checkbox"  onClick={switchUnits} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Switch;