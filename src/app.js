const path = require("path")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const planetRouter = require("./routers/planets/planets_routes");
const launchRouter = require("./routers/launches/launches_routes");
const { loadPlanetsData } = require("./models/planets_models")

const mongo_url = "mongodb+srv://sarthaktailor:FgAD7m0M6v3H70pS@starlink.m3cvb4q.mongodb.net/?retryWrites=true&w=majority"
const app = express();

app.use(cors({
    origin:"http://localhost:3000"
}));

app.use(express.json());
app.use(express.static(path.join(__dirname ,"..","public")));
app.use("/planets",planetRouter);
app.use("/launches",launchRouter);

app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})

async function startServer(){
    await mongoose.connect(mongo_url)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log(err);
    })
    await loadPlanetsData;
    app.listen(8000,()=>{
        console.log("listening");
    })
}
startServer();