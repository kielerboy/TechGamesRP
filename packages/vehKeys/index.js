/// Schlüsselverwaltung

var vehKeysColShape = mp.colshapes.newSphere(170.0738, -1799.4508, 29.3158, 2, 0);

mp.events.add("server:Keybind:KeyE", (player) => {
    if(vehKeysColShape.isPointWithin(player.position)) {
        mp.events.call("server:vehKeys:openKeyCopy", player);
    }
});

mp.events.add("server:vehKeys:openKeys", (player) => {
    gm.databaseManager.getConnection().query("SELECT vehiclekeys.*, vehicles.numberplate, vehicles.modelId from vehiclekeys LEFT JOIN vehicles ON vehiclekeys.vehID = vehicles.id WHERE vehiclekeys.keyOwner = ?", [player.data.internalId], function (err, res) {
        if (err) console.log(err);
        if (res.length > 0) {
            var i = 1;
            let KeyList = [];
            res.forEach(function(veh) {
                if (gm.vehicleData[""+veh.modelId]) {
                    vehData = gm.vehicleData[""+veh.modelId];
                } else {
                    vehData = gm.vehicleData["undefiniert"];
                }
                let obj = {"model": String(veh.modelId), "bezeichnung": String(vehData.bezeichnung), "kennzeichen": String(veh.numberplate), "amout": String(veh.amout), "id": String(veh.id)};
                KeyList.push(obj);

                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:VehKeys:drawMenu", [JSON.stringify(KeyList)]);
                }
                i++;
            });
        } else {
            if(mp.players.exists(player)) player.call("client:VehKeys:drawMenu", ["none"]);
        }
    });
});

mp.events.add("server:vehKeys:openKeyCopy", (player) => {
    gm.databaseManager.getConnection().query("SELECT vehiclekeys.*, vehicles.numberplate, vehicles.modelId from vehiclekeys LEFT JOIN vehicles ON vehiclekeys.vehID = vehicles.id WHERE vehiclekeys.keyOwner = ? AND vehiclekeys.isActive='Y'", [player.data.internalId], function (err, res) {
        if (err) console.log(err);
        if (res.length > 0) {
            var i = 1;
            let KeyList = [];
            res.forEach(function(veh) {
                if (gm.vehicleData[""+veh.modelId]) {
                    vehData = gm.vehicleData[""+veh.modelId];
                } else {
                    vehData = gm.vehicleData["undefiniert"];
                }
                let obj = {"model": String(veh.modelId), "bezeichnung": String(vehData.bezeichnung), "kennzeichen": String(veh.numberplate), "amout": String(veh.amout), "id": String(veh.id)};
                KeyList.push(obj);

                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:VehKeys:openKeyCopy", [JSON.stringify(KeyList)]);
                }
                i++;
            });
        } else {
            if(mp.players.exists(player)) player.call("client:VehKeys:openKeyCopy", ["none"]);
        }
    });
});


