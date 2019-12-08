var policeImpoundColShape = mp.colshapes.newSphere(409.2658, -1623.0095, 29.2919, 2, 0);
var policeImpoundDestructPos = new mp.Vector3(401.0946, -1631.5157, 29.2919, 4, 0);
mp.markers.new(1, new mp.Vector3(401.0946, -1631.5157, 27.2919), 3,
{
    direction: new mp.Vector3(401.0946, -1631.5157, 27.2919),
    rotation: new mp.Vector3(0, 0, 0),
    color: [255, 255, 255, 100],
    visible: true,
    dimension: 0
});
var policeImpoundSpawnPos = new mp.Vector3(409.2330, -1639.2520, 29.2919);

mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    if(policeImpoundColShape.isPointWithin(player.position)) {
      mp.events.call('server:policeImpound:openGarage', player);
    }
  }
});

mp.events.add("server:policeImpound:openGarage", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSPD") {
      gm.databaseManager.getConnection().query("SELECT v.*, c.ingameName FROM vehicles v LEFT JOIN characters c ON c.id = v.owner WHERE v.isImpounded = 'Y'", function (err, res) {
          if (err) console.log(err);

          if (res.length > 0 ){
              let VehList = [];
              res.forEach( function (veh, index) {
                  if (gm.vehicleData[""+veh.modelId]) {
                    vehData = gm.vehicleData[""+veh.modelId];
                  } else {
                    vehData = gm.vehicleData["undefiniert"];
                  }
                  let obj = {"model": String(vehData.bezeichnung), "kennzeichen": String(veh.numberplate), "owner": String(veh.ingameName)};
                  VehList.push(obj);
              });
              if(mp.players.exists(player)) player.call("client:PoliceImpound:drawMenu", [JSON.stringify(VehList)]);
          } else {
              if(mp.players.exists(player)) player.call("client:PoliceImpound:drawMenu", ["none"]);
          }
      });
    } else {
      player.call(`notification`, ["4", "Dass können nur LSPD Mitarbeiter im Dienst"]);
    }
  }
});

function spawnVeh(player, numplate) {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    let pos = new mp.Vector3(409.2330, -1639.2520, 29.2919);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSPD") {
      gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ?", [numplate], function (err, res) {
        if (err) console.log(err);
        if (res.length > 0){
          let fromDB = res[0];
          let vehTuning = JSON.parse(fromDB.tuning);
          var veh = mp.vehicles.new(fromDB.modelId, pos, {});
          if ((fromDB.modelId === 2046537925 || fromDB.modelId === 2667966721 || fromDB.modelId === 1912215274 || fromDB.modelId === 4260343491 || fromDB.modelId === 456714581) && fromDB.fraction == "LSPD"){
            veh.setColorRGB(255,255,255,0,0,0);
            veh.setVariable("isPolice", "true");
        } else if ((fromDB.modelId === 2321795001 || fromDB.modelId === 3089277354 || fromDB.modelId === 2601952180) && fromDB.fraction == "LSPD"){
            veh.setColorRGB(0,0,0,0,0,0);
            veh.setVariable("isPolice", "true");
        } else if ((fromDB.modelId === 1171614426 || fromDB.modelId === 469291905) && fromDB.fraction == "LSMC") {
            veh.setColorRGB(255,0,0,255,255,255);
            veh.setVariable("isMedic", "true");
        } else if ((fromDB.modelId === 1127131465 || fromDB.modelId === 2647026068) && fromDB.fraction == "NOOSE") {
            veh.setColorRGB(0,0,0,0,0,0);
            veh.setVariable("isNOOSE", "true");
            veh.rotation = new mp.Vector3(0, 0, 159);
        } else if ((fromDB.modelId === 3338918751 || fromDB.modelId === 3581397346) && fromDB.fraction == "Cabco") {
            veh.setColorRGB(255, 153, 0,255, 153, 0);
            veh.setVariable("isTaxi", "true");
            veh.rotation = new mp.Vector3(0, 0, 240);
        } else if ((fromDB.modelId === 1941029835 || fromDB.modelId === 3874056184 || fromDB.modelId === Cognoscenti || fromDB.modelId === 2333339779) && fromDB.fraction == "Cabco") {
            veh.rotation = new mp.Vector3(0, 0, 240);
            veh.setVariable("isTaxi", "true");
        } else if ((fromDB.modelId === 142944341 || fromDB.modelId === 3990165190) && fromDB.fraction == "DOJ") {
            veh.setColorRGB(190,190,190,255,255,255);
            veh.setVariable("isDOJ", "true");
        } else {
          veh.setColor(vehTuning.pcolor, vehTuning.scolor);
          veh.setVariable("secColor", parseInt(vehTuning.scolor));
        }
          veh.neonEnabled = vehTuning.neonEnabled;
          veh.setNeonColor(parseInt(vehTuning.neonr), parseInt(vehTuning.neong), parseInt(vehTuning.neonb));
          veh.setVariable("neonColorR", parseInt(vehTuning.neonr));
          veh.setVariable("neonColorG", parseInt(vehTuning.neong));
          veh.setVariable("neonColorB", parseInt(vehTuning.neonb));
          veh.setVariable("tuning",String(fromDB.tuning));
          veh.setMod(48, vehTuning.design);
          veh.setMod(0, vehTuning.spoiler);
          veh.setMod(1, vehTuning.front);
          veh.setMod(2, vehTuning.heck);
          veh.setMod(3, vehTuning.seite);
          veh.setMod(4, vehTuning.auspuff);
          veh.setMod(5, vehTuning.rahmen);
          veh.setMod(6, vehTuning.gitter);
          veh.setMod(7, vehTuning.haube);
          veh.setMod(8, vehTuning.kotfl);
          veh.setMod(10, vehTuning.dach);
          veh.setMod(11, vehTuning.motor);
          veh.setMod(12, vehTuning.bremsen);
          veh.setMod(13, vehTuning.getriebe);
          veh.setMod(14, vehTuning.hupe);
          veh.setMod(15, vehTuning.feder);
          veh.setMod(18, vehTuning.turbo);
          veh.setMod(22, vehTuning.xenon);
          veh.setMod(23, vehTuning.felgen);
          veh.wheelColor = vehTuning.wheelColor;
          veh.windowTint = vehTuning.windowTint;
          veh.numberPlateType = 1;
          veh.numberPlate = String(fromDB.numberplate);
          veh.dimension = player.dimension;
          veh.engine = true;
          veh.setVariable("isRunning","true");
          veh.setVariable("numberPlate",String(fromDB.numberplate));
          veh.setVariable("fuel",String(fromDB.fuel));
          veh.setVariable("driver",String(player.id));
          veh.setVariable("vehId",String(fromDB.id));
          veh.setVariable("modPearl1",String(vehTuning.pearl1));
          veh.setVariable("pcolor",String(vehTuning.pcolor));
          veh.setVariable("owner",String(fromDB.owner));
          veh.setVariable("canStart","true");
          veh.setVariable("misfueled","false");
          veh.setVariable("vehicleId", fromDB.id);
          veh.locked = true;
          //player.call("modpearl", [veh, parseInt(vehTuning.pearl1), veh.getColor(0)]);
          player.call(`notification`, ["2", "Fahrzeug wurde ausgeparkt!"]);
          if (gm.vehicleData[""+fromDB.modelId]) {
            vehData = gm.vehicleData[""+fromDB.modelId];
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
          gm.databaseManager.getConnection().query("UPDATE vehicles SET isSpawned = 'Y', isImpounded = 'N' WHERE id = ?", [fromDB.id], function (err, res) {
              if (err) console.log(err);
          });
        }
      });
    } else {
      player.call(`notification`, ["4", "Dass können nur LSPD Mitarbeiter im Dienst!"]);
    }
  }
}
mp.events.add("server:PoliceImpound:spawnVeh", spawnVeh);

