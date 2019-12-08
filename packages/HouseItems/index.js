mp.events.add("server:houseitems:einladen", (player,id) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT id FROM user_houses WHERE id = ?", [id, player.dimension], function(err1, id) {
      if (err1) console.log("Error in get Vehicle ID"+ err1);
      else {
        if (id.length > 0) {
          id.forEach(function(trunk) {
            gm.databaseManager.getConnection().query("SELECT v.*, i.itemName, i.itemcount FROM house_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.houseid = ?", [trunk.id], function(err2, res2) {
              if (err2) console.log("Error in get Inventory Query: "+err2);
              else {
                if (res2.length > 0) {
                  var i = 1;
                  var weight = 0.00;
                  var inv = {};
                  res2.forEach(function(item) {
                    if (i == res2.length) {
                      inv[""+item.id] = item;
                      weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                      gm.databaseManager.getConnection().query("SELECT u.*, i.itemName, i.itemcount FROM user_items u LEFT JOIN items i on i.id = u.itemId WHERE u.charId = ?",[player.data.internalId], function(err3, res3) {
                        if (err3) console.log("Error in get Inventory Query: "+err3);
                        else {
                          if (res3.length > 0) {
                            var c = 1;
                            var uinv = {};
                            res3.forEach(function(uitem) {
                              if (c == res3.length) {
                                uinv[""+uitem.id] = uitem;
                                if(mp.players.exists(player)) {
                                  player.setVariable("loadTrunkItemhouseid",trunk.id);
                                  player.call("client:houseitems:einlagern",[JSON.stringify(uinv),weight,parseInt(400)]);
                                }
                              } else {
                                uinv[""+uitem.id] = uitem;
                              }
                              c = parseInt(parseInt(c) + 1);
                            });
                          } else {
                            if(mp.players.exists(player)) player.call(`notification`, ["2", "Du hast keine gegenstände dabei"]);
                          }
                        }
                      });
                    } else {
                      inv[""+item.id] = item;
                      weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                    }
                    i = parseInt(parseInt(i) + 1);
                  });
                } else {
                  weight = 0.00;
                  gm.databaseManager.getConnection().query("SELECT u.*, i.itemName, i.itemcount FROM user_items u LEFT JOIN items i on i.id = u.itemId WHERE u.charId = ?",[player.data.internalId], function(err3, res3) {
                    if (err3) console.log("Error in get Inventory Query: "+err3);
                    else {
                      if (res3.length > 0) {
                        var c = 1;
                        var uinv = {};
                        res3.forEach(function(uitem) {
                          if (c == res3.length) {
                            uinv[""+uitem.id] = uitem;
                            if(mp.players.exists(player)) {
                              player.setVariable("loadTrunkItemhouseid",trunk.id);
                              player.call("client:houseitems:einlagern",[JSON.stringify(uinv),weight,parseInt(400)]);
                            }
                          } else {
                            uinv[""+uitem.id] = uitem;
                          }
                          c = parseInt(parseInt(c) + 1);
                        });
                      } else {
                        if(mp.players.exists(player)) player.call(`notification`, ["3", "Du hast keine gegenstände dabei"]);
                      }
                    }
                  });
                }
              }
            });
          });
        }
      }
    });
  }
});

mp.events.add("server:houseitems:loadItem", (player, itemId) => {
  if (mp.players.exists(player)) player.setVariable("loadTrunkItemId",itemId);
});
mp.events.add("server:houseitems:unloadItem", (player, itemId) => {
  if (mp.players.exists(player)) player.setVariable("unloadTrunkItemId",itemId);
});


