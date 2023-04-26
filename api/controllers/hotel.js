import express from "express"

import Hotels from "../models/Hotels.js"
import Rooms from "../models/Rooms.js"

export const createHotel = async (req, res, next) =>{
    const newHotel =  new Hotels(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)

    }
    }


    export const updateHotel = async (req, res, next) =>{
        try {
            const updatedHotel = await Hotels.findByIdAndUpdate(req.params.id, 
                {$set: req.body},
                {new:true} //this new value is gonna to new document
                
                )  //this line of code helps to update the data in our DB
            res.status(200).json(updatedHotel)
        } catch (error) {
            next(error)
    
        }
        }

        
        export const deleteHotel = async (req, res, next) =>{
             
            try {
                await Hotels.findByIdAndDelete(req.params.id) /// find individual hotel and delete   
                res.status(200).json("Hotel has been deleted")
            } catch (error) {
                next(error)
        
            }
            }

            
            export const getHotel = async (req, res, next) =>{
                try {
                    const hotel = await Hotels.findById(req.params.id )  
                    res.status(200).json(hotel)
                } catch (error) {
                    next(error)
            
                }
                }


                export const getHotels = async (req, res, next) =>{
                     
                        // const {min, max, ...otherDetails} = parseInt(req.query) 
                        const {min, max, ...otherDetails} = req.query
                              try {
                const hotels = await Hotels.find({...otherDetails,  cheapestPrice: {$gt: min | 1, $lt: max || 999},}).limit(req.query.limit) 
                                 
                            res.status(200).json(hotels)
                    } catch (error) {
                        next(error)
                
                    }
                    }
                    /// Fetching data base on city querr
    
                    export const countByCity = async (req, res, next) =>{
                        const cities = req.query.cities.split(',') /// this is gonna query cities and split them into an array
                   
                        try {
                            const list = await Promise.all(cities.map(city =>{
                                return Hotels.countDocuments({city:city})
                            }))     /// this promise function find multiple data from split varia
                            res.status(200).json(list)
                    } catch (error) {
                        next(error)
                
                    }
                    }
    
                    export const countByType = async (req, res, next) =>{
                       
                        try {
                            const hotelCount = await Hotels.countDocuments({type:"hotel"}) /// this is gonna query cities and split them into an array
                            const apartmentCount = await Hotels.countDocuments({type:"apartment"})
                            const resortCount = await Hotels.countDocuments({type:"resort"})
                            const villaCount = await Hotels.countDocuments({type:"villa"})
                            const cabinCount = await Hotels.countDocuments({type:"cabin"})
    
                            
                            res.status(200).json([
                                {type: "hotel", count: hotelCount},
                                {type: "apartment", count: apartmentCount},
                                {type: "resort", count: resortCount},
                                {type: "vailla", count: villaCount},
                                {type: "cabin", count: cabinCount},

                            ])
                    } catch (error) {
                        next(error)
                
                    }
                    }
    
            
                

            // export const getHotelRooms = async (req, res, next) => {
            //     try {
            //       const hotel = await Hotels.findById(req.params.id);
              
            //       if (!hotel) {
            //         return res.status(404).json({ message: "Hotel not found" });
            //       }
              
            //       const rooms = await Promise.all(hotel.rooms.map(roomId => {
            //         return Rooms.findById(roomId);
            //       }));
              
            //       res.status(200).json(rooms);
            //     } catch (err) {
            //       next(err);
            //     }
            //   };
              
            export const getHotelRooms = async (req, res, next) =>{

                try {
                const hotel = await Hotels.findById(req.params.id)
                const list = await Promise.all(hotel.rooms.map((roomId)=>{
                    return Rooms.findById(roomId)
                }))
                res.status(200).json(list)
                } catch (error) {
                    next(error)
                    
                }

            }