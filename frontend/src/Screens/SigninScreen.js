import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin );
    const { loading, userInfo, error} = userSignin;
    console.log("SigninScreen:    loading : "+ userSignin, userInfo + " ***********");

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div>
        <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Sign-In</h2>
                </div>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={ (e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button type="submit" className="button primary" >Signin</button>
                </div>
                <div>
                    New to online-shop?
                </div>
                <div>
                    <Link to={`/register?redirect=${redirect}`} className="button secondary text-center">Register</Link>
                </div>            
        </form>
    </div>
}

export default SigninScreen;