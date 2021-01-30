import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { detailsProduct, createReview } from '../actions/productActions';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
 
    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { 
        loading: loadingReviewCreate, 
        error: errorReviewCreate, 
        success: successReviewCreate 
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] =useState('');

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
        }
        dispatch(detailsProduct(productId));        
    }, [dispatch, productId, successReviewCreate]);

    const handleAddToCart = () => {
        props.history.push('/cart/' +productId + '?qty=' +qty)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(createReview(productId, { rating, comment, name: userInfo.name}))
        } else {
            alert('Please enter comment and rating')
        }
    }

    //console.log(product.seller);
    return  (
        <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
            <Link to="/">Back to result</Link>
            <div className="row top">
                <div className="col-2">
                <img
                    className="large"
                    src={product.image}
                    alt={product.name}
                ></img>
                </div>
                <div className="col-1">
                <ul>
                    <li>
                    <h1>{product.name}</h1>
                    </li>
                    <li>
                    <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                    ></Rating>
                    </li>
                    <li>Pirce : ${product.price}</li>
                    <li>
                    Description:
                    <p>{product.description}</p>
                    </li>
                </ul>
                </div>
                <div className="col-1">
                <div className="card card-body">
                    <ul>
                    {/* <li>
                        Seller{' '}
                        <h2>                            
                        <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                        </Link>
                        </h2>
                        <Rating
                        rating={product.seller.seller.rating}
                        numReviews={product.seller.seller.numReviews}
                        ></Rating>
                    </li> */}
                    <li>
                        <div className="row">
                        <div>Price</div>
                        <div className="price">${product.price}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                        <div>Status</div>
                        <div>
                            {product.qtyInStock > 0 ? (
                            <span className="success">In Stock</span>
                            ) : (
                            <span className="danger">Unavailable</span>
                            )}
                        </div>
                        </div>
                    </li>
                    {product.qtyInStock > 0 && (
                        <>
                        <li>
                            <div className="row">
                            <div>Qty</div>
                            <div>
                                <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                >
                                {[...Array(product.qtyInStock).keys()].map(
                                    (x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                    )
                                )}
                                </select>
                            </div>
                            </div>
                        </li>
                        <li>
                            <button
                            onClick={handleAddToCart}
                            className="primary block"
                            >
                            Add to Cart
                            </button>
                        </li>
                        </>
                    )}
                    </ul>
                </div>
            </div>
            </div>
            <div>
                <h2 id="reviews">Reviews</h2>
                {product.reviews && product.reviews.length === 0 && 
                <MessageBox>There is no review</MessageBox>
                }
                <ul>
                {product.reviews && product.reviews.map((review) => (
                    <li key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} caption=" "></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                    </li>
                ))}
                <li>
                    {userInfo ? (
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                        <h2>Write a customer review</h2>
                        </div>
                        <div>
                        <label htmlFor="rating">Rating</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very good</option>
                            <option value="5">5- Excelent</option>
                        </select>
                        </div>
                        <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        </div>
                        <div>
                        <label />
                        <button className="primary" type="submit">
                            Submit
                        </button>
                        </div>
                        <div>
                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                        {errorReviewCreate && (
                            <MessageBox variant="danger">
                            {errorReviewCreate}
                            </MessageBox>
                        )}
                        </div>
                    </form>
                    ) : (
                    <MessageBox>
                        Please <Link to="/signin">Sign In</Link> to write a review
                    </MessageBox>
                    )}
                </li>
                </ul>
            </div>
            </div>
        )}
        </div>
  );
}
export default ProductScreen;