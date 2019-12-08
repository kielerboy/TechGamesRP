let dojColShape = mp.colshapes.newSphere(237.216, -416.005, -118.870, 3, 0);
const dojLeitstelle = 914;



mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);
    if (fractionData.fractionName == "Department of Justice") {
      if(dojColShape.isPointWithin(player.position)) {
        player.call("client:doj:dutyMenu");
      }
    }
  }
});

mp.events.add("server:Keybind:KeyO", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "Department of Justice") {
        gm.databaseManager.getConnection().query("SELECT r.fractionRankName FROM fractions f LEFT JOIN fractionRanks r ON f.fractionID = r.fractionID WHERE f.fractionID = 5", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.fractionRankName);
                    if (c == resUp.length) {
                        player.call("client:doj:openInteractionMenu", [fractionData.canInvite, JSON.stringify(ranks)]);
                    }
                    c++;
                });
            }
        });
    }
  }
});

// pinteractionMenu
mp.events.add("server:fractions:reDuty", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "Department of Justice") {
      player.call("client:doj:reDutyMenu");
      player.notify('Du bist als OnDuty eingetragen bitte gehe von hier aus wieder in den Dienst!');
    }
  }
});

// IN DEN DIENST
mp.events.add("server:doj:onDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst angetreten");
    gm.databaseManager.getConnection().query("UPDATE fractionUsers SET playerFractionDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
        if (errUp) console.log("Error: " + errUp);

        gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionUsers u LEFT JOIN fractionRanks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Fraction");

            player.data.fractionData = JSON.stringify("arbeitslos");
            if (res2.length > 0) {
                res2.forEach(function (fraction) {
                    player.data.fractionData = JSON.stringify(fraction);
                });
            }
        });
    });
  }
});

// AUS DEM DIENST
// LSPDoffDuty
mp.events.add("server:doj:offDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    mp.events.call("server:phone:leitstelleOffDuty", player, dojLeitstelle);

    player.setClothes(9,0,0,2);
    player.armour = 0;

    gm.databaseManager.getConnection().query("SELECT appearance, data FROM characterModel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on Login");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE fractionUsers SET playerFractionDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionUsers u LEFT JOIN fractionRanks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
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
  }
});

// HIRE & FIRE PLAYER
function hirePlayer(player, rank) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
          gm.databaseManager.getConnection().query("SELECT id FROM fractionRanks WHERE fractionID = 5 AND fractionRankName = ?", [rank], function (err1, res1) {
              if (err1) console.log("Error in DOJ Hire Player Query1: "+err1);
              if (res1.length == 1) {
                  res1.forEach(function(rankID) {
                      var id = rankID.id;
                      var targetId = parseInt(currentTarget.data.internalId);
                      gm.databaseManager.getConnection().query("INSERT INTO fractionUsers(playerCharID,fractionID,fractionRankID,playerFractionDuty) VALUES(?,5,?,'N')", [targetId, id], function(err2, res2) {
                          if (err2) console.log("Error in DOJ Hire Player Query2: "+err2);
                          else {
                              player.notify("Die Person wurde erfolgreich eingestellt!");
                              currentTarget.notify("Du wurdest beim DOJ als "+rank+" eingestellt!");
                              gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionUsers u LEFT JOIN fractionRanks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
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
  }
}
mp.events.add("server:doj:hirePlayer", hirePlayer);

function firePlayer(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
          var targetId = currentTarget.data.internalId;
          gm.databaseManager.getConnection().query("DELETE FROM fractionUsers WHERE fractionID = 5 AND playerCharID = ?", [targetId], function (err1, res1) {
              if (err1) console.log("Error in DOJ Fire Player Query1: "+err1);
              else {
                  player.notify("Die Person wurde erfolgreich gefeuert!");
                  currentTarget.notify("Du wurdest aus dem DOJ entlassen!");
                  gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionUsers u LEFT JOIN fractionRanks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
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
  }
}
mp.events.add("server:doj:firePlayer", firePlayer);

function canBuy(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if (currentTarget) {
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("SELECT fractionID FROM fractionUsers WHERE playerCharID = ?", [targetId], function(err1, res1){
          if (err1) console.log("Error in DB Query Check Fraction")
            if (res1.length > 0) {
              res1.forEach(function(fraction) {
                if(fraction.fractionID == 5) {
                  gm.databaseManager.getConnection().query("UPDATE fractionUsers SET playerFractionCanBuy = 'Y' WHERE playerCharID = ?", [targetId], function(err2, res2){
                    if (err2) console.log("Error in DB Query canBuy "+err2);
                    else {
                      player.notify("Die Person hat nun eine Berechtigung");
                      currentTarget.notify("Du hast nun eine Shop Berechtigung");
                      var targetId = currentTarget.data.internalId;
                      gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionUsers u LEFT JOIN fractionRanks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
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
                } else {
                  player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
                }
              });
            } else {
              player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
            }
        });
      }
    }
  }
}
mp.events.add("server:doj:canbuy", canBuy);

function dontcanBuy(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if (currentTarget) {
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("SELECT fractionID FROM fractionUsers WHERE playerCharID = ?", [targetId], function(err1, res1){
          if (err1) console.log("Error in DB Query Check Fraction")
          if (res1.length > 0) {
            res1.forEach(function(fraction) {
              if(fraction.fractionID == 5) {
                gm.databaseManager.getConnection().query("UPDATE fractionUsers SET playerFractionCanBuy = 'N' WHERE playerCharID = ?", [targetId], function(err2, res2){
                  if (err2) console.log("Error in DB Query canBuy "+err2);
                  else {
                    player.notify("Die Person hat nun keine Berechtigung mehr!");
                    currentTarget.notify("Du hast nun keine Shop Berechtigung mehr!");
                    var targetId = currentTarget.data.internalId;
                    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionUsers u LEFT JOIN fractionRanks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
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
              } else {
                player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
              }
            });
          } else {
            player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
          }
        });
      }
    }
  }
}
mp.events.add("server:doj:dontcanbuy", dontcanBuy);

// EXIT COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == dojColShape) {
      //Spieler hat colshape verlassen
      player.call("client:doj:closeMenu");
    }
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

// Show ID Card
mp.events.add("server:doj:showIDCard", (player, nearestPlayer, playerName, rankName) => {
  if(mp.players.exists(player)) {
    if(mp.players.exists(nearestPlayer)) {
      nearestPlayer.call("client:doj:showIDCard",[playerName,rankName]);
    }
  }
});
