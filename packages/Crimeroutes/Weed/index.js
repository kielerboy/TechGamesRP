let VerarbeiterShape = mp.colshapes.newSphere(1444.6049, 6333.1186, 23.8875, 5, 0);
let VerkaufShape = mp.colshapes.newSphere(-674.7623, -881.2561, 24.4856, 5, 0);
const weedFarm = new mp.Vector3(2223.7070, 5577.0786, 53.8468);
const rollWeed = new mp.Vector3(1444.6049, 6333.1186, 23.8875);
const sellWeed = new mp.Vector3(-674.7623, -881.2561, 24.4856);

mp.events.add("server:Crimeroutes:Weed:giveWeed", (player) => {
  if (mp.players.exists(player)) {
    player.stopAnimation();
    var amount = Math.floor((Math.random() * 3) + 1);

    gm.databaseManager.getConnection().query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.internalId], function(err, res) {
      if (err) console.log("Error in get Inventory Query: "+err);
      else {
        if (res.length > 0) {
          var i = 1;
          var weight = 0.00;
          var inv = {};
          res.forEach(function(item) {
            if (i == res.length) {
              inv[""+item.id] = item;
              weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
            } else {
              inv[""+item.id] = item;
              weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
            }
            i = parseInt(parseInt(i) + 1);
          });
          player.data.weight = weight;
        } else {
          player.data.weight = 0.00;
        }

        if(parseFloat(player.data.weight) >= parseFloat(player.data.inventory)) {
            player.notify("Du kannst nicht soviel tragen!");
            return;
        }

        gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function(errcheckTabak,resTabak) {
            if(resTabak == ""){
                gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 60, ?)", [player.data.internalId, amount], function(errGiveTabak,resGiveTabak) {
                    player.notify("Du hast insgesamt: ~g~" + amount + "x ~w~Buds geerntet.");
                    gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                        if(errWeight)console.log(errWeight);
                        var charWeight = rowWeight[0].weight;
                        gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '60'", function(errItemweight, rowItemweight) {
                            var itemWeight = rowItemweight[0].itemcount;
                            var amountWeight = amount * itemWeight;
                            var newCharWeight = charWeight + amountWeight;
                            gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newCharWeight, player.data.internalId], function (errNewWeight, resNewWeight){
                                if(errNewWeight) console.log(errNewWeight);
                            });
                        });
                    });
                });
            } else {
                gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function(errcheckTabak,rowTabak) {
                    var newAmount = parseInt(rowTabak[0].amout) + amount;
                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND itemId = '60'", [newAmount, player.data.internalId], function(errGiveTabak,resGiveTabak) {
                        player.notify("Du hast insgesamt: ~g~" + amount + "x ~w~Buds geerntet.");
                        if(errGiveTabak) console.log(errGiveTabak);

                        gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                            if(errWeight)console.log(errWeight);
                            var charWeight = rowWeight[0].weight;
                            gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '60'", function(errItemweight, rowItemweight) {
                                var itemWeight = rowItemweight[0].itemcount;
                                var amountWeight = amount * itemWeight;
                                var newCharWeight = charWeight + amountWeight;
                                gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newCharWeight, player.data.internalId], function (errNewWeight, resNewWeight){
                                    if(errNewWeight) console.log(errNewWeight);
                                });
                            });
                        });
                    });
                });
            };
        });
      }
    });
  }
});

//Tabak ABPACKEN AKA VERARBEITEN
mp.events.add("server:Crimeroutes:Weed:packWeed", (player) => {
  if (mp.players.exists(player)) {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function (errTabak, resTabak) {
        if(resTabak.length <= 0) {
            player.notify("Komm wieder wenn du was für mich hast.")
        } else {
          var anzahlTabak = resTabak[0].amout;
          if (anzahlTabak >= 3) {
            var anzahlJoints = parseInt(parseInt(anzahlTabak) / 3);
            gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '61'", [player.data.internalId], function (errPackTabak, resZigs) {
                if(resZigs.length <= 0) {
                    gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 61, ?)",[player.data.internalId, anzahlJoints], function(errPackTabak3,resPackTabak3) {
                        if(errPackTabak3) console.log(errPackTabak3);
                    });
                } else if(resZigs.length > 0){
                    var neueAnzahlZigs = resZigs[0].amout + anzahlJoints;
                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout=? WHERE id=?", [neueAnzahlZigs, resZigs[0].id], function(err, res){
                        if(errPackTabak3) console.log(errPackTabak3);
                    });
                }
                gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id=?", [resTabak[0].id], function(err, res){
                    if(err) console.log(err);
                });
                player.notify("Du hast ~g~" + anzahlTabak + " ~w~x ~g~Buds~w~ in ~g~"+anzahlJoints+"~w~x ~g~Joints~w~ gerollt!");
            });
          } else {
            player.notify("Du hast nicht genug Zeug bei dir.");
          }
        };
    });
  }
});

