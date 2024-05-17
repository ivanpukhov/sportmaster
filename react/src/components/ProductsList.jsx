import {Link} from "react-router-dom";

function ProductsList({ products }) {
    return (
        <div className="products">
            {products.map(product => (
                <Link to={`/products/${product.id}`} className="product" key={product.id}>
                    <div className="product__photo">
                        <img src={`http://localhost:3001${product.imageUrl}`} alt={product.name} />
                    </div>
                    <div className="product__name">
                        {product.name}
                    </div>
                    <div className="product__price">
                        <span>{product.price}</span>₸
                    </div>
                    <div className="product__btn">
                        Подробнее
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ProductsList
