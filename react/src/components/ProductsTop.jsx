import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsList from "./ProductsList";


function ProductsTop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://45.12.73.68:3555/products/random')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return <ProductsList products={products} />;
}

export default ProductsTop;
