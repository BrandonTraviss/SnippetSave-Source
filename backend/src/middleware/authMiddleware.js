import jwt from "jsonwebtoken";
import User from "../models/Users.js"

export const protect = async(req,res,next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Not authorized, no toekn"})
        }

        //Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Load user(exclude password)
        req.user = await User.findById(decoded.id).select("-password");

        if(!req.user){
            return res.status(401).json({message:"User not found"});
        }

        next();
    } catch(error){
        console.error("Auth Middleware Error:",error.message)
        return res.status(401).json({message:"Not Authorized"})
    }
}