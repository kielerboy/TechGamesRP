var bennysDutyColShape = mp.colshapes.newSphere(-202.223, -1331.263, -185.550, 2, 0);
var bennysTuningColShape = mp.colshapes.newSphere(-212.2245, -1324.2955, 30.8904, 20, 0);
var lscTuningColShape = mp.colshapes.newSphere(-338.35, -135.41, 39.00, 40, 0);
var BeekersTuningColShape = mp.colshapes.newSphere(108.5140, 6625.2246, 31.7872, 40, 0);

var spawnedNumPlates = 1;

var ChosenOutfit = "";
ChosenOutfit = {
    "ChosenOutfitM": [
        {"OutfitName":"Sommer", "jacket":[122,5], "tshirt":[76,1], "pants":[97,23], "shoes":[70,17], "cap":[56,4], "mask":[36,0], "torso":[6,0]}, //Paramedic
    ],
    "ChosenOutfitF": [
        {"OutfitName":"Sommer", "jacket":[240,3], "tshirt":[16,5], "pants":[100,23], "shoes":[73,17], "cap":[56,4], "mask":[36,0], "torso":[5,0]}, //Paramedic
    ]
};

mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.businessName === "Bennys Werkstatt") {
        if(bennysDutyColShape.isPointWithin(player.position)) {
            player.call("client:Bennys:openDutyMenu");
        }
    }
  }
});

mp.events.add("server:Keybind:KeyF8", (player) => {
  if (mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);
    if (businessData.playerBusinessDuty === "Y" && businessData.businessName === "Bennys Werkstatt") {
      if(bennysTuningColShape.isPointWithin(player.position)) {
        player.call("client:Bennys:openTuningMenu");
      }
    } else if (businessData.playerBusinessDuty === "Y" && businessData.businessName === "Los Santos Customs") {
      if(lscTuningColShape.isPointWithin(player.position)) {
        player.call("client:Bennys:openTuningMenu");
      }
    } else if (businessData.playerBusinessDuty === "Y" && businessData.businessName === "Beekers Garage & Part") {
      if (BeekersTuningColShape.isPointWithin(player.position)) {
        player.call("client:Bennys:openTuningMenu");

      }
    }else if (fractionData.fractionName =="NOOSE") {
      player.call("client:Bennys:openTuningMenu");
    }
  }
});

mp.events.add("server:Keybind:KeyO", (player) => {
  if (mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.playerBusinessDuty == "Y" && businessData.businessName == "Bennys Werkstatt") {
        gm.databaseManager.getConnection().query("SELECT r.businessRankName FROM business f LEFT JOIN businessRanks r ON f.businessID = r.businessID WHERE f.businessID = 1", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.businessRankName);
                    if (c == resUp.length) {
                        player.call("client:Bennys:openInteractionMenu", [businessData.canInvite, JSON.stringify(ranks)]);
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
          gm.databaseManager.getConnection().query("SELECT id FROM businessRanks WHERE businessID = 1 AND businessRankName = ?", [rank], function (err1, res1) {
              if (err1) console.log("Error in Bennys Hire Player Query1: "+err1);
              if (res1.length == 1) {
                  res1.forEach(function(rankID) {
                      var id = rankID.id;
                      var targetId = parseInt(currentTarget.data.internalId);
                      gm.databaseManager.getConnection().query("INSERT INTO businessUsers(playerCharID,businessID,businessRankID,playerBusinessDuty) VALUES(?,1,?,'N')", [targetId, id], function(err2, res2) {
                          if (err2) console.log("Error in Bennys Hire Player Query2: "+err2);
                          else {
                              player.notify("Die Person wurde erfolgreich eingestellt!");
                              currentTarget.notify("Du wurdest bei Bennys Werkstatt als "+rank+" eingestellt!");
                              gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                                  if (err2) console.log("Error on Set Fraction");

                                  if (res2.length > 0) {
                                      res2.forEach(function (business) {
                                          currentTarget.data.businessData = JSON.stringify(business);
                                          mp.events.call("server:TS-VoiceChat:AddRadioUser", currentTarget, 15);
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
mp.events.add("server:Bennys:hirePlayer", hirePlayer);

function firePlayer(player) {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 1);
    if (mp.players.exists(currentTarget)) {
      if(currentTarget){
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("DELETE FROM businessUsers WHERE businessID = 1 AND playerCharID = ?", [targetId], function (err1, res1) {
            if (err1) console.log("Error in Bennys Fire Player Query1: "+err1);
            else {
                player.notify("Die Person wurde erfolgreich gefeuert!");
                currentTarget.notify("Du wurdest von Bennys Werkstatt entlassen!");
                gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                    if (err2) console.log("Error on Set Fraction");

                    currentTarget.data.businessData = JSON.stringify("arbeitslos");
                    if (res2.length > 0) {
                        res2.forEach(function (business) {
                            currentTarget.data.businessData = JSON.stringify(business);
                            mp.events.call("server:TS-VoiceChat:AddRadioUser", currentTarget, 15);
                        });
                    }
                });
            }
        });
      }
    }
  }
}
mp.events.add("server:Bennys:firePlayer", firePlayer);

mp.events.add("server:Bennys:onDuty", (player) => {
  if (mp.players.exists(player)) {
  var i = 0;
  player.notify(`Du hast den Dienst angetreten!`);

    gm.databaseManager.getConnection().query("UPDATE businessUsers SET playerBusinessDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
        if (errUp) console.log("Error: " + errUp);

        gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Business");

            player.data.businessData = JSON.stringify("arbeitslos");
            if (res2.length > 0) {
                res2.forEach(function (business) {
                    player.data.businessData = JSON.stringify(business);
                    mp.events.call("server:TS-VoiceChat:AddRadioUser", player, 15);
                });
            }
        });
    });
  }
});

mp.events.add("server:Bennys:offDuty", (player) => {
  if (mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM characterModel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on Login");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE businessUsers SET playerBusinessDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction");

                        player.data.businessData = JSON.stringify("arbeitslos");
                        if (res2.length > 0) {
                            res2.forEach(function (business) {
                                player.data.businessData = JSON.stringify(business);
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