mp.events.add("server:vehKeys:giveKey", (player, selectedDescription) => {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE keyOwner = ? AND id = ?", [player.data.internalId, selectedDescription], function(err, res) {
        if(err) console.log("Error in select Vehicle Keys: "+err);
        if(res.length > 0) {
          res.forEach(function (keys) {
              if(keys.amout >= 2) {
                let newAm = parseInt(parseInt(keys.amout) - 1);
                gm.databaseManager.getConnection().query("UPDATE vehiclekeys SET amout = ? WHERE id = ? and keyOwner = ?", [newAm, selectedDescription, player.data.internalId], function(err1, res1) {
                  if(err1) console.log("Error in update Vehicle Keys: "+err1);
                });
                gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE vehID = ? AND keyOwner = ? AND isActive = 'Y'", [keys.vehID, currentTarget.data.internalId], function (err2, res2) {
                  if(err2) console.log("Error in select target keys: "+err2);
                  if(res2.length > 0) {
                    res2.forEach(function(keys2) {
                      let newAm = parseInt(parseInt(keys2.amout) + 1);
                      gm.databaseManager.getConnection().query("UPDATE vehiclekeys SET amout = ? WHERE vehID = ? AND keyOwner = ?", [newAm, keys.vehID, currentTarget.data.internalId], function(err3, res3) {
                        if(err3) console.log("Error in second Key Update: "+err3);
                      });
                    });
                  } else {
                    gm.databaseManager.getConnection().query("INSERT INTO vehiclekeys(vehID,keyOwner,amout,isActive) VALUES(?,?,1,?)", [keys.vehID, currentTarget.data.internalId, keys.isActive], function(err4, res4) {
                      if(err4) console.log("Error in Insert into vehKeys: "+err4);
                      else {
                        gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [currentTarget.data.internalId], function (err10, res10) {
                            if (err10) console.log("Error in Select Vehicle Keys on Login");
                            let vehKeysList = [];
                            res10.forEach(function(vehKeys) {
                                let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                vehKeysList.push(obj);
                            });
                            vehKeysList = JSON.stringify(vehKeysList);
                            currentTarget.setVariable("currentKeys",vehKeysList);
                            console.log(vehKeysList);
                            player.call(`notification`, ["2", "Du hast einen Schlüssel weggeworfen"]);     
                        }); 
                      }
                    });
                  }
                });
                player.call(`notification`, ["2", "Du hast einen Schlüssel weitergegeben"]);
                player.call(`notification`, ["2", "Du hast einen Schlüssel bekommen"]);
              } else {
                gm.databaseManager.getConnection().query("DELETE FROM vehiclekeys WHERE id = ? and keyOwner = ?", [selectedDescription, player.data.internalId], function(err5, res5) {
                    if(err5) console.log("Error in update Vehicle Keys: "+err5);
                    else {
                        gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [player.data.internalId], function (err9, res9) {
                            if (err9) console.log("Error in Select Vehicle Keys on Login");
                            let vehKeysList = [];
                            res9.forEach(function(vehKeys) {
                                let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                vehKeysList.push(obj);
                            });
                            vehKeysList = JSON.stringify(vehKeysList);
                            player.setVariable("currentKeys",vehKeysList);
                            console.log(vehKeysList);
                            player.call(`notification`, ["2", "Du hast einen Schlüssel weggeworfen"]);     
                        }); 
                    }
                });
                gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE vehID = ? AND keyOwner = ? AND isActive = 'Y'", [keys.vehID, currentTarget.data.internalId], function (err6, res6) {
                  if(err6) console.log("Error in select target keys: "+err6);
                  if(res6.length > 0) {
                    res6.forEach(function(keys2) {
                      let newAm = parseInt(parseInt(keys2.amout) + 1);
                      gm.databaseManager.getConnection().query("UPDATE vehiclekeys SET amout = ? WHERE vehID = ? AND keyOwner = ?", [newAm, keys.vehID, currentTarget.data.internalId], function(err7, res7) {
                        if(err7) console.log("Error in second Key Update: "+err7);
                      });
                    });
                  } else {
                    gm.databaseManager.getConnection().query("INSERT INTO vehiclekeys(vehID,keyOwner,amout,isActive) VALUES(?,?,1,?)", [keys.vehID, currentTarget.data.internalId, keys.isActive], function(err8, res8) {
                      if(err8) console.log("Error in Insert into vehKeys: "+err8);
                      else {
                        gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [currentTarget.data.internalId], function (err11, res11) {
                            if (err11) console.log("Error in Select Vehicle Keys on Login");
                            let vehKeysList = [];
                            res11.forEach(function(vehKeys) {
                                let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                vehKeysList.push(obj);
                            });
                            vehKeysList = JSON.stringify(vehKeysList);
                            currentTarget.setVariable("currentKeys",vehKeysList);
                            console.log(vehKeysList);
                        }); 
                      }
                    });
                  }
                });
                player.call(`notification`, ["2", "Du hast einen Schlüssel weitergegeben"]);
                player.call(`notification`, ["2", "Du hast einen Schlüssel bekommen"]);
              }
          });
        }
      });
    }
  }
});

mp.events.add("server:vehKeys:deleteKey", (player, selectedDescription) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT amout FROM vehiclekeys WHERE id = ?", [selectedDescription], function(err, res){
        if (err) console.log("Error in Select vehiclekeys: "+err);
            if (res.length > 0) {
                res.forEach(function (keys){
                    var vehid = keys.vehID;
                    if (keys.amout >=2) {
                        //Update
                        var updateamout = 1;
                        var newAm = parseInt(parseInt(keys.amout) - parseInt(updateamout));
                        gm.databaseManager.getConnection().query("UPDATE vehiclekeys SET amout = ? WHERE id = ? AND keyOwner = ?", [newAm, selectedDescription, player.data.internalId], function(err2, res2) {
                        if (err2) console.log("Error in Update vehiclekeys: "+err2);
                            if (res2.length > 0) {
                                player.notify("~r~Das hat nicht Funktioniert");
                            } else {
                                player.call(`notification`, ["2", "Du hast einen Schlüssel weggeforen"]);
                            }
                        });
                    } else {
                        // Delete
                        gm.databaseManager.getConnection().query("DELETE FROM vehiclekeys WHERE id = ? AND keyOwner = ?", [selectedDescription, player.data.internalId], function(err1, res1){
                        if (err1) console.log("Error in Delete vehiclekeys :"+err1);
                            if (res1 > 0) {
                                player.notify("~r~Das hat nicht funktioniert!");
                            } else {
                                gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [player.data.internalId], function (err5, res5) {
                                    if (err5) console.log("Error in Select Vehicle Keys on Login");
                                    let vehKeysList = [];
                                    res5.forEach(function(vehKeys) {
                                        let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                        vehKeysList.push(obj);
                                    });
                                    vehKeysList = JSON.stringify(vehKeysList);
                                    player.setVariable("currentKeys",vehKeysList);
                                    console.log(vehKeysList);
                                    player.call(`notification`, ["2", "Du hast einen Schlüssel weggeworfen"]);     
                                });                                                           
                            }
                        });
                    }
                });
            }
        });
    }
});

