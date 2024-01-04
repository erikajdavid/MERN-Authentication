const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//set up server

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/test", (req, res) => {
    return res.send("It works");
});

//connect to MongoDB

const connectDB = require("./config/dbConnect");
connectDB();

mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})

//set up routes

//user route
app.use("/auth", require("./routes/userRouter"));