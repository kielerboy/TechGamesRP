let VerarbeiterShape = mp.colshapes.newSphere(758.57, -815.89, 26.29, 5, 0);
let VerkaufShape = mp.colshapes.newSphere(1710, 4728, 42.15, 5, 0);
mp.events.add("giveTabak", (player) => {
  if(mp.players.exists(player)) {
    player.stopAnimation();
    var amount = Math.floor((Math.random() * 3) + 1);

    gm.databaseManager.getConnection().query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.internalId], function(err, res) {
      if (err) console.log("Error in get Inventory Query: "+err);
      else {
        if(mp.players.exists(player)) {
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

          gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '93'", [player.data.internalId], function(errcheckTabak,resTabak) {
              if(resTabak == ""){
                  gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 93, ?)", [player.data.internalId, amount], function(errGiveTabak,resGiveTabak) {
                      player.notify("Du hast insgesamt: ~g~" + amount + "x ~w~Tabak geerntet.");
                      gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                          if(errWeight)console.log(errWeight);
                          var charWeight = rowWeight[0].weight;
                          gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '93'", function(errItemweight, rowItemweight) {
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
                  gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '93'", [player.data.internalId], function(errcheckTabak,rowTabak) {
                      var newAmount = parseInt(rowTabak[0].amout) + amount;
                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND itemId = '93'", [newAmount, player.data.internalId], function(errGiveTabak,resGiveTabak) {
                          player.notify("Du hast insgesamt: ~g~" + amount + "x ~w~Tabak geerntet.");
                          if(errGiveTabak) console.log(errGiveTabak);

                          gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                              if(errWeight)console.log(errWeight);
                              var charWeight = rowWeight[0].weight;
                              gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '93'", function(errItemweight, rowItemweight) {
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
      }
    });
  }
});

//Tabak ABPACKEN AKA VERARBEITEN
mp.events.add("packTabak", (player) => {
  if(mp.players.exists(player)) {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '93'", [player.data.internalId], function (errTabak, resTabak) {
        if(resTabak.length <= 0) {
            if(mp.players.exists(player)) player.notify("Komm wieder wenn du Tabak bei dir hast.")
        } else {
            var anzahlTabak = resTabak[0].amout;
            gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '96'", [player.data.internalId], function (errPackTabak, resZigs) {
                if(resZigs.length <= 0) {
                    gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 96, ?)",[player.data.internalId, anzahlTabak], function(errPackTabak3,resPackTabak3) {
                        if(errPackTabak3) console.log(errPackTabak3);
                    });
                } else if(resZigs.length > 0){
                    var neueAnzahlZigs = resZigs[0].amout + anzahlTabak;
                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout=? WHERE id=?", [neueAnzahlZigs, resZigs[0].id], function(err, res){
                        if(errPackTabak3) console.log(errPackTabak3);
                    });
                }
                gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id=?", [resTabak[0].id], function(err, res){
                    if(err) console.log(err);
                });
                if(mp.players.exists(player)) player.notify("Du hast ~g~" + anzahlTabak + " ~w~x ~g~Tabak~w~ in Zigaretten gestopft!");
            });
        };
    });
  }
});

//Zigaretten Verkaufen
mp.events.add("sellZigaretten", (player) => {
  if(mp.players.exists(player)) {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '96'", [player.data.internalId], function (errZig, Zig) {
        if(Zig.length <= 0) {
            player.notify("Komm wieder wenn du Zigaretten bei dir hast.")
        } else {
            gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE id=?", [player.data.internalId], function (err, character){
                if (err) console.log(err);
                if (character.length > 0){
                    var anzahlZigaretten = Zig[0].amout;
                    var price = 5.72;
                    var total = parseFloat(anzahlZigaretten * price);
                    var newPlayerMoney = parseFloat(total + parseFloat(character[0].money)).toFixed(2);
                    player.data.money = parseFloat(newPlayerMoney);
                    player.call("updateHudMoney", [newPlayerMoney]);
                    gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newPlayerMoney, player.data.internalId], function (errSellPrice) {
                        gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND itemId = '96'", [player.data.internalId], function (errDeleteOldItem){
                            if(errDeleteOldItem) console.log(errDeleteOldItem);
                            player.notify("Du hast ~g~" + anzahlZigaretten + " ~w~x ~g~Zigaretten~w~ verkauft für " + total+ "$");
                            mp.events.call("sqlLog", player, player.data.ingameName+" hat "+anzahlZigaretten+"x Zigaretten für " +total+ "$ verkauft");
                        });
                    });
                }
            });
        };
    });
  }
});


mp.events.add("server:jobs:tabak:startProgress", (player) => {
  if(mp.players.exists(player)) {
    time = 30000
    player.call("client:progressbar:start",[100, time]);
  }
});

mp.events.add("server:jobs:tabak:setstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('collect','COLLECTINGTABAK');
  }
});

mp.events.add("server:jobs:tabak:setstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('collect','NOTCOLLECTINGTABAK');
  }
});
mp.events.add("server:jobs:tabak:setpackstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('packtabak','PACKING');
  }
});
mp.events.add("server:jobs:tabak:setpackstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('packtabak','NOTPACKING');
  }
});
mp.events.add("server:jobs:tabak:startSelling", (player) => {
  if(mp.players.exists(player)) {
    time = 1000
    player.call("client:progressbar:start",[100, time]);
  }
});
mp.events.add("server:jobs:tabak:setsellingstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('sellzigaretten','SELLING');
  }
});
mp.events.add("server:jobs:tabak:setsellingstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('sellzigaretten','NOTSELLING');
  }
});

// Enter Verarbeiter COLSHAPE
function playerEnterColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == VerarbeiterShape) {
      player.setVariable("TabakVerarbeiter", "true");
    }
    if(shape == VerkaufShape) {
      player.setVariable("TabakVerkauf", "true");
    }
  }
}
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

// Exit Verarbeiter COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == VerarbeiterShape) {
      var state = player.getVariable("packtabak");
      if (state == "PACKING") {
        player.setVariable("TabakVerarbeiter", "false");
        player.setVariable("packtabak","NOTPACKING");
        player.setVariable("sellzigaretten","NOTSELLING");
        player.call("client:progressbar:end",[]);
        player.call("client:jobs:tabak:endPackTimeout",[]);
        player.call("server:jobs:tabak:setpackstatenormal");
        player.stopAnimation();
        player.notify("Du hast dich zu weit entfernt");
      }
    }
    if(shape == VerkaufShape) {
      var state = player.getVariable("sellzigaretten");
      if (state == "SELLING") {
        player.setVariable("TabakVerkauf", "false");
        player.setVariable("packtabak","NOTPACKING");
        player.setVariable("sellzigaretten","NOTSELLING");
        player.call("client:progressbar:end",[]);
        player.call("client:jobs:tabak:endSellTimeout",[]);
        player.call("server:jobs:tabak:setsellingstatenormal");
        player.stopAnimation();
        player.notify("Du hast dich zu weit entfernt");
      }
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);
