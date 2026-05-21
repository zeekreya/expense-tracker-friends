const express = require("express");
const { saveExpence, readExpence, updateExpence, deleteExpence } = require("../controller/expenceController");
const expenceRouter = express.Router();

expenceRouter.post("/saveExpence", saveExpence);
expenceRouter.get("/readExpence", readExpence);
expenceRouter.put("/updateExpence", updateExpence);
expenceRouter.delete("/deleteExpence", deleteExpence);
module.exports = expenceRouter;
