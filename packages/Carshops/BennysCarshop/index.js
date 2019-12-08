let BennyscardealerShape = mp.colshapes.newSphere(-192.9500, -1286.4597, 31.2692, 3, 0);
let BennyscardealerSpawn = new mp.Vector3(-184.70, -1287.81, 31.29);


mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);
    if (businessData.businessName == "Bennys Werkstatt") {
        if(BennyscardealerShape.isPointWithin(player.position)) {
            player.call("client:bennysCarShop:OpenMenu");
        }
    }
  }
});


//mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

// EXIT COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if (mp.players.exists(player)) {
    if(shape == BennyscardealerShape) {
      //Spieler hat colshape verlassen
      player.call("client:bennysCarShop:closeMenu")
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);

function bennysgiveCar(player, model, amout) {
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
    gm.databaseManager.getConnection().query("SELECT id , money FROM characters WHERE id = ?", [player.data.internalId], function (err, res) {
    if (err) console.log("Error in Player remove bar Money Query: " + err);
    if (res.length > 0) {
        money = parseFloat(res[0].money).toFixed(2);
        amout = parseFloat(amout).toFixed(2);
          if ( (amout*1) > (money*1)){
            player.notify("Du hast nicht genug Geld dabei");
            console.log("CarShop Test - nicht genug Geld");
          } else {
            var newAm = parseFloat( parseFloat(money*1).toFixed(2) - parseFloat(amout*1).toFixed(2) ).toFixed(2);
            player.call("updateHudMoney", [newAm]);
            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.internalId], function (err3, res3) {
                if (err3) console.log(err3);
                var randomNumPlate = 0;
                gm.databaseManager.getConnection().query("SELECT * FROM vehicles", function (err, res) {
                  if (err) console.log(err);
                  var randomOK = true;
                  do{
                    randomNumPlate = "BN" + Math.floor(Math.random() * 99999);
                    randomOK = true;
                    res.forEach(toCheck => {
                      if(toCheck.numberplate == randomNumPlate) randomOK = false;
                    });
                  } while(!randomOK);
                  var veh = mp.vehicles.new(model, BennyscardealerSpawn, {});
                  veh.dimension = player.dimension;
                  veh.numberPlate = randomNumPlate;
                  veh.locked = true;
                  veh.engine = false;
                  veh.setVariable("driver",String(player.id));
                  veh.setVariable("fuel","100");
                  veh.setVariable("owner",String(player.data.internalId));
                  veh.setVariable("canStart","true");
                  veh.setVariable("misfueled","false");
                  veh.setVariable("isRunning","false");
                  veh.setVariable("numberPlate",String(randomNumPlate));
                  veh.rotation = new mp.Vector3(0, 0, 182);
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
                  gm.databaseManager.getConnection().query("INSERT INTO vehicles (garage, isSpawned, modelId, type, numberplate, owner, fuel, odometer, tuning, isImpounded, fraction, buyDate) VALUES (23, 'Y', ?, 1,?, ?, 100, 100, ?, 'N','Bennys', ?)", [model, randomNumPlate, player.data.internalId, JSON.stringify(vehTuning), buyDate], function (err, res) {
                    if (err) console.log(err);
                    gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ?", [randomNumPlate], function (err1, res1) {
                      if (err1) console.log("Error in Select vehicles: "+err1);
                      res1.forEach(function (vehbuy) {
                        gm.databaseManager.getConnection().query("INSERT INTO vehicleKeys (vehID, keyOwner, amout, isActive) VALUES (?,?,'2','Y')", [vehbuy.id, player.data.internalId], function(err3, res3) {
                          if (err3) console.log("Error in Insert Vehiclekeys: "+err3);
                          player.notify("Fahrzeug mit Kennzeichen " + randomNumPlate + " wurde gekauft");
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
        }
        return;
    });
  }
}
mp.events.add("server:bennysCarShop:giveCar", bennysgiveCar);
