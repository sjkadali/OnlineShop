import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { getToken, isAuth, isAdmin } from '../util';

const router = express.Router();

router.post('/signin',  
    expressAsyncHandler(async (req, res) => {
        const signinUser = await User.findOne({email: req.body.email});
        if(signinUser) {
           if(bcrypt.compareSync(req.body.password, signinUser.password)) {
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            });
            return;
           }             
        } 
        res.status(401).send({msg: 'Invalid Email or Password.'})
})
);

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
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

router.get('/:id', expressAsyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
})
);

router.put('/profile', isAuth, expressAsyncHandler ( async ( req, res ) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser),            
        });
    }
})
);

router.get('/', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
const users = await User.find({});
res.send(users);
}));


router.delete('/:id', isAuth, isAdmin, expressAsyncHandler ( async (req, res ) => {
    const user = await User.findById(req.params.id);
    if(user) {
        if(user.email === 'skadalikat@gmail.com') {
            res.status(400).send({message: 'Cannot Delete Admin User'});
            return error;
        }
        const deletedUser = await user.remove();
        res.send({message: 'User Deleted', user: deletedUser});
    } else {
        res.status(404).send({message: 'User Not Found'});
    }
}));

router.put('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isSeller = req.body.isSeller || user.isSeller;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.send({message: 'User Updated', user: updatedUser});
    } else {
        res.status(404).send({message: 'User Not Found'});
    }
}));

export default router;