const express = require("express");
const {
    getAllLaunches ,
    existsLaunchWithID,
    abortLaunchWithID,
    scheduleNewLaunch
} = require("../../models/launches_model");

const launchRouter = express.Router();

launchRouter.get("/",async(req,res)=>{
    const allLaunches = await getAllLaunches();
     return res.status(200).send(allLaunches);
})

launchRouter.post("/",(req,res)=>{
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        throw new Error("Invalid date")
    }
    const newLaunch = scheduleNewLaunch(launch);

    return res.status(201).json(newLaunch);
})

launchRouter.delete("/:id",(req,res)=>{
    const launchID = Number(req.params.id);
    if(!existsLaunchWithID(launchID)){
        return res.status(404).json({
            error : "Launch not found",
        })
    }

    const aborted = abortLaunchWithID(launchID);
    res.status(200).json(aborted);

})
module.exports = launchRouter;