//Zigaretten Verkaufen
mp.events.add("server:Crimeroutes:Weed:sellJoints", (player) => {
  if (mp.players.exists(player)) {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '61'", [player.data.internalId], function (errZig, Zig) {
        if(Zig.length <= 0) {
            player.notify("Komm wieder wenn du was für mich hast.")
        } else {
            gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE id=?", [player.data.internalId], function (err, character){
                if (err) console.log(err);
                if (character.length > 0){
                    var anzahlZigaretten = Zig[0].amout;
                    var price = 4.35;
                    var total = parseFloat(anzahlZigaretten * price);
                    var newPlayerMoney = parseFloat(total + parseFloat(character[0].money)).toFixed(2);
                    player.data.money = parseFloat(newPlayerMoney);
                    player.call("updateHudMoney", [newPlayerMoney]);
                    gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newPlayerMoney, player.data.internalId], function (errSellPrice) {
                        gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND itemId = '61'", [player.data.internalId], function (errDeleteOldItem){
                            if(errDeleteOldItem) console.log(errDeleteOldItem);
                            player.notify("Du hast ~g~" + anzahlZigaretten + " ~w~x ~g~Joints~w~ verkauft für " + total+ "$");
                            mp.events.call("sqlLog", player, player.data.ingameName+" hat "+anzahlZigaretten+"x Joints für " +total+ "$ verkauft");
                        });
                    });
                }
            });
        };
    });
  }
});

mp.events.add("server:Crimeroutes:Weed:startProgress", (player) => {
  if(mp.players.exists(player)) {
    time = 30000
    player.call("client:progressbar:start",[100, time]);
  }
});

mp.events.add("server:Crimeroutes:Weed:setstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('collect','COLLECTINGWEED');
  }
});

mp.events.add("server:Crimeroutes:Weed:setstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('collect','NOTCOLLECTINGWEED');
  }
});

mp.events.add("server:Crimeroutes:Weed:setpackstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('packweed','PACKING');
  }
});
mp.events.add("server:Crimeroutes:Weed:setpackstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('packweed','NOTPACKING');
  }
});
mp.events.add("server:Crimeroutes:Weed:startSelling", (player) => {
  if(mp.players.exists(player)) {
    time = 30000
    player.call("client:progressbar:start",[100, time]);
  }
});
mp.events.add("server:Crimeroutes:Weed:setsellingstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('selljoints','SELLING');
  }
});
mp.events.add("server:Crimeroutes:Weed:setsellingstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('selljoints','NOTSELLING');
  }
});

mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    if (player.getVariable('state') !== 'INGAME') return;

    if (isInRadius(6, player, weedFarm)) {
      if(player.getVariable('collect') !== 'COLLECTINGWEED') {
        mp.events.call("playAnimationEvent", player, "amb@medic@standing@kneel@enter", "enter", 1, 33, -1);
        //mp.events.call("playAnimationEvent", player, 'amb@world_human_gardener_plant@male@idle_a', 'idle_c', 1, 15, -1)
        mp.events.call("server:Crimeroutes:Weed:setstate", player);
        gm.timers.crimetimers.WeedCollect[player.data.internalId] = setTimeout(_ => {
            mp.events.call("server:Crimeroutes:Weed:giveWeed", player);
            mp.events.call("server:Crimeroutes:Weed:setstatenormal", player);
        }, 12000);
      }
      else
      {
        player.notify("Du Sammelst bereits Buds");
      }
    }

    if (isInRadius(3, player, rollWeed)) {
      if(!player.getVariable('packweed') || player.getVariable('packweed') !== 'PACKING') {
        mp.events.call("server:Crimeroutes:Weed:startProgress", player);
        mp.events.call("server:Crimeroutes:Weed:setpackstate", player);
        mp.events.call("playAnimationEvent", player, 'anim@amb@business@coc@coc_packing@', 'operate_press_basicmould_v1_pressoperator', 1, 47, -1)
        gm.timers.crimetimers.WeedPack[player.data.internalId] = setTimeout(_ => {
            mp.events.call("server:Crimeroutes:Weed:packWeed", player);
            mp.events.call("server:Crimeroutes:Weed:setpackstatenormal", player);
            gm.timers.crimetimers.WeedPack[player.data.internalId] = null;
        }, 30000);
      }
      else
      {
        player.notify("Du verarbeitest bereits.");
      }
    }

    if (isInRadius(3, player, sellWeed)) {
      if(player.getVariable('selljoints') !== 'SELLING') {
        mp.events.call("server:Crimeroutes:Weed:startSelling", player);
        mp.events.call("server:Crimeroutes:Weed:setsellingstate", player);
        mp.events.call("playAnimationEvent", player, 'mp_common', 'givetake2_a', 1, 49, -1)
        gm.timers.crimetimers.WeedSell[player.data.internalId] = setTimeout(_ => {
            mp.events.call("server:Crimeroutes:Weed:sellJoints", player);
            mp.events.call("server:Crimeroutes:Weed:setsellingstatenormal", player);
        }, 30000);
      }
      else
      {
        player.notify("Du verkaufst bereits.");
      }
    }
  }
});

mp.events.add("server:Crimeroutes:Weed:endPackTimeout", (player) => {
  if(mp.players.exists(player)) {
    if (gm.timers.crimetimers.WeedPack[player.data.internalId] !== null) {
      clearTimeout(gm.timers.crimetimers.WeedPack[player.data.internalId]);
      gm.timers.crimetimers.WeedPack[player.data.internalId] = null;
    }
  }
});

mp.events.add("server:Crimeroutes:Weed:endSellTimeout", (player) => {
  if(mp.players.exists(player)) {
    if (gm.timers.crimetimers.WeedSell[player.data.internalId] !== null) {
      clearTimeout(gm.timers.crimetimers.WeedSell[player.data.internalId]);
      gm.timers.crimetimers.WeedSell[player.data.internalId] = null;
    }
  }
});

// Enter Verarbeiter COLSHAPE
function playerEnterColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == VerarbeiterShape) {
      player.setVariable("WeedVerarbeiter", "true");
    }
    if(shape == VerkaufShape) {
      player.setVariable("WeedVerkauf", "true");
    }
  }
}
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

// Exit Verarbeiter COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == VerarbeiterShape) {
      var state = player.getVariable("packweed");
      if (state == "PACKING") {
        player.setVariable("WeedVerarbeiter", "false");
        player.setVariable("packweed","NOTPACKING");
        player.setVariable("selljoints","NOTSELLING");
        player.call("client:progressbar:end",[]);
        mp.events.call("server:Crimeroutes:Weed:endPackTimeout",player);
        mp.events.call("server:Crimeroutes:Weed:setpackstatenormal",player);
        player.stopAnimation();
        player.notify("Du hast dich zu weit entfernt");
      }
    }
    if(shape == VerkaufShape) {
      var state = player.getVariable("selljoints");
      if (state == "SELLING") {
        player.setVariable("WeedVerkauf", "false");
        player.setVariable("packweed","NOTPACKING");
        player.setVariable("selljoints","NOTSELLING");
        player.call("client:progressbar:end",[]);
        mp.events.call("server:Crimeroutes:Weed:endSellTimeout",player);
        mp.events.call("server:Crimeroutes:Weed:setsellingstatenormal",player);
        player.stopAnimation();
        player.notify("Du hast dich zu weit entfernt");
      }
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);

function isInRadius(radius, player, pos) {
  if(mp.players.exists(player)) {
    var temppos = [];
    if (player.vehicle) {
        temppos[0] = (player.vehicle.position.x - pos.x);
        temppos[1] = (player.vehicle.position.y - pos.y);
        temppos[2] = (player.vehicle.position.z - pos.z)
    } else {
        temppos[0] = player.position.x - pos.x;
        temppos[1] = player.position.y - pos.y;
        temppos[2] = player.position.z - pos.z
    }
    if (((temppos[0] < radius) & (temppos[0] > -radius)) & ((temppos[1] < radius) && (temppos[1] > -radius)) & ((temppos[2] < radius) & (temppos[2] > -radius))) {
        return true
    }
    return false
  }
};