mp.events.add("inputValueShop", (player, trigger, output) => {
  if(mp.players.exists(player)) {
    if(trigger === "unloadLagerItem") {
      var trunkitemId = player.getVariable("unloadTrunkItemId");
      console.log(trunkitemId);
      gm.databaseManager.getConnection().query("SELECT v.*, i.itemcount FROM house_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.itemid = ?",[trunkitemId], function(err1, res1) {
        if (err1) console.log("Error in unload Trunk Item Query 1: "+err1);
        else {
          if (res1.length > 0) {
            res1.forEach(function(item) {
              if (parseInt(item.amout) >= parseInt(output) && parseInt(output) > 0) {
                var itemweight = parseFloat(parseInt(output) * parseFloat(item.itemcount)).toFixed(2);

                gm.databaseManager.getConnection().query("SELECT SUM(u.amout * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?",[player.data.internalId],function(err2,res2) {
                  if (err2) console.log("Error in unload Trunk Item Query 2: "+err2);
                  else {
                    if (res2.length > 0) {
                      // Spieler hat ein Inventar
                      res2.forEach(function(userweight) {
                        if (userweight.weight !== null) {
                          var maxweight = player.data.inventory;
                          var newweight = parseFloat(parseFloat(itemweight) + parseFloat(userweight.weight));
                          if (parseFloat(newweight) <= parseFloat(maxweight)) {
                            if (parseInt(output) == parseInt(item.amout)) {
                              // Spieler nimmt alles
                              gm.databaseManager.getConnection().query("SELECT ui.* FROM user_items ui WHERE ui.itemId = ? AND ui.charId = ?",[trunkitemId,player.data.internalId],function(err3,res3) {
                                if (err3) console.log("Error in unload Trunk Item Query 3: "+err3);
                                else {
                                  if (res3.length > 0) {
                                    res3.forEach(function(useritem) {
                                      var newAmount = parseInt(parseInt(useritem.amout) + parseInt(output));
                                      gm.databaseManager.getConnection().query("DELETE FROM house_items WHERE itemid = ?", [trunkitemId], function(err6,res6) {
                                        if (err6) console.log("Error in unload Trunk Item Query 6: "+err6);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE itemid = ?",[newAmount,trunkitemId],function(err7,res7) {
                                        if (err7) console.log("Error in unload Trunk Item Query 7: "+err7);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                          //mp.events.call("server:houseitems:ausladen", player);
                                        }
                                      });
                                    });
                                  } else {
                                    gm.databaseManager.getConnection().query("DELETE FROM house_items WHERE itemid = ?", [trunkitemId], function(err4,res4) {
                                      if (err4) console.log("Error in unload Trunk Item Query 4: "+err4);
                                    });
                                    gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,trunkitemId,output],function(err5,res5) {
                                      if (err5) console.log("Error in unload Trunk Item Query 5: "+err5);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                        //mp.events.call("server:houseitems:ausladen", player);
                                      }
                                    });
                                  }
                                }
                              });
                            } else {
                              // Spieler nimmt nur einen Teil
                              gm.databaseManager.getConnection().query("SELECT ui.* FROM user_items ui WHERE ui.itemId = ? AND ui.charId = ?",[trunkitemId,player.data.internalId],function(err8,res8) {
                                if (err8) console.log("Error in unload Trunk Item Query 8: "+err8);
                                else {
                                  if (res8.length > 0) {
                                    res8.forEach(function(useritem) {
                                      var newAmountUser = parseInt(parseInt(useritem.amout) + parseInt(output));
                                      var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));

                                      gm.databaseManager.getConnection().query("UPDATE house_items SET amout = ? WHERE itemid = ?", [newAmountVehicle, trunkitemId], function(err9,res9) {
                                        if (err9) console.log("Error in unload Trunk Item Query 9: "+err9);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE itemid = ?",[newAmountUser,trunkitemId],function(err10,res10) {
                                        if (err10) console.log("Error in unload Trunk Item Query 10: "+err10);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                          //mp.events.call("server:houseitems:ausladen", player);
                                        }
                                      });
                                    });
                                  } else {
                                    var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));
                                    gm.databaseManager.getConnection().query("UPDATE house_items SET amout = ? WHERE itemid = ?", [newAmountVehicle, trunkitemId], function(err11,res11) {
                                      if (err11) console.log("Error in unload Trunk Item Query 11: "+err11);
                                    });
                                    gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,trunkitemId,output],function(err12,res12) {
                                      if (err12) console.log("Error in unload Trunk Item Query 12: "+err12);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                        //mp.events.call("server:houseitems:ausladen", player);
                                      }
                                    });
                                  }
                                }
                              });
                            }
                          } else {
                            player.call(`notification`, ["3", "Soviel kannst du nicht tragen"]);
                          }
                        } else {
                          // Spieler hat leeres Inventar
                          var maxweight = player.data.inventory;
                          var newweight = parseFloat(itemweight);
                          if (parseFloat(newweight) <= parseFloat(maxweight)) {
                            if (parseInt(output) == parseInt(item.amout)) {
                              // Spieler nimmt alles
                              gm.databaseManager.getConnection().query("DELETE FROM house_items WHERE itemid = ?", [trunkitemId], function(err13,res13) {
                                if (err13) console.log("Error in unload Trunk Item Query 13: "+err13);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,trunkitemId,output],function(err14,res14) {
                                if (err14) console.log("Error in unload Trunk Item Query 14: "+err14);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                  //mp.events.call("server:houseitems:ausladen", player);
                                }
                              });
                            } else {
                              // Spieler nimmt nur einen Teil
                              var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));
                              gm.databaseManager.getConnection().query("UPDATE house_items SET amout = ? WHERE itemid = ?", [newAmountVehicle, trunkitemId], function(err15,res15) {
                                if (err15) console.log("Error in unload Trunk Item Query 15: "+err15);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,trunkitemId,output],function(err16,res16) {
                                if (err16) console.log("Error in unload Trunk Item Query 16: "+err16);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                 // mp.events.call("server:houseitems:ausladen", player);
                                }
                              });
                            }
                          } else {
                            player.call(`notification`, ["3", "Soviel kannst du nicht tragen"]);
                          }
                        }
                      });
                    } else {
                      // Spieler hat leeres Inventar
                      var maxweight = player.data.inventory;
                      var newweight = parseFloat(itemweight);
                      if (parseFloat(newweight) <= parseFloat(maxweight)) {
                        if (parseInt(output) == parseInt(item.amout)) {
                          // Spieler nimmt alles
                          gm.databaseManager.getConnection().query("DELETE FROM house_items WHERE itemid = ?", [trunkitemId], function(err13,res13) {
                            if (err13) console.log("Error in unload Trunk Item Query 13: "+err13);
                          });
                          gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,trunkitemId,output],function(err14,res14) {
                            if (err14) console.log("Error in unload Trunk Item Query 14: "+err14);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                              mp.events.call("server:houseitems:ausladen", player);
                            }
                          });
                        } else {
                          // Spieler nimmt nur einen Teil
                          var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));
                          gm.databaseManager.getConnection().query("UPDATE house_items SET amout = ? WHERE itemid = ?", [newAmountVehicle, trunkitemId], function(err15,res15) {
                            if (err15) console.log("Error in unload Trunk Item Query 15: "+err15);
                          });
                          gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,trunkitemId,output],function(err16,res16) {
                            if (err16) console.log("Error in unload Trunk Item Query 16: "+err16);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                              mp.events.call("server:houseitems:ausladen", player);
                            }
                          });
                        }
                      } else {
                        player.call(`notification`, ["3", "Soviel kannst du nicht tragen"]);
                      }
                    }
                  }
                });
              } else {
                player.call(`notification`, ["3", "Soviel liegt nicht im Fahrzeug"]);
              }
            });
          } else {
            player.call(`notification`, ["3", "Dieses Item gibt es nicht"]);
          }
        }
      });
    } else if (trigger == "loadLagerItem") {
      //
      // SPIELER LEGT ITEM IN FAHRZEUG
      //
      var trunkitemId = player.getVariable("loadTrunkItemId");
      var veh = player.getVariable("loadTrunkItemVeh");
      gm.databaseManager.getConnection().query("SELECT u.*, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.id = ?", [trunkitemId], function(err1,res1) {
        if (err1) console.log("Error in load Trunk Item Query 1: "+err1);
        else {
          if (res1.length > 0) {
            res1.forEach(function(item){
              if (parseInt(item.amout) >= parseInt(output) && parseInt(output) > 0) {
                var itemweight = parseFloat(parseInt(output) * parseFloat(item.itemcount)).toFixed(2);
                var houseid = player.getVariable("loadTrunkItemhouseid");
                gm.databaseManager.getConnection().query("SELECT SUM(v.amout * i.itemcount) AS weight FROM house_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.houseid = ?",[houseid], function(err2,res2) {
                  if (err2) console.log("Error in load Trunk Item Query 2: "+err2);
                  else {
                    if (res2.length > 0) {
                      res2.forEach(function(vehWeight){
                        if (vehWeight.weight !== null) {
                          var maxweight = parseInt(400);
                          var newweight = parseFloat(parseFloat(itemweight) + parseFloat(vehWeight.weight));
                          if (parseFloat(newweight) <= parseFloat(maxweight)) {
                            if (parseInt(output) == parseInt(item.amout)) {
                              // User legt alles rein
                              gm.databaseManager.getConnection().query("SELECT vi.* FROM house_items vi WHERE vi.itemId = ? AND vi.houseid = ?", [item.itemId, houseid], function(err3,res3){
                                if (err3) console.log("Error in load Trunk Item Query 3: "+err3);
                                else {
                                  if (res3.length > 0) {
                                    res3.forEach(function(vehitem) {
                                      var newAmount = parseInt(parseInt(vehitem.amout) + parseInt(output));
                                      gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err6,res6) {
                                        if (err6) console.log("Error in load Trunk Item Query 6: "+err6);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE house_items SET amout = ? WHERE id = ?",[newAmount,vehitem.id],function(err7,res7) {
                                        if (err7) console.log("Error in load Trunk Item Query 7: "+err7);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                          mp.events.call("server:houseitems:einladen", player, veh);
                                        }
                                      });
                                    });
                                  } else {
                                    gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err4,res4) {
                                      if (err4) console.log("Error in load Trunk Item Query 4: "+err4);
                                    });
                                    console.log("Test1: "+houseid);
                            console.log("Test2: "+item.itemId);
                            console.log("Test3: "+output);
                                    gm.databaseManager.getConnection().query("INSERT INTO house_items(id,houseid,itemId,amout) VALUES('',?,?,?)",[houseid,item.itemId,output],function(err5,res5) {
                                      if (err5) console.log("Error in load Trunk Item Query 5: "+err5);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                        mp.events.call("server:houseitems:einladen", player, veh);
                                      }
                                    });
                                  }
                                }
                              });
                            } else {
                              console.log("Test1: "+houseid);
                          console.log("Test2: "+item.itemId);
                          console.log("Test3: "+output);
                              // User legt einen Teil rein
                              gm.databaseManager.getConnection().query("SELECT vi.* FROM house_items vi WHERE vi.itemId = ? AND vi.houseid = ?",[item.itemId,houseid],function(err8,res8) {
                                if (err8) console.log("Error in load Trunk Item Query 8: "+err8);
                                else {
                                  if (res8.length > 0) {
                                    res8.forEach(function(vehitem) {
                                      console.log("Test1: "+houseid);
                          console.log("Test2: "+item.itemId);
                          console.log("Test3: "+output);
                                      var newAmountVehicle = parseInt(parseInt(vehitem.amout) + parseInt(output));
                                      var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));

                                      gm.databaseManager.getConnection().query("UPDATE house_items SET amout = ? WHERE id = ?", [newAmountVehicle, vehitem.id], function(err9,res9) {
                                        if (err9) console.log("Error in load Trunk Item Query 9: "+err9);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?",[newAmountUser, trunkitemId],function(err10,res10) {
                                        if (err10) console.log("Error in load Trunk Item Query 10: "+err10);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                          mp.events.call("server:houseitems:einladen", player, veh);
                                        }
                                      });
                                    });
                                  } else {
                                    console.log("Test1: "+houseid);
                          console.log("Test2: "+item.itemId);
                          console.log("Test3: "+output);
                                    var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));
                                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?", [newAmountUser, trunkitemId], function(err11,res11) {
                                      if (err11) console.log("Error in load Trunk Item Query 11: "+err11);
                                    });
                                    gm.databaseManager.getConnection().query("INSERT INTO house_items(id,houseid,itemId,amout) VALUES('',?,?,?)",[houseid,item.itemId,output],function(err12,res12) {
                                      if (err12) console.log("Error in load Trunk Item Query 12: "+err12);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                        mp.events.call("server:houseitems:einladen", player, veh);
                                      }
                                    });
                                  }
                                }
                              });
                            }
                          } else {
                            player.call(`notification`, ["3", "Soviel kannst du nicht reinlegen"]);
                          }
                        } else {
                          //Das Fahrzeug hat kein Inventar
                          var vehData = player.getVariable("loadTrunkItemVehData");
                          vehData = JSON.parse(vehData);
                          var maxweight = parseInt(400);
                          var newweight = parseFloat(itemweight);
                          if (parseFloat(newweight) <= parseFloat(maxweight)) {
                            if (parseInt(output) == parseInt(item.amout)) {
                              // User legt alles rein
                              gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err13,res13) {
                                if (err13) console.log("Error in load Trunk Item Query 13: "+err13);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO house_items(id,houseid,itemId,amout) VALUES('',?,?,?)",[houseid,item.itemId,output],function(err14,res14) {
                                if (err14) console.log("Error in load Trunk Item Query 14: "+err14);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                  mp.events.call("server:houseitems:einladen", player, veh);
                                }
                              });
                            } else {
                              // User legt einen Teil rein
                              console.log("Test1: "+houseid);
                          console.log("Test2: "+item.itemId);
                          console.log("Test3: "+output);
                              var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));
                              gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?", [newAmountUser, trunkitemId], function(err15,res15) {
                                if (err15) console.log("Error in load Trunk Item Query 15: "+err15);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO house_items(id,houseid,itemId,amout) VALUES('',?,?,?)",[houseid,item.itemId,output],function(err16,res16) {
                                if (err16) console.log("Error in load Trunk Item Query 16: "+err16);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                  mp.events.call("server:houseitems:einladen", player, veh);
                                }
                              });
                            }
                          } else {
                            player.call(`notification`, ["3", "Soviel kannst du nicht reinlegen"]);
                          }
                        }
                      });
                    } else {
                      var maxweight = vehData.houseitems;
                      var newweight = parseFloat(itemweight);
                      if (parseFloat(newweight) <= parseFloat(maxweight)) {
                        if (parseInt(output) == parseInt(item.amout)) {
                          // User legt alles rein
                          gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err13,res13) {
                            if (err13) console.log("Error in load Trunk Item Query 13: "+err13);
                          });
                          gm.databaseManager.getConnection().query("INSERT INTO house_items(id,houseid,itemId,amout) VALUES('',?,?,?)",[houseid,item.itemId,output],function(err14,res14) {
                            if (err14) console.log("Error in load Trunk Item Query 14: "+err14);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                              mp.events.call("server:houseitems:einladen", player, veh);
                            }
                          });
                        } else {
                          // User legt einen Teil rein
                          var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));
                          gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?", [newAmountUser, trunkitemId], function(err15,res15) {
                            if (err15) console.log("Error in load Trunk Item Query 15: "+err15);
                          });
                          console.log("Test1: "+houseid);
                          console.log("Test2: "+item.itemId);
                          console.log("Test3: "+output);
                          gm.databaseManager.getConnection().query("INSERT INTO house_items(id,houseid,itemId,amout) VALUES('',?,?,?)",[houseid,item.itemId,output],function(err16,res16) {
                            if (err16) console.log("Error in load Trunk Item Query 16: "+err16);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                              mp.events.call("server:houseitems:einladen", player, veh);
                            }
                          });
                        }
                      } else {
                        player.call(`notification`, ["3", "Soviel kannst du nicht reinlegen"]);
                      }
                    }
                  }
                });
              } else {
                player.call(`notification`, ["3", "Soviel besitzt du nicht!"]);
              }
            });
          } else {
            player.call(`notification`, ["3", "Dieses Item gibt es nicht!"]);
          }
        }
      });
    }
  }
});


