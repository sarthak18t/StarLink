const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber : 100,
    mission : "Kepler exploration",
    rocket : "Explorer IS1",
    launchDate : new Date("December 27 , 2030"),
    target : "Kepler-442 b",
    customer : ["NASA"],
    upcoming : true,
    success : true
}

launches.set(launch.flightNumber,launch);

function abortLaunchWithID(launchID){
    const aborted = launches.get(launchID);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted
}

function existsLaunchWithID(launchID){
    return launches.has(launchID);
}

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,
        Object.assign(launch,{
            flightNumber : latestFlightNumber,
            customer : ["NASA"],
            upcoming : true,
            success : true,
        }))
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithID,
    abortLaunchWithID
}