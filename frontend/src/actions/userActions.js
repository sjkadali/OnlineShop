import Axios from 'axios';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT} from '../constants/userConstants';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from '../constants/userConstants';

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: console.error.message});
    }
};

const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
};

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}});
    try {
        const {data} = await Axios.post("/api/users/register", {name, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: console.error.message});
    }
} 

export { signin, signout, register }