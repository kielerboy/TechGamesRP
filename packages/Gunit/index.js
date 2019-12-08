let gunitColShape = mp.colshapes.newSphere(155, -741.211, 242.15, 4, 0);
let gunitWeaponColShape = mp.colshapes.newSphere(143.899, -764.35, 242.15, 2, 0);
let gunitGaragePedColShape = mp.colshapes.newSphere(167.789, -681.725, 33.12, 2, 0);
let gunitGarageDestructPos = new mp.Vector3(179.9075, -695.3562, 33.1254, 3, 0);
/*mp.markers.new(1, new mp.Vector3(179.9075, -695.3562, 31.1254), 3,
{
    direction: new mp.Vector3(179.9075, -695.3562, 31.1254),
    rotation: new mp.Vector3(0, 0, 0),
    color: [255, 255, 255, 100],
    visible: true,
    dimension: 0
});*/
var gunitGarageSpawnPos = new mp.Vector3(172.6931, -687.6273, 33.1259);

player = mp.players.local;

mp.events.add("server:Keybind:KeyE", (player) => {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.fractionName == "FIB") {
      if(gunitColShape.isPointWithin(player.position)) {
          player.call("client:gunit:dutyMenu");
          // policeMenu
      }

      if (fractionData.playerFractionDuty == "Y") {
        if (gunitWeaponColShape.isPointWithin(player.position)) {
            player.call("client:gunit:weaponMenu");
            // weaponMenu
        }

        if (fractionData.playerFractionDuty == "Y") {
            if(gunitGaragePedColShape.isPointWithin(player.position)) {
                player.call("client:fib:openGarageMenu");
            }
      }
    }
  }
});

mp.events.add("server:Keybind:KeyO", (player) => {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "FIB") {
        gm.databaseManager.getConnection().query("SELECT r.fractionRankName FROM fractions f LEFT JOIN fractionranks r ON f.fractionID = r.fractionID WHERE f.fractionID = 6", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.fractionRankName);
                    if (c == resUp.length) {
                        player.call("client:gunit:openInteractionMenu", [fractionData.canInvite, JSON.stringify(ranks)]);
                    }
                    c++;
                });
            }
        });
    }
});
// pinteractionMenu

mp.events.add("server:fractions:reDuty", (player) => {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "FIB") {
      player.call("client:gunit:reDutyMenu");
      player.notify('Du bist als OnDuty eingetragen bitte gehe von hier aus wieder in den Dienst!');
    }
});

// IN DEN DIENST
// LSPDonDuty
mp.events.add("server:gunit:onDuty", (player) => {
  player.notify("Du hast den Dienst angetreten");
  if (player.data.gender == 0) {
      player.setClothes(1,54,4,2); // Mask
      player.setClothes(3,22,0,2); // Torso
      player.setClothes(4,97,1,2); // Pants
      player.setClothes(6,8,0,2); // Shoes
      player.setClothes(7,125,0,2); // ACCESSORIES
      player.setClothes(8,15,0,2); // Undershirts
      player.setClothes(11,50,2,2); // Top
  } else {
      player.setClothes(1,54,4,2); // Mask
      player.setClothes(3,23,0,2); // Torso
      player.setClothes(4,101,1,2); // Pants
      player.setClothes(6,49,0,2); // Shoes
      player.setClothes(7,125,0,2); // ACCESSORIES
      player.setClothes(8,15,0,2); // Undershirts
      player.setClothes(11,43,2,2); // Top
  }

  player.giveWeapon(mp.joaat("weapon_pistol_mk2"), 100);
  player.giveWeapon(mp.joaat("weapon_stungun"), 100);

  gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
      if (errUp) console.log("Error: " + errUp);

      gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
          if (err2) console.log("Error on Set Fraction");

          player.data.fractionData = JSON.stringify("arbeitslos");
          if (res2.length > 0) {
              res2.forEach(function (fraction) {
                  player.data.fractionData = JSON.stringify(fraction);
              });
          }
      });
  });
});

// IN DEN DIENST ZIVIL
mp.events.add("server:gunit:onDutyCiv", (player) => {
    player.notify("Du hast den Zivildienst angetreten");

    //player.giveWeapon(mp.joaat("weapon_pistol_mk2"), 100);    Keine Waffen für Undercover Agents!
    //player.giveWeapon(mp.joaat("weapon_stungun"), 100);

    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on Login");

      gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
          if (errUp) console.log("Error: " + errUp);

        gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Fraction");

            player.data.fractionData = JSON.stringify("arbeitslos");
            if (res2.length > 0) {
                res2.forEach(function (fraction) {
                    player.data.fractionData = JSON.stringify(fraction);
                });
            }
          });
        });
    });
});

