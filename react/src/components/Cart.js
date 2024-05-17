import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import { CartContext } from '../App';
import CloseIcon from '@mui/icons-material/Close';

const Cart = () => {
    const { state, dispatch } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [orderDetails, setOrderDetails] = useState({ firstName: '', lastName: '', phoneNumber: '' });

    useEffect(() => {
        if (state.cart.length > 0) {
            const ids = state.cart.map(item => item.id).join(',');
            axios.post('http://45.12.73.68:3555/products/multiple', { ids })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => console.error("Ошибка при получении данных:", error));
        } else {
            setProducts([]);
        }
    }, [state.cart]);

    const handleQuantityChange = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: parseInt(quantity) } });
    };

    const handleRemove = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
        Swal.fire({
            title: 'Удалено!',
            text: 'Товар удален из корзины',
            icon: 'success',
            confirmButtonText: 'ОК'
        }).then(() => {
            const updatedCart = state.cart.filter(item => item.id !== id);
            const ids = updatedCart.map(item => item.id).join(',');
            if (ids) {
                axios.post('http://45.12.73.68:3555/products/multiple', { ids })
                    .then(response => {
                        setProducts(response.data);
                    })
                    .catch(error => console.error("Ошибка при получении данных:", error));
            } else {
                setProducts([]);
            }
        });
    };

    const handleOrderSubmit = () => {
        const order = {
            ...orderDetails,
            items: state.cart.map(item => ({ productId: item.id, quantity: item.quantity }))
        };
        axios.post('http://45.12.73.68:3555/orders', order)
            .then(response => {
                Swal.fire({
                    title: 'Успех!',
                    text: 'Заказ успешно отправлен. Наш менеджер свяжется с вами в ближайшее время',
                    icon: 'success',
                    confirmButtonText: 'ОК'
                }).then(() => {
                    setOrderDetails({ firstName: '', lastName: '', phoneNumber: '' });
                    dispatch({ type: 'RESET_CART' });
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Ошибка!',
                    text: 'Ошибка при отправке заказа',
                    icon: 'error',
                    confirmButtonText: 'ОК'
                });
            });
    };

    return (
        <div className='container crt'>
            <h1 className='h1'>Корзина</h1>
            <div className="poop">
                <div className='cart'>
                    {products.length === 0 ? (
                        <div className='cart__null'>Корзина пуста</div>
                    ) : (
                        products.map(product => (
                            <div className='cart__item' key={product.id}>
                                <h2>{product.name}</h2>
                                <img src={'http://45.12.73.68:3555' + product.imageUrl} alt={product.name} />
                                <div className="cart__price">
                                    <p className='product__price'>{product.price} ₸</p>
                                    <input
                                        type="number"
                                        value={state.cart.find(item => item.id === product.id)?.quantity || 1}
                                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    />
                                    <button onClick={() => handleRemove(product.id)}><CloseIcon /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {products.length > 0 && (
                    <div className="form">
                        <h2>Оформление заказа</h2>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={orderDetails.firstName}
                            onChange={(e) => setOrderDetails({ ...orderDetails, firstName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={orderDetails.lastName}
                            onChange={(e) => setOrderDetails({ ...orderDetails, lastName: e.target.value })}
                        />
                        <InputMask
                            mask="+7(999)999-99-99"
                            placeholder="Телефон"
                            value={orderDetails.phoneNumber}
                            onChange={(e) => setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })}
                        />
                        <button onClick={handleOrderSubmit}>Отправить заказ</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
