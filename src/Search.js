import React from 'react';
import './App.css';

const Search = ({ changeCity }) => {
    return(
        <div className="searchbar-container">
            <input className="searchbar" type="text" onChange={changeCity} placeholder="Search for a city"/>
        </div>
    )
}

export default Search;