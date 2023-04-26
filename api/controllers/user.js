import express from "express"
import UsersIn from "../models/UsersIn.js"




    export const updateUser = async (req, res, next) =>{
        try {
            const updatedUser = await UsersIn.findByIdAndUpdate(req.params.id, 
                {$set: req.body},
                {new:true} //this new value is gonna to new document
                
                )  //this line of code helps to update the data in our DB
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
    
        }
        }

        
        export const deleteUser = async (req, res, next) =>{
             
            try {
                await UsersIn.findByIdAndDelete(req.params.id) /// find individual hotel and delete   
                res.status(200).json("User has been deleted")
            } catch (error) {
                next(error)
        
            }
            }

            
            export const getUser = async (req, res, next) =>{
                try {
                    const user = await UsersIn.findById(req.params.id )  
                    res.status(200).json(user)
                } catch (error) {
                    next(error)
            
                }
                }


                export const getUsers = async (req, res, next) =>{
                   
                        try {
                            const users = await UsersIn.find()  
                            res.status(200).json(users)
                    } catch (error) {
                        next(error)
                
                    }
                    }
    
              
                

