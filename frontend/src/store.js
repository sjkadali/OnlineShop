import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';

//const cartItems = Cookie.getJSON('cartItems') || [];
//const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : [],
    }, 
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
});

 let  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;