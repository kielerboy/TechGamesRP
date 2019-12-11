const toClient = require('../.RageLife/core/toClient.js');

mp.events.add("server:inventory:openInteract", (player) => {

});

mp.events.add("server:inventory:SendToCharChooser", (player) => {
    if (mp.players.exists(player)) {
        //mp.events.call("server:ClothesMenu:save", player);
        gm.databaseManager.getConnection().query('UPDATE characters SET money = ?, posX = ?, posY = ?, posZ = ?, health = ?, armor = ?, isOnline = "N", currentOnlineId = 0 WHERE id = ?', [player.data.money, player.position.x.toFixed(2), player.position.y.toFixed(2), player.position.z.toFixed(2), player.health, player.armour, player.data.internalId],
            function(err, res, row) {
                if (err) console.log("Error in Player Quit Query: " + err);
                //player.call("backCall", [""]);
            });
        gm.databaseManager.getConnection().query("SELECT ingameName FROM characters WHERE accountId = '" + player.data.accountId + "' AND isWhitelisted='1'", function(err2, res2) {
            if (err2) console.log(err2);
            if (!res2.length > 1) {
                if (mp.players.exists(player)) {
                    player.notify("~r~Du hast nur einen gewhitelisteten Character!");
                }
                return;
            }
            if (mp.players.exists(player)) {
                player.notify("~g~Du bist nun im Characterwechsel!");
                let characters = [];
                res2.forEach(function(elm) {
                    characters.push(elm.ingameName);
                });
                //toClient.createMenu(player, "charchooser", "Character", characters);
                player.call("client:inventory:charchooser", characters);
                player.setVariable("state", "LOGIN");
                player.alpha = 0;
                player.dimension = -99;
                player.health = 100;
                player.call("charChange");
            }
        });
        return;
    }
});

mp.events.add("server:inventory:setWalkingstyle", (player, style) => {
    if (mp.players.exists(player)) {
        if (style == "Normal") {
            player.data.walkingStyle = null;
        } else if (style == "Mutig") {
            player.data.walkingStyle = "move_m@brave";
        } else if (style == "Sicher") {
            player.data.walkingStyle = "move_m@confident";
        } else if (style == "Betrunken") {
            player.data.walkingStyle = "move_m@drunk@verydrunk";
        } else if (style == "Fett") {
            player.data.walkingStyle = "move_m@fat@a";
        } else if (style == "Gangster") {
            player.data.walkingStyle = "move_m@shadyped@a";
        } else if (style == "Eilig") {
            player.data.walkingStyle = "move_m@hurry@a";
        } else if (style == "Verletzt") {
            player.data.walkingStyle = "move_m@injured";
        } else if (style == "Schnell") {
            player.data.walkingStyle = "move_m@quick";
        } else if (style == "Traurig") {
            player.data.walkingStyle = "move_m@sad@a";
        } else if (style == "Stark") {
            player.data.walkingStyle = "move_m@tool_belt@a";
        }
    }
});

mp.events.add("server:inventory:prepareKleidung", (player) => {
    if (mp.players.exists(player)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);
        var businessData = player.data.businessData;
        businessData = JSON.parse(businessData);
        var duty = "N";
        if (fractionData.playerFractionDuty == "Y" || businessData.playerBusinessDuty == "Y") duty = "Y";
        gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function(err2, res2) {
            if (err2) console.log("Error in setModel + Clothes on Login");
            else if (res2.length > 0) {
                res2.forEach(function(modelData) {
                    var model = JSON.parse(modelData.data);
                    var appearance = modelData.appearance;
                    let data = JSON.parse(res2[0].data);
                    player.call("client:inventory:showKleidung", [appearance, player.data.gender, duty, JSON.stringify(fractionData.fractionName),data.Hair[0], data.Hair[1], data.Hair[2]]);
                });
            }
        });
    }
});

mp.events.add("server:inventory:setKleidung", (player, componentID, drawableID, textureID) => {
    if (mp.players.exists(player)) {
        player.setClothes(componentID, drawableID, textureID, 2);
    }
});

mp.events.add("server:inventory:setProp", (player, propID, drawableID, textureID) => {
    if (mp.players.exists(player)) {
        player.setProp(propID, drawableID, textureID);

        let arrProps = [];
        arrProps[0] = player.getProp(0);
        arrProps[1] = player.getProp(1);
        arrProps[2] = player.getProp(2);
        arrProps[6] = player.getProp(6);
        arrProps[7] = player.getProp(7);
        player.data.propZero = JSON.stringify(player.getProp(0));
        player.data.propOne = JSON.stringify(player.getProp(1));
        player.data.propTwo = JSON.stringify(player.getProp(2));
        player.data.propSix = JSON.stringify(player.getProp(6));
        player.data.propSeven = JSON.stringify(player.getProp(7));
        player.data.playerProps = JSON.stringify(arrProps);
    }
})

mp.events.add("server:inventory:prepareMenu", (player) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.internalId], function(err, res) {
            if (err) console.log("Error in get Inventory Query: " + err);
            else {
                if (res.length > 0) {
                    var i = 1;
                    var weight = 0.00;
                    var inv = {};
                    res.forEach(function(item) {
                        if (i == res.length) {
                            inv["" + item.id] = item;
                            weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                            if (mp.players.exists(player)) {
                                player.call("client:inventory:showInventory", [JSON.stringify(inv), weight]);
                            }
                        } else {
                            inv["" + item.id] = item;
                            weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
                        }
                        i = parseInt(parseInt(i) + 1);
                    });
                } else {
                    player.notify("Du hast keine Gegenstände dabei.");
                }
            }
        });
    }
});

