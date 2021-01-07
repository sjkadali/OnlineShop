import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin',  async (req, res) => {
        const signinUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if(signinUser) {
            console.log("siginUser: " + signinUser + " signedin!");
           res.send({
               _id: signinUser.id,
               name: signinUser.name,
               email: signinUser.email,
               isAdmin: signinUser.isAdmin,
               token: getToken(signinUser)
           }) 
        } else {
            res.status(401).send({msg: 'Invalid Email or Password.'});
        }    
})

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();     
        if(newUser) {
           res.send({
               _id: newUser.id,
               name: newUser.name,
               email: newUser.email,
               isAdmin: newUser.isAdmin,
               token: getToken(newUser)
           }) 
        } else {
            res.status(401).send({msg: 'Invalid user data.'});
        }    
})

router.get("/seed", 
    expressAsyncHandler(async (req, res) => {
        const createdUsers = await User.insertMany(data.users)
        res.send({createdUsers});    
    })
);

export default router;