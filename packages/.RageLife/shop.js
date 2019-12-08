const toClient = require('./core/toClient.js');
mp.events.add("startShop", (player, shop) => {
    gm.databaseManager.getConnection().query("SELECT fraktion ,id, shopName FROM shop WHERE pedId = ?", [shop], function (err, res) {
        if (err) console.log(err);

        if (res.length > 0) {
            res.forEach(function (shopFrak) {
                if (shopFrak.fraktion != "none") {
                  var fractionData = player.data.fractionData;
                  fractionData = JSON.parse(fractionData);
                  var businessData = player.data.businessData;
                  businessData = JSON.parse(businessData);
                  if (fractionData.playerFractionCanBuy == "N" || fractionData.playerFractionDuty == "N" || businessData.playerBusinessDuty == "N") {
                    player.notify("~r~Du darfst hier nicht kaufen!");
                    return;
                  }
                }

                gm.databaseManager.getConnection().query("SELECT itemName, amout FROM shop_items WHERE shopId = ?", [shopFrak.id], function (err2, res2) {
                    if (err2) console.log(err2);

                    if (res2.length > 0) {

                        var list = [];
                        res2.forEach(function (item) {
                            list.push(item.itemName + " (" + item.amout + "$)");
                        });

                        toClient.createMenu(player, "shopInteract", shopFrak.shopName, list);
                    } else {
                        player.notify("~r~Der Shop hat kein Inhalt!");
                    }

                });

                player.setVariable("currentShop", shop);
            });

        } else {
            player.notify("~r~Der Shop konnte nicht gefunden werden!");
        }
    });
});

/*mp.events.add("openDrinks", (player, shop) => {
  gm.databaseManager.getConnection().query("SELECT fraktion ,id, shopName FROM shop WHERE pedId = 44", [shop], function (err, res) {
      if (err) console.log(err);

      if (res.length > 0) {
          res.forEach(function (shopFrak) {
              if (shopFrak.fraktion != "none") {
                  if (shopFrak.fraktion != player.data.fraktion) {
                      player.notify("~r~Du hast keine Rechte um den Shop zu nutzen!");
                      return;
                  }
              }

              gm.databaseManager.getConnection().query("SELECT itemName, amout FROM shop_items WHERE shopId = 23", [shopFrak.id], function (err2, res2) {
                  if (err2) console.log(err2);

                  if (res2.length > 0) {

                      var list = [];
                      res2.forEach(function (item) {
                          list.push(item.itemName + " (" + item.amout + "$)");
                      });

                      toClient.createMenu(player, "shopInteract", shopFrak.shopName, list);
                  } else {
                      player.notify("~r~Der Shop hat kein Inhalt!");
                  }
             });

              player.setVariable("currentShop", shop);
          });

      } else {
          player.notify("~r~Der Shop konnte nicht gefunden werden!");
      }
  });
});
*/
mp.events.add("menuClick", (player, trigger, button) => {
    if (trigger === "shopInteract") {
        toClient.createInputShop(player, "getShopBuyAmout", button);
        player.setVariable("currentBuyItem", button);
    }
});

