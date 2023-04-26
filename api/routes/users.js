import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyisAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";



const router = express.Router()



// create 

// router.get('/checkauth', verifyToken, (req, res, next)=>{
//     res.send("you are logged in..")

// })

// router.get('/checkuser/:id', verifyUser, (req, res, next)=>{
//     res.send("you are logged in and you can delete your account")

// })
// router.get('/checkadmin/:id', verifyisAdmin, (req, res, next)=>{
//     res.send("Hello Admin! you are logged in and you can delete all accounts")

// })


// update 
router.put("/:id", verifyUser, updateUser )

//delete
router.delete("/:id",verifyUser, deleteUser) 
///get one 

router.get("/:id", verifyUser,getUser)

    
    //get all 
    router.get("/", verifyisAdmin, getUsers)


export default  router; 