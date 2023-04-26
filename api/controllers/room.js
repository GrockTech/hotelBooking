import Hotel from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";
import { createError } from "../utils/error.js";


export const  createRoom = async (req, res, next)=>{
    
    const hotelId = req.params.hotelid; 
    const newRoom = Rooms(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id, },});  /// this line find room in Hotels model and update to the room 
      
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        
     next(error)   
    }
}

export const updateRoom = async (req, res, next) =>{
    try {
        const updatedRoom = await Rooms.findByIdAndUpdate(req.params.id, 
            {$set: req.body},
            {new:true} //this new value is gonna to new document
            
            )  //this line of code helps to update the data in our DB
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)

    }
    }

    export const updateRoomavailability = async (req, res, next) =>{
        try {
          await Rooms.updateOne({"roomNumbers._id": req.params.id}, {

            
                $push:{
                    "roomNumbers.$.unavailableDates": req.body.dates 
                }
            
          })
          res.status(200).json("room has been updated")
        } catch (error) {
            next(error)
    
        }
        }

    
    export const deleteRoom = async (req, res, next) =>{
      
        const hotelId = req.params.hotelid;  

        try {
            await Rooms.findByIdAndDelete(req.params.id) /// find individual hotelRoom and delete   
            try {
                await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id },
                });  /// this line find room in Hotels model and update/delete  room 
          
            } catch (error) {
                next(error)
            }
            res.status(200).json("Room has been deleted")
        } catch (error) {
            next(error)
    
        }
        }

        
        export const getRoom = async (req, res, next) =>{
            try {
                const room = await Rooms.findById(req.params.id )  
                res.status(200).json(room)
            } catch (error) {
                next(error)
        
            }
            }


            export const getRooms = async (req, res, next) =>{
               
                    try {
                        const rooms = await Rooms.find()  
                        res.status(200).json(rooms)
                } catch (error) {
                    next(error)
            
                }
                }

          
            

