var ammunationDutyColShape = mp.colshapes.newSphere(12.52, -1105.723, 29.79, 2, 0);


mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.businessName === "Ammunation") {
        if(ammunationDutyColShape.isPointWithin(player.position)) {
            player.call("client:ammunation:openDutyMenu");
        }
    }
  }
});


mp.events.add("server:Keybind:KeyO", (player) => {
  if (mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.playerBusinessDuty == "Y" && businessData.businessName == "Ammunation") {
        gm.databaseManager.getConnection().query("SELECT r.businessRankName FROM business f LEFT JOIN businessranks r ON f.businessID = r.businessID WHERE f.businessID = 8", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.businessRankName);
                    if (c == resUp.length) {
                        player.call("client:ammunation:openInteractionMenu", [businessData.canInvite, JSON.stringify(ranks)]);
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
          gm.databaseManager.getConnection().query("SELECT id FROM businessranks WHERE businessID = 8 AND businessRankName = ?", [rank], function (err1, res1) {
              if (err1) console.log("Error in ammunation Hire Player Query1: "+err1);
              if (res1.length == 1) {
                  res1.forEach(function(rankID) {
                      var id = rankID.id;
                      var targetId = parseInt(currentTarget.data.internalId);
                      gm.databaseManager.getConnection().query("INSERT INTO businessusers(playerCharID,businessID,businessRankID,playerBusinessDuty) VALUES(?,8,?,'N')", [targetId, id], function(err2, res2) {
                          if (err2) console.log("Error in ammunation Hire Player Query2: "+err2);
                          else {
                              player.notify("Die Person wurde erfolgreich eingestellt!");
                              currentTarget.notify("Du wurdest beim Ammunation als "+rank+" eingestellt!");
                              gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                                  if (err2) console.log("Error on Set Fraction");

                                  if (res2.length > 0) {
                                      res2.forEach(function (business) {
                                          currentTarget.data.businessData = JSON.stringify(business);
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
mp.events.add("server:ammunation:hirePlayer", hirePlayer);

function firePlayer(player) {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 1);
    if (mp.players.exists(currentTarget)) {
      if(currentTarget){
          var targetId = currentTarget.data.internalId;
          gm.databaseManager.getConnection().query("DELETE FROM businessusers WHERE businessID = 8 AND playerCharID = ?", [targetId], function (err1, res1) {
              if (err1) console.log("Error in ammunation Fire Player Query1: "+err1);
              else {
                  player.notify("Die Person wurde erfolgreich gefeuert!");
                  currentTarget.notify("Du wurdest aus dem Ammunation entlassen!");
                  gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                      if (err2) console.log("Error on Set Fraction");

                      currentTarget.data.businessData = JSON.stringify("arbeitslos");
                      if (res2.length > 0) {
                          res2.forEach(function (business) {
                              currentTarget.data.businessData = JSON.stringify(business);
                          });
                      }
                  });
              }
          });
      }
    }
  }
}
mp.events.add("server:ammunation:firePlayer", firePlayer);



mp.events.add("server:ammunation:onDuty", (player) => {
  if (mp.players.exists(player)) {
    player.notify("Du hast den Dienst angetreten");
    gm.databaseManager.getConnection().query("UPDATE businessusers SET playerBusinessDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
      if (errUp) console.log("Error: " + errUp);

      gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error on Set Business after ammunation onDuty");

        player.data.businessData = JSON.stringify("arbeitslos");
        if (res2.length > 0) {
          res2.forEach(function (business) {
            player.data.businessData = JSON.stringify(business);
          });
        }
      });
    });
  }
});

mp.events.add("server:ammunation:offDuty", (player) => {
  if (mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on ammunation offDuty");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE businessusers SET playerBusinessDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction after ammunation offDuty");

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

function givelicensea(player) {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if (mp.players.exists(currentTarget)) {
      if (currentTarget) {
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("SELECT licenseID FROM user_licenses WHERE charID = ? AND licenseID = ?", [targetId, 1], function(err1, res1) {
          if (err1) console.log("Error in DB Query Check Licenses");
          if (res1.length > 0) {
            res1.forEach(function(license) {
              if(license.licenseID == 1) {
                player.notify("Die Person hat bereits diese Lizenz");
              }
            });
          } else {
            gm.databaseManager.getConnection().query("INSERT INTO user_licenses(licenseID,charID) VALUES(1,?)",[targetId], function(err2, res2){
              if (err2) console.log("Error in give License A: "+err2);
              player.notify("Waffenlizenz A wurde ausgestellt");
              currentTarget.notify("Dir wurde die Waffenlizenz A ausgestellt");
            });
          }
        });
      }
    }
  }
}
mp.events.add("server:ammunation:givelicensea", givelicensea);

function givelicenseb(player) {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if (mp.players.exists(currentTarget)) {
      if (currentTarget) {
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("SELECT licenseID FROM user_licenses WHERE charID = ? AND licenseID = ?", [targetId, 2], function(err1, res1) {
          if (err1) console.log("Error in DB Query Check Licenses");
          if (res1.length > 0) {
            res1.forEach(function(license) {
              if(license.licenseID == 2) {
                player.notify("Die Person hat bereits diese Lizenz");
              }
            });
          } else {
            gm.databaseManager.getConnection().query("INSERT INTO user_licenses(licenseID,charID) VALUES(2,?)",[targetId], function(err2, res2){
              if (err2) console.log("Error in give License B: "+err2);
              player.notify("Waffenlizenz B wurde ausgestellt");
              currentTarget.notify("Dir wurde die Waffenlizenz B ausgestellt");
            });
          }
        });
      }
    }
  }
}
mp.events.add("server:ammunation:givelicenseb", givelicenseb);


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