function destroyVeh(player) {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSPD") {
      const pos = new mp.Vector3(401.0946, -1631.5157, 29.2919);
      const veh = getVehicleFromPosition(pos, 2)[0];

      if (mp.vehicles.exists(veh)) {
        if (veh === null) {
          player.call(`notification`, ["4", "Kein Fahrzeug auf der Einfahrt"]);
          return;
        }

        gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ?", [veh.numberPlate], function (err, res) {
          if(err) console.log(err);

          if(!res.length > 0) {
            player.call(`notification`, ["4", "Dass Fahrzeug hat ein Falsches Kennzeichen"]);
               return;
          }

          let vehTuning = {
              pcolor: veh.getColor(0),
              scolor: veh.getVariable("secColor"),
              neonr: parseInt(veh.getVariable("neonColorR")),
              neong: parseInt(veh.getVariable("neonColorG")),
              neonb: parseInt(veh.getVariable("neonColorB")),
              neonEnabled: veh.neonEnabled,
              wheelColor: veh.wheelColor,
              windowTint: veh.windowTint,
              design: veh.getMod(48),
              spoiler: veh.getMod(0),
              front: veh.getMod(1),
              heck: veh.getMod(2),
              seite: veh.getMod(3),
              auspuff: veh.getMod(4),
              rahmen: veh.getMod(5),
              gitter: veh.getMod(6),
              haube: veh.getMod(7),
              kotfl: veh.getMod(8),
              dach: veh.getMod(10),
              motor: veh.getMod(11),
              bremsen: veh.getMod(12),
              getriebe: veh.getMod(13),
              hupe: veh.getMod(14),
              feder: veh.getMod(15),
              turbo: veh.getMod(18),
              xenon: veh.getMod(22),
              felgen: veh.getMod(23),
              pearl1: parseInt(veh.getVariable("modPearl1")),
          }

          let fuel = veh.getVariable("fuel");

          gm.databaseManager.getConnection().query("UPDATE vehicles SET isSpawned = 'N', tuning = ?, fuel = ?, isImpounded = 'Y' WHERE numberplate = ?", [JSON.stringify(vehTuning), fuel, veh.numberPlate], function (err, res) {
            if (err) console.log(err);

            player.call(`notification`, ["2", "Dass Fahrzeug wurde eingeparkt"]);
            if (mp.vehicles.exists(veh)) veh.destroy();
          });
        });
      }
    } else {
      player.call(`notification`, ["4", "Das können nur LSPD Mitarbeiter"]);
    }
  }
}
mp.events.add("server:PoliceImpound:destroyVeh", destroyVeh);

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];

    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}
