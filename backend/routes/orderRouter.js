import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import { isAuth } from '../util.js';

const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async  (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                tax: req.body.tax,
                totalPrice: req.body.totalPrice,
                isPaid: true,
                paidAt: Date(),
                user: req.user._id
            });
            const createdOrder = await order.save();
            if (createdOrder) {
                res.status(201).send({message: 'New Order Created', order: createdOrder });

            } else {
                res.status(401).send({msg: 'Order Could n0t be saved'});
            }            
        }
    })
);

export default orderRouter;