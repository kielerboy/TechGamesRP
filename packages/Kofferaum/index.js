mp.events.add("server:kofferaum:firststep", (player) => {
  if(mp.players.exists(player)) {
    let pos = new mp.Vector3(player.position.x, player.position.y, player.position.z);

    if (getVehicleFromPosition(pos, 5).length > 0) {
      var vehicle = getVehicleFromPosition(pos, 5)[0];
      if(mp.vehicles.exists(vehicle)) {
        if (vehicle) {
          var vehData = JSON.parse(vehicle.getVariable("vehData"));
          if (vehData !== null && vehicle.locked == false) {
            player.call("client:kofferaum:openMenu",[vehicle]);
          }
        }
      }
    }
  }
});


mp.events.add("server:kofferraum:einladen", (player, vehicle) => {
  if(mp.players.exists(player) && mp.vehicles.exists(vehicle)) {
    var numberplate = vehicle.getVariable("numberPlate");
    gm.databaseManager.getConnection().query("SELECT id FROM vehicles WHERE numberplate = ?", [numberplate], function(err1, id) {
      if (err1) console.log("Error in get Vehicle ID"+ err1);
      else {
        if (id.length > 0) {
          id.forEach(function(trunk) {
            gm.databaseManager.getConnection().query("SELECT v.*, i.itemName, i.itemcount FROM vehicle_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.vehId = ?", [trunk.id], function(err2, res2) {
              if (err2) console.log("Error in get Inventory Query: "+err2);
              else {
                if (res2.length > 0) {
                  var i = 1;
                  var weight = 0.00;
                  var inv = {};
                  res2.forEach(function(item) {
                    if (i == res2.length) {
                      inv[""+item.id] = item;
                      var vehData = vehicle.getVariable("vehData");
                      vehData = JSON.parse(vehData);
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
                                  player.setVariable("loadTrunkItemVehId",trunk.id);
                                  player.setVariable("loadTrunkItemVehData",JSON.stringify(vehData));
                                  player.setVariable("loadTrunkItemVeh",vehicle);
                                  if (vehData.kofferraum == null) {
                                    var maxweight = 50;
                                  } else {
                                    var maxweight = vehData.kofferraum;
                                  }  
                                  player.call("client:kofferaum:einlagern",[JSON.stringify(uinv),weight,maxweight]);
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
                  var vehData = vehicle.getVariable("vehData");
                  vehData = JSON.parse(vehData);
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
                              player.setVariable("loadTrunkItemVehId",trunk.id);
                              player.setVariable("loadTrunkItemVehData",JSON.stringify(vehData));
                              player.setVariable("loadTrunkItemVeh",vehicle);
                              player.call("client:kofferaum:einlagern",[JSON.stringify(uinv),weight,vehData.kofferraum]);
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

mp.events.add("server:kofferraum:loadItem", (player, itemId) => {
  if (mp.players.exists(player)) player.setVariable("loadTrunkItemId",itemId);
});
mp.events.add("server:kofferraum:unloadItem", (player, itemId) => {
  if (mp.players.exists(player)) player.setVariable("unloadTrunkItemId",itemId);
});

mp.events.add("inputValueShop", (player, trigger, output) => {
  if(mp.players.exists(player)) {
    if(trigger === "unloadTrunkItem") {
      var trunkitemId = player.getVariable("unloadTrunkItemId");
      gm.databaseManager.getConnection().query("SELECT v.*, i.itemcount FROM vehicle_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.id = ?",[trunkitemId], function(err1, res1) {
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
                              gm.databaseManager.getConnection().query("SELECT ui.* FROM user_items ui WHERE ui.itemId = ? AND ui.charId = ?",[item.itemId,player.data.internalId],function(err3,res3) {
                                if (err3) console.log("Error in unload Trunk Item Query 3: "+err3);
                                else {
                                  if (res3.length > 0) {
                                    res3.forEach(function(useritem) {
                                      var newAmount = parseInt(parseInt(useritem.amout) + parseInt(output));
                                      gm.databaseManager.getConnection().query("DELETE FROM vehicle_items WHERE id = ?", [trunkitemId], function(err6,res6) {
                                        if (err6) console.log("Error in unload Trunk Item Query 6: "+err6);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?",[newAmount,useritem.id],function(err7,res7) {
                                        if (err7) console.log("Error in unload Trunk Item Query 7: "+err7);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                          mp.events.call("server:kofferaum:ausladen", player);
                                        }
                                      });
                                    });
                                  } else {
                                    gm.databaseManager.getConnection().query("DELETE FROM vehicle_items WHERE id = ?", [trunkitemId], function(err4,res4) {
                                      if (err4) console.log("Error in unload Trunk Item Query 4: "+err4);
                                    });
                                    gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,item.itemId,output],function(err5,res5) {
                                      if (err5) console.log("Error in unload Trunk Item Query 5: "+err5);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                        mp.events.call("server:kofferaum:ausladen", player);
                                      }
                                    });
                                  }
                                }
                              });
                            } else {
                              // Spieler nimmt nur einen Teil
                              gm.databaseManager.getConnection().query("SELECT ui.* FROM user_items ui WHERE ui.itemId = ? AND ui.charId = ?",[item.itemId,player.data.internalId],function(err8,res8) {
                                if (err8) console.log("Error in unload Trunk Item Query 8: "+err8);
                                else {
                                  if (res8.length > 0) {
                                    res8.forEach(function(useritem) {
                                      var newAmountUser = parseInt(parseInt(useritem.amout) + parseInt(output));
                                      var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));

                                      gm.databaseManager.getConnection().query("UPDATE vehicle_items SET amout = ? WHERE id = ?", [newAmountVehicle, trunkitemId], function(err9,res9) {
                                        if (err9) console.log("Error in unload Trunk Item Query 9: "+err9);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?",[newAmountUser,useritem.id],function(err10,res10) {
                                        if (err10) console.log("Error in unload Trunk Item Query 10: "+err10);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                          mp.events.call("server:kofferaum:ausladen", player);
                                        }
                                      });
                                    });
                                  } else {
                                    var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));
                                    gm.databaseManager.getConnection().query("UPDATE vehicle_items SET amout = ? WHERE id = ?", [newAmountVehicle, trunkitemId], function(err11,res11) {
                                      if (err11) console.log("Error in unload Trunk Item Query 11: "+err11);
                                    });
                                    gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,item.itemId,output],function(err12,res12) {
                                      if (err12) console.log("Error in unload Trunk Item Query 12: "+err12);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                        mp.events.call("server:kofferaum:ausladen", player);
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
                              gm.databaseManager.getConnection().query("DELETE FROM vehicle_items WHERE id = ?", [trunkitemId], function(err13,res13) {
                                if (err13) console.log("Error in unload Trunk Item Query 13: "+err13);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,item.itemId,output],function(err14,res14) {
                                if (err14) console.log("Error in unload Trunk Item Query 14: "+err14);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                  mp.events.call("server:kofferaum:ausladen", player);
                                }
                              });
                            } else {
                              // Spieler nimmt nur einen Teil
                              var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));
                              gm.databaseManager.getConnection().query("UPDATE vehicle_items SET amout = ? WHERE id = ?", [newAmountVehicle, trunkitemId], function(err15,res15) {
                                if (err15) console.log("Error in unload Trunk Item Query 15: "+err15);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,item.itemId,output],function(err16,res16) {
                                if (err16) console.log("Error in unload Trunk Item Query 16: "+err16);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                                  mp.events.call("server:kofferaum:ausladen", player);
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
                          gm.databaseManager.getConnection().query("DELETE FROM vehicle_items WHERE id = ?", [trunkitemId], function(err13,res13) {
                            if (err13) console.log("Error in unload Trunk Item Query 13: "+err13);
                          });
                          gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,item.itemId,output],function(err14,res14) {
                            if (err14) console.log("Error in unload Trunk Item Query 14: "+err14);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                              mp.events.call("server:kofferaum:ausladen", player);
                            }
                          });
                        } else {
                          // Spieler nimmt nur einen Teil
                          var newAmountVehicle = parseInt(parseInt(item.amout) - parseInt(output));
                          gm.databaseManager.getConnection().query("UPDATE vehicle_items SET amout = ? WHERE id = ?", [newAmountVehicle, trunkitemId], function(err15,res15) {
                            if (err15) console.log("Error in unload Trunk Item Query 15: "+err15);
                          });
                          gm.databaseManager.getConnection().query("INSERT INTO user_items(id,charId,itemId,amout) VALUES('',?,?,?)",[player.data.internalId,item.itemId,output],function(err16,res16) {
                            if (err16) console.log("Error in unload Trunk Item Query 16: "+err16);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand entnommen"]);
                              mp.events.call("server:kofferaum:ausladen", player);
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
    } else if (trigger == "loadTrunkItem") {
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
                var vehId = player.getVariable("loadTrunkItemVehId");
                gm.databaseManager.getConnection().query("SELECT SUM(v.amout * i.itemcount) AS weight FROM vehicle_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.vehId = ?",[vehId], function(err2,res2) {
                  if (err2) console.log("Error in load Trunk Item Query 2: "+err2);
                  else {
                    if (res2.length > 0) {
                      res2.forEach(function(vehWeight){
                        if (vehWeight.weight !== null) {
                          var vehData = player.getVariable("loadTrunkItemVehData");
                          vehData = JSON.parse(vehData);
                          if (vehData.kofferraum == null) {
                            var maxweight = 50;
                          } else {
                            var maxweight = vehData.kofferraum;
                          }                          
                          var newweight = parseFloat(parseFloat(itemweight) + parseFloat(vehWeight.weight));
                          if (parseFloat(newweight) <= parseFloat(maxweight)) {
                            if (parseInt(output) == parseInt(item.amout)) {
                              // User legt alles rein
                              gm.databaseManager.getConnection().query("SELECT vi.* FROM vehicle_items vi WHERE vi.itemId = ? AND vi.vehId = ?", [item.itemId, vehId], function(err3,res3){
                                if (err3) console.log("Error in load Trunk Item Query 3: "+err3);
                                else {
                                  if (res3.length > 0) {
                                    res3.forEach(function(vehitem) {
                                      var newAmount = parseInt(parseInt(vehitem.amout) + parseInt(output));
                                      gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err6,res6) {
                                        if (err6) console.log("Error in load Trunk Item Query 6: "+err6);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE vehicle_items SET amout = ? WHERE id = ?",[newAmount,vehitem.id],function(err7,res7) {
                                        if (err7) console.log("Error in load Trunk Item Query 7: "+err7);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                          mp.events.call("server:kofferaum:einladen", player, veh);
                                        }
                                      });
                                    });
                                  } else {
                                    gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err4,res4) {
                                      if (err4) console.log("Error in load Trunk Item Query 4: "+err4);
                                    });
                                    gm.databaseManager.getConnection().query("INSERT INTO vehicle_items(id,vehId,itemId,amout) VALUES('',?,?,?)",[vehId,item.itemId,output],function(err5,res5) {
                                      if (err5) console.log("Error in load Trunk Item Query 5: "+err5);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                        mp.events.call("server:kofferaum:einladen", player, veh);
                                      }
                                    });
                                  }
                                }
                              });
                            } else {
                              // User legt einen Teil rein
                              gm.databaseManager.getConnection().query("SELECT vi.* FROM vehicle_items vi WHERE vi.itemId = ? AND vi.vehId = ?",[item.itemId,vehId],function(err8,res8) {
                                if (err8) console.log("Error in load Trunk Item Query 8: "+err8);
                                else {
                                  if (res8.length > 0) {
                                    res8.forEach(function(vehitem) {
                                      var newAmountVehicle = parseInt(parseInt(vehitem.amout) + parseInt(output));
                                      var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));

                                      gm.databaseManager.getConnection().query("UPDATE vehicle_items SET amout = ? WHERE id = ?", [newAmountVehicle, vehitem.id], function(err9,res9) {
                                        if (err9) console.log("Error in load Trunk Item Query 9: "+err9);
                                      });
                                      gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?",[newAmountUser, trunkitemId],function(err10,res10) {
                                        if (err10) console.log("Error in load Trunk Item Query 10: "+err10);
                                        else {
                                          player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                          mp.events.call("server:kofferaum:einladen", player, veh);
                                        }
                                      });
                                    });
                                  } else {
                                    var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));
                                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?", [newAmountUser, trunkitemId], function(err11,res11) {
                                      if (err11) console.log("Error in load Trunk Item Query 11: "+err11);
                                    });
                                    gm.databaseManager.getConnection().query("INSERT INTO vehicle_items(id,vehId,itemId,amout) VALUES('',?,?,?)",[vehId,item.itemId,output],function(err12,res12) {
                                      if (err12) console.log("Error in load Trunk Item Query 12: "+err12);
                                      else {
                                        player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                        mp.events.call("server:kofferaum:einladen", player, veh);
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
                          if (vehData.kofferraum == null) {
                            var maxweight = 50;
                          } else {
                            var maxweight = vehData.kofferraum;
                          }  
                          var newweight = parseFloat(itemweight);
                          if (parseFloat(newweight) <= parseFloat(maxweight)) {
                            if (parseInt(output) == parseInt(item.amout)) {
                              // User legt alles rein
                              gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err13,res13) {
                                if (err13) console.log("Error in load Trunk Item Query 13: "+err13);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO vehicle_items(id,vehId,itemId,amout) VALUES('',?,?,?)",[vehId,item.itemId,output],function(err14,res14) {
                                if (err14) console.log("Error in load Trunk Item Query 14: "+err14);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                  mp.events.call("server:kofferaum:einladen", player, veh);
                                }
                              });
                            } else {
                              // User legt einen Teil rein
                              var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));
                              gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?", [newAmountUser, trunkitemId], function(err15,res15) {
                                if (err15) console.log("Error in load Trunk Item Query 15: "+err15);
                              });
                              gm.databaseManager.getConnection().query("INSERT INTO vehicle_items(id,vehId,itemId,amout) VALUES('',?,?,?)",[vehId,item.itemId,output],function(err16,res16) {
                                if (err16) console.log("Error in load Trunk Item Query 16: "+err16);
                                else {
                                  player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                                  mp.events.call("server:kofferaum:einladen", player, veh);
                                }
                              });
                            }
                          } else {
                            player.call(`notification`, ["3", "Soviel kannst du nicht reinlegen"]);
                          }
                        }
                      });
                    } else {
                      //Das Fahrzeug hat kein Inventar
                      var vehData = player.getVariable("loadTrunkItemVehData");
                      vehData = JSON.parse(vehData);
                      if (vehData.kofferraum == null) {
                        var maxweight = 50;
                      } else {
                        var maxweight = vehData.kofferraum;
                      }  
                      var newweight = parseFloat(itemweight);
                      if (parseFloat(newweight) <= parseFloat(maxweight)) {
                        if (parseInt(output) == parseInt(item.amout)) {
                          // User legt alles rein
                          gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [trunkitemId], function(err13,res13) {
                            if (err13) console.log("Error in load Trunk Item Query 13: "+err13);
                          });
                          gm.databaseManager.getConnection().query("INSERT INTO vehicle_items(id,vehId,itemId,amout) VALUES('',?,?,?)",[vehId,item.itemId,output],function(err14,res14) {
                            if (err14) console.log("Error in load Trunk Item Query 14: "+err14);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                              mp.events.call("server:kofferaum:einladen", player, veh);
                            }
                          });
                        } else {
                          // User legt einen Teil rein
                          var newAmountUser = parseInt(parseInt(item.amout) - parseInt(output));
                          gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?", [newAmountUser, trunkitemId], function(err15,res15) {
                            if (err15) console.log("Error in load Trunk Item Query 15: "+err15);
                          });
                          gm.databaseManager.getConnection().query("INSERT INTO vehicle_items(id,vehId,itemId,amout) VALUES('',?,?,?)",[vehId,item.itemId,output],function(err16,res16) {
                            if (err16) console.log("Error in load Trunk Item Query 16: "+err16);
                            else {
                              player.call(`notification`, ["2", "Du hast den Gegenstand reingelegt"]);
                              mp.events.call("server:kofferaum:einladen", player, veh);
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

//todo




mp.events.add("server:kofferaum:ausladen", (player) => {
  if(mp.players.exists(player)) {
    var vehicles = getVehicleFromPosition(player.position, 3);
    if (vehicles.length > 0) {
      if (mp.vehicles.exists(vehicles[0])) {
        var veh = vehicles[0];
        if (veh.locked == false) {
          var numberplate = veh.getVariable("numberPlate");
          gm.databaseManager.getConnection().query("SELECT id FROM vehicles WHERE numberplate = ?", [numberplate], function(err1, id) {
            if (err1) console.log("Error in get Vehicle ID"+ err1);
            else {
              if (id.length > 0) {
                id.forEach(function(trunk) {
                  gm.databaseManager.getConnection().query("SELECT v.*, i.itemName, i.itemcount FROM vehicle_items v LEFT JOIN items i ON i.id = v.itemId WHERE v.vehId = ?", [trunk.id], function(err2, res2) {
                    if (err2) console.log("Error in get Inventory Query: "+err2);
                    else {
                      if (res2.length > 0) {
                        var i = 1;
                        var weight = 0.00;
                        var vehWeight = 0.00;
                        var vehinv = {};
                        res2.forEach(function(item) {
                          if (i == res2.length) {
                            vehinv[""+item.id] = item;
                            weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                            var vehData = veh.getVariable("vehData");
                            vehData = JSON.parse(vehData);
                            if (vehData.kofferraum == null) {
                              var maxweight = 50;
                            } else {
                              var maxweight = vehData.kofferraum;
                            }  
                            player.call("client:kofferaum:ausladen",[JSON.stringify(vehinv),weight,maxweight]);
                          } else {
                            vehinv[""+item.id] = item;
                            weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                          }
                          i = parseInt(parseInt(i) + 1);
                        });
                      } else {
                        player.call(`notification`, ["3", "Dass Fahrzeug ist Leer"]);
                      }
                    }
                  });
                });
              }
            }
          });
        } else {
          player.call(`notification`, ["3", "Das Auto ist zugeschlossen"]);
        }
      }
    }
  }
});

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];
    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}