mp.events.add("server:houseitems:ausladen", (player,id) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT id FROM user_houses WHERE id = ?", [id, player.dimension], function(err1, res) {
      if (err1) console.log("Error in get Vehicle ID"+ err1);
      else {
        if (res.length > 0) {
          res.forEach(function(trunk) {
            gm.databaseManager.getConnection().query("SELECT v.*, i.itemName, i.itemcount FROM house_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.houseid = ?", [trunk.id], function(err2, res2) {
              if (err2) console.log("Error in get Inventory Query: "+err2);
              else {
                if (res2.length > 0) {                 
                  var i = 1;
                  var weight = 0.00;
                  var vehinv = {};
                  res2.forEach(function(item) {                    
                    if (i == res2.length) {
                      vehinv[""+item.itemId] = item;
                      weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                      player.call("client:houseitems:ausladen",[JSON.stringify(vehinv),weight,parseInt(400)]);
                    } else {
                      vehinv[""+item.id] = item;
                      weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                    }
                    i = parseInt(parseInt(i) + 1);
                  });
                } else {
                  player.call(`notification`, ["3", "Die Lagerbox ist Leer"]);
                }
              }
            });
          });
        }
      }
    });
  }
});

mp.events.add("server:housingitems:vermenu",(player,id) => {
  if(mp.players.exists(player)) {
      gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE houseid = ? AND dimension = ?", [id,player.dimension], function(err, res) {
          if (err) console.log("Error in Select Houses: "+err);
          var i = 1;
          let HousingList = [];
          res.forEach(function(char) { 
            player.setVariable("lagerid",char.id);           
              let obj = {"housecharid": String(char.charId), "locked": String(char.lagerLocked)};
              HousingList.push(obj);   
              console.log(HousingList);
              if (parseInt(i) == parseInt(res.length)) {
                  if(mp.players.exists(player)) player.call("client:housinglager:openverMenu", [JSON.stringify(HousingList),player.data.internalId,char.id]);
              }
              i++;
          });
      });
  }
});


