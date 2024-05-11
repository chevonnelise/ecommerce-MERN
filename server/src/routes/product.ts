import {Router, Request, Response} from 'express';
import { ProductModel } from '../models/product';

const router = Router()

router.get("/", async (req,res) => {
    try {
    const products = await ProductModel.find({})
    res.json({products})
    } catch (err) {
        res.status(400).json({err});
    }
});

export {router as productRouter};