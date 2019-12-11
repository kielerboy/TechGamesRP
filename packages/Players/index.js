let currentTarget = null;
//const toClient = require('./.RageLife/core/toClient.js');
// PLAYER DEATH
mp.events.add('playerDeath', (player) => {
  if(mp.players.exists(player)) {
    playerDeathHandler(player);
  }
});

function playerDeathHandler(player) {
  if(mp.players.exists(player)) {
    player.spawn(player.position);
    player.health = 1;
    player.call("startDeathScreen",[]);
    player.setVariable("VOICE_RANGE","stumm");
    player.call("changeValue", ['micro', 0]);
    player.setVariable("isUnconcious","true");
    player.position.z += 1.5;

    gm.databaseManager.getConnection().query("UPDATE `characters` SET health = 1 WHERE id = ?",[player.data.internalId],function(err,res) {
      if (err) console.log("Error in update health on death query: "+err);
    });

    if (parseInt(player.getVariable("permaDeathTimer")) == 0) {
      gm.timers.deathTimers[player.data.internalId] = setTimeout(() => {
        if(mp.players.exists(player)) {
          mp.events.call("stopAnimation", player);
          player.spawn(new mp.Vector3(-498.4664, -335.7313, 34.5017));
          player.dimension = 0;
          player.health = 30;
          player.call("endDeathScreen",[]);
          player.setVariable("VOICE_RANGE","normal");
          player.call("changeValue", ['micro', 2]);
          player.setVariable("isUnconcious","false");
        }
      }, 600000);
    }
  }
}

mp.events.add("server:Players:syncDeathAnim", (player, playerToSync) => {
  if(mp.players.exists(player) && mp.players.exists(playerToSync)) {
    if (playerToSync) {
      if (playerToSync.getVariable("state") == "INGAME") {
        if (playerToSync.health == 0 || playerToSync.health == 1) {
          playerToSync.call("client:Players:syncDeathAnim", []);
        }
      }
    }
  }
});

// PLAYER QUIT HANDLER
function playerQuitHandler(player, exitType, reason) {
  //speichere Position bei PlayerQuit
  //gm.databaseManager.getConnection().query("UPDATE `characters` SET posX = '"+parseFloat(player.position.x)+"', posY = '"+parseFloat(player.position.y)+"', posZ = '"+parseFloat(player.position.z)+"', dimension = "+parseInt(player.dimension)+" WHERE id = "+player.data.internalId, function (err, res) {
  //    if (err) console.log("Error in Update Characters position " + err);
  //});
  //speichere Kleidung
  //mp.events.call('server:ClothesMenu:save', player);
}
mp.events.add("playerQuit", playerQuitHandler);

//DATABASE ABFRAGE FÜR USER INFOS
let gender = null;
let name = null;
let street = null;
let housenumber = null;
let birthdayday = null;
let birthdaymonth = null;
let birthdayyear = null;
let birthplace = null;
let job = null;
let familystand = null;

// TABELLEN MÜSSEN GEGEBENFALLS ERSTELLT WERDEN
function refreshPersoDatas() {
  sql.query("SELECT * FROM characters WHERE ingameName = ?", [playerName], function(e, r) {
    gender = r[0].gender;
    name = r[0].name;
    street = r[0].street;
    housenumber = r[0].housenumber;
    birthdayday = r[0].birthdayday;
    birthdaymonth = r[0].birthdaymonth;
    birthdayyear = r[0].birthdayyear;
    birthplace = r[0].birthplace;
    job = r[0].job;
    familystand = r[0].familystand;
  });
}

mp.events.add("server:inventory:showIDCard", (player, nearestPlayer) => {
  if(mp.players.exists(player) && mp.players.exists(nearestPlayer)) {
    player.notify("Du hast deinen Ausweis gezeigt.");
    player.playAnimation('mp_common', 'givetake2_a', 1, 49);

    refreshPersoDatas();
    nearestPlayer.call("client:invent:showIDCard",[gender, name, street, housenumber, birthdayday, birthdaymonth, birthdayyear, birthplace, job, familystand]);
    setTimeout(_ => {
      if (mp.players.exists(player)) player.stopAnimation();
    }, 2500);
  }
});

