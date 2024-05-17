import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import sear from "../img/search.svg";
import { Link } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        if (query.length >= 3) {
            axios.get(`http://45.12.73.68:3555/search?query=${query}`)
                .then(response => {
                    setResults(response.data || []);
                    setShowResults(true);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    setResults([]);
                    setShowResults(false);
                });
        } else {
            setResults([]);
            setShowResults(false);
        }
    }, [query]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowResults(false);
            setInputVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        setInputVisible(true);
    };

    return (
        <div className="header__search" ref={searchRef}>
            <img src={sear} alt="" className='pron' />
            <input
                type="text"
                className={inputVisible ? '' : 'unvisible'}
                placeholder='Найти на Sportmaster'
                value={query}
                onChange={handleChange}
                onFocus={() => query.length >= 3 && setShowResults(true)}
            />
            <div className={`header__btn sosi small ${inputVisible ? 'visible__input' : ''}`} onClick={handleButtonClick}>
                <div className="header__btn-icon ">
                    <img src={sear} alt="" className={inputVisible ? 'unvisible' : ''}/>
                </div>
            </div>
            {showResults && (
                <div className="search-results">
                    <ul>
                        {results.length > 0 ? (
                            results.slice(0, 5).map((result, index) => (
                                <Link to={`/search/${result.name}`} key={index}>{result.name}</Link>
                            ))
                        ) : (
                            <li>Нет результатов</li>
                        )}
                    </ul>
                    {results.length > 5 && (
                        <div className="all-results">
                            <Link to={`/search/${query}`}>Все результаты</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
