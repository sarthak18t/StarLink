const express = require("express");
//const getAllPlanets = require("./planets_controller");
//const { planets } = require("../../models/planets_models");
const planets = require("../../models/planet_schema")
const planetRouter = express.Router();

planetRouter.get("/",async(req,res)=>{
    console.log(await planets.find());
    const habitablePlanets = await planets.find();
    return res.send(habitablePlanets);
});

module.exports = planetRouter;