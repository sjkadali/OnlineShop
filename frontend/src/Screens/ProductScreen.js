import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { detailsProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" +props.match.params.id + "?qty=" +qty)
    }

    return <div>
        <div className="back-to-products">
            <Link to="/">Back to Products</Link>
        </div>
        { loading? <div>Loading.... </div>:
        error? <div>{error}</div>: 
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product" ></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating} Stars ({product.numReviews} Reviews)
                    </li>
                    <li>
                        Price: <b>${product.price}</b>
                    </li>
                    <li>
                        Description: 
                        <div>
                        {product.description}  
                        </div> 
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.qtyInStock > 0 ? "In Stock": "Out of Stock!!"}
                    </li>
                    <li>
                        Quantity: <select value={qty} onChange={ (e) => { setQty(e.target.value);}}>
                          {[...Array(product.qtyInStock).keys()].map(x =>
                            <option key={x+1} value={x+1}>{x+1} </option>
                          )}                            
                        </select>
                    </li>
                    <li>
                        {product.qtyInStock > 0 && <button onClick={handleAddToCart} className="button">Add to Cart</button>}
                    </li>
                </ul>
            </div>
        </div>
        }
    </div>

}
export default ProductScreen;