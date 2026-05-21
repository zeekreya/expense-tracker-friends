const express = require("express");
const { saveUser, readUser, updateUser, deleteUser } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/saveUser", saveUser);
userRouter.get("/readUser", readUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("/deleteUser", deleteUser);
module.exports = userRouter;
