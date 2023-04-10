const launches = require("./launches_schema");
const planets = require("./planet_schema");
//const launchesMap = new Map();

const latestFlightNumber = 100;

// const launch = {
//     flightNumber : 100,
//     mission : "Kepler exploration",
//     rocket : "Explorer IS1",
//     launchDate : new Date("December 27 , 2030"),
//     target : "Kepler-442 b",
//     customer : ["NASA"],
//     upcoming : true,
//     success : true
// }

//aveLauch(launch);

//launchesMap.set(launch.flightNumber,launch);

async function getLatestFlightNumber(){
    const lastestLaunch = (await launches.findOne().sort("-flightNumber"));

    if(!lastestLaunch){
        return latestFlightNumber;
    }
    console.log(Number(lastestLaunch.flightNumber + 1));
    return Number(lastestLaunch.flightNumber + 1);
}

async function saveLauch(launch){
    const planet = await planets.findOne({
        kepler_name : launch.target,
    })
    //console.log(planet);
    if(!planet){
        throw new Error("No matching planet found")
    }
    try {
        await launches.findOneAndUpdate({
            flightNumber:launch.flightNumber
        },launch,{
            upsert : true, 
        })
    } catch (err) {
        console.log(err);
    }
}


async function existsLaunchWithID(launchID){
    return await launches.findOne({
        flightNumber : launchID,
    })
}

async function abortLaunchWithID(launchID){
   const aborted =  await launches.updateOne({
        flightNumber:launchID
    },{
        upcoming : false,
        success : false
    })

   return await existsLaunchWithID(launchID)
}
// function abortLaunchWithID(launchID){
//     const aborted = launchesMap.get(launchID);
//     aborted.upcoming = false;
//     aborted.success = false;
//     return aborted
// }

// function existsLaunchWithID(launchID){
//     return launchesMap.has(launchID);
// }

// function getAllLaunches(){
//     return Array.from(launchesMap.values())
// }

async function getAllLaunches(){
    const allLaunches = await launches.find({},{"_id":0,"__v":0});
    return allLaunches;
}

// function addNewLaunch(launch){
//     latestFlightNumber++;
//     launchesMap.set(latestFlightNumber,
//         Object.assign(launch,{
//             flightNumber : latestFlightNumber,
//             customer : ["NASA"],
//             upcoming : true,
//             success : true,
//         }))
// }

async function scheduleNewLaunch(lauch){

    const newFlightNumber = await getLatestFlightNumber();

    const newLaunch = Object.assign(lauch,{
        success : true,
        upcoming : true,
        customer : ["NASA"],
        flightNumber : newFlightNumber
    })

    await saveLauch(newLaunch);
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithID,
    abortLaunchWithID
}