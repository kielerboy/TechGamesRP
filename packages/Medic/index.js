let medicColShape = mp.colshapes.newSphere(-467.395, -360.025, -148.910, 2, 0);
let op1SchrankLinksColShape = mp.colshapes.newSphere(-441.839, -327.766, -148.911, 2, 0);
let op1SchrankRechtsColShape = mp.colshapes.newSphere(-438.701, -327.637, -148.911, 2, 0);
let op2SchrankLinksColShape = mp.colshapes.newSphere(-441.640, -319.592, -148.911, 2, 0);
let op2SchrankRechtsColShape = mp.colshapes.newSphere(-438.506, -319.642, -148.911, 2, 0);
let bz1SchrankLinksColShape = mp.colshapes.newSphere(-455.912, -327.663, -148.910, 2, 0);
let bz1SchrankRechtsColShape = mp.colshapes.newSphere(-453.753, -319.577, -148.911, 2, 0);
let bz2SchrankLinksColShape = mp.colshapes.newSphere(-455.754, -319.529, -148.911, 2, 0);
let bz2SchrankRechtsColShape = mp.colshapes.newSphere(-453.457, -327.623, -148.910, 2, 0);
let bz3SchrankLinksColShape = mp.colshapes.newSphere(-455.736, -311.883, -148.911, 2, 0);
let bz3SchrankRechtsColShape = mp.colshapes.newSphere(-453.619, -311.990, -148.911, 2, 0);
let medicLeitstelle = 912;

mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    if(medicColShape.isPointWithin(player.position)) {
      var fractionData = player.data.fractionData;
      fractionData = JSON.parse(fractionData);

      if (fractionData.fractionName == "LSMC") {
        player.call("client:medic:medicMenu");
      }
    }
    if(op1SchrankLinksColShape.isPointWithin(player.position)) {
      var fractionData = player.data.fractionData;
      fractionData = JSON.parse(fractionData);

      if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y") {
        player.call("client:medic:leftCabinet");
      }
    }
    if(op1SchrankRechtsColShape.isPointWithin(player.position)) {
      var fractionData = player.data.fractionData;
      fractionData = JSON.parse(fractionData);

      if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y" && parseInt(fractionData.fractionRank) >= 6) {
        player.call("client:medic:rightCabinet");
      }
    }
    if(op2SchrankLinksColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y") {
          player.call("client:medic:leftCabinet");
        }
      }
      if(op2SchrankRechtsColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y" && parseInt(fractionData.fractionRank) >= 6) {
          player.call("client:medic:rightCabinet");
        }
      }
      if(bz1SchrankLinksColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y") {
          player.call("client:medic:leftCabinet");
        }
      }
      if(bz1SchrankRechtsColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y" && parseInt(fractionData.fractionRank) >= 6) {
          player.call("client:medic:rightCabinet");
        }
      }
      if(bz2SchrankLinksColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y") {
          player.call("client:medic:leftCabinet");
        }
      }
      if(bz2SchrankRechtsColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y" && parseInt(fractionData.fractionRank) >= 6) {
          player.call("client:medic:rightCabinet");
        }
      }
      if(bz3SchrankLinksColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y") {
          player.call("client:medic:leftCabinet");
        }
      }
      if(bz3SchrankRechtsColShape.isPointWithin(player.position)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "LSMC" && fractionData.playerFractionDuty == "Y" && parseInt(fractionData.fractionRank) >= 6) {
          player.call("client:medic:rightCabinet");
        }
      }
    }
});

/*
mp.events.add("server:Keybind:KeyJ", (player) => {
    if(player.getVariable('state') == 'INGAME') {
            player.call("minteractionMenu");
    }
});
*/

//"Praktikant", "Paramedic", "Artz/Facharzt", "Chief"
var PlayerRanks = "";
PlayerRanks = {
    "RankClothingM": [
        {"RankName":"Paramedic", "jacket":[250,0], "tshirt":[129,0], "pants":[20,0], "shoes":[54,0], "accessoires":[126,0], "gloves":[85,0]}, //Paramedic
        {"RankName":"Arzt/Facharzt", "jacket":[13,0], "tshirt":[15,0], "pants":[20,0], "shoes":[8,0], "accessoires":[126,0], "gloves":[81,0]}, //Artz/FachArzt
        {"RankName":"Chief", "jacket":[31,0], "tshirt":[33,0], "pants":[25,0], "shoes":[10,0], "accessoires":[27,0], "gloves":[1,0]}, //Chief
        {"RankName":"Praktikant", "jacket":[250,0], "tshirt":[15,0], "pants":[20,0], "shoes":[54,0], "accessoires":[0,0], "gloves":[85,0]} //Prakti
    ],
    "RankClothingF": [
        {"RankName":"Paramedic", "jacket":[250,1], "tshirt":[159,0], "pants":[50,0], "shoes":[52,0], "accessoires":[96,0], "gloves":[109,0]}, //Paramedic
        {"RankName":"Arzt/Facharzt", "jacket":[27,0], "tshirt":[15,0], "pants":[23,0], "shoes":[10,1], "accessoires":[96,0], "gloves":[85,0]}, //Artz/FachArzt
        {"RankName":"Chief", "jacket":[7,1], "tshirt":[20,0], "pants":[36,0], "shoes":[0,0], "accessoires":[96,0], "gloves":[7,0]}, //Chief
        {"RankName":"Praktikant", "jacket":[250,1], "tshirt":[15,0], "pants":[50,0], "shoes":[52,0], "accessoires":[0,0], "gloves":[109,0]} //Prakti
    ]
};

