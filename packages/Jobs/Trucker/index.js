//Trucker colshapes
let truckerStartColShape = mp.colshapes.newSphere(878.7263793945312,-1256.6168212890625,26.36636734008789, 4, 0);
let truckerLoadColShape = mp.colshapes.newSphere(912.9713745117188,-1270.52734375,25.58014488220215, 2, 0);
let truckerUnloadColShape0 = mp.colshapes.newSphere(877.644, -1221.602, 25.758, 2, 0); //Tabak
let truckerUnloadColShape1 = mp.colshapes.newSphere(858.721, -1222.652, 26.300, 2, 0); //Wein

//Press E to Call Menu
mp.events.add("server:Keybind:KeyE", (player) => {
    if(truckerStartColShape.isPointWithin(player.position)) {
        player.call("truckerStartMenu");
    }
    else if (truckerLoadColShape.isPointWithin(player.position)) {
        let truckerJobVeh = player.getVariable('myTruckerVeh');
        if(truckerJobVeh != null) {
            player.call("truckerloadMenu");
        }
        else
        {
            player.notify("Du musst dir erst einen LKW besorgen!");
        }
    }
    else if (truckerUnloadColShape0.isPointWithin(player.position) || truckerUnloadColShape1.isPointWithin(player.position)) {
        let truckerJobVeh = player.getVariable('myTruckerVeh');
        if(truckerJobVeh != null) {
            player.call("truckerUnloadMenu");
        }
        else
        {
            player.notify("Du musst dir erst einen LKW besorgen!");
        }
    }
});

mp.events.add("startTruckerJob", (player, cargoID) => {
    if(cargoID < 2) {
        let truckerJobVeh = player.getVariable('myTruckerVeh');
        if(truckerJobVeh == null) {

            let getVehiclesNearbyMe = (player) => {
                const returnVehicles = [];

                mp.vehicles.forEachInRange(new mp.Vector3(906.0671997070312,-1226.1424560546875,25.60888671875), 5,
                    (vehicle) => {
                        returnVehicles.push(vehicle);
                    }
                );

                return returnVehicles;
            };
            let vehiclesNearbyMe = getVehiclesNearbyMe(mp.players.at(0));

            if(vehiclesNearbyMe.length < 1) {
                //get cargoID to find cargo
                if (cargoID == 0) {
                    carName = "pounder2";
                }
                else if (cargoID == 1) {
                    carName = "mule4";
                }
                let veh = mp.vehicles.new(mp.joaat(carName), new mp.Vector3(906.0671997070312,-1226.1424560546875,25.60888671875),
                {
                    heading: 181.5929412841797,
                    numberPlate: "Trucker",
                    color: [[0, 255, 0],[0, 255, 110]]
                });
                player.setVariable('myTruckerVeh', veh);
                veh.setVariable("cargo", cargoID);
                veh.setVariable("cargoValue", 0);
                veh.setVariable("isTrucker","true");
                veh.setVariable("ownerVeh", player.data.internalId);
                veh.setVariable("plomp", 0);
                veh.setVariable("misfueled","false");
                veh.setVariable("canStart","true");
                veh.setVariable("isRunning","true");
                veh.setVariable("fuel","100.00");
                if (gm.vehicleData[mp.joaat(carName)]) {
                  vehData = gm.vehicleData[mp.joaat(carName)];
                  veh.setVariable("tankvolumen",String(vehData.tankvolumen));
                  veh.setVariable("verbrauch",String(vehData.verbrauch));
                  veh.setVariable("treibstoff",String(vehData.treibstoff));
                } else {
                  veh.setVariable("tankvolumen","60");
                  veh.setVariable("verbrauch","2");
                  veh.setVariable("treibstoff","Benzin");
                }
                veh.locked = true;
                veh.dead = false;
                veh.engine = true;
                player.setVariable("truckerJobStatus", 1);

                let truckMarker = mp.markers.new(0, new mp.Vector3(906.0671997070312,-1226.1424560546875,32.60888671875), 3,
                {
                    color: [0, 0, 255, 255],
                    visible: false
                });
                truckMarker.showFor(player);
                mp.events.add("playerEnterVehicle", truckRemoveStartMarker);
                veh.setVariable("startMarker", truckMarker);
                player.notify("Du hast den Job Trucker gestartet!");
            }
            else
            {
                player.notify("Es ist kein Platz frei um dir ein fahrzeug zu geben !");
            }
        }
        else
        {
            player.notify("Du hast bereits einen LKW bitte bringe diesen zurück!");
        }
    }

});

