import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const userRouter = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
userRouter.put("/:id", verifyUser, updateUser);

//DELETE
userRouter.delete("/:id", verifyUser, deleteUser);

//GET
userRouter.get("/:id", verifyUser, getUser);

//GET ALL
userRouter.get("/", verifyAdmin, getUsers);

export default userRouter;