mp.events.add("server:inventory:showLicense", (player, nearestPlayer, playerName, dob) => {
  if(mp.players.exists(player) && mp.players.exists(nearestPlayer)) {
    player.notify("Du hast deinen Führerschein gezeigt.");
    player.playAnimation('mp_common', 'givetake2_a', 1, 49);

    nearestPlayer.call("client:invent:showLicense",[playerName, dob]);
    setTimeout(_ => {
      if (mp.players.exists(player)) player.stopAnimation();
    }, 2500);
  }
});

mp.events.add("server:players:seeVehiclePapers", (player, playerName, selectedNumPlate) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ? AND owner = ?", [selectedNumPlate, player.data.internalId], function(err, res){
      if (err) console.log("ERROR in SELECT Vehicle Data: "+err);
      if (res.length > 0) {
        let fromDB = JSON.stringify(res[0]);
        let fromVehData = null;
        if (gm.vehicleData[""+res[0].modelId]) {
          vehData = gm.vehicleData[""+res[0].modelId];
          fromVehData = JSON.stringify(vehData);
        } else {
          vehData = gm.vehicleData["undefiniert"];
          fromVehData = JSON.stringify(vehData);
        }
        player.call("client:VehicleInteraction:showPaper",[fromDB, fromVehData, playerName]); 
      } else { 
        player.notify("~r~Keine Fahrzeugdaten gefunden!");
      }
    });       
  }
});

mp.events.add("server:players:currentseeVehiclePapers", (player, nearestPlayer, playerName, selectedNumPlate) => {
  if(mp.players.exists(player) && mp.players.exists(nearestPlayer)) {
    gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ? AND owner = ?", [selectedNumPlate, player.data.internalId], function(err, res){
      if (err) console.log("ERROR in SELECT Vehicle Data: "+err);
      if (res.length > 0) {
        let fromDB = JSON.stringify(res[0]);
        let fromVehData = null;
        if (gm.vehicleData[""+res[0].modelId]) {
          vehData = gm.vehicleData[""+res[0].modelId];
          fromVehData = JSON.stringify(vehData);
        } else {
          vehData = gm.vehicleData["undefiniert"];
          fromVehData = JSON.stringify(vehData);
        }
        nearestPlayer.call("client:VehicleInteraction:showPaper",[fromDB, fromVehData, playerName]); 
      } else { 
        player.notify("~r~Keine Fahrzeugdaten gefunden!");
      }
    });       
  }
});

mp.events.add("server:players:weapona", (player, nearestPlayer, playerName, dob) => {
  if(mp.players.exists(player) && mp.players.exists(nearestPlayer)) {
    gm.databaseManager.getConnection().query("SELECT licenseID FROM user_licenses WHERE charID = ? AND licenseID = ?", [player.data.internalId, 1], function(err1, res1){
      if (err1) console.log("Error in DB Query Check Licenses");
       if (res1.length > 0) {
          player.notify("Du hast deinen Waffenschein A gezeigt");
          nearestPlayer.call("client:invent:showweapona",[playerName, dob]);
          player.playAnimation('mp_common', 'givetake2_a', 1, 49);
          setTimeout(_ => {
            if (mp.players.exists(player)) player.stopAnimation();
          }, 2500);
        } else {
         player.notify("Du besitzt die Lizenz nicht!");
       }
    });
  }
});

mp.events.add("server:players:weaponb", (player, nearestPlayer, playerName, dob) => {
  if(mp.players.exists(player) && mp.players.exists(nearestPlayer)) {
    gm.databaseManager.getConnection().query("SELECT licenseID FROM user_licenses WHERE charID = ? AND licenseID = ?", [player.data.internalId, 2], function(err1, res1){
      if (err1) console.log("Error in DB Query Check Licenses");
       if (res1.length > 0) {
          player.notify("Du hast deinen Waffenschein B gezeigt");
          nearestPlayer.call("client:invent:showweaponb",[playerName, dob]);
          player.playAnimation('mp_common', 'givetake2_a', 1, 49);
          setTimeout(_ => {
            if (mp.players.exists(player)) player.stopAnimation();
          }, 2500);
        } else {
         player.notify("Du besitzt die Lizenz nicht!");
       }
    });
  }
});

