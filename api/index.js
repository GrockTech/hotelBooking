import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"


import cookieParser from 'cookie-parser'

const app = express()

dotenv.config()

const connect = async () =>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to MongoDB")
      } catch (error) {
        throw error
      }
      
    };
   
    mongoose.connection.on("disconnected", () =>{
        console.log("mongoDB disconnected")
    })

    mongoose.connection.on("connected", () =>{
        console.log("mongoDB connected")
    })
     
     app.get("/users", (req, res)=>{
        res.send("hello you!")

     })

// middlewares 
     app.use(cookieParser())
     app.use(express.json()) 
     app.use(cors())

    

     app.use("/api/auth", authRoute)
     app.use("/api/users", usersRoute)
     app.use("/api/hotels", hotelsRoute)
     app.use("/api/rooms", roomsRoute)

  
  
   app.use((error, req, res, next) =>{
        const errorStatus = error.status || 500;
        const errorMessage = error.message || "Something went wrong!"
    return  res.status(errorStatus).json({
      sucess: false,
      status: errorStatus,
      message: errorMessage,
      stack: error.stack, 
    }) // the next middleware helps you to insert something after api reqest 
     })
    
    app.listen(8800, ()=>{
        connect()
        console.log("connected to backend")
      })



