import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CartContext } from '../App';

const Product = () => {
    const { id } = useParams();
    const { dispatch } = useContext(CartContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Загрузка...</div>;
    }

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: { id: product.id } });
        Swal.fire({
            title: 'Успех!',
            text: 'Товар добавлен в корзину',
            icon: 'success',
            confirmButtonText: 'Перейти в корзину',
            showCancelButton: true,
            cancelButtonText: 'Продолжить покупки'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/cart';
            }
        });
    };

    return (
        <div className='container'>
            <div className="prod">
                <div>
                    <h1 className='h1'>{product.name}</h1>
                    <img src={'http://localhost:3001' + product.imageUrl} alt={product.name} />
                </div>
                <div>
                    <p className='product__price'>{product.price} ₸</p>
                    <p>{product.description}</p>
                    <h3>Категории:</h3>
                    <ul>
                        {product.Categories.map(category => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                    <div className="btn" onClick={addToCart}>В корзину</div>
                </div>
            </div>
        </div>
    );
};

export default Product;
