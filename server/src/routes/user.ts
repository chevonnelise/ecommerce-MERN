import {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../models/user';
import { UserErrors } from '../errors';

const router = Router();

export const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403)
            }

            next();
        })
    } else {
        return res.sendStatus(401);
    }
}; 

router.post("/register", async (req,res) => {
    const {username, password} = req.body;

    try {
    const user = await UserModel.findOne({
        username: username
    }); 

    if (user) {
        return res.status(400).json({
            type: UserErrors.USERNAME_ALREADY_EXISTS
        })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        username,
        password: hashedPassword
    });

    await newUser.save();

    res.json({
        message: "User Registered Successfully"
    });
    } catch (err) {
        res.status(500).json({
            type: err
        })
    }
});

router.post("/login", async (req,res) =>{
    const {username, password} = req.body;
    try{

        const user: IUser = await UserModel.findOne({
            username: username
        })

        if (!user) {
            return res.status(400).json({
                type: UserErrors.NO_USER_FOUND
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                type: UserErrors.WRONG_CREDENTIALS
            })
        }

        const token = jwt.sign({
            id: user._id},
            "secret"
        )
        res.json({
            token, 
            userID: user._id
        });

    } catch (err) {
        res.status(500).json({
            type: err
        })
    }
});

router.get("/available-money/:userID", verifyToken, async (req,res) => {
    const {userID} = req.params

    try {
        const user = await UserModel.findById(userID)
        if (!user) {
            res.status(400).json({type: UserErrors.NO_USER_FOUND})
        }
        res.json({availableMoney: user.availableMoney})
    } catch (err) {
        res.status(500).json({err});
    }
})


export {router as userRouter};