import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL} from '../constants/userConstants';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from '../constants/userConstants';

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const url = require('url');
const params = new url.URLSearchParams( {email, password} );
        const {data} = await Axios.post("/api/users/signin", params.toString());
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        //const { user: { userInfo} } = getState();
        Cookie.set('userInfo', JSON.stringify(data));
        console.log("params,  data , userInfo: "+params,  data);
    } catch(error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: console.error.message});
    }
} 

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}});
    try {
        const {data} = await Axios.post("/api/users/register", {name, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        Cookie.set('userInfo', JSON.stringify(data));
        console.log(" data , userInfo: "+ data);
    } catch(error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: console.error.message});
    }
} 

export { signin, register }