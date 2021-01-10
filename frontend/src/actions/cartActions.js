import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => {

    try {
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                qtyInStock: data.qtyInStock,
                qty
            }
        });
        const { cart: { cartItems}} = getState();
        console.log("cart in cartActions: "+ cartItems);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {

    }    
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));  
}

export { addToCart, removeFromCart }