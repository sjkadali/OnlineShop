
import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <table>
                <div className="row">
                    <input className=".col-1"
                        type="radio"
                        id="paypal" 
                        value="PayPal" 
                        name="paymentMethod"
                        required 
                        checked 
                        onChange={(e) => setPaymentMethod(e.target.vaue)}>
                    </input>
                    <label htmlFor="paypal">PayPal</label>
                </div>                
                <div className="row">
                    <input 
                        type="radio"
                        id="stripe" 
                        value="Stripe" 
                        name="paymentMethod"
                        required                         
                        onChange={(e) => setPaymentMethod(e.target.vaue)}>
                    </input>
                    <label htmlFor="stripe">Stripe</label>
                </div>
                </table>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>               
            </form>
        </div>
    )
}
