import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../util.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler ( async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
})
);

orderRouter.get('/user', isAuth, expressAsyncHandler( async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
})
);

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async  (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new Order({
                seller: req.body.orderItems[0].seller,
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                tax: req.body.tax,
                totalPrice: req.body.totalPrice,                
                user: req.user._id
            });
            const createdOrder = await order.save();
            if (createdOrder) {
                res.status(201).send({message: 'New Order Created', order: createdOrder });

            } else {
                res.status(401).send({msg: 'Order Could not be Placed'});
            }            
        }
    })
);

orderRouter.get('/:id', isAuth, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
})
);

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };
        const updatedOrder = await order.save();
        for (const index in updatedOrder.orderItems) {
            const item = updatedOrder.orderItems[index];
            const product = await Product.findById(item.product);
            product.qtyInStock -= item.qty;
            await product.save();
          }
        
        res.send({ message: 'Order Payment Successful', order: updatedOrder});
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
})
);

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
})
);

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        
        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder});
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
})
);


export default orderRouter;