mp.events.add("server:vehKeys:copyKey", (player, selectedDescription) => {
    if (mp.players.exists(player)) {
        var amout = 50;
        gm.databaseManager.getConnection().query("SELECT money FROM characters WHERE id = ?", [player.data.internalId], function(err, res) {
            if (err) console.log("ERROR in SELECT money: "+err);
            if (res.length > 0) {                
                money = player.data.money;
                amout = parseFloat(amout).toFixed(2);
                if ( (amout*1) > (money*1)) {
                    player.call(`notification`, ["3", "Du hast nicht genügend Geld dabei"]);
                    console.log("VehKeyss - nicht genug Geld");
                } else {
                    var newMoney = parseFloat( player.data.money - parseFloat(amout*1).toFixed(2) ).toFixed(2);;
                    if (mp.players.exists(player)) player.call("updateHudMoney", [newMoney]);
                    gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newMoney, player.data.internalId], function (err3, res3){
                        if (err3) console.log("ERROR in Update Money: "+err3);
                        gm.databaseManager.getConnection().query("SELECT vehiclekeys.*, vehicles.numberplate, vehicles.modelId from vehiclekeys LEFT JOIN vehicles ON vehiclekeys.vehID = vehicles.id WHERE vehiclekeys.keyOwner = ? AND vehiclekeys.isActive='Y'", [player.data.internalId], function(err1, res1){
                            if (err1) console.log("Error in Select Vehicle Keys: "+err1);
                            if (res1.length > 0) {                
                                res1.forEach(function(keys) {
                                    let newAm = parseInt(parseInt(keys.amout) + 1);
                                    gm.databaseManager.getConnection().query("UPDATE vehiclekeys SET amout = ? WHERE id = ? AND keyOwner = ?", [newAm, selectedDescription, player.data.internalId], function (err2, res2) {
                                        if (err2) console.log("Error in Update Vehicle Keys: "+err2);                                        
                                        player.data.money = newMoney;
                                    });                                    
                                });
                                player.call(`notification`, ["2", "Du hast einen Schlüssel nachgemacht"]);
                            } else {
                                player.call(`notification`, ["4", "Diesen Schlüssel besitzt du nicht"]);
                            }
                        });
                    });
                }
            }
        });
    }
});

mp.events.add("server:vehKeys:schloss", (player, vehicle) => {
    if(mp.players.exists(player)) {
        let numberplate = vehicle.getVariable("numberPlate");
        console.log(numberplate);
        gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ?", [numberplate], function(err1, res1) {
        if (err1) console.log("Error in Select vehicles: "+err1);
            res1.forEach(function(veh){
                if (res1.length > 0) {
                    gm.databaseManager.getConnection().query("UPDATE vehiclekeys SET isActive = 'N' WHERE vehID = ?", [veh.id], function (err2, res2) {
                    if (err2) console.log("Error in Update vehiclekeys: "+err2);
                        gm.databaseManager.getConnection().query("INSERT INTO vehiclekeys(vehID,keyOwner,amout,isActive) VALUES(?,?,'2','Y')", [veh.id, player.data.internalId], function(err3, res3) {
                            if(err3) console.log("Error in Insert new vehiclekeys: "+err3);
                            else {
                                player.call(`notification`, ["2", "Dass Schloss wurde ausgetauscht"]);

                                var currentKeys = player.getVariable("currentKeys");
                                currentKeys = JSON.parse(currentKeys);
                                var NewList = [];
                                currentKeys.forEach(function(key) {
                                    if (parseInt(key.vehid) !== parseInt(veh.id)) NewList.push(key);
                                });
                                var obj = {"vehid": parseInt(veh.id), "active": "Y"};
                                NewList.push(obj);
                                NewList = JSON.stringify(NewList);
                                player.setVariable("currentKeys",NewList);

                                gm.databaseManager.getConnection().query("SELECT c.isOnline, c.currentOnlineId FROM vehiclekeys v LEFT JOIN characters c ON c.id = v.keyOwner WHERE v.vehID = ?", [veh.id], function(err4, res4) {
                                    if (err4) console.log("Error in Select all keyOwners on keyChange: "+err4);
                                    else {
                                        if (res4.length > 0) {
                                            res4.forEach(function(users) {
                                                if (users.isOnline == "Y") {
                                                    var targetUser = mp.players.at(users.currentOnlineId);
                                                    if (mp.players.exists(targetUser)) {
                                                        if (parseInt(targetUser.data.internalId) !== parseInt(player.data.internalId)) {
                                                            gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [targetUser.data.internalId], function (err5, res5) {
                                                                if (err5) console.log("Error in Select Vehicle Keys on Login");
                                                                let vehKeysList = [];
                                                                res5.forEach(function(vehKeys) {
                                                                    let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                                                    vehKeysList.push(obj);
                                                                });
                                                                vehKeysList = JSON.stringify(vehKeysList);
                                                                targetUser.setVariable("currentKeys",vehKeysList);
                                                            }); 
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    });
                } else {
                    player.call(`notification`, ["4", "Fahrzeug nicht gefunden"]);
                }
            });
        });
    }
});

//DEN NÄCHSTEN SPIELER ERMITTELN
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
