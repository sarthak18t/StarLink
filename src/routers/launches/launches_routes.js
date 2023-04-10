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

launchRouter.post("/",async (req,res)=>{
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        throw new Error("Invalid date")
    }
    const newLaunch = await scheduleNewLaunch(launch);

    return res.status(201).send(newLaunch);
})

launchRouter.delete("/:id",async(req,res)=>{
    const launchID = Number(req.params.id);
    if(! await existsLaunchWithID(launchID)){
        return res.status(404).json({
            error : "Launch not found",
        })
    }

    const aborted = await abortLaunchWithID(launchID);

    if(!aborted){
        return res.status(404).json({
            error : "Launch not aborted"
        })
    }
    return res.status(200).json({
        ok : true,
    });

})
module.exports = launchRouter;
