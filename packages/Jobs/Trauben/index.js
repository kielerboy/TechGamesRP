let VerarbeiterShape = mp.colshapes.newSphere(-51, 1905.52, 195.4, 5, 0);
let VerkaufShape = mp.colshapes.newSphere(-1890.2, 2051, 141, 5, 0);
mp.events.add("giveTrauben", (player) => {
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

          gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '99'", [player.data.internalId], function(errcheckTrauben,resTrauben) {
              if(resTrauben == ""){
                  gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 99, ?)", [player.data.internalId, amount], function(errGiveTrauben,resGiveTrauben) {
                      player.notify("Du hast insgesamt: ~g~" + amount + "x ~w~Trauben geerntet.");
                      gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                          if(errWeight)console.log(errWeight);
                          var charWeight = rowWeight[0].weight;
                          gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '99'", function(errItemweight, rowItemweight) {
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
                  gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '99'", [player.data.internalId], function(errcheckTrauben,rowTrauben) {
                      var newAmount = parseInt(rowTrauben[0].amout) + amount;
                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND itemId = '99'", [newAmount, player.data.internalId], function(errGiveTrauben,resGiveTrauben) {
                          player.notify("Du hast insgesamt: ~g~" + amount + "x ~w~Trauben geerntet.");
                          if(errGiveTrauben) console.log(errGiveTrauben);

                          gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                              if(errWeight)console.log(errWeight);
                              var charWeight = rowWeight[0].weight;
                              gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '99'", function(errItemweight, rowItemweight) {
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

//Trauben ABPACKEN AKA VERARBEITEN
mp.events.add("packTrauben", (player) => {
  if(mp.players.exists(player)) {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '99'", [player.data.internalId], function (errTrauben, resTrauben) {
        if(resTrauben.length <= 0) {
            if(mp.players.exists(player)) player.notify("Komm wieder wenn du Trauben bei dir hast.")
        } else {
            var anzahlTrauben = resTrauben[0].amout;
            gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '100'", [player.data.internalId], function (errPackTrauben, resSaft) {
                if(resSaft.length <= 0) {
                    gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 100, ?)",[player.data.internalId, anzahlTrauben], function(errPackTrauben3,resPackTrauben3) {
                        if(errPackTrauben3) console.log(errPackTrauben3);
                    });
                } else if(resSaft.length > 0){
                    var neueAnzahlSaft = resSaft[0].amout + anzahlTrauben;
                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout=? WHERE id=?", [neueAnzahlSaft, resSaft[0].id], function(err, res){
                        if(errPackTrauben3) console.log(errPackTrauben3);
                    });
                }
                gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id=?", [resTrauben[0].id], function(err, res){
                    if(err) console.log(err);
                });
                if(mp.players.exists(player)) player.notify("Du hast ~g~" + anzahlTrauben + " ~w~x ~g~Trauben~w~ in Traubensaft gepresst!");
            });
        };
    });
  }
});

//Traubensaft Verkaufen
mp.events.add("sellSaft", (player) => {
  if(mp.players.exists(player)) {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = '100'", [player.data.internalId], function (errSaft, Saft) {
        if(Saft.length <= 0) {
            player.notify("Komm wieder wenn du Traubensaft bei dir hast.")
        } else {
            gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE id=?", [player.data.internalId], function (err, character){
                if (err) console.log(err);
                if (character.length > 0){
                  if(mp.players.exists(player)) {
                    var anzahlSaft = Saft[0].amout;
                    var price = 5.60;
                    var total = parseFloat(anzahlSaft * price);
                    var newPlayerMoney = parseFloat(total + parseFloat(character[0].money)).toFixed(2);
                    player.data.money = parseFloat(newPlayerMoney);
                    player.call("updateHudMoney", [newPlayerMoney]);
                    gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newPlayerMoney, player.data.internalId], function (errSellPrice) {
                        gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND itemId = '100'", [player.data.internalId], function (errDeleteOldItem){
                            if(errDeleteOldItem) console.log(errDeleteOldItem);
                            if(mp.players.exists(player)) {
                              player.notify("Du hast ~g~" + anzahlSaft + " ~w~x ~g~Traubensaft~w~ verkauft für " + total+ "$");
                              mp.events.call("sqlLog", player, player.data.ingameName+" hat "+anzahlSaft+"x Traubensaft für " +total+ "$ verkauft");
                            }
                        });
                    });
                  }
                }
            });
        };
    });
  }
});


mp.events.add("server:jobs:trauben:startProgress", (player) => {
  if(mp.players.exists(player)) {
    time = 30000
    player.call("client:progressbar:start",[100, time]);
  }
});

mp.events.add("server:jobs:trauben:setstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('collect','COLLECTINGTRAUBEN');
  }
});

mp.events.add("server:jobs:trauben:setstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('collect','NOTCOLLECTINGTRAUBEN');
  }
});
mp.events.add("server:jobs:trauben:setpackstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('packtrauben','PACKING');
  }
});
mp.events.add("server:jobs:trauben:setpackstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('packtrauben','NOTPACKING');
  }
});
mp.events.add("server:jobs:trauben:startSelling", (player) => {
  if(mp.players.exists(player)) {
    time = 1000
    player.call("client:progressbar:start",[100, time]);
  }
});
mp.events.add("server:jobs:trauben:setsellingstate", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('sellsaft','SELLING');
  }
});
mp.events.add("server:jobs:trauben:setsellingstatenormal", (player) => {
  if(mp.players.exists(player)) {
    player.setVariable('sellsaft','NOTSELLING');
  }
});

// Enter Verarbeiter COLSHAPE
function playerEnterColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == VerarbeiterShape) {
      player.setVariable("TraubenVerarbeiter", "true");
    }
    if(shape == VerkaufShape) {
      player.setVariable("TraubenVerkauf", "true");
    }
  }
}
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

// Exit Verarbeiter COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == VerarbeiterShape) {
      var state = player.getVariable("packtrauben");
      if (state == "PACKING") {
        player.setVariable("TraubenVerarbeiter", "false");
        player.setVariable("packtrauben","NOTPACKING");
        player.setVariable("sellsaft","NOTSELLING");
        player.call("client:progressbar:end",[]);
        player.call("client:jobs:trauben:endPackTimeout",[]);
        player.call("server:jobs:trauben:setpackstatenormal");
        player.stopAnimation();
        player.notify("Du hast dich zu weit entfernt");
      }
    }
    if(shape == VerkaufShape) {
        var state = player.getVariable("sellsaft");
        if (state == "SELLING") {
          player.setVariable("TraubenVerkauf", "false");
          player.setVariable("packtrauben","NOTPACKING");
          player.setVariable("sellsaft","NOTSELLING");
          player.call("client:progressbar:end",[]);
          player.call("client:jobs:trauben:endSellTimeout",[]);
          player.call("server:jobs:trauben:setsellingstatenormal");
          player.stopAnimation();
          player.notify("Du hast dich zu weit entfernt");
        }
      }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);
