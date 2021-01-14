import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import './App.css';
import { signout } from './actions/userActions';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userSignin, userInfo);
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  const dispatch = useDispatch();
  const signoutHandler = (e) => {    
    dispatch(signout());    
  }
  return (
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/">Online-Shop</Link>
                </div>
                <div className="header-links">
                <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
                    {
                      userInfo ? (
                      <div className="dropdown">
                        <Link to="#">
                          {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                        </Link>
                        <ul className="dropdown-content">
                        <Link to="#signout" onClick={signoutHandler}>
                          Sign Out
                        </Link>
                        </ul>                        
                      </div>
                      ) : (
                    <Link to="/signin">
                        Sign In
                    </Link>
                      )}
                </div>
            </header>            
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>X</button>
                <ul>
                    <li>
                        <a href="index.html">Pants</a>
                    </li>
                    <li>
                        <a href="index.html">Shirts</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                  <Route path="/register" component={RegisterScreen} />
                  <Route path="/signin" component={SigninScreen} />
                  <Route path="/shipping" component={ShippingAddressScreen} />
                  <Route path="/payment" component={PaymentMethodScreen} />
                  <Route path="/placeorder" component={PlaceOrderScreen} />
                  <Route path="/order/:id" component={OrderScreen} />
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route path="/" exact={true} component={HomeScreen} />  
                </div>
            </main>
            <footer className="footer">
                All rights reserved.
            </footer>
        </div>
      
  );
}

export default App;
