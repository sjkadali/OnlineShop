import Axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM } from '../constants/cartConstants';

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
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {

    }
}

export { addToCart }