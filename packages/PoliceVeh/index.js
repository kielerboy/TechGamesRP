//var policeVehColShape = mp.colshapes.newSphere(441.89, -1013.66, 28.63, 2, 0);
//var policeVehDestructPos = new mp.Vector3(448.20, -1014.03, 28.51, 3, 0);
/*mp.markers.new(1, new mp.Vector3(448.20, -1014.03, 26.51), 3,
{
    direction: new mp.Vector3(448.20, -1014.03, 26.51),
    rotation: new mp.Vector3(0, 0, 0),
    color: [255, 255, 255, 100],
    visible: true,
    dimension: 0
});
//var policeVehSpawnPos = new mp.Vector3(433.67, -1020.34, 29);
var policeHeliColShape = mp.colshapes.newSphere(463.355, -982.4477, 43.6919, 2, 0);
var policeHeliDestructPos = new mp.Vector3(449.3163, -993.7453, 43.6916);
mp.markers.new(7, new mp.Vector3(449.3163, -993.7453, 43.6916), 4,
{
    direction: new mp.Vector3(449.3163, -993.7453, 43.6916),
    rotation: new mp.Vector3(0, 0, 0),
    color: [255, 255, 255, 100],
    visible: true,
    dimension: 0
});
var policeHeliSpawnPos = new mp.Vector3(449.2946, -981.2523, 43.6916);
var spawnedNumPlates = 1;


/*function SpawnVeh(player, model) {
    if (getVehicleFromPosition(policeVehSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht bereits ein Fahrzeug in der Ausfahrt");
    } else {
        hashToSpawn = mp.joaat(model);
        let veh = mp.vehicles.new(hashToSpawn, policeVehSpawnPos, {});
        veh.rotation = new mp.Vector3(0, 0, 93.64);
        veh.dimension = player.dimension;
        veh.numberPlateType = 1;
        veh.numberPlate = "PD-" + spawnedNumPlates;
        spawnedNumPlates = spawnedNumPlates + 1;
        veh.setVariable("Owner", player.name);
        veh.setVariable("isPolice", "true");
        veh.setVariable("misfueled","false");
        veh.setVariable("canStart","true");
        veh.setVariable("isRunning","true");
        veh.locked = true;
        veh.engine = true;
        if (model == "police4"){
            veh.setColorRGB(0,0,0,0,0,0);
        } else {
            veh.setColorRGB(255,255,255,0,0,0);
        }
        veh.setVariable("fuel","100");
        if (gm.vehicleData[hashToSpawn]) {
          vehData = gm.vehicleData[hashToSpawn];
          veh.setVariable("tankvolumen",String(vehData.tankvolumen));
          veh.setVariable("verbrauch",String(vehData.verbrauch));
          veh.setVariable("treibstoff",String(vehData.treibstoff));
          veh.setVariable("vehData",JSON.stringify(vehData));
        } else {
          vehData = gm.vehicleData["undefiniert"];
          veh.setVariable("tankvolumen",String(vehData.tankvolumen));
          veh.setVariable("verbrauch",String(vehData.verbrauch));
          veh.setVariable("treibstoff",String(vehData.treibstoff));
          veh.setVariable("vehData",JSON.stringify(vehData));
        }
        player.call("client:PoliceVeh:setEngineBoost", [veh]);
        player.notify("~g~Dein Dienstfahrzeug wurde ausgeparkt und steht bereit");
    }
}
mp.events.add("server:PoliceVeh:SpawnVeh", SpawnVeh);

function SpawnHeli(player, model) {
  if(mp.players.exists(player)) {
    if (getVehicleFromPosition(policeHeliSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht bereits ein Heli im Landeport");
    } else {
        hashToSpawn = mp.joaat(model);
        let veh = mp.vehicles.new(hashToSpawn, policeHeliSpawnPos, {});
        veh.rotation = new mp.Vector3(0, 0, 195.60);
        veh.dimension = player.dimension;
        veh.numberPlateType = 1;
        veh.engine = true;
        veh.numberPlate = "PD-" + spawnedNumPlates;
        spawnedNumPlates = spawnedNumPlates + 1;
        veh.setVariable("Owner", player.name);
        veh.setVariable("isPolice", "true");
        veh.setVariable("misfueled","false");
        veh.setVariable("canStart","true");
        veh.setVariable("isRunning","true");
        player.call("client:PoliceVeh:setEngineBoost", [veh]);
        player.notify("~g~Dein Dienstheli wurde ausgeparkt und steht bereit");
    }
  }
}
mp.events.add("server:PoliceVeh:SpawnHeli", SpawnHeli);

/*function DestructVeh(player) {
    if (getVehicleFromPosition(policeVehSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht kein Fahrzeug in der Einfahrt");
        return;
    } else {
        mp.vehicles.forEachInRange(policeVehDestructPos, 3, (veh) => {
            if (veh) veh.destroy();
            player.notify("~g~Fahrzeug wurde eingeparkt");
        });
    }
}
mp.events.add("server:PoliceVeh:DestructVeh", DestructVeh);

function DestructHeli(player) {
  if(mp.players.exists(player)) {
    if (getVehicleFromPosition(policeHeliSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht kein Heli im Landeport");
        return;
    } else {
        mp.vehicles.forEachInRange(policeHeliDestructPos, 6, (veh) => {
            if (mp.vehicles.exists(veh)) veh.destroy();
            player.notify("~g~Heli wurde eingeparkt");
        });
    }
  }
}
mp.events.add("server:PoliceVeh:DestructHeli", DestructHeli);

mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSPD") {
      //if(policeVehColShape.isPointWithin(player.position) && !player.vehicle) {
      //    player.call("client:PoliceVeh:openMenu");
    //  }
      if(policeHeliColShape.isPointWithin(player.position)) {
          player.call("client:PoliceVeh:openHeliMenu");
      }
    }
  }
});

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];
    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}

function playerExitColshape(player, shape) {
  if(mp.players.exists(player)) {
    /*if(shape == policeVehColShape) {
      player.call("client:PoliceVeh:closeMenu",[]);
    }
    if(shape == policeHeliColShape) {
      player.call("client:PoliceVeh:closeHeliMenu",[]);
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshape);*/
