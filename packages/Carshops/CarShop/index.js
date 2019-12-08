let cardealerShape = mp.colshapes.newSphere(-40.84, -1674.82, 29.46, 3, 0);
let cardealerSpawn = new mp.Vector3(-47.56, -1681.81, 29.44);

mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    if(cardealerShape.isPointWithin(player.position)) {
        player.call("client:CarShop:OpenDialog");
    }
  }
});


//mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

// EXIT COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if (mp.players.exists(player)) {
    if(shape == cardealerShape) {
      //Spieler hat colshape verlassen
      player.call("client:CarShop:CloseDialog")
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);

function giveCar(player, model, amout) {
  if (mp.players.exists(player)) {
    if ((model == "390201602" && amout == 28050) || (model == "627535535" && amout == 29070) || (model == "2035069708" && amout == 20400) || (model == "3724934023" && amout == 24650) ||
        (model == "3285698347" && amout == 27030) || (model == "2154536131" && amout == 20400) || (model == "1873600305" && amout == 599) || (model == "699456151" && amout == 18000) ||
        (model == "1039032026" && amout == 24000) || (model == "Surge" && amout == 16500) || (model == "Stratum" && amout == 21750) || (model == "Stanier" && amout == 21750) ||
        (model == "Regina" && amout == 5800) || (model == "Premier" && amout == 21750) || (model == "Intruder" && amout == 29700) || (model == "Ingot" && amout == 7000) ||
        (model == "3609690755" && amout == 23700) || (model == "Asterope" && amout == 16550) || (model == "841808271" && amout == 33000) || (model == "2844316578" && amout == 15900) ||
        (model == "3117103977" && amout == 10500) || (model == "3164157193" && amout == 15000) || (model == "2166734073" && amout == 11790) || (model == "3087195462" && amout == 1299) ||
        (model == "2983726598" && amout == 1099) || (model == "1762279763" && amout == 799) || (model == "3306466016" && amout == 7620) || (model == "2411965148" && amout == 999) ||
        (model == "2485144969" && amout == 7830) || (model == "3863274624" && amout == 4630) || (model == "2859047862" && amout == 9630) || (model == "Blista" && amout == 6920) ||
        (model == "2890830793" && amout == 18870) || (model == "3783366066" && amout == 55850) || (model == "223258115" && amout == 29900) || (model == "2841686334" && amout == 12410) ||
        (model == "3945366167" && amout == 12630)) {
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
              console.log("CarShop Test - nicht genug Geld");
            } else {
              var newAm = am.amout - amout;
              gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                  if (err3) console.log(err3)
                  var randomNumPlate = 0;
                  gm.databaseManager.getConnection().query("SELECT * FROM vehicles", function (err, res) {
                    if (err) console.log(err);
                    var randomOK = true;
                    do{
                      randomNumPlate = "LS" + Math.floor(Math.random() * 999999);
                      randomOK = true;
                      res.forEach(toCheck => {
                        if(toCheck.numberplate == randomNumPlate) randomOK = false;
                      });
                    } while(!randomOK);
                    var veh = mp.vehicles.new(model, cardealerSpawn, {});
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
                    gm.databaseManager.getConnection().query("INSERT INTO vehicles (garage, isSpawned, modelId, type, numberplate, owner, fuel, odometer, tuning, isImpounded, buyDate) VALUES (4, 'Y', ?, 1, ?, ?, 100, 100, ?, 'N', ?)", [model, randomNumPlate, player.data.internalId, JSON.stringify(vehTuning), buyDate], function (err, res) {
                      if (err) console.log(err);
                      gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ?", [randomNumPlate], function (err1, res1) {
                        if (err1) console.log("Error in Select vehicles: "+err1)
                        res1.forEach(function (vehbuy) {
                          gm.databaseManager.getConnection().query("INSERT INTO vehiclekeys (vehID, keyOwner, amout, isActive) VALUES (?,?,'2','Y')", [vehbuy.id, player.data.internalId], function(err3, res3) {
                            if (err3) console.log("Error in Insert vehiclekeys: "+err3);
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
    } else {
      var accountId = player.data.accountId;
      gm.databaseManager.getConnection().query("UPDATE `accounts` SET isBanned = 'Y' WHERE id = ?", [accountId], function (err, res) {
        if (err) console.log("Error in Ban query: "+err);
        mp.events.call("sqlLog", player, player.data.ingameName+" wurde beim Gebrauchtwagenhändler gebannt!");
      });
      player.outputChatBox(`!{255, 0, 0}Du wurdest gebannt. Bitte melde dich im Support!`);
      player.kick('Du wurdest gebannt. Bitte melde dich im Support!');
      player.call("client:voice:endConnection");
    }
  }
}
mp.events.add("server:CarShop:giveCar", giveCar);
