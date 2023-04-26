
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import UsersIn from "../models/UsersIn.js";


export const register = async (req, res, next) =>{
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new UsersIn({
            ...req.body, 
            password: hash, 
        })

    await newUser.save()
    res.status(201).send("User has been created.")
    } catch (error) {
        next(error)
        
    }

}

export const login = async (req, res, next) =>{
    try {

        const user = await  UsersIn.findOne({username:req.body.username})
        if(!user) return next(createError(404, "User not found")) /// if there is no user registered code 
          
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password) 
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        const  token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT) // basically we hide user info in jsonebtoeken and send it as a cookie
        
const {password, isAdmin, ...otherDetails} = user._doc;    /// prevents password from returning in json

        res.cookie("access_token", token, {
            httpOnly: true, 
        }).status(200).json({details:{...otherDetails}, isAdmin}); 
    } catch (error) { 
        next(error)
        
    }

}