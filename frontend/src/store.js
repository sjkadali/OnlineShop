import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {cart: {cartItems} };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

 let  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;