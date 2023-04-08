const path = require("path")
const express = require("express");
const cors = require("cors");
const planetRouter = require("./routers/planets/planets_routes");
const launchRouter = require("./routers/launches/launches_routes");
const { loadPlanetsData } = require("./models/planets_models")

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
    await loadPlanetsData;
    app.listen(8000,()=>{
        console.log("listening");
    })
}
startServer();