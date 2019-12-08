let PolicehelidealerShape = mp.colshapes.newSphere(463.3555, -982.4477, 43.6919, 3, 0);
let PolicehelidealerSpawn = new mp.Vector3(449.2946, -981.2523, 43.6916);

mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    if(PolicehelidealerShape.isPointWithin(player.position)) {
      var fractionData = player.data.fractionData;
      fractionData = JSON.parse(fractionData);
      if (fractionData.fractionName == "LSPD") {
        player.call("client:PoliceHeliShop:OpenMenu");
      }
    }
  }
});

// EXIT COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if (mp.players.exists(player)) {
    if(shape == PolicehelidealerShape) {
      //Spieler hat colshape verlassen
      player.call("client:PoliceHeliShop:closeMenu")
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);

function givepoliceheli(player, model, amout) {
  if (mp.players.exists(player)) {
    model = parseInt(model);
  var vehTuning = {
    pcolor: 0,
    scolor: 0,
    neonr: 0,
    neong: 0,
    neonb: 0,
    neonEnabled: false,
    wheelColor: -1,
    windowTint: -1,
    design: -1,
    spoiler: -1,
    front: -1,
    heck: -1,
    seite: -1,
    auspuff: -1,
    rahmen: -1,
    gitter: -1,
    haube: -1,
    kotfl: -1,
    dach: -1,
    motor: -1,
    bremsen: -1,
    getriebe: -1,
    hupe: -1,
    feder: -1,
    turbo: -1,
    xenon: -1,
    felgen: -1,
  };
  gm.databaseManager.getConnection().query("SELECT id , amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
    if (err) console.log(err);
    if (res.length > 0) {
        res.forEach(function (am) {
          if (amout > am.amout) {
            player.notify("Du hast nicht genug Geld auf deinem Konto");
            console.log("PoliceHeliShop Test - nicht genug Geld");
          } else {
            var newAm = am.amout - amout;
            gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                if (err3) console.log(err3)
                var randomNumPlate = 0;
                gm.databaseManager.getConnection().query("SELECT * FROM vehicles", function (err, res) {
                  if (err) console.log(err);
                  var randomOK = true;
                  do{
                    randomNumPlate = "LSPD-" + Math.floor(Math.random() * 1000);
                    randomOK = true;
                    res.forEach(toCheck => {
                      if(toCheck.numberplate == randomNumPlate) randomOK = false;
                    });
                  } while(!randomOK);
                  var veh = mp.vehicles.new(model, PolicehelidealerSpawn, {});
                  veh.dimension = player.dimension;
                  veh.numberPlate = randomNumPlate;
                  veh.locked = true;
                  veh.engine = false;
                  veh.setVariable("driver",String(player.id));
                  veh.setVariable("fuel","100");
                  veh.setVariable("owner",String(player.data.internalId));
                  veh.setColorRGB(255,255,255,0,0,0);
                  veh.setVariable("canStart","true");
                  veh.setVariable("misfueled","false");
                  veh.setVariable("isRunning","false");
                  veh.setVariable("numberPlate",String(randomNumPlate));
                  if (gm.vehicleData[model]) {
                    vehData = gm.vehicleData[model];
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
                  var date = new Date();
                  var month = parseInt(parseInt(date.getMonth()) + 1);
                  var buyDate = ""+date.getFullYear()+"-"+month+"-"+date.getDate()+"";
                  gm.databaseManager.getConnection().query("INSERT INTO vehicles (garage, isSpawned, modelId, type, numberplate, owner, fuel, odometer, tuning, isImpounded, fraction, buyDate) VALUES (27, 'Y', ?, 1, ?, ?, 100, 100, ?, 'N', 'LSPD', ?)", [model, randomNumPlate, player.data.internalId, JSON.stringify(vehTuning), buyDate], function (err, res) {
                    if (err) console.log(err);
                    gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ?", [randomNumPlate], function (err1, res1) {
                      if (err1) console.log("Error in Select vehicles: "+err1)
                      res1.forEach(function (vehbuy) {
                        gm.databaseManager.getConnection().query("INSERT INTO vehicleKeys (vehID, keyOwner, amout, isActive) VALUES (?,?,'2','Y')", [vehbuy.id, player.data.internalId], function(err3, res3) {
                          if (err3) console.log("Error in Insert Vehiclekeys: "+err3);
                          player.notify("Fahrzeug mit Kennzeichen " + randomNumPlate + " wurde gekauft");
                          mp.events.call("sqlLog", player, player.data.ingameName+" hat "+vehData.bezeichnung+" für "+amout+"$ mit Kennzeichen "+randomNumPlate+" gekauft!");
                          var currentKeys = player.getVariable("currentKeys");
                          currentKeys = JSON.parse(currentKeys);
                          var newList = [];
                          currentKeys.forEach(function(key) {
                            newList.push(key);
                          });
                          var obj = {"vehid": parseInt(vehbuy.id), "active": "Y"};
                          newList.push(obj);
                          newList = JSON.stringify(newList);
                          player.setVariable("currentKeys",newList);
                          veh.setVariable("vehId", vehbuy.id);
                        });
                      });
                    });
                  });
                });
              });
            }
          });
        } else {
          player.notify("~r~Du besitzt kein Bankkonto!");
          return;
        }
    });
  }
}//
mp.events.add("server:PoliceHeliShop:giveCar", givepoliceheli);