mp.events.add("server:Keybind:KeyO", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSMC") {
        gm.databaseManager.getConnection().query("SELECT r.fractionRankName FROM fractions f LEFT JOIN fractionranks r ON f.fractionID = r.fractionID WHERE f.fractionID = 3", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.fractionRankName);
                    if (c == resUp.length) {
                      if(mp.players.exists(player)) player.call("client:medic:openInteractionMenu", [fractionData.canInvite, JSON.stringify(ranks)]);
                    }
                    c++;
                });
            }
        });
    }
  }
});

function hirePlayer(player, rank) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
        gm.databaseManager.getConnection().query("SELECT id FROM fractionranks WHERE fractionID = 3 AND fractionRankName = ?", [rank], function (err1, res1) {
            if (err1) console.log("Error in Medic Hire Player Query1: "+err1);
            if (res1.length == 1) {
                res1.forEach(function(rankID) {
                    var id = rankID.id;
                    var targetId = parseInt(currentTarget.data.internalId);
                    gm.databaseManager.getConnection().query("INSERT INTO fractionusers(playerCharID,fractionID,fractionRankID,playerFractionDuty) VALUES(?,3,?,'N')", [targetId, id], function(err2, res2) {
                        if (err2) console.log("Error in Medic Hire Player Query2: "+err2);
                        else {
                            player.call(`notification`, ["2", "Die Person wurde erfolgreich eingestellt"]);
                            player.call(`notification`, ["2", "Du wurdest beim LSMC als Rang "+rank+" eingestellt"]);
                            gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
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
mp.events.add("server:medic:hirePlayer", hirePlayer);

function firePlayer(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("DELETE FROM fractionusers WHERE fractionID = 3 AND playerCharID = ?", [targetId], function (err1, res1) {
            if (err1) console.log("Error in Medic Fire Player Query1: "+err1);
            else {
                player.call(`notification`, ["2", "Die Person wurde erfolgreich gefeuert!"]);
                player.call(`notification`, ["2", "Du wurdest aus dem LSMC gefeuert!"]);
                gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
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
mp.events.add("server:medic:firePlayer", firePlayer);

mp.events.add("server:fractions:reDuty", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSMC") {
      player.call("client:medic:medicMenu");
    }
  }
});

mp.events.add("server:medic:getMedicine", (player,name) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSMC") {
      gm.databaseManager.getConnection().query("SELECT id FROM items WHERE type='medic' AND itemName = ?",[name],function(err, res) {
        if (err) console.log("Error in Medic getMedicineId Query: "+err);
        if (res.length > 0) {
          gm.databaseManager.getConnection().query("SELECT COUNT(*) AS counter FROM user_items WHERE itemId = ? AND charId = ?",[res[0].id, player.data.internalId],function(err1,res1) {
            if (err1) console.log("Error in Medic getAmount Query: "+err);
            if (res1.length > 0) {
              if (res1[0].counter > 0) {
                gm.databaseManager.getConnection().query("UPDATE user_items SET amout = amout + 1 WHERE itemId = ? AND charId = ?",[res[0].id, player.data.internalId],function(err2,res2) {
                  if (err2) console.log("Error in Medic Update Medicine Amount: "+err);
                });
              } else {
                gm.databaseManager.getConnection().query("INSERT INTO user_items (charId,itemId,amout) VALUES(?,?,1)",[player.data.internalId,res[0].id],function(err2,res2) {
                  if (err2) console.log("Error in Medic Insert Medicine Query: "+err);
                });
              }
            }
          });
        } else {
          player.notify("Diese Medizin gibt es nicht!");
        }
      });
    }
  }
});

mp.events.add("server:medic:onDuty", (player, PlayerRank) => {
  if(mp.players.exists(player)) {
    if (player.data.gender == 0) {
        for (let i = 0; i < PlayerRanks.RankClothingM.length; i++) {
            const RankName = PlayerRanks.RankClothingM[i].RankName;
            if(RankName == PlayerRank) {
                player.setClothes(0,0,0,2); // Mask
                player.setClothes(3,PlayerRanks.RankClothingM[i].gloves[0],PlayerRanks.RankClothingM[i].gloves[1],2); // Torso
                player.setClothes(4,PlayerRanks.RankClothingM[i].pants[0],PlayerRanks.RankClothingM[i].pants[1],2); // Pants
                player.setClothes(6,PlayerRanks.RankClothingM[i].shoes[0],PlayerRanks.RankClothingM[i].shoes[1],2); // Shoes
                player.setClothes(7,PlayerRanks.RankClothingM[i].accessoires[0],PlayerRanks.RankClothingM[i].accessoires[1],2); // Accessories
                player.setClothes(8,PlayerRanks.RankClothingM[i].tshirt[0],PlayerRanks.RankClothingM[i].tshirt[1],2); // Undershirts
                player.setClothes(11,PlayerRanks.RankClothingM[i].jacket[0],PlayerRanks.RankClothingM[i].jacket[1],2); // Top

                player.call(`notification`, ["2", "Du hast den Dienst als "+PlayerRank+" angetreten"]);
            }
        }
    } else {
        for (let i = 0; i < PlayerRanks.RankClothingF.length; i++) {
            const RankName = PlayerRanks.RankClothingF[i].RankName;
            if(RankName == PlayerRank) {
                player.setClothes(0,0,0,2); // Mask
                player.setClothes(3,PlayerRanks.RankClothingF[i].gloves[0],PlayerRanks.RankClothingF[i].gloves[1],2); // Torso
                player.setClothes(4,PlayerRanks.RankClothingF[i].pants[0],PlayerRanks.RankClothingF[i].pants[1],2); // Pants
                player.setClothes(6,PlayerRanks.RankClothingF[i].shoes[0],PlayerRanks.RankClothingF[i].shoes[1],2); // Shoes
                player.setClothes(7,PlayerRanks.RankClothingF[i].accessoires[0],PlayerRanks.RankClothingF[i].accessoires[1],2); // Accessories
                player.setClothes(8,PlayerRanks.RankClothingF[i].tshirt[0],PlayerRanks.RankClothingF[i].tshirt[1],2); // Undershirts
                player.setClothes(11,PlayerRanks.RankClothingF[i].jacket[0],PlayerRanks.RankClothingF[i].jacket[1],2); // Top
                player.call(`notification`, ["2", "Du hast den Dienst als "+PlayerRank+" angetreten"]);
            }
        }
    }

    gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
        if (errUp) console.log("Error: " + errUp);

        gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Fraction");

            player.data.fractionData = JSON.stringify("arbeitslos");
            if (res2.length > 0) {
              res2.forEach(function (fraction) {
                if(mp.players.exists(player)) player.data.fractionData = JSON.stringify(fraction);
              });
            }
        });
    });
  }
});

mp.events.add("server:medic:offDuty", (player) => {
  if(mp.players.exists(player)) {
    player.call(`notification`, ["2", "Du hast den Dienst verlassen"]);
    mp.events.call("server:phone:leitstelleOffDuty", player, medicLeitstelle);
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on Login");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                if(mp.players.exists(player)) mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction");

                        player.data.fractionData = JSON.stringify("arbeitslos");
                        if (res2.length > 0) {
                            res2.forEach(function (fraction) {
                              if(mp.players.exists(player)) player.data.fractionData = JSON.stringify(fraction);
                            });
                        }
                    });
                });
            });
        }
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

//REV DEN NÄHSTEN SPIELER
mp.events.add('server:medic:revPlayer', (player) => {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    mp.events.call("stopAnimation", player);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
        if (parseInt(currentTarget.getVariable("permaDeathTimer")) == 0) {
          mp.events.call("stopAnimation", currentTarget);
          currentTarget.spawn(currentTarget.position);
          currentTarget.health = 100;
          currentTarget.dimension = currentTarget.dimension;
          currentTarget.call("endDeathScreen", []);
          currentTarget.setVariable("VOICE_RANGE","normal");
          currentTarget.call("changeValue", ['micro', '2']);
          currentTarget.setVariable("isUnconcious","false");
          currentTarget.call("client:medic:sitafterrevive", []);
          clearTimeout(gm.timers.deathTimers[currentTarget.data.internalId]);
        }
      }
    }
  }
});

//HEAL DEN NÄHSTEN SPIELER
mp.events.add('server:medic:healPlayer', (player) => {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget && currentTarget.health < 100){
        currentTarget.health = 100;
      }
    }
  }
});