mp.events.add("server:inventory:openItemSubmenu", (player, itemId) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ? AND u.id = ?", [player.data.internalId, itemId], function(err, res) {
            if (err) console.log("Error in openItemSubmenu Query: " + err);
            else {
                if (res.length > 0) {
                    res.forEach(function(item) {
                        if (mp.players.exists(player)) {
                            player.call("client:inventory:openItemSubmenu", [JSON.stringify(item)]);
                        }
                    });
                }
            }
        })
    }
});

mp.events.add("server:inventory:setDestroyItem", (player, itemId) => {
    if (mp.players.exists(player)) player.setVariable("destroyItemId", itemId);
});

mp.events.add("server:inventory:destroyItem", (player, itemId) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT id FROM user_items WHERE id = ? AND charId = ?", [itemId, player.data.internalId], function(err, res) {
            if (err) console.log("Error in Get Destroy Item Query: " + err);
            else {
                if (res.length > 0) {
                    gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemId, player.data.internalId], function(err2, res2) {
                        if (err2) console.log("Error in Destroy Item Query: " + err);
                        else {
                            if (mp.players.exists(player)) {
                                player.notify("Du hast den Gegenstand weggeworfen.");
                                mp.events.call("server:inventory:prepareMenu", player);
                            }
                        }
                    });
                } else {
                    if (mp.players.exists(player)) {
                        player.notify("Du besitzt diesen Gegenstand nicht.");
                        mp.events.call("sqlLog", player, player.data.ingameName + " hat Versucht Item " + itemId + " zu löschen und es nicht bessen.");
                    }
                }
            }
        });
    }
});

mp.events.add("server:inventory:setGiveItem", (player, itemId) => {
    if (mp.players.exists(player)) player.setVariable("giveItemId", itemId);
});

mp.events.add("server:inventory:reWeaponize", (player) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE itemId IN (84,90,92,98,102,106,108,110,112,114,116,118,158,160,162,165,168,171,174,176,178) AND charId = ?", [player.data.internalId], function(err, res) {
            if (err) console.log("Error in reWeaponize Query 1: " + err);
            else {
                if (res.length > 0) {
                    res.forEach(function(weapon) {
                        if (mp.players.exists(player)) {
                            if (weapon.itemId == 84) {
                                player.giveWeapon(0x5EF9FEC4, 12);
                            } else if (weapon.itemId == 90) {
                                player.giveWeapon(0xD8DF3C3C, 0);
                            } else if (weapon.itemId == 92) {
                                player.giveWeapon(0x958A4A8F, 0);
                            } else if (weapon.itemId == 98) {
                                player.giveWeapon(0xDFE37640, 0);
                            } else if (weapon.itemId == 102) {
                                player.giveWeapon(0x3656C8C1, 0);
                            } else if (weapon.itemId == 106) {
                                player.giveWeapon(0xBFE256D4, 12);
                            } else if (weapon.itemId == 108) {
                                player.giveWeapon(0x2BE6766B, 30);
                            } else if (weapon.itemId == 110) {
                                player.giveWeapon(0x1D073A89, 8);
                            } else if (weapon.itemId == 112) {
                                player.giveWeapon(0x83BF0278, 30);
                            } else if (weapon.itemId == 114) {
                                player.giveWeapon(0xC0A3098D, 30);
                            } else if (weapon.itemId == 116) {
                                player.giveWeapon(0x678B81B1, 0);
                            } else if (weapon.itemId == 118) {
                                player.giveWeapon(0x8BB05FD7, 0);
                            } else if (weapon.itemId == 158) {
                                player.giveWeapon(0x4E875F73, 0);
                            } else if (weapon.itemId == 160) {
                                player.giveWeapon(0x99B507EA, 0);
                            } else if (weapon.itemId == 162) {
                                player.giveWeapon(0x1B06D571, 12);
                            } else if (weapon.itemId == 165) {
                                player.giveWeapon(0x5EF9FEC4, 12);
                            } else if (weapon.itemId == 168) {
                                player.giveWeapon(0x99AEEB3B, 12);
                            } else if (weapon.itemId == 171) {
                                player.giveWeapon(0xD205520E, 12);
                            } else if (weapon.itemId == 174) {
                                player.giveWeapon(0x84BD7BFD, 0);
                            } else if (weapon.itemId == 176) {
                                player.giveWeapon(0xDD5DF8D9, 0);
                            } else if (weapon.itemId == 178) {
                                player.giveWeapon(0x19044EE0, 0);
                            }
                            player.giveWeapon(0xA2719263, 0);
                        }
                    });
                }
            }
        });
    }
});

