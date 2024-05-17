import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductsList from "./ProductsList";

const SearchResults = () => {
    const { query } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(`http://45.12.73.68:3555/search?query=${query}`)
            .then(response => {
                setResults(response.data || []);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setResults([]);
            });
    }, [query]);

    return (
        <div className="container">
            <h1 className='h1 hh'>Результаты поиска по запросу {query}</h1>
            <ProductsList products={results} />

        </div>
    )
};

export default SearchResults;

