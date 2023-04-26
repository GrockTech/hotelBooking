import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js"

import { verifyisAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// create 
router.post("/",verifyisAdmin ,createHotel);

// update 
router.put("/:id", verifyisAdmin,updateHotel )

//delete
router.delete("/find/:id", verifyisAdmin, deleteHotel) 
///get one 

// router.get("/find/:id", getHotel)



router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
    //get all 
    router.get("/", getHotels)


    //fetching data from backend to UI components route
// router.get("/countByCity", countByCity)

// router.get("/countByType", getHotel)
router.get("/:id", getHotel)
router.get("/room/:id", getHotelRooms) // getting single rooms

export default  router; 