var cabcoDutyColShape = mp.colshapes.newSphere(865.108, -209.984, -146.77, 2, 0);
/*var cabcoVehColShape = mp.colshapes.newSphere(896.2299, -144.5151, 76.8037, 2, 0);
var cabcoVehSpawnPos = new mp.Vector3(895.8615, -138.1744, 77.0847);
var cabcoVehDestructPos = new mp.Vector3(903.1429, -142.7929, 76.5998, 3, 0);
mp.markers.new(1, new mp.Vector3(903.1429, -142.7929, 74.5998), 3,
{
    direction: new mp.Vector3(9903.1429, -142.7929, 74.5998),
    rotation: new mp.Vector3(0, 0, 0),
    color: [255, 255, 255, 100],
    visible: true,
    dimension: 0
});
var spawnedNumPlates = 1;*/

mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    /*if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "Downtown Cab Co.") {
        if(cabcoVehColShape.isPointWithin(player.position)) {
            player.call("client:Cabco:openMenu");
        }
    }*/
    if (fractionData.fractionName == "Downtown Cab Co.") {
        if(cabcoDutyColShape.isPointWithin(player.position)) {
            player.call("client:Cabco:openDutyMenu");
        }
    }
  }
});

mp.events.add("server:Keybind:KeyO", (player) => {
  if (mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "Downtown Cab Co.") {
        gm.databaseManager.getConnection().query("SELECT r.fractionRankName FROM fractions f LEFT JOIN fractionranks r ON f.fractionID = r.fractionID WHERE f.fractionID = 4", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.fractionRankName);
                    if (c == resUp.length) {
                        player.call("client:Cabco:openInteractionMenu", [fractionData.canInvite, JSON.stringify(ranks)]);
                    }
                    c++;
                });
            }
        });
    }
  }
});

function hirePlayer(player, rank) {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 1);
    if (mp.players.exists(currentTarget)) {
      if(currentTarget){
          gm.databaseManager.getConnection().query("SELECT id FROM fractionranks WHERE fractionID = 4 AND fractionRankName = ?", [rank], function (err1, res1) {
              if (err1) console.log("Error in CabCo Hire Player Query1: "+err1);
              if (res1.length == 1) {
                  res1.forEach(function(rankID) {
                      var id = rankID.id;
                      var targetId = parseInt(currentTarget.data.internalId);
                      gm.databaseManager.getConnection().query("INSERT INTO fractionusers(playerCharID,fractionID,fractionRankID,playerFractionDuty) VALUES(?,4,?,'N')", [targetId, id], function(err2, res2) {
                          if (err2) console.log("Error in CabCo Hire Player Query2: "+err2);
                          else {
                              player.notify("Die Person wurde erfolgreich eingestellt!");
                              currentTarget.notify("Du wurdest bei Downtown Cab Co. als "+rank+" eingestellt!");
                              gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                                  if (err2) console.log("Error on Set Fraction");

                                  if (res2.length > 0) {
                                      res2.forEach(function (fraction) {
                                          currentTarget.data.fractionData = JSON.stringify(fraction);
                                          mp.events.call("server:TS-VoiceChat:AddRadioUser", currentTarget, 10);
                                      });
                                  }
                              });
                          }
                      });
                  });
              }
          });
      }
    }
  }
}
mp.events.add("server:Cabco:hirePlayer", hirePlayer);

function firePlayer(player) {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 1);
    if (mp.players.exists(currentTarget)) {
      if(currentTarget){
          var targetId = currentTarget.data.internalId;
          gm.databaseManager.getConnection().query("DELETE FROM fractionusers WHERE fractionID = 4 AND playerCharID = ?", [targetId], function (err1, res1) {
              if (err1) console.log("Error in CabCo Fire Player Query1: "+err1);
              else {
                  player.notify("Die Person wurde erfolgreich gefeuert!");
                  currentTarget.notify("Du wurdest von Downtown Cab Co. entlassen!");
                  gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                      if (err2) console.log("Error on Set Fraction");

                      currentTarget.data.fractionData = JSON.stringify("arbeitslos");
                      if (res2.length > 0) {
                          res2.forEach(function (fraction) {
                              currentTarget.data.fractionData = JSON.stringify(fraction);
                              mp.events.call("server:TS-VoiceChat:AddRadioUser", currentTarget, 10);
                              mp.events.call("server:TS-VoiceChat:AddRadioUser", currentTarget, 11);
                          });
                      }
                  });
              }
          });
      }
    }
  }
}
mp.events.add("server:Cabco:firePlayer", firePlayer);

/*function SpawnVeh(player, model) {
    if (getVehicleFromPosition(cabcoVehSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht bereits ein Fahrzeug in der Ausfahrt");
    } else {
        hashToSpawn = mp.joaat(model);
        let veh = mp.vehicles.new(hashToSpawn, cabcoVehSpawnPos, {});
        veh.rotation = new mp.Vector3(0, 0, 238);
        veh.dimension = player.dimension;
        if (model == "taxi" || model == "bus") {
            veh.setColorRGB(255, 153, 0,255, 153, 0);
        }
        veh.numberPlateType = 1;
        veh.numberPlate = "CC-" + spawnedNumPlates;
        spawnedNumPlates = spawnedNumPlates + 1;
        veh.setVariable("Owner", player.name);
        veh.setVariable("isTaxi", "true");
        veh.setVariable("misfueled","false");
        veh.setVariable("canStart","true");
        veh.setVariable("isRunning","true");
        veh.setVariable("fuel","100");
        veh.locked = true;
        veh.engine = true;
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
        player.notify("~g~Dein Dienstfahrzeug wurde ausgeparkt und steht bereit");
    }
}
mp.events.add("server:Cabco:SpawnVeh", SpawnVeh);

function DestructVeh(player) {
    if (getVehicleFromPosition(cabcoVehSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht kein Fahrzeug in der Einfahrt");
        return;
    } else {
        mp.vehicles.forEachInRange(cabcoVehDestructPos, 3, (veh) => {
            if (veh) {
              veh.destroy();
            }
            player.notify("~g~Fahrzeug wurde eingeparkt");
        });
    }
}
mp.events.add("server:Cabco:DestructVeh", DestructVeh);*/

mp.events.add("server:Cabco:onDuty", (player) => {
  if (mp.players.exists(player)) {
    player.notify(`Du hast den Dienst angetreten!`);
    gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
        if (errUp) console.log("Error: " + errUp);
        gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Fraction");

            if (res2.length > 0) {
                res2.forEach(function (fraction) {
                    player.data.fractionData = JSON.stringify(fraction);
                    mp.events.call("server:TS-VoiceChat:AddRadioUser", player, 10);
                });
            }
        });
    });
  }
});

mp.events.add("server:Cabco:offDuty", (player) => {
  if (mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on Login");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);
                    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction");

                        if (res2.length > 0) {
                            res2.forEach(function (fraction) {
                                player.data.fractionData = JSON.stringify(fraction);
                                mp.events.call("server:TS-VoiceChat:RemoveRadioUser", player, 10);
                                mp.events.call("server:TS-VoiceChat:RemoveRadioUser", player, 11);
                            });
                        }
                    });
                });
            });
        }
    });
  }
});

var currentTarget = null;
function getNearestPlayer(player, range)
{
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if(player != _player)
            {
                let _dist = _player.dist(player.position);
                if(_dist < dist)
                {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];
    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}
