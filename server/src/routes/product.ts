import {Router, Request, Response} from 'express';
import { ProductModel } from '../models/product';
import { verifyToken } from './user';
import { UserModel } from '../models/user';

const router = Router()

router.get("/", verifyToken, async (req,res) => {
    try {
    const products = await ProductModel.find({})
    res.json({products})
    } catch (err) {
        res.status(400).json({err});
    }
});

router.post("/checkout", verifyToken, async (req,res)=>{
    const {customerID, cartItems} = req.body;

    try{
        const user = await UserModel.findById(customerID);
        const productIDs = Object.keys(cartItems);
        const products = await ProductModel.find({
            _id: {$in: productIDs}
        });

        if(!user) {
            return res.status(400).json({})
        }
        
    } catch (err) {
        res.status(400).json(err);
    }
});

export {router as productRouter};