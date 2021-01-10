import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const userRegister = useSelector(state => state.userRegister );
    const { loading, userInfo, error} = userRegister;
 console.log("RegisterScreen:    loading : "+ userRegister, userInfo + " ***********");
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }        
    }, [props.history, redirect, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== rePassword) {
            alert('Password and Re-Enter Password does not match');
        } else {
            dispatch(register(name, email, password));
        }
    }

    return <div>
        <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Create Account</h2>
                </div>                 
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" id="name" onChange={ (e) => setName(e.target.value)}>
                    </input>
                </div>
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
                    <label htmlFor="rePassword">
                        Re-Enter Password
                    </label>
                    <input type="rePassword" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button type="submit" className="button primary" >Register</button>
                </div>
                <div>
                    Already have an account?                
                    <Link to={`/signin?redirect=${redirect}`} className="button secondary text-center">Sign-in</Link>
                </div>            
        </form>
    </div>
}
export default RegisterScreen;