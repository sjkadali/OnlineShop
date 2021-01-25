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
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import ProductListScreen from './screens/ProductListScreen';
import AdminRoute from './components/AdminRoute';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
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
                          <li>
                            <Link to="/profile">User Profile</Link>
                          </li>
                          <li>
                            <Link to="/orderhistory">Order History</Link>
                          </li>
                          <li>
                            <Link to="#signout" onClick={signoutHandler}>
                              Sign Out
                            </Link>
                          </li>                          
                        </ul>                        
                      </div>
                      ) : (
                    <Link to="/signin">
                        Sign In
                    </Link>
                      )}
                      {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                          <Link to="#admin">
                            Admin <i className="fa fa-caret-down"></i>
                          </Link>
                          <ul className="dropdown-content">
                            <li>
                              <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                              <Link to="/productlist">Products</Link>
                            </li>
                            <li>
                              <Link to="/orderlist">Orders</Link>
                            </li>
                            <li>
                              <Link to="/userlist">Users</Link>
                            </li>
                          </ul>
                        </div>
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
                  <Route path="/orderhistory" component={OrderHistoryScreen} />
                  <PrivateRoute path="/profile" component={ProfileScreen} />
                  <AdminRoute path="/productlist" component={ProductListScreen} />
                  <AdminRoute path="/orderlist" component={OrderListScreen} />
                  <Route path="/product/:id" component={ProductScreen} exact={true} />
                  <Route path="/product/:id/edit" component={ProductEditScreen} exact={true} />
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
