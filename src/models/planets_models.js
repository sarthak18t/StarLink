const planets = require("./planet_schema");
const { parse } = require('csv-parse');
const fs = require("fs");

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

async function getAllPlanets(){
  console.log(await planets.find());
  return await planets.find();
}
async function savePlanet(data){
    try {
      await planets.updateOne({
        kepler_name : data.kepler_name
      },{
        kepler_name : data.kepler_name
      },{
        upsert: true
      })
    } catch (error) {
      console.log(`could not save ${error}`);
    }
}

function loadPlanets(){
  return new Promise((resolve,reject)=>{
    fs.createReadStream('/Users/sarthak/Desktop/WEB DEVELOPMENT/nasaProj/server/data/kepler_data.csv')
    .pipe(parse({
      comment: '#',
      columns : true,
    }))
    .on('data', async (data) => {
      // upsert if planet already exists it will not insert

      if (isHabitablePlanet(data)) {
        savePlanet(data)
      }
    })
    .on('error', (err) => {
      console.log(err);  
      reject(err);
    })
    .on('end',async () => {
      const countPlanets = (await getAllPlanets()).length
      // console.log(habitablePlanets.map((planet)=>{
      //   return planet['kepler_name'];
      // }));
      console.log(`${countPlanets} habitable planets found!`);
      resolve();
    });  
  })
}

loadPlanets();
module.exports = {
    loadPlanets,
}