import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MesssageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen(props) {
   

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;    
    //console.log("userInfo: " + userInfo, userInfo._id);
    
    const [name, setName] = useState(userInfo.name || '');
    const [email, setEmail] = useState(userInfo.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userDetails  = useSelector((state) => state.userDetails);
    //console.log("userDetails: " + userDetails.user);
    const { loading, error, user} = userDetails;
    console.log(loading, error, user);

    const userUpdateProfile  = useSelector((state) => state.userUpdateProfile);
    const { success: updateSuccess, error: updateError, loading: updateLoading} = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect(() => {  
         if (!user) {
             dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id))
         }  else {
             setName(user.name);
             setEmail(user.email);
         }  
    }, [dispatch, userInfo._id], user);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert('Password and ConfirmPassword do not match');
        } else {
            dispatch(updateUserProfile({userId: user._id, name, email, password}));
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? ( <LoadingBox></LoadingBox>
                     ) :
                    error ? ( <MesssageBox variant="danger">{error}</MesssageBox>
                    ) : (
                    <>
                    { updateLoading && <LoadingBox></LoadingBox>}
                    { updateError && (<MesssageBox variant="danger">{updateError}</MesssageBox> )}
                    { updateSuccess && ( 
                        <MesssageBox variant="success">
                            Profile Updated Successfully.
                        </MesssageBox> 
                    )}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name" 
                            type="text"                            
                            placeholder="Enter name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            type="email"                            
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            type="password"                            
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)} 
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            type="password"                            
                            placeholder="Enter confirm password" 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label />
                        <button className="primary" type="submit">
                            Update
                        </button>
                    </div>
                    </>
                )}
            </form>
        </div>
    )
}
