const express = require("express");
const { saveFriend, readFriend, updateFriend, deleteFriend, getFriends } = require("../controller/friendController");
const friendRouter = express.Router();

friendRouter.post("/savefriend", saveFriend);
friendRouter.get("/readfriend", readFriend);
friendRouter.put("/updatefriend", updateFriend);
friendRouter.delete("/deletefriend", deleteFriend);
friendRouter.delete("/deleteFriend", deleteFriend);
friendRouter.get("/get-friends", getFriends);
module.exports = friendRouter;