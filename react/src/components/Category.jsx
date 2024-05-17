import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from './ProductsList';

const Category = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryResponse = await axios.get(`http://45.12.73.68:3555/categories/${id}`);
                setCategory(categoryResponse.data);

                const productsResponse = await axios.get(`http://45.12.73.68:3555/categories/${id}/products`);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchCategory();
    }, [id]);

    if (!category) {
        return <div>Загрузка...</div>;
    }

    return (
            <div className="container">
                <h1 className='h1 hh'>{category.name}</h1>
                <ProductList products={products} />
            </div>
    );
};

export default Category;