mp.events.add("inputValueShop", (player, trigger, output) => {
    if (mp.players.exists(player)) {
        if (trigger === "DestroyItem") {
            var itemId = player.getVariable("destroyItemId");

            gm.databaseManager.getConnection().query("SELECT id, amout FROM user_items WHERE id = ? AND charId = ?", [itemId, player.data.internalId], function(err, res) {
                if (err) console.log("Error in Get Destroy Item Query: " + err);
                else {
                    if (res.length > 0) {
                        res.forEach(function(item) {
                            if (parseInt(item.amout) >= parseInt(output)) {
                                if (output > 0) {
                                    if (parseInt(item.amout) == parseInt(output)) {
                                        gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemId, player.data.internalId], function(err2, res2) {
                                            if (err2) console.log("Error in Destroy Item Query: " + err2);
                                            else {
                                                player.notify("Du hast den Gegenstand weggeworfen.");
                                                mp.events.call("server:inventory:prepareMenu", player);
                                            }
                                        });
                                    } else {
                                        var newAmount = parseInt(parseInt(item.amout) - parseInt(output));
                                        gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ?", [newAmount, itemId], function(err3, res3) {
                                            if (err3) console.log("Error in Destroy Item Query 3: " + err3);
                                            else {
                                                player.notify("Du hast den Gegenstand weggeworfen.");
                                                mp.events.call("server:inventory:prepareMenu", player);
                                            }
                                        });
                                    }
                                } else {
                                    player.notify("Du kannst nicht weniger als 1 Wegwerfen.");
                                }
                            } else {
                                player.notify("So viel hast du nicht von diesem Gegenstand!");
                            }
                        });
                    } else {
                        player.notify("Du besitzt diesen Gegenstand nicht.");
                        mp.events.call("sqlLog", player, player.data.ingameName + " hat Versucht Item " + itemId + " zu löschen und es nicht bessen.");
                    }
                }
            });
        }
        if (trigger === "GiveItem") {
            var itemId = player.getVariable("giveItemId");
            gm.databaseManager.getConnection().query("SELECT u.id, u.amout, u.itemId, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.id = ? AND u.charId = ?", [itemId, player.data.internalId], function(err, res) {
                if (err) console.log("Error in Get Give Item Query: " + err);
                else {
                    if (res.length > 0) {
                        res.forEach(function(item) {
                            getNearestPlayer(player, 2);
                            if (currentTarget !== null) {
                                if (parseInt(output) > 0 && parseInt(item.amout) == parseInt(output)) {
                                    // ITEMCOUNT == GIVEAMOUNT
                                    itemweight = parseFloat(parseInt(output) * parseFloat(item.itemcount)).toFixed(2);
                                    gm.databaseManager.getConnection().query("SELECT SUM(u.amout * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [currentTarget.data.internalId], function(err2, res2) {
                                        if (err2) console.log("Error in Get Give Item target weight Query: " + err2);
                                        else {
                                            if (res2.length > 0) {
                                                res2.forEach(function(targetWeight) {
                                                    if (targetWeight.weight !== null) {
                                                        if (parseFloat(parseFloat(targetWeight.weight).toFixed(2) + parseFloat(itemweight).toFixed(2)) <= parseFloat(currentTarget.data.inventory)) {
                                                            gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = ?", [currentTarget.data.internalId, item.itemId], function(err4, res4) {
                                                                if (err4) console.log("Error in select existing item on give item query: " + err4);
                                                                else {
                                                                    if (res4.length > 0) {
                                                                        res4.forEach(function(existingItem) {
                                                                            var existingItemCount = existingItem.amout;
                                                                            var newItemCount = parseInt(parseInt(existingItemCount) + parseInt(output));

                                                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND id = ?", [player.data.internalId, itemId], function(err5, res5) {
                                                                                if (err5) console.log("Error in give item query 5: " + err5);
                                                                            });

                                                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND id = ?", [newItemCount, currentTarget.data.internalId, existingItem.id], function(err6, res6) {
                                                                                if (err6) console.log("Error in give item Query 6: " + err6);
                                                                            });

                                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                                            mp.events.call("sqlLog", player, player.data.ingameName + " hat" + currentTarget.data.ingameName + "ItemID:" + itemId + " weitergegeben");
                                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                                        });
                                                                    } else {
                                                                        gm.databaseManager.getConnection().query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.internalId, itemId, player.data.internalId], function(err3, res3) {
                                                                            if (err3) console.log("Error in Give Item update Query: " + err3);
                                                                            else {
                                                                                player.notify("Du hast den Gegenstand übergeben.");
                                                                                currentTarget.notify("Dir wurde etwas übergeben.");
                                                                                mp.events.call("sqlLog", player, player.data.ingameName + " hat" + currentTarget.data.ingameName + "ItemID:" + itemId + " weitergegeben");
                                                                                mp.events.call("server:inventory:prepareMenu", player);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            player.notify("Dein Gegenüber kann nicht so viel tragen.");
                                                        }
                                                    } else {
                                                        gm.databaseManager.getConnection().query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.internalId, itemId, player.data.internalId], function(err3, res3) {
                                                            if (err3) console.log("Error in Give Item update Query: " + err3);
                                                            else {
                                                                player.notify("Du hast den Gegenstand übergeben.");
                                                                currentTarget.notify("Dir wurde etwas übergeben.");
                                                                mp.events.call("server:inventory:prepareMenu", player);
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                gm.databaseManager.getConnection().query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.internalId, itemId, player.data.internalId], function(err3, res3) {
                                                    if (err3) console.log("Error in Give Item update Query: " + err3);
                                                    else {
                                                        player.notify("Du hast den Gegenstand übergeben.");
                                                        currentTarget.notify("Dir wurde etwas übergeben.");
                                                        mp.events.call("sqlLog", player, player.data.ingameName + " hat" + currentTarget.data.ingameName + "ItemID:" + itemId + " weitergegeben");
                                                        mp.events.call("server:inventory:prepareMenu", player);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    if (parseInt(output) < parseInt(item.amout) && parseInt(output) > 0) {
                                        // USER GIVES LESS THAN HE HAS
                                        var newGiveUserAmount = parseInt(parseInt(item.amout) - parseInt(output));
                                        itemweight = parseFloat(parseInt(output) * parseFloat(item.itemcount)).toFixed(2);

                                        gm.databaseManager.getConnection().query("SELECT SUM(u.amout * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [currentTarget.data.internalId], function(err2, res2) {
                                            if (err2) console.log("Error in Get Give Item target weight Query: " + err2);
                                            else {
                                                if (res2.length > 0) {
                                                    res2.forEach(function(targetWeight) {
                                                        if (targetWeight.weight !== null) {
                                                            if (parseFloat(parseFloat(targetWeight.weight).toFixed(2) + parseFloat(itemweight).toFixed(2)) <= parseFloat(currentTarget.data.inventory)) {
                                                                gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = ?", [currentTarget.data.internalId, item.itemId], function(err4, res4) {
                                                                    if (err4) console.log("Error in select existing item on give item query: " + err4);
                                                                    else {
                                                                        if (res4.length > 0) {
                                                                            res4.forEach(function(existingItem) {
                                                                                var existingItemCount = existingItem.amout;
                                                                                var newItemCount = parseInt(parseInt(existingItemCount) + parseInt(output));

                                                                                gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND id = ?", [newGiveUserAmount, player.data.internalId, itemId], function(err5, res5) {
                                                                                    if (err5) console.log("Error in give Item Query 5: " + err5);
                                                                                });

                                                                                gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND id = ?", [newItemCount, currentTarget.data.internalId, existingItem.id], function(err6, res6) {
                                                                                    if (err6) console.log("Error in give item Query 6: " + err6);
                                                                                });

                                                                                player.notify("Du hast den Gegenstand übergeben.");
                                                                                currentTarget.notify("Dir wurde etwas übergeben.");
                                                                                mp.events.call("sqlLog", player, player.data.ingameName + " hat " + currentTarget.data.ingameName + " ItemID: " + itemId + " weitergegeben");
                                                                                mp.events.call("server:inventory:prepareMenu", player);
                                                                            });
                                                                        } else {
                                                                            var newGivenUserAmount = output;
                                                                            gm.databaseManager.getConnection().query("INSERT INTO user_items (id,charId,itemId,amout) VALUES('',?,?,?)", [currentTarget.data.internalId, item.itemId, newGivenUserAmount], function(err3, res3) {
                                                                                if (err3) console.log("Error in Give Item q3: " + err3);
                                                                                else {
                                                                                    var newGiveUserAmount = parseInt(parseInt(item.amout) - parseInt(output));
                                                                                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND itemId = ?", [newGiveUserAmount, player.data.internalId, item.itemId], function(err4, res4) {
                                                                                        if (err4) console.log("Error in Give Item q4: " + err4);
                                                                                        else {
                                                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                player.notify("Dein Gegenüber kann nicht so viel tragen.");
                                                            }
                                                        } else {
                                                            var newGivenUserAmount = output;
                                                            gm.databaseManager.getConnection().query("INSERT INTO user_items (id,charId,itemId,amout) VALUES('',?,?,?)", [currentTarget.data.internalId, item.itemId, newGivenUserAmount], function(err3, res3) {
                                                                if (err3) console.log("Error in Give Item q3: " + err3);
                                                                else {
                                                                    var newGiveUserAmount = parseInt(parseInt(item.amout) - parseInt(output));
                                                                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND itemId = ?", [newGiveUserAmount, player.data.internalId, item.itemId], function(err4, res4) {
                                                                        if (err4) console.log("Error in Give Item q4: " + err4);
                                                                        else {
                                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                } else {
                                                    gm.databaseManager.getConnection().query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.internalId, itemId, player.data.internalId], function(err3, res3) {
                                                        if (err3) console.log("Error in Give Item update Query: " + err3);
                                                        else {
                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                            mp.events.call("sqlLog", player, player.data.ingameName + " hat" + currentTarget.data.ingameName + "ItemID:" + itemId + " weitergegeben");
                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    } else {
                                        player.notify("So viele davon hast du nicht!");
                                    }
                                }
                            } else {
                                player.notify("Es ist keiner in deiner Nähe!");
                            }
                        });
                    } else {
                        player.notify("Du besitzt diesen Gegenstand nicht.");
                        mp.events.call("sqlLog", player, player.data.ingameName + " hat Versucht Item " + itemId + " weiterzugeben und es nicht bessen.");
                    }
                }
            });
        }
    }
});

mp.events.add("server:inventory:giveItem", (player, itemId) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT u.id, u.amout, u.itemId, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.id = ? AND u.charId = ?", [itemId, player.data.internalId], function(err, res) {
            if (err) console.log("Error in Get Give Item Query: " + err);
            else {
                if (res.length > 0) {
                    res.forEach(function(item) {
                        getNearestPlayer(player, 2);
                        if (currentTarget !== null) {
                            itemweight = parseFloat(parseInt(item.amout) * parseFloat(item.itemcount)).toFixed(2);
                            gm.databaseManager.getConnection().query("SELECT SUM(u.amout * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [currentTarget.data.internalId], function(err2, res2) {
                                if (err2) console.log("Error in Get Give Item target weight Query: " + err2);
                                else {
                                    if (res2.length > 0) {
                                        res2.forEach(function(targetWeight) {
                                            if (targetWeight.weight !== null) {
                                                if (parseFloat(parseFloat(targetWeight.weight).toFixed(2) + parseFloat(itemweight).toFixed(2)) <= parseFloat(currentTarget.data.inventory)) {
                                                    gm.databaseManager.getConnection().query("SELECT * FROM user_items WHERE charId = ? AND itemId = ?", [currentTarget.data.internalId, item.itemId], function(err4, res4) {
                                                        if (err4) console.log("Error in select existing item on give item query: " + err4);
                                                        else {
                                                            if (res4.length > 0) {
                                                                res4.forEach(function(existingItem) {
                                                                    var existingItemCount = existingItem.amout;
                                                                    var newItemCount = parseInt(parseInt(existingItemCount) + parseInt(item.amout));

                                                                    gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND id = ?", [player.data.internalId, itemId], function(err5, res5) {
                                                                        if (err5) console.log("Error in give item query 5: " + err5);
                                                                    });
                                                                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND id = ?", [newItemCount, currentTarget.data.internalId, existingItem.id], function(err6, res6) {
                                                                        if (err6) console.log("Error in give item Query 6: " + err6);
                                                                    });
                                                                    player.notify("Du hast den Gegenstand übergeben.");
                                                                    currentTarget.notify("Dir wurde etwas übergeben.");
                                                                    mp.events.call("sqlLog", player, player.data.ingameName + " hat" + currentTarget.data.ingameName + "ItemID:" + itemId + " weitergegeben");
                                                                    mp.events.call("server:inventory:prepareMenu", player);
                                                                });
                                                            } else {
                                                                gm.databaseManager.getConnection().query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.internalId, itemId, player.data.internalId], function(err3, res3) {
                                                                    if (err3) console.log("Error in Give Item update Query: " + err3);
                                                                    else {
                                                                        player.notify("Du hast den Gegenstand übergeben.");
                                                                        currentTarget.notify("Dir wurde etwas übergeben.");
                                                                        mp.events.call("sqlLog", player, player.data.ingameName + " hat" + currentTarget.data.ingameName + "ItemID:" + itemId + " weitergegeben");
                                                                        mp.events.call("server:inventory:prepareMenu", player);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    player.notify("Dein Gegenüber kann nicht so viel tragen.");
                                                }
                                            } else {
                                                gm.databaseManager.getConnection().query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.internalId, itemId, player.data.internalId], function(err3, res3) {
                                                    if (err3) console.log("Error in Give Item update Query: " + err3);
                                                    else {
                                                        player.notify("Du hast den Gegenstand übergeben.");
                                                        currentTarget.notify("Dir wurde etwas übergeben.");
                                                        mp.events.call("server:inventory:prepareMenu", player);
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        gm.databaseManager.getConnection().query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.internalId, itemId, player.data.internalId], function(err3, res3) {
                                            if (err3) console.log("Error in Give Item update Query: " + err3);
                                            else {
                                                player.notify("Du hast den Gegenstand übergeben.");
                                                currentTarget.notify("Dir wurde etwas übergeben.");
                                                mp.events.call("sqlLog", player, player.data.ingameName + " hat" + currentTarget.data.ingameName + "ItemID:" + itemId + " weitergegeben");
                                                mp.events.call("server:inventory:prepareMenu", player);
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            player.notify("Es ist keiner in deiner Nähe!");
                        }
                    });
                } else {
                    player.notify("Du besitzt diesen Gegenstand nicht.");
                    mp.events.call("sqlLog", player, player.data.ingameName + " hat Versucht Item " + itemId + " weiterzugeben und es nicht bessen.");
                }
            }
        });
    }
});

mp.events.add("server:inventory:useItem", (player, itemId) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT u.*, i.type, i.usable, i.fillvalue, o.time, o.objectName, o.type AS objType FROM user_items u LEFT JOIN items i ON i.id = u.itemId LEFT JOIN itemobject o ON o.itemId = i.id WHERE u.charId = ? AND u.id = ?", [player.data.internalId, itemId], function(err, res) {
            if (err) console.log("Error in useItem Query 1: " + err);
            else {
                if (res.length > 0) {
                    res.forEach(function(itemData) {
                        var countDownItem = false;
                        if (itemData.type == "drink") {
                            // USE ITEM IST GETRÄNK
                            player.data.drink = parseInt(parseInt(player.data.drink) + parseInt(itemData.fillvalue));
                            if (parseInt(player.data.drink) > 100) player.data.drink = parseInt(100);
                            player.call("changeValue", ['drink', player.data.drink]);
                            player.notify('~g~ Du hast getrunken.')
                            mp.events.call("playAnimationEvent", player, 'amb@world_human_drinking@beer@male@idle_a', 'idle_c', 1, 49, -1);
                            setTimeout(_ => {
                                try {
                                    if (mp.players.exists(player) && !player.vehicle) {
                                        player.stopAnimation();
                                    }
                                } catch (e) {
                                    console.log("ERROR - Inventory/index.js - useItem Timeout: " + e);
                                }
                            }, 5000);

                            countDownItem = true;
                        } else if (itemData.type == "food") {
                            // USE ITEM IST ESSEN
                            player.data.food = parseInt(parseInt(player.data.food) + parseInt(itemData.fillvalue));
                            if (parseInt(player.data.food) > 100) player.data.food = parseInt(100);
                            player.call("changeValue", ['food', player.data.food]);
                            player.notify('~g~ Du hast etwas gegessen.')
                            mp.events.call("playAnimationEvent", player, 'amb@code_human_wander_eating_donut@male@idle_a', 'idle_c', 1, 49, -1);
                            setTimeout(_ => {
                                try {
                                    if (mp.players.exists(player) && !player.vehicle) {
                                        player.stopAnimation();
                                    }
                                } catch (e) {
                                    console.log("ERROR - Inventory/index.js - useFood: " + e);
                                }
                            }, 5000);

                            countDownItem = true;
                        } else if (itemData.type == "alcoholdrink") {
                            // USE ITEM IST ALKOHOL
                            player.data.drink = parseInt(parseInt(player.data.drink) - parseInt(itemData.fillvalue));
                            if (parseInt(player.data.drink) < 0) player.data.drink = parseInt(0);
                            player.call("changeValue", ['drink', player.data.drink]);
                            player.notify('~g~ Du hast Alkohol getrunken.')
                            mp.events.call("playAnimationEvent", player, 'amb@world_human_drinking@beer@male@idle_a', 'idle_c', 1, 49, -1);
                            setTimeout(_ => {
                                try {
                                    if (mp.players.exists(player) && !player.vehicle) {
                                        player.stopAnimation();
                                    }
                                } catch (e) {
                                    console.log("ERROR - Inventory/index.js - useAlcoholDrink " + e);
                                }
                            }, 5000);

                            countDownItem = true;
                        } else if (itemData.type == "lifeloss") {
                            // USE ITEM IST LIFELOSS
                            player.health = parseInt(parseInt(player.health) - parseInt(itemData.fillvalue));
                            player.notify('~g~ Du verbrauchst eine Zigarette.')
                            mp.events.call("playAnimationEvent", player, 'amb@code_human_wander_smoking@male@idle_a', 'idle_b', 1, 49, -1);
                            setTimeout(_ => {
                                try {
                                    if (mp.players.exists(player) && !player.vehicle) {
                                        player.stopAnimation();
                                    }
                                } catch (e) {
                                    console.log("Error - Inventory/index.js - uselifeloss");
                                }
                            }, 5000);

                            countDownItem = true;
                        } else if (itemData.type == "joint") {
                            // USE ITEM IST JOINT
                            if (player.health < 94) player.health = parseInt(parseInt(player.health) + parseInt(itemData.fillvalue));
                            player.notify('~g~ Du hast einen Joint benutzt.')
                            mp.events.call("playAnimationEvent", player, 'amb@world_human_smoking_pot@male@base', 'base', 1, 49, -1);
                            player.call("smokeJointEffect");
                            setTimeout(_ => {
                                try {
                                    if (mp.players.exists(player) && !player.vehicle) {
                                        player.stopAnimation();
                                    }
                                } catch (e) {
                                    console.log("Error - Inventory/index.js - uselifeloss");
                                }
                            }, 15000);

                            countDownItem = true;
                        } else if (itemData.type == 'mushroom') {
                            if (player.health < 94) player.health = parseInt(parseInt(player.health) + parseInt(itemData.fillvalue));
                            player.notify('~g~ Du hast einen Pilz gegessen.')
                            mp.events.call("playAnimationEvent", player, 'amb@code_human_wander_eating_donut@male@idle_a', 'idle_c', 1, 49, -1);
                            player.call("MagicMushroomEffect");
                            setTimeout(_ => {
                                try {
                                    if (mp.players.exists(player) && !player.vehicle) {
                                        player.stopAnimation();
                                    }
                                } catch (e) {
                                    console.log("Error - Inventory/index.js - uselifeloss");
                                }
                            }, 15000);

                            countDownItem = true;
                        } else if (itemData.type == "life") {
                            // USE ITEM IST LIFEGIVING
                            if (player.health > 50) {
                                player.notify("Du bist nicht stark genug verletzt!");
                                countDownItem = false;
                            } else if (player.getVariable('healstate') == 'HEALED') {
                                player.notify("Deine wunden wurden erst frisch versorgt!");
                                countDownItem = false;
                            } else {
                                player.notify("Du versorgst gerade deine Wunden");
                                mp.events.call("playAnimationEvent", player, 'amb@medic@standing@kneel@enter', 'enter', 1, 49, -1);
                                setTimeout(_ => {
                                    try {
                                        if (mp.players.exists(player)) {
                                            player.stopAnimation();
                                            player.health = parseInt(parseInt(player.health) + parseInt(itemData.fillvalue));
                                            player.setVariable('healstate', 'HEALED');
                                        }
                                    } catch (e) {
                                        console.log("ERROR - Inventory/index.js - uselife" + e);
                                    }
                                }, 10000);
                                setTimeout(_ => {
                                    try {
                                        if (mp.players.exists(player)) {
                                            player.setVariable('healstate', 'NOTHEALED');
                                        }
                                    } catch (e) {
                                        console.log("ERROR - Inventory/index.js - uselife" + e);
                                    }
                                }, 600000);
                                player.call("client:progressbar:start", [100, 10000]);
                                countDownItem = true;
                            }
                        } else if (itemData.type == "weapon") {
                            // USE ITEM IST WAFFE
                            if (parseInt(itemData.itemId) == 83) {
                                // Kampfpistole wird ausgepackt
                                player.giveWeapon(0x5EF9FEC4, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [84, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 83: " + err2);
                                    else {
                                        player.notify("~w~Kampfpistole ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 84) {
                                if (mp.players.exists(player)) player.removeWeapon(0x5EF9FEC4, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [83, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 84: " + err2);
                                    else {
                                        player.notify("~w~Kampfpistole ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 85) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 84], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 84: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x5EF9FEC4, 12);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x5EF9FEC4, 12);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 163) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 162], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 84: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x1B06D571, 12);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x1B06D571, 12);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 166) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 165], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 165: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x5EF9FEC4, 12);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x5EF9FEC4, 12);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 169) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 168], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 168: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x99AEEB3B, 9);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x99AEEB3B, 9);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 172) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 171], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 170: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0xD205520E, 18);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0xD205520E, 18);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 119) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 106], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 84: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0xBFE256D4, 12);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0xBFE256D4, 12);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 120) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 108], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 84: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x2BE6766B, 30);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x2BE6766B, 30);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 121) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 110], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 84: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x1D073A89, 8);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x1D073A89, 8);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 122) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 112], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 84: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x83BF0278, 30);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0x83BF0278, 30);
                                            });
                                        }
                                    } else {
                                        player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 123) {
                                gm.databaseManager.getConnection().query("SELECT itemId FROM user_items WHERE charid = ? AND itemId = ?", [player.data.internalId, 114], function(err3, res3) {
                                    if (err3) console.log("Error in Update Waffe on use item 84: " + err3);
                                    if (res3.length > 0) {
                                        if (itemData.amout > 1) {
                                            var newCount = parseInt(parseInt(itemData.amout) - 1);
                                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                                if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0xC0A3098D, 30);
                                            });
                                        } else {
                                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Remove Item after use query: " + err2);
                                                if (mp.players.exists(player)) player.setWeaponAmmo(0xC0A3098D, 30);
                                            });
                                        }
                                    } else {
                                        if (mp.players.exists(player)) player.notify("~r~ Wo willst du die Munition hinstecken?");
                                        return;
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 161) {
                                // Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x1B06D571, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [162, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Pistole ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 162) {
                                if (mp.players.exists(player)) player.removeWeapon(0x1B06D571, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [161, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Pistole ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 164) {
                                // CombatPistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x5EF9FEC4, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [165, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Combat Pistole ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 165) {
                                if (mp.players.exists(player)) player.removeWeapon(0x5EF9FEC4, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [164, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Combat Pistole ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 167) {
                                // Pistole .50 wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x99AEEB3B, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [168, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Pistole .50~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 168) {
                                if (mp.players.exists(player)) player.removeWeapon(0x99AEEB3B, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [167, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Pistole .50~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 170) {
                                // Schwere Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0xD205520E, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [171, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schwere Pistole ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 171) {
                                if (mp.players.exists(player)) player.removeWeapon(0xD205520E, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [170, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schwere Pistole ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 155) {
                                // Schwere Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0xF9E6AA4B, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [156, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Glasflasche ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 156) {
                                if (mp.players.exists(player)) player.removeWeapon(0xF9E6AA4B, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [155, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Glasflasche ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 157) {
                                // Schwere Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x4E875F73, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [158, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Hammer ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 158) {
                                if (mp.players.exists(player)) player.removeWeapon(0x4E875F73, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [157, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Hammer ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 173) {
                                // Schwere Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x84BD7BFD, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [174, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Brechstange ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 174) {
                                if (mp.players.exists(player)) player.removeWeapon(0x84BD7BFD, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [173, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Brechstange ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 175) {
                                // Schwere Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0xDD5DF8D9, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [176, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Machete ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 176) {
                                if (mp.players.exists(player)) player.removeWeapon(0xDD5DF8D9, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [175, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Machete ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 177) {
                                // Schwere Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x19044EE0, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [178, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Rohrzange ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 178) {
                                if (mp.players.exists(player)) player.removeWeapon(0x19044EE0, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [177, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Rohrzange ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 159) {
                                // Schwere Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x99B507EA, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [160, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Messer ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 160) {
                                if (mp.players.exists(player)) player.removeWeapon(0x99B507EA, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [159, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Messer ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 105) {
                                // MK2Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0xBFE256D4, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [106, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~MK2 Pistole ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 106) {
                                if (mp.players.exists(player)) player.removeWeapon(0xBFE256D4, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [105, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~MK2 Pistole ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 107) {
                                // SMG wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x2BE6766B, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [108, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 107: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~SMG ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 108) {
                                if (mp.players.exists(player)) player.removeWeapon(0x2BE6766B, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [107, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 108: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~SMG ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 109) {
                                // Shotgun wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x1D073A89, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [110, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 107: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Shotgun ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 110) {
                                if (mp.players.exists(player)) player.removeWeapon(0x1D073A89, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [109, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 108: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Shotgun ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 111) {
                                // Karabiner wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x83BF0278, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [112, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 107: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Karabiner ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 112) {
                                if (mp.players.exists(player)) player.removeWeapon(0x83BF0278, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [111, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 108: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Karabiner ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 113) {
                                // Spezial Karabiner wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0xC0A3098D, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [114, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 107: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Spezial Karabiner ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 114) {
                                if (mp.players.exists(player)) player.removeWeapon(0xC0A3098D, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [113, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 108: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Spezial Karabiner ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 115) {
                                // Schlagstock wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x678B81B1, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [116, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 107: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schlagstock ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 116) {
                                if (mp.players.exists(player)) player.removeWeapon(0x678B81B1, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [115, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 108: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schlagstock ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 117) {
                                // Taschenlampe wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x8BB05FD7, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [118, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 107: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Taschenlampe ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 118) {
                                if (mp.players.exists(player)) player.removeWeapon(0x8BB05FD7, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [117, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 108: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Taschenlampe ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 101) {
                                // Taschenlampe wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x3656C8C1, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [102, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 107: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Taser ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 102) {
                                if (mp.players.exists(player)) player.removeWeapon(0x3656C8C1, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [101, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 108: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Taser ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 89) {
                                // Schlagring wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0xD8DF3C3C, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [90, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 89: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schlagring ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 97) {
                                // Klappmesser ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0xDFE37640, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [98, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in  Update Waffe on use item 97: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Klappmesser ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 98) {
                                // Klappmesser eingepackt
                                if (mp.players.exists(player)) player.removeWeapon(0xDFE37640, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [97, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 98: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Klappmesser ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 90) {
                                // Schlagring wird eingepackt
                                if (mp.players.exists(player)) player.removeWeapon(0xD8DF3C3C, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [89, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 90: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schlagring ~g~eingepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 91) {
                                // Baseballschläger wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x958A4A8F, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [92, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 91: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Baseballschläger ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 92) {
                                // Baseballschläger wird eingepackt
                                if (mp.players.exists(player)) player.removeWeapon(0x958A4A8F, 0);
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [91, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 92: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Baseballschläger ~g~eingepackt");
                                    }
                                });
                            }
                        } else if (itemData.type == "armor") {
                            if (parseInt(itemData.itemId) == 103) {
                                // Weste wird ausgepackt
                                if (itemData.amout > 1) {
                                    var newCount = parseInt(parseInt(itemData.amout) - 1);
                                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                        if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                        if (mp.players.exists(player)) {
                                            player.notify("~w~Weste ~g~angezogen");
                                            player.armour = 100;
                                            player.setClothes(9, 12, 1, 2);
                                        }
                                    });
                                } else {
                                    gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                        if (err2) console.log("Error in Remove Item after use query: " + err2);
                                        if (mp.players.exists(player)) {
                                            player.notify("~w~Weste ~g~angezogen");
                                            player.armour = 100;
                                            player.setClothes(9, 12, 1, 2);
                                        }
                                    });
                                }
                            }
                        } else if (itemData.type == "bag") {
                            // USE ITEM IST TASCHE
                            if (parseInt(itemData.itemId) == 34) {
                                // Tasche wird ausgepackt
                                player.data.inventory = 30;
                                gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [63, itemId, player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Tasche on use item 34: " + err2);
                                    else {
                                        if (mp.players.exists(player)) {
                                            player.notify("~w~Tasche ~g~ausgepackt");
                                            player.setClothes(5, 45, 0, 0);
                                            player.data.inventory = 30;
                                        }
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 63) {
                                // Tasche wird eingepackt
                                gm.databaseManager.getConnection().query("SELECT SUM(u.amout * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.internalId], function(err2, res2) {
                                    if (err2) console.log("Error in Select Weight on use item 63: " + err2);
                                    else {
                                        if (res2.length > 0) {
                                            res2.forEach(function(weight) {
                                                if (parseFloat(weight.weight) <= parseFloat(9)) {
                                                    gm.databaseManager.getConnection().query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [34, itemId, player.data.internalId], function(err2, res2) {
                                                        if (err2) console.log("Error in Update Tasche on use item 63: " + err2);
                                                        else {
                                                            if (mp.players.exists(player)) {
                                                                player.notify("~w~Tasche ~g~eingepackt");
                                                                player.setClothes(5, 0, 0, 0);
                                                                player.data.inventory = 10;
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    player.notify("Du hast noch zu viel bei dir!");
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }

                        if (mp.players.exists(player)) {
                            var health = parseInt(player.health);
                            var food = parseInt(player.data.food);
                            var drink = parseInt(player.data.drink);
                            var inventory = parseInt(player.data.inventory);
                            gm.databaseManager.getConnection().query("UPDATE `characters` SET health = ?, food = ?, drink = ?, inventory = ? WHERE id = ?", [health, food, drink, inventory, player.data.internalId], function(errUp, resUp) {
                                if (errUp) console.log("Error in Update User after use item: " + errUp);
                            });

                            if (countDownItem == true) {
                                if (itemData.amout > 1) {
                                    var newCount = parseInt(parseInt(itemData.amout) - 1);
                                    gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.internalId], function(err3, res3) {
                                        if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                    });
                                } else {
                                    gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.internalId], function(err2, res2) {
                                        if (err2) console.log("Error in Remove Item after use query: " + err2);
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }
});

mp.events.add("server:inventar:westeoff", (player) => {
    if (mp.players.exists(player)) {
        player.notify("~w~Weste ~g~ausgezogen");
        player.armour = 0;
        player.setClothes(9, 0, 0, 2);
    }
});

var currentTarget = null;

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if (player != _player) {
                let _dist = _player.dist(player.position);
                if (_dist < dist) {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};