mp.events.add("inputValueShop", (player, trigger, output) => {
  if (trigger === "getShopBuyAmout") {
    if (!parseInt(output)) {
      player.notify("~r~Das ist keine Zahl!");
      return;
    }
    gm.databaseManager.getConnection().query("SELECT id FROM shop WHERE pedId = ?", [player.getVariable("currentShop")], function (err, res) {
      if (err) console.log("Error in SELECT id Query (shop.js)" + err);
      res.forEach(function (shop) {
        const s = player.getVariable("currentBuyItem").split(" ");
        const but = s[0];

        gm.databaseManager.getConnection().query("SELECT s.itemId, s.amout, i.itemcount FROM shop_items s LEFT JOIN items i on i.id = s.itemId WHERE s.shopId = ? AND s.itemName = ?", [shop.id, but], function (err2, res2) {
          if (err2) console.log("Error in SELECT itemId, amout Query (shop.js)" + err2);
          res2.forEach(function (item) {
            if (item.amout != 0) {
              gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE itemName = ?", [but], function (err3, res3) {
                if (err3) console.log("Error in get Item weight on buy: "+err3);
                else {
                  var itemweight = parseFloat(parseInt(output) * parseFloat(item.itemcount)).toFixed(2);
                  gm.databaseManager.getConnection().query("SELECT SUM(u.amout * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?",[player.data.internalId], function(err4, res4) {
                    if (err4) console.log("Error in Get player weight on buy: "+err4);
                    else {
                      if (res4.length > 0) {
                        res4.forEach(function(playerWeight) {
                          if (playerWeight.weight !== null) {
                            var newWeight = parseFloat(parseFloat(playerWeight.weight) + parseFloat(itemweight)).toFixed(2);
                            if (newWeight <= parseFloat(player.data.inventory)) {
                              gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = ?",[player.data.internalId, item.itemId], function (err5, res5) {
                                if (err5) console.log("Error in select existing item on buy query: "+err5);
                                else {
                                  if (res5.length > 0) {
                                    res5.forEach(function(existingItem) {
                                      var existingItemCount = existingItem.amout;
                                      var newItemCount = parseInt(parseInt(existingItemCount) + parseInt(output));

                                      player.removeBar(player, output * 1 * item.amout * 1, (success, error) => {
                                        if (success) {
                                          gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND id = ?", [newItemCount, player.data.internalId, existingItem.id], function(err6, res6) {
                                            if (err6) console.log("Error in buy item Query 6: "+err6);
                                          });
                                          player.notify("~g~Du hast ~r~" + output + "x ~g~" + but + "~g~ gekauft!");
                                          mp.events.call("sqlLog", player, player.data.ingameName+" hat "+output+"x " +but+ " gekauft");
                                        } else {
                                          player.notify("~r~Du hast nicht genug Bargeld!");
                                          player.call("playSound", ["LOOSE_MATCH", "HUD_MINI_GAME_SOUNDSET"]);
                                        }
                                      });
                                    });
                                  } else {
                                    player.removeBar(player, output * 1 * item.amout * 1, (success, error) => {
                                      if (success) {
                                        gm.databaseManager.getConnection().query("INSERT INTO user_items VALUES('', ?, ?, ?)", [player.data.internalId, item.itemId, output], function (err6, res6) {
                                          if (err6) console.log("Error in insert new item on buy query6: "+err6);
                                        });
                                        player.notify("~g~Du hast ~r~" + output + "x ~g~" + but + "~g~ gekauft!");
                                        mp.events.call("sqlLog", player, player.data.ingameName+" hat "+output+"x " +but+ " gekauft");
                                      } else {
                                        player.notify("~r~Du hast nicht genug Bargeld!");
                                        player.call("playSound", ["LOOSE_MATCH", "HUD_MINI_GAME_SOUNDSET"]);
                                      }
                                    });
                                  }
                                }
                              });
                            } else {
                              player.notify("Du kannst nicht so viel tragen.");
                            }
                          } else {
                            if (parseFloat(itemweight).toFixed(2) <= parseFloat(player.data.inventory)) {
                              player.removeBar(player, output * 1 * item.amout * 1, (success, error) => {
                                if (success) {
                                  gm.databaseManager.getConnection().query("INSERT INTO user_items VALUES('', ?, ?, ?)", [player.data.internalId, item.itemId, output], function (err5, res5) {
                                    if (err5) console.log("Error in insert new item on buy query5: "+err5);
                                  });
                                  player.notify("~g~Du hast ~r~" + output + "x ~g~" + but + "~g~ gekauft!");
                                  mp.events.call("sqlLog", player, player.data.ingameName+" hat "+output+"x " +but+ " gekauft");
                                } else {
                                  player.notify("~r~Du hast nicht genug Bargeld!");
                                  player.call("playSound", ["LOOSE_MATCH", "HUD_MINI_GAME_SOUNDSET"]);
                                }
                              });
                            } else {
                              player.notify("Du kannst nicht so viel tragen.");
                            }
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        });
      });
    });
  }
});


/*mp.events.add("startShopWeed", (player, shop) => {
    gm.databaseManager.getConnection().query("SELECT fraktion ,id, shopName FROM shop WHERE pedId = ?", [shop], function (err, res) {
        if (err) console.log(err);

        if (res.length > 0) {
            res.forEach(function (shopFrak) {
                if (shopFrak.fraktion != "none") {
                    if (shopFrak.fraktion != player.data.fraktion) {
                        player.notify("~r~Du hast keine Rechte um den Shop zu nutzen!");
                        return;
                    }
                }

                gm.databaseManager.getConnection().query("SELECT itemName, amout FROM shop_items WHERE shopId = ?", [shopFrak.id], function (err2, res2) {
                    if (err2) console.log(err2);

                    if (res2.length > 0) {

                        var list = [];
                        res2.forEach(function (item) {
                            list.push(item.itemName + " (" + item.amout + "$)");
                        });

                        toClient.createMenu(player, "shopInteract", shopFrak.shopName, list);
                    } else {
                        player.notify("~r~Der Shop hat kein Inhalt!");
                    }

                });

                player.setVariable("currentShop", shop);
            });

        } else {
            player.notify("~r~Der Shop konnte nicht gefunden werden!");
        }
    });
});

mp.events.add("menuClick", (player, trigger, button) => {
    if (trigger === "shopInteract") {
        toClient.createInput(player, "getShopBuyAmout");
        player.setVariable("currentBuyItem", button);
    }
});

mp.events.add("inputValue", (player, trigger, output) => {
    if (trigger === "getShopBuyAmout") {
        if (!parseInt(output)) {
            player.notify("~r~Das ist keine Zahl!");
            return;
        }

        gm.databaseManager.getConnection().query("SELECT id FROM shop WHERE pedId = ?", [player.getVariable("currentShop")], function (err, res) {
            if (err) console.log("Error in SELECT id Query (shop.js)" + err);

            res.forEach(function (shop) {
                const s = player.getVariable("currentBuyItem").split(" ");
                const but = s[0];


                gm.databaseManager.getConnection().query("SELECT itemId, amout FROM shop_items WHERE shopId = ? AND itemName = ?", [shop.id, but], function (err2, res2) {
                    if (err2) console.log("Error in SELECT itemId, amout Query (shop.js)" + err2);

                    res2.forEach(function (item) {
                        if (item.amout != 0) {
                            player.removeBar(player, output * 1 * item.amout * 1, (success, error) => {
                                if (success) {
                                    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = ?", [player.data.internalId, item.itemId], function (err3, res3) {
                                        if(err3) console.log("Error in SELECT * FROM user_items (shop.js)" + err3);
                                        if(res3 == ""){
                                            toClient.setCharacterItem(player.data.internalId, item.itemId, output, (suc, errSetItem) => {
                                                if (suc) {
                                                    player.call("updateHudMoney", [player.data.money]);
                                                    player.call("changeValue", ["money", player.data.money]);
                                                    player.call("playSound", ["LOCAL_PLYR_CASH_COUNTER_COMPLETE", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"]);
                                                    player.notify("~g~Du hast ~r~" + output + "x ~g~" + but + "~g~ gekauft!");
                                                }
                                            });
                                        }
                                        else
                                        {
                                            toClient.updateCharacterItem(player.data.internalId, item.itemId, output, (succesUpdateItem, errUpdateItem) => {
                                                if (succesUpdateItem) {
                                                    player.call("updateHudMoney", [player.data.money]);
                                                    player.call("changeValue", ["money", player.data.money]);
                                                    player.call("playSound", ["LOCAL_PLYR_CASH_COUNTER_COMPLETE", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"]);
                                                    player.notify("~g~Du hast ~r~" + output + "x ~g~" + but + "~g~ gekauft!");
                                                }
                                            });
                                        }
                                    })

                                } else {
                                    player.notify("~r~Du hast nicht genug Bargeld!");
                                    player.call("playSound", ["LOOSE_MATCH", "HUD_MINI_GAME_SOUNDSET"]);
                                }
                            });
                        }
                    });
                });
            });
        });
    }
});*/
