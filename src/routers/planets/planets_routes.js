const express = require("express");
//const getAllPlanets = require("./planets_controller");
const { planets } = require("../../models/planets_models");

const planetRouter = express.Router();

planetRouter.get("/",(req,res)=>{
    console.log(planets);
    return res.json(planets);
});

module.exports = planetRouter;