//Ticket ausstellen
mp.events.add("inputValueShop", (player, trigger, output) => {
  if(mp.players.exists(player)) {
    if(trigger === "Rechnung") {
        getNearestPlayer(player, 1);
        if (currentTarget !== null) {
            gm.databaseManager.getConnection().query("SELECT amout FROM `bank_konten` WHERE ownerId = ?", [currentTarget.data.internalId], function (err, res) {
              if (err) console.log("Error in get Player bank amount at Rechnung: "+err);

              if (res.length > 0) {
                res.forEach(function(konto) {
                  if (parseFloat(konto.amout) >= parseFloat(output)) {
                    player.call("client:inventar:requestRechnung",[player,output,konto.amout]);
                    player.playAnimation('mp_common', 'givetake2_a', 1, 49);
                    setTimeout(_ => {
                      if (mp.players.exists(player)) player.stopAnimation();
                    }, 2500);
                  } else {
                    player.notify("Die Transaktion wurde wegen zu wenig Geld verweigert!");
                  }
                });
              }
            });
        }
    }
  }
});

mp.events.add("server:inventar:payRechnung", (player, rechnung, output, accountamount) => {
  if(mp.players.exists(player) && mp.players.exists(rechnung)) {
    var newamount = parseFloat(parseFloat(accountamount) - parseFloat(output));
    player.playAnimation('mp_common', 'givetake2_a', 1, 49);
    setTimeout(_ => {
      if (mp.players.exists(player)) player.stopAnimation();
    }, 2500);

    gm.databaseManager.getConnection().query("UPDATE `bank_konten` SET amout = ? WHERE ownerId = ?",[newamount,player.data.internalId], function(err, res) {
      if (err) {
        console.log("Error in Pay Rechnung Query: "+err);
        rechnung.notify("Die Banktransaktion wurde technisch abgebrochen.");
        player.notify("Die Banktransaktion wurde technisch abgebrochen.");
      } else {
        gm.databaseManager.getConnection().query("SELECT amout FROM bank_konten WHERE ownerId=?",[rechnung.data.internalId], function(err, rechnungKontostand) {
          if (err || !rechnungKontostand[0].amout) {
            if (err) console.log("Error in Pay Rechnung Query: "+err);
            rechnung.notify("Die Banktransaktion wurde technisch abgebrochen.");
            player.notify("Die Banktransaktion wurde technisch abgebrochen.");
          } else {
            var rechnungKontostandNew = parseFloat(parseFloat(rechnungKontostand[0].amout) + parseFloat(output));
            gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout=? WHERE ownerId=?",[rechnungKontostandNew,rechnung.data.internalId], function(err, res) {
              if (err) {
                console.log("Error in Pay Rechnung Query: "+err);
                rechnung.notify("Die Banktransaktion wurde technisch abgebrochen.");
                player.notify("Die Banktransaktion wurde technisch abgebrochen.");
              } else {
                rechnung.notify("Die Rechnung wurde bezahlt.");
                player.notify("Du hast die Rechnung bezahlt.");
                mp.events.call("sqlLog", player, player.data.ingameName+" hat die Rechnung von "+rechnung.data.ingameName+" von "+output+"$ bezahlt.");
              }
            });
          }
        });
      }
    });
  }
});

mp.events.add("server:inventar:dontPayRechnung", (player, rechnung) => {
  if(mp.players.exists(player) && mp.players.exists(rechnung)) {
    rechnung.notify("Die Bezahlung wurde durch die Gegenpartei abgelehnt.");
    player.notify("Du hast die Bezahlung abgelehnt.");
    player.playAnimation('mp_common', 'givetake2_a', 1, 49);
    setTimeout(_ => {
      if (mp.players.exists(player)) player.stopAnimation();
    }, 2500);
  }
});

function getNearestPlayer(player, range) {
  currentTarget = null;
  let dist = range;
  mp.players.forEachInRange(player.position, range, (_player) => {
      if(player != _player) {
          let _dist = _player.dist(player.position);
          if(_dist < dist) {
            currentTarget = _player;
              dist = _dist;
          }
      }
  });
}

