import React, { useState } from 'react';
import SearchIcon from './Assets/search.png';
import './App.css';

const Search = ({ changeCity }) => {
    const [search, toggleSearch] = useState(false);

    const toggleSearchBar = () => {
        search ? toggleSearch(false) : toggleSearch(true);
    }

    return(
        <nav>
            <div className="search-wrapper">
                {search ? 
                    <input className="searchbar" type="text" onChange={changeCity} placeholder="Search for a city"/>
                    :
                    null
                }
                <div className="search" onClick={toggleSearchBar}>
                    <img src={SearchIcon} id="searchIcon" alt="search" />
                </div>
            </div>
        </nav>
    )
}

export default Search;