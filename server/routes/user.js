const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user.js");
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../utils/verifyToken.js");

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

module.exports = { userRouter };
