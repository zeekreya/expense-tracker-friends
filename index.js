const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const friendRouter = require("./router/friendRouter");
const expenceRouter = require("./router/expenceRouter");

const app = express();
app.use(cors());
app.use(express.json());

let port = process.env.PORT || 5000;
let dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/expense-db";

mongoose.connect(dbUrl).then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log("Database connection failed:", error.message);
});

app.get('/', (req, res) => {
  res.send('Server is running smoothly!');
});

app.use(userRouter);
app.use(friendRouter);
app.use(expenceRouter);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});



