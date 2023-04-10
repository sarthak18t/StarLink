const express = require("express");
const { getAllPlanets } = require("../../models/planets_models");
//const { planets } = require("../../models/planets_models");
const planets = require("../../models/planet_schema")
const planetRouter = express.Router();

planetRouter.get("/",async(req,res)=>{
    const habitablePlanets = await getAllPlanets();
    console.log(habitablePlanets);
    return res.send(habitablePlanets);
});

module.exports = planetRouter;