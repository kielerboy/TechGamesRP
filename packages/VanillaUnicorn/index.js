var unicornDutyColShape = mp.colshapes.newSphere(95.28, -1293.38, 29.26, 2, 0);


mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.businessName === "Vanilla Unicorn") {
        if(unicornDutyColShape.isPointWithin(player.position)) {
            player.call("client:unicorn:openDutyMenu");
        }
    }
  }
});


mp.events.add("server:Keybind:KeyO", (player) => {
  if(mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.playerBusinessDuty == "Y" && businessData.businessName == "Vanilla Unicorn") {
        gm.databaseManager.getConnection().query("SELECT r.businessRankName FROM business f LEFT JOIN businessRanks r ON f.businessID = r.businessID WHERE f.businessID = 6", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.businessRankName);
                    if (c == resUp.length) {
                      if(mp.players.exists(player)) player.call("client:unicorn:openInteractionMenu", [businessData.canInvite, JSON.stringify(ranks)]);
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
    getNearestPlayer(player, 1);
    if(mp.players.exists(currentTarget)){
        gm.databaseManager.getConnection().query("SELECT id FROM businessRanks WHERE businessID = 6 AND businessRankName = ?", [rank], function (err1, res1) {
            if (err1) console.log("Error in unicorn Hire Player Query1: "+err1);
            if (res1.length == 1) {
                res1.forEach(function(rankID) {
                    var id = rankID.id;
                    var targetId = parseInt(currentTarget.data.internalId);
                    gm.databaseManager.getConnection().query("INSERT INTO businessUsers(playerCharID,businessID,businessRankID,playerBusinessDuty) VALUES(?,6,?,'N')", [targetId, id], function(err2, res2) {
                        if (err2) console.log("Error in unicorn Hire Player Query2: "+err2);
                        else {
                            if(mp.players.exists(player)) player.notify("Die Person wurde erfolgreich eingestellt!");
                            if(mp.players.exists(currentTarget)) currentTarget.notify("Du wurdest beim Vanilla Unicorn als "+rank+" eingestellt!");
                            gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                                if (err2) console.log("Error on Set Fraction");

                                if (res2.length > 0) {
                                    res2.forEach(function (business) {
                                        if(mp.players.exists(currentTarget)) currentTarget.data.businessData = JSON.stringify(business);
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
mp.events.add("server:unicorn:hirePlayer", hirePlayer);

function firePlayer(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 1);
    if(mp.players.exists(currentTarget)){
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("DELETE FROM businessUsers WHERE businessID = 6 AND playerCharID = ?", [targetId], function (err1, res1) {
            if (err1) console.log("Error in unicorn Fire Player Query1: "+err1);
            else {
                if(mp.players.exists(player)) player.notify("Die Person wurde erfolgreich gefeuert!");
                if(mp.players.exists(currentTarget)) currentTarget.notify("Du wurdest aus dem Vanilla Unicorn entlassen!");
                gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                    if (err2) console.log("Error on Set Fraction");

                    if(mp.players.exists(currentTarget)) currentTarget.data.businessData = JSON.stringify("arbeitslos");
                    if (res2.length > 0) {
                        res2.forEach(function (business) {
                          if(mp.players.exists(currentTarget)) currentTarget.data.businessData = JSON.stringify(business);
                        });
                    }
                });
            }
        });
    }
  }
}
mp.events.add("server:unicorn:firePlayer", firePlayer);



mp.events.add("server:unicorn:onDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst angetreten");
    gm.databaseManager.getConnection().query("UPDATE businessUsers SET playerBusinessDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
      if (errUp) console.log("Error: " + errUp);

      gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error on Set Business after unicorn onDuty");

        player.data.businessData = JSON.stringify("arbeitslos");
        if (res2.length > 0) {
          res2.forEach(function (business) {
            if(mp.players.exists(player)) player.data.businessData = JSON.stringify(business);
          });
        }
      });
    });
  }
});

mp.events.add("server:unicorn:offDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM characterModel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on unicorn offDuty");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                if(mp.players.exists(player)) mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE businessUsers SET playerBusinessDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessUsers u LEFT JOIN businessRanks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction after unicorn offDuty");

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
