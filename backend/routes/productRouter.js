import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../util.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})
);

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
})
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
})
);

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const product = new Product({
        name: 'Product1',
        image: '/image/comfortfit-vh.jpg',
        price: 23.99,
        category: 'shirt',
        brand: 'Van Heusen',
        qtyInStock: 2,
        rating: 0,
        numReviews: 0,
        description: 'Van Heusen Comfort fit shirt',
    });
    const createdProduct = await product.save();
    res.send({message: 'Product Created', product: createdProduct });
})
);

export default productRouter;