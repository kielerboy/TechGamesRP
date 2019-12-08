var yellowjackDutyColShape = mp.colshapes.newSphere(1985.25, 3048.71, 47.21, 2, 0);


mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.businessName === "Yellow Jack") {
        if(yellowjackDutyColShape.isPointWithin(player.position)) {
            player.call("client:yellowjack:openDutyMenu");
        }
    }
  }
});


mp.events.add("server:Keybind:KeyO", (player) => {
  if(mp.players.exists(player)) {
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    if (businessData.playerBusinessDuty == "Y" && businessData.businessName == "Yellow Jack") {
        gm.databaseManager.getConnection().query("SELECT r.businessRankName FROM business f LEFT JOIN businessranks r ON f.businessID = r.businessID WHERE f.businessID = 7", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.businessRankName);
                    if (c == resUp.length) {
                        if(mp.players.exists(player)) player.call("client:yellowjack:openInteractionMenu", [businessData.canInvite, JSON.stringify(ranks)]);
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
        gm.databaseManager.getConnection().query("SELECT id FROM businessranks WHERE businessID = 7 AND businessRankName = ?", [rank], function (err1, res1) {
            if (err1) console.log("Error in yellowjack Hire Player Query1: "+err1);
            if (res1.length == 1) {
                res1.forEach(function(rankID) {
                    var id = rankID.id;
                    var targetId = parseInt(currentTarget.data.internalId);
                    gm.databaseManager.getConnection().query("INSERT INTO businessusers(playerCharID,businessID,businessRankID,playerBusinessDuty) VALUES(?,7,?,'N')", [targetId, id], function(err2, res2) {
                        if (err2) console.log("Error in yellowjack Hire Player Query2: "+err2);
                        else {
                            if(mp.players.exists(player)) player.call(`notification`, ["2", "Die Person wurde eingestellt"]);
                            if(mp.players.exists(currentTarget)) player.call(`notification`, ["2", "Du wurdest beim Yellow Jack eingestellt als Rank: "+rank]);
                            gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
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
mp.events.add("server:yellowjack:hirePlayer", hirePlayer);

function firePlayer(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 1);
    if(mp.players.exists(currentTarget)){
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("DELETE FROM businessusers WHERE businessID = 7 AND playerCharID = ?", [targetId], function (err1, res1) {
            if (err1) console.log("Error in yellowjack Fire Player Query1: "+err1);
            else {
                if(mp.players.exists(player)) player.notify("Die Person wurde erfolgreich gefeuert!");
                if(mp.players.exists(currentTarget)) currentTarget.notify("Du wurdest aus dem Yellow Jack entlassen!");
                gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [targetId], function (err2, res2) {
                    if (err2) console.log("Error on Set Fraction");

                    currentTarget.data.businessData = JSON.stringify("arbeitslos");
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
mp.events.add("server:yellowjack:firePlayer", firePlayer);



mp.events.add("server:yellowjack:onDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst angetreten");
    gm.databaseManager.getConnection().query("UPDATE businessusers SET playerBusinessDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
      if (errUp) console.log("Error: " + errUp);

      gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error on Set Business after yellowjack onDuty");

        if(mp.players.exists(player)) player.data.businessData = JSON.stringify("arbeitslos");
        if (res2.length > 0) {
          res2.forEach(function (business) {
            if(mp.players.exists(player)) player.data.businessData = JSON.stringify(business);
          });
        }
      });
    });
  }
});

mp.events.add("server:yellowjack:offDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on yellowjack offDuty");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                if(mp.players.exists(player)) mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE businessusers SET playerBusinessDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction after yellowjack offDuty");

                        if(mp.players.exists(player)) player.data.businessData = JSON.stringify("arbeitslos");
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
