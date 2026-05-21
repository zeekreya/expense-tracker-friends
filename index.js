const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const friendRouter = require("./router/friendRouter")
const expenceRouter = require("./router/expenceRouter")
const app = express();
app.use(cors("*"));
app.use(express.json());

let port = 5000;
let dbUrl = "mongodb://localhost:27017/expense-db";

mongoose.connect(dbUrl).then(() => {
    console.log("server conected successfully")
}).catch((error) => {
    console.log("server conection failed")
})
app.use(userRouter);
app.use(friendRouter);
app.use(expenceRouter);
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})
app.get('/', (req, res) => {
  res.send('Server is running smoothly!');
});



