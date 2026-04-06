import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async(req,res,next) =>{
     let tokan;
     tokan = req.cookies.jwt

     if (tokan) {
       try {

        const decoded = jwt.verify(tokan,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select('-password');
        next();
       } catch (error) {
        res.status(401)
        throw new Error("Not authorised token,token failed")

       } 
     }else{
        res.status(401)
        throw new Error("Not authorised token,no token")

     }
});


//// check for admin 

const authorizeAdmin = (req,res,next) => {
    if (req.user && req.user.isadmin) {
        next()
    }else{
        res.status(401).send('Not authorized as admin')
    }
};

export {authenticate,authorizeAdmin};