// AUS DEM DIENST
// LSPDoffDuty
mp.events.add("server:gunit:offDuty", (player) => {
  player.notify("Du hast den Dienst verlassen");

  player.removeWeapon(mp.joaat("weapon_pistol_mk2"), 100);
  player.removeWeapon(mp.joaat("weapon_stungun"), 100);
  player.removeWeapon(mp.joaat("weapon_smg"), 100);
  player.removeWeapon(mp.joaat("weapon_carbinerifle"), 100);
  player.removeWeapon(mp.joaat("weapon_specialcarbine"), 100);
  player.setClothes(9,0,0,2);
  player.armour = 0;



  gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
      if (err2) console.log("Error in setModel + Clothes on Login");

      if (res2.length > 0) {
          res2.forEach(function (modelData) {
              var model = JSON.parse(modelData.data);
              var appearance = modelData.appearance;

              mp.events.call("server:ClothesMenu:load", player, appearance);

              gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                  if (errUp) console.log("Error: " + errUp);

                  gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                      if (err2) console.log("Error on Set Fraction");

                      player.data.fractionData = JSON.stringify("arbeitslos");
                      if (res2.length > 0) {
                          res2.forEach(function (fraction) {
                              player.data.fractionData = JSON.stringify(fraction);
                          });
                      }
                  });
              });
          });
      }
  });
});

// HIRE & FIRE PLAYER
function hirePlayer(player, rank) {
    getNearestPlayer(player, 2);
    if(currentTarget){
        gm.databaseManager.getConnection().query("SELECT id FROM fractionranks WHERE fractionID = 6 AND fractionRankName = ?", [rank], function (err1, res1) {
            if (err1) console.log("Error in FIB Hire Player Query1: "+err1);
            if (res1.length == 1) {
                res1.forEach(function(rankID) {
                    var id = rankID.id;
                    var targetId = parseInt(currentTarget.data.internalId);
                    gm.databaseManager.getConnection().query("INSERT INTO fractionusers(playerCharID,fractionID,fractionRankID,playerFractionDuty) VALUES(?,6,?,'N')", [targetId, id], function(err2, res2) {
                        if (err2) console.log("Error in FIB Hire Player Query2: "+err2);
                        else {
                            player.notify("Die Person wurde erfolgreich eingestellt!");
                            currentTarget.notify("Du wurdest beim FIB als "+rank+" eingestellt!");
                            gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
                                if (err2) console.log("Error on Set Fraction");

                                if (res2.length > 0) {
                                    res2.forEach(function (fraction) {
                                        currentTarget.data.fractionData = JSON.stringify(fraction);
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
mp.events.add("server:gunit:hirePlayer", hirePlayer);

function firePlayer(player) {
    getNearestPlayer(player, 2);
    if(currentTarget){
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("DELETE FROM fractionusers WHERE fractionID = 6 AND playerCharID = ?", [targetId], function (err1, res1) {
            if (err1) console.log("Error in Police Fire Player Query1: "+err1);
            else {
                player.notify("Die Person wurde erfolgreich gefeuert!");
                currentTarget.notify("Du wurdest aus dem FIB entlassen!");
                gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
                    if (err2) console.log("Error on Set Fraction");

                    currentTarget.data.fractionData = JSON.stringify("arbeitslos");
                    if (res2.length > 0) {
                        res2.forEach(function (fraction) {
                            currentTarget.data.fractionData = JSON.stringify(fraction);
                        });
                    }
                });
            }
        });
    }
}
mp.events.add("server:gunit:firePlayer", firePlayer);

// SCHUTZWESTE
// bodyarmor
mp.events.add("server:gunit:bodyarmor", (player) => {
    if(player.armour < 90) {
        if (player.data.gender == 0) {
          player.setClothes(9,12,1,2);
          player.armour = 100;
        } else {
          player.setClothes(9,12,1,2);
          player.armour = 100;
        }
    }
    else
    {
      player.setClothes(9,0,0,2);
      player.armour = 0;
    }
});

//ENTER COLSHAPE
function playerEnterColshapeHandler(player, shape) {
  if(shape == gunitColShape) {
      //Spieler hat colshape betreten
    player.notify("Willkommen beim FIB");
  }
}
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

// EXIT COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if(shape == gunitColShape || shape == gunitWeaponColShape) {
    //Spieler hat colshape verlassen
    player.call("client:gunit:closeMenu");
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);

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

//openGarageMenu
function SpawnVeh(player, model) {
    if (getVehicleFromPosition(gunitGarageSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht bereits ein Fahrzeug in der Ausfahrt");
    } else {
        hashToSpawn = mp.joaat(model);
        let veh = mp.vehicles.new(hashToSpawn, gunitGarageSpawnPos, {});
        veh.rotation = new mp.Vector3(0, 0, 156.6523);
        veh.dimension = player.dimension;
        veh.numberPlateType = 1;
        veh.numberPlate = "FIB";
        veh.setVariable("Owner", player.name);
        veh.setVariable("isFIB", "true");
        veh.setVariable("fuel","100");
        veh.setVariable("misfueled","false");
        veh.setVariable("canStart","true");
        veh.setVariable("isRunning","true");
        veh.engine = true;
        veh.locked = true;
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
mp.events.add("server:fib:SpawnVeh", SpawnVeh);

mp.events.add("server:fib:DestructVeh", DestructVeh);
function DestructVeh(player) {
    if (getVehicleFromPosition(gunitGarageSpawnPos, 3).length > 0) {
        player.notify("~r~Es steht kein Fahrzeug in der Einfahrt");
        return;
    } else {
        mp.vehicles.forEachInRange(gunitGarageDestructPos, 3, (veh) => {
            if (veh) veh.destroy();
            player.notify("~g~Fahrzeug wurde eingeparkt");
        });
    }
}

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];
    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}
