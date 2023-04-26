import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomavailability } from "../controllers/room.js";
import { verifyisAdmin } from "../utils/verifyToken.js";

const router = express.Router()

// create 
router.post("/:hotelid",verifyisAdmin ,createRoom);

// update 
router.put("/:id", verifyisAdmin,updateRoom )

///update room endpoint
router.put("/availability/:id",updateRoomavailability)

//delete
router.delete("/:id/:hotelid", verifyisAdmin, deleteRoom) 
///get one 

router.get("/:id", getRoom)

    
    //get all 
    router.get("/", getRooms)


export default  router; 