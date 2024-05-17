import React, { createContext, useReducer } from 'react';
import './App.scss';
import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Category from "./components/Category";
import Product from "./components/Product";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import SearchResults from './components/SearchResults';

// Контекст корзины
export const CartContext = createContext();

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedCart = [...state.cart];
            const productIndex = updatedCart.findIndex(item => item.id === action.payload.id);
            if (productIndex !== -1) {
                updatedCart[productIndex].quantity += 1;
            } else {
                updatedCart.push({ id: action.payload.id, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { ...state, cart: updatedCart };
        case 'REMOVE_FROM_CART':
            const filteredCart = state.cart.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            return { ...state, cart: filteredCart };
        case 'UPDATE_QUANTITY':
            const cartWithUpdatedQuantity = state.cart.map(item =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            );
            localStorage.setItem('cart', JSON.stringify(cartWithUpdatedQuantity));
            return { ...state, cart: cartWithUpdatedQuantity };
        case 'RESET_CART':
            localStorage.removeItem('cart');
            return { ...state, cart: [] };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/category" element={<Categories />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search/:query" element={<SearchResults />} />
                </Routes>
                <About />
                <Footer />
            </Router>
        </CartContext.Provider>
    );
}

export default App;
