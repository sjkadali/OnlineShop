import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import { signout } from './actions/userActions';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import ProductListScreen from './screens/ProductListScreen';
import AdminRoute from './components/AdminRoute';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import MessageBox from './components/MessageBox';
import LoadingBox from './components/LoadingBox';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = (e) => {    
    dispatch(signout());
    <Redirect to="/home" />   
  }

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  
  console.log("productCategoryList, categories: "+ productCategoryList, categories);
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch,  userInfo]);

  return (
    <div className="grid-container">
            <header className="row">
                <div>
                    <button 
                      type="button" 
                      className="open-sidebar" 
                      onClick={() => setSidebarIsOpen(true)}>
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link className="brand" to="/">
                      Online-Shop
                    </Link>
                </div>
                <div>
                  <Route 
                    render={({history}) => <SearchBox history={history}></SearchBox>}
                  />
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
                      {userInfo && userInfo.isSeller && (
                        <div className="dropdown">
                          <Link to="#admin">
                            Seller <i className="fa fa-caret-down"></i>
                          </Link>
                          <ul className="dropdown-content">
                            <li>
                              <Link to="/productlist/seller">Products</Link>
                            </li>
                            <li>
                              <Link to="/orderlist/seller">Orders</Link>
                            </li>
                          </ul>
                        </div>
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
           < aside className={sidebarIsOpen ? 'open' : ''}>
              <ul className="categories">
                <li>
                  <strong>Categories</strong>
                  <button
                    onClick={() => setSidebarIsOpen(false)}
                    className="close-sidebar"
                    type="button"
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </li>
                {loadingCategories ? (
                  <LoadingBox></LoadingBox>
                ) : errorCategories ? (
                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                ) : (
                  categories && categories.map((c) => (
                    <li key={c}>
                      <Link
                        to={`/search/category/${c}`}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        {c}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </aside>

            <main className="main">
                <div className="content">
                  <Route path="/seller/:id" component={SellerScreen}></Route>
                  <Route path="/register" component={RegisterScreen} />
                  <Route path="/signin" component={SigninScreen} />
                  <Route path="/shipping" component={ShippingAddressScreen} />
                  <Route path="/payment" component={PaymentMethodScreen} />
                  <Route path="/placeorder" component={PlaceOrderScreen} />
                  <Route path="/order/:id" component={OrderScreen} />
                  <Route path="/orderhistory" component={OrderHistoryScreen} />
                  <Route path="/search/name/:name?" component={SearchScreen} exact={true} /> 
                  <Route path="/search/category/:category" component={SearchScreen} exact={true} /> 
                  <Route path="/search/category/:category/name/:name" component={SearchScreen} exact={true} /> 
                  <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" component={SearchScreen} exact={true} /> 
                  <PrivateRoute path="/profile" component={ProfileScreen} />
                  <AdminRoute path="/productlist" component={ProductListScreen} exact={true} /> 
                  <AdminRoute path="/productlist/pageNumber/:pageNumber" exact={true} component={ProductListScreen} />
                  <AdminRoute path="/userlist" component={UserListScreen} exact={true} />
                  <AdminRoute path="/user/:id/edit" component={UserEditScreen} exact={true} /> 
                  <AdminRoute path="/orderlist" component={OrderListScreen} exact={true} />
                 {/*  <SellerRoute
                      path="/productlist/seller"
                      component={ProductListScreen}
                  ></SellerRoute>
                  <SellerRoute
                      path="/orderlist/seller"
                      component={OrderListScreen}
                  ></SellerRoute> */}
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
