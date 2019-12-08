var beekersDutyColShape = mp.colshapes.newSphere(99.6466, 6620.1420, 32.4353, 2, 0);
var beekersTuningColShape = mp.colshapes.newSphere(108.5140, 6625.2246, 28.7872, 40, 0);



var spawnedNumPlates = 1;

mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.businessName === "Beekers Garage & Part") {
        if(beekersDutyColShape.isPointWithin(player.position)) {
            player.call("client:beekers:openDutyMenu");
        }
    }
  }
});

mp.events.add("server:Keybind:KeyO", (player) => {
  if (mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.playerBusinessDuty == "Y" && businessData.businessName == "Beekers Garage & Part") {
        gm.databaseManager.getConnection().query("SELECT r.businessRankName FROM business f LEFT JOIN businessranks r ON f.businessID = r.businessID WHERE f.businessID = 14", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.businessRankName);
                    if (c == resUp.length) {
                        player.call("client:beekers:openInteractionMenu", [businessData.canInvite, JSON.stringify(ranks)]);
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
          gm.databaseManager.getConnection().query("SELECT id FROM businessranks WHERE businessID = 14 AND businessRankName = ?", [rank], function (err1, res1) {
              if (err1) console.log("Error in Beekers Hire Player Query1: "+err1);
              if (res1.length == 1) {
                  res1.forEach(function(rankID) {
                      var id = rankID.id;
                      var targetId = parseInt(currentTarget.data.internalId);
                      gm.databaseManager.getConnection().query("INSERT INTO businessusers(playerCharID,businessID,businessRankID,playerBusinessDuty) VALUES(?,14,?,'N')", [targetId, id], function(err2, res2) {
                          if (err2) console.log("Error in Beekers Hire Player Query2: "+err2);
                          else {
                              player.notify("Die Person wurde erfolgreich eingestellt!");
                              currentTarget.notify("Du wurdest bei Beekers als "+rank+" eingestellt!");
                              gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
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
mp.events.add("server:beekers:hirePlayer", hirePlayer);

function firePlayer(player) {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 1);
    if (mp.players.exists(currentTarget)) {
      if(currentTarget){
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("DELETE FROM businessusers WHERE businessID = 14 AND playerCharID = ?", [targetId], function (err1, res1) {
            if (err1) console.log("Error in Beekers Fire Player Query1: "+err1);
            else {
                player.notify("Die Person wurde erfolgreich gefeuert!");
                currentTarget.notify("Du wurdest von Beekers entlassen!");
                gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
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
mp.events.add("server:beekers:firePlayer", firePlayer);


mp.events.add("server:beekers:onDuty", (player) => {
  if(mp.players.exists(player)) {
    var i = 0;
    if (player.data.gender == 0) {
              //player.setClothes(1,ChosenOutfit.ChosenOutfitM[i].mask[0],ChosenOutfit.ChosenOutfitM[i].mask[1],2); // Mask
              //player.setClothes(3,ChosenOutfit.ChosenOutfitM[i].torso[0],ChosenOutfit.ChosenOutfitM[i].torso[1],2); // Torso
              //player.setClothes(4,ChosenOutfit.ChosenOutfitM[i].pants[0],ChosenOutfit.ChosenOutfitM[i].pants[1],2); // Pants
              //player.setClothes(6,ChosenOutfit.ChosenOutfitM[i].shoes[0],ChosenOutfit.ChosenOutfitM[i].shoes[1],2); // Shoes
              //player.setClothes(8,ChosenOutfit.ChosenOutfitM[i].tshirt[0],ChosenOutfit.ChosenOutfitM[i].tshirt[1],2); // Undershirts
              //player.setClothes(11,ChosenOutfit.ChosenOutfitM[i].jacket[0],ChosenOutfit.ChosenOutfitM[i].jacket[1],2); // Top
              //player.setProp(0,ChosenOutfit.ChosenOutfitM[i].cap[0],ChosenOutfit.ChosenOutfitM[i].cap[1]); // Cap

              player.notify(`Du hast den Dienst angetreten!`);
    } else {
              //player.setClothes(1,ChosenOutfit.ChosenOutfitF[i].mask[0],ChosenOutfit.ChosenOutfitF[i].mask[1],2); // Mask
              //player.setClothes(3,ChosenOutfit.ChosenOutfitF[i].torso[0],ChosenOutfit.ChosenOutfitF[i].torso[1],2); // Torso
              //player.setClothes(4,ChosenOutfit.ChosenOutfitF[i].pants[0],ChosenOutfit.ChosenOutfitF[i].pants[1],2); // Pants
              //player.setClothes(6,ChosenOutfit.ChosenOutfitF[i].shoes[0],ChosenOutfit.ChosenOutfitF[i].shoes[1],2); // Shoes
              //player.setClothes(8,ChosenOutfit.ChosenOutfitF[i].tshirt[0],ChosenOutfit.ChosenOutfitF[i].tshirt[1],2); // Undershirts
              //player.setClothes(11,ChosenOutfit.ChosenOutfitF[i].jacket[0],ChosenOutfit.ChosenOutfitF[i].jacket[1],2); // Top
              //player.setProp(0,ChosenOutfit.ChosenOutfitF[i].cap[0],ChosenOutfit.ChosenOutfitF[i].cap[1]); // Cap

                player.notify(`Du hast den Dienst angetreten!`);
            }

    gm.databaseManager.getConnection().query("UPDATE businessusers SET playerBusinessDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
        if (errUp) console.log("Error: " + errUp);

        gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Business");

            player.data.businessData = JSON.stringify("arbeitslos");
            if (res2.length > 0) {
                res2.forEach(function (business) {
                    player.data.businessData = JSON.stringify(business);
                    mp.events.call("server:TS-VoiceChat:AddRadioUser", player, 16);
                });
            }
        });
    });
  }
});

mp.events.add("server:beekers:offDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on Login");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                if(mp.players.exists(player)) mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE businessusers SET playerBusinessDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction");

                        player.data.businessData = JSON.stringify("arbeitslos");
                        if (res2.length > 0) {
                            res2.forEach(function (business) {
                              if(mp.players.exists(player)) player.data.businessData = JSON.stringify(business);
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
