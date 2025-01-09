// const express = require('express')
import express from "express"; 
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config({});
import {app,server} from "./socket/socket.js";
// const app=express();

const PORT = process.env.PORT || 5000; 


//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
}


// const corsOption = {
//     origin: ['http://192.168.43.217:5173', 'http://localhost:5173'], // Replace with your LAN IP and frontend port
//     credentials: true,
// };



app.use(cors(corsOption))


//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen ${PORT}`);
})




// app.listen(PORT, '0.0.0.0', () => {
//     connectDB();
//     console.log(`Server is running on http://0.0.0.0:${PORT}`);
// });