//TODO:
mp.events.add("loadTruckerJob", (player, cargoValue, cargoPlomp) => {
    let truckerJobVeh = player.getVariable('myTruckerVeh');
    if(truckerJobVeh != null) {
        let loadStation = new mp.Vector3(914.8789672851562,-1262.3001708984375,25.696544647216797);
        let truckerLoadVehDist = truckerJobVeh.dist(loadStation);
        if(truckerLoadVehDist < 5) {
            if (truckerJobVeh.rotation.z < 54 && truckerJobVeh.rotation.z > 18) {
                let truckerVehOwner = truckerJobVeh.getVariable('ownerVeh');
                if(truckerVehOwner == player.data.internalId) {
                    let truckCargoValue = truckerJobVeh.getVariable('cargoValue');
                    let cargoValueNum = cargoValue + 1;
                    let cargoValueNum2 = cargoValueNum * 500;
                    let cargoValueSum = cargoValueNum2 * 3;
                    let truckMaxValue = 4000;
                    let truckplomp = truckerJobVeh.getVariable('plomp');
                    let truckCargoWillLoad = truckCargoValue + cargoValueNum2;
                    if(truckCargoWillLoad <= truckMaxValue) {
                        if(cargoPlomp) {
                            if(truckplomp == 0) {
                                let cargoValueSumPlomp = cargoValueSum / 100;
                                cargoValueSumPlomp = cargoValueSumPlomp * 30;
                                cargoValueSum = cargoValueSum + cargoValueSumPlomp;
                                player.notify(`Deine Fracht ist ${cargoValueSumPlomp}$ teurer!`);
                                truckerJobVeh.setVariable("plomp", 1);
                            }
                            else
                            {
                                player.notify(`Dein Truck hatte bereits eine Plompe diese wird erneuert!`);

                            }
                        }
                        if (player.data.money >= cargoValueSum) {
                            player.data.money = (player.data.money - cargoValueSum);
                            gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [player.data.money, player.data.internalId],
                                        function (err, res, row) {
                                            if (err) console.log("Error in Player Quit Query: " + err);
                                        });
                            player.call("changeValue", ["money", player.data.money]);
                            truckerJobVeh.setVariable("cargoValue", truckCargoWillLoad);
                            player.notify(`Du hast deinen LKW für ${cargoValueSum}$ mit ${truckCargoWillLoad} Paketen beladen!`);

                            player.call("unloadWaypoint", [loadStation]);

                            return;
                        }
                        else
                        {
                            player.notify(`Du hast keine ${cargoValueSum}$ auf deiner Hand!`);
                            return;
                        }
                    }
                    else
                    {
                        player.notify(`Du bist bereits mit ${truckCargoValue}/4000 beladen!`);
                        return;
                    }
                }
                else
                {
                    player.notify(`Das ist nicht dein LKW an der Rampe 7!`);
                    return;
                }
            }
            else
            {
                player.notify(`Du musst rückwärts an der Rampe 7 stehen!`);
                return;
            }
        }
        else
        {
            player.notify("Du musst an Rampe 7 stehen!");
            return;
        }
    }
    else
    {
        player.notify("Du musst dir erst einen LKW besorgen!");
    }
});

//TODO: wenn nicht der besitzer dann fragen ob plombe und wenn nicht dem anderen das geld geben !
mp.events.add("unloadTruckerJob", (player) => {
    let truckerJobVeh = player.getVariable('myTruckerVeh');
    if(truckerJobVeh != null) {

        let truckerUnloadVehDist = truckerJobVeh.dist(new mp.Vector3(0, 0, 0));

        let truckerCargoID = truckerJobVeh.getVariable('cargo');
        if (truckerCargoID == 0) {
            truckerUnloadVehDist = truckerJobVeh.dist(new mp.Vector3(872.346, -1228.822, 26.965));
            if(truckerUnloadVehDist > 9) {
                player.notify(`Du bist nicht am Abgabepunkt von Tabak!`);
                return;
            }
        }
        else if (truckerCargoID == 1) {
            truckerUnloadVehDist = truckerJobVeh.dist(new mp.Vector3(850.240, -1228.015, 27.151));
            if(truckerUnloadVehDist > 9) {
                player.notify(`Du bist nicht am Abgabepunkt von Wein!`);
                return;
            }
        }
        else
        {
            player.notify(`Dein Truck hat keine Pakete geladen!`);
            return;
        }

        let truckerVehOwner = truckerJobVeh.getVariable('ownerVeh');
        if(truckerVehOwner == player.data.internalId) {
            let cargoValue = truckerJobVeh.getVariable("cargoValue");
            if(cargoValue > 1) {
                let cargoValueSum = cargoValue * 5;
                player.data.money = (player.data.money + cargoValueSum);
                gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [player.data.money, player.data.internalId],function (err, res, row) {if (err) console.log("Error in Player Quit Query: " + err);});
                player.call("changeValue", ["money", player.data.money]);
                truckerJobVeh.setVariable("cargoValue", 0);
                player.notify(`Du hast ${cargoValue} Paketen von dem entladen und ${cargoValueSum} $ bekommen!`);
                truckerJobVeh.setVariable("plomp",0);
                return;
            }
            else
            {
                player.notify(`Du hast in dem LKW keine Pekte geladen!`);
            }
        }
        else
        {
            player.notify(`Das ist nicht dein LKW!`);
        }
    }
    else
    {
        player.notify("Du musst dir erst einen LKW besorgen!");
    }
});

mp.events.add("endTruckerJob", (player) => {
        let truckerJobVeh = player.getVariable('myTruckerVeh');
        if(truckerJobVeh != null) {
            let truckerUnloadVehDist = truckerJobVeh.dist(new mp.Vector3(878.7263793945312,-1256.6168212890625,26.36636734008789));
            if(truckerUnloadVehDist < 25) {
                truckerJobVeh.destroy();
                player.setVariable('myTruckerVeh', null);
                player.notify("Du hast deinen LKW abgegeben!");
            }
            else
            {
                player.notify("Bitte bringe den LKW hier her um den Job zu beenden!");
            }
        }
        else
        {
            player.notify("Du hast keinen LKW und kannst den Job nicht beenden!");
        }
});

function truckRemoveStartMarker(player, vehicle, seat) {
    let truckerJobVeh = player.getVariable('myTruckerVeh');
    let truckerStartMarker = truckerJobVeh.getVariable('startMarker');
    if(vehicle == truckerJobVeh) {
        if(seat == -1) {
            truckerStartMarker.destroy();
            mp.events.remove("playerEnterVehicle", truckRemoveStartMarker);
        }
    }
}
