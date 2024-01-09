const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

//set up server

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"]
}));

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

//list route
app.use("/todolist", require("./routes/listRouter"));