mp.events.add("server:players:supportlog", (player) => {
  if(mp.players.exists(player)) {
            var usersInRange = [];
            mp.players.forEachInRange(player.position, 20,
                (_player) => {
                    if(player != _player)
                    {
                        if (player.dimension == _player.dimension) {
                            var _dist = _player.dist(player.position);
                            if(_dist < 20)
                            {
                                usersInRange.push({charId: _player.getVariable("internalId"), name: _player.getVariable("ingameName"), distance: _dist});
                            }
                        }
                    }
                }
            );

            var usersJson = JSON.stringify(usersInRange);
            if (usersJson !== "[]") {
                gm.databaseManager.getConnection().query("INSERT INTO supportlogs (id,reportingid,reportingname,users) VALUES('',?,?,?)",[player.data.internalId,player.data.ingameName,usersJson],function(err,res) {
                    if (err) console.log("Error in create Supportfall query: "+err);

                    if (res) {
                      gm.databaseManager.getConnection().query("SELECT id FROM supportlogs WHERE reportingid = ? ORDER BY id DESC LIMIT 1",[player.data.internalId],function(err2,res2) {
                        if (err2) console.log("Error in get Supportfall ID Query: "+err2);

                        if (res2.length > 0) {
                          res2.forEach(function(supportfall) {
                            player.notify("~r~[OOC] Deine Supportfall Nummer ist: "+supportfall.id);
                            setTimeout(function () {
                                if (mp.players.exists(player)) player.notify("~r~[OOC] Deine Supportfall Nummer ist: "+supportfall.id);
                            }, 5000);
                          });
                        }
                      });
                    }
                });
            } else {
                player.notify("~r~[OOC] Keine Spieler in Reichweite.");
            }
          }
});

mp.events.add("server:players:charwechsel", (player) => {
if(mp.players.exists(player)) {
  //mp.events.call("server:ClothesMenu:save", player);
  gm.databaseManager.getConnection().query('UPDATE characters SET money = ?, posX = ?, posY = ?, posZ = ?, health = ?, armor = ?, isOnline = "N", currentOnlineId = 0 WHERE id = ?', [player.data.money, player.position.x.toFixed(2), player.position.y.toFixed(2), player.position.z.toFixed(2), player.health, player.armour, player.data.internalId],
      function (err, res, row) {
          if (err) console.log("Error in Player Quit Query: " + err);
          //player.call("backCall", [""]);
      });
  
    gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE accountId = ? AND isWhitelisted='1'",[player.data.accountId], function (err2, res2) {
        if (err2) console.log(err2);
        if (res2.length > 0) {
          let charList = [];
          res2.forEach(function(chars){          
            let obj = {"ingamename":chars.ingameName};
            charList.push(obj);
          });
          if(mp.players.exists(player)) player.call("client:charchooser:openMenu", [JSON.stringify(charList)]);
          player.notify("~g~Du bist nun im Characterwechsel!");          
          player.setVariable("state","LOGIN");
          player.alpha = 0;
          player.dimension = -99;
          player.position = new mp.Vector3(-797.0855102539062, 332.13421630859375, 153.8050079345703);
          player.heading = 57;
          player.health = 100;
          player.call("charChange");
        } else {
          player.notify("Du hast keine Charaktere");
        }          
    });
    return;
  }
});


mp.events.add("server:duty:openMenu", (player) => {
  gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [player.data.internalId], function(err, res) {
    if (res.length > 0) {
        var i = 1;
  		let fractionList = [];
  		res.forEach(function(fraction) {
  			let obj = {"fractionname": String(fraction.fractionName), "duty": String(fraction.playerFractionDuty)};
  			fractionList.push(obj);
  			if (parseInt(i) == parseInt(res.length)) {
  				if(mp.players.exists(player)) player.call("client:duty:openMenu", [JSON.stringify(fractionList)]);
  			}
  			i++;
  		});
    }
  });
});

mp.events.add("server:arbeitsver:openMenu", (player) => {
  gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [player.data.internalId], function(err, res) {
    if (res.length > 0) {
        var i = 1;
  			let fractionList = [];
  			res.forEach(function(fraction) {
  				let obj = {"fractionname": String(fraction.fractionName), "rang": String(fraction.fractionRankName), "gehalt": String(fraction.payCheck)};
  				fractionList.push(obj);
  				if (parseInt(i) == parseInt(res.length)) {
  					if(mp.players.exists(player)) player.call("client:arbeitsver:openMenu", [JSON.stringify(fractionList)]);
  				}
  				i++;
  			});
    }
  });
});

mp.events.add("server:player:loadModel", (player) => {
  if (mp.players.exists(player)){
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in unnötiges nötiges Camera Destroy Event Clothes + Model");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                console.log(model.Hair);
                console.log(model.Hair[0]);
                player.setHeadBlend(model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Similarity"], model["Parents"]["SkinSimilarity"], 0)
                player.setClothes(2, model.Hair[0], 0, 2);
                player.setHairColor(model['Hair']['1'], model['Hair']['2']);
                player.eyeColor = model['Hair']['5'];
            });
        }
    });
  }
});