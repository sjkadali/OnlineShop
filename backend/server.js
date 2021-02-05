import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config.js';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import uploadRouter from './routes/uploadRouter.js';

dotenv.config();
const mongodbUrl = config.MONGODB_URI;
mongoose.set('bufferTimeoutMS', 5000);
const connectDb = async () => {
      try {
      await mongoose.connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
  } catch(error) {
      console.log(console.log(error.reason));
  }
}
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(bodyParser.json());
 
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRoute);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); 
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
if(process.env.NODE_ENV === 'production' ) {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname, '/frontend/build/index.html')));
}
app.use((err, res, next) => {
  res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});