mp.events.add('inputValueHouse', (player, trigger, output) => {
  if(trigger === "lagerPin") {
      var id = player.getVariable("lagerid");
      gm.databaseManager.getConnection().query("UPDATE user_houses SET lagerpin = ? WHERE id = ?",[output,id], function(err,res) {
          if (err) console.log("Error in Update Pin: "+err);
          if(mp.players.exists(player)) player.call(`notification`, ["2", "Du hast dein Lager Pin geändert"]);
      });
  }
});

mp.events.add("server:housingitems:unlock",(player,id) => {
  gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
      if (err) console.log("Error in Select Houses: "+err);
      gm.databaseManager.getConnection().query("UPDATE user_houses SET lagerLocked = '1' WHERE id = ? AND charId = ?", [id,player.data.internalId], function(err1,res1) {
          if (err1) console.log("Error in Update Lock status: "+err1);
          if(mp.players.exists(player)) player.call(`notification`, ["2", "Dein Lager wurde aufgeschlossen"]);
      });
  });
});

mp.events.add("server:housingitems:lock",(player,id) => {
  gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
      if (err) console.log("Error in Select Houses: "+err);
      gm.databaseManager.getConnection().query("UPDATE user_houses SET lagerLocked = '0' WHERE id = ? AND charId = ?", [id,player.data.internalId], function(err1,res1) {
          if (err1) console.log("Error in Update Lock status: "+err1);
          if(mp.players.exists(player)) player.call(`notification`, ["2", "Dein Lager wurde abgeschlossen"]);
      });
  });
});

mp.events.add('inputValueHouse', (player, trigger, output) => {
  if(trigger === "lagerPinenter") {
      var id = player.getVariable("lagerid");
      console.log(id);
      gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ? AND lagerpin = ?", [id,output], function (err, res) {
      if (err) console.log("Error in Select houses: "+err);
          if (res.length > 0) {
                    console.log(res[0].houseid);
                    player.call("client:houseitems:openMenu",[parseInt(id)])

          } else {
              if(mp.players.exists(player)) player.call(`notification`, ["4", "Falscher Pin"]);
          }            
      });
  }
});
