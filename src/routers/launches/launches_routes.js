const express = require("express");
const {
    getAllLaunches ,
    addNewLaunch,
    existsLaunchWithID,
    abortLaunchWithID
} = require("../../models/launches_model");

const launchRouter = express.Router();

launchRouter.get("/",(req,res)=>{
    res.status(200).json(getAllLaunches());
})

launchRouter.post("/",(req,res)=>{
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        throw new Error("Invalid date")
    }
    addNewLaunch(launch);

    return res.status(201).json(launch);
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
