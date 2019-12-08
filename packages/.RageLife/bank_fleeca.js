const toClient = require('./core/toClient.js');


mp.events.add("playerJoin", (player) => {
  if (mp.players.exists(player)) {
    player.removeBar = function (player, amout, clb) {
        if (player.data.money < amout) {
            clb(false);
            return;
        }

        const newAm = player.data.money - amout;
        player.data.money = newAm;

        gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [newAm, player.data.internalId], function (err, res, row) {
            if (err) console.log("Error in Player remove bar Money Query: " + err);
            clb(true);
            player.call("updateHudMoney", [player.data.money]);
        });
    }

    player.addBar = function (player, amout, clb) {
        if (player.data.money <= 0) {
            clb(false);
            player.notify("Du hast nicht genug Bargeld");
            return;
        }
        const newAm = player.data.money + amout;
        player.data.money = newAm;

        gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [newAm, player.data.internalId], function (err, res, row) {
            if (err) console.log("Error in Player give bar Money Query: " + err);
            clb(true);
            player.call("updateHudMoney", [player.data.money]);
        });
    }

    player.charID = function (player, clb) {
        gm.databaseManager.getConnection().query("SELECT id FROM characters WHERE id = ?", [player.data.internalId], function (err, res) {
            if (err) console.log(err);
        });
    }

    player.hasKonto = function (player, clb) {
        gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
            if (err) console.log(err);
        });
    }
    player.getAmout = function (player, clb) {
        gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
            if (err) console.log(err);

            if (res.length > 0) {

                if (err2) console.log(err2);
                res2.forEach(function (am) {
                    clb(am.amout);
                });
            }
        });
    }

    player.setMoney = function (player, amout) {
        gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
            if (err) console.log(err);

            if (res.length > 0) {

                gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [amout, player.data.internalId], function (err2, res2) {
                    if (err2) console.log(err2)
                });
            }
        });
    }
    player.addMoney = function (player, amout, clb) {
        if (!parseFloat(amout)) {
            player.notify("~r~Das ist keine gültige Zahl!");
            return;
        }

        if (parseFloat(amout) > parseFloat(0)) {
            gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
                if (err) console.log(err);

                if (res.length > 0) {
                    gm.databaseManager.getConnection().query("SELECT amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log(err2);

                        res2.forEach(function (am) {
                            var newAm = parseFloat(am.amout) + parseFloat(amout);

                            if (parseFloat(player.data.money) >= parseFloat(amout)) {
                                player.data.money = parseFloat(parseFloat(player.data.money) - parseFloat(amout));

                                gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [player.data.money, player.data.internalId],
                                    function (err, res, row) {
                                        if (err) console.log("Error in Player Quit Query: " + err);
                                        //player.call("backCall", [""]);
                                    });
                                gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                                    if (err3) console.log(err3)
                                    clb(true);
                                });
                            } else {
                                clb(false);
                            }
                        });
                    });
                }
            });
        } else {
            clb(false);
            player.notify("~r~So wenig kannst du nicht auszahlen!");
        }
    }

    player.removeMoney = function (player, amout, clb) {
        if (!parseFloat(amout)) {
            player.notify("~r~Das ist keine Zahl!");
            return;
        }

        if (parseFloat(amout) > parseFloat(0)) {
          gm.databaseManager.getConnection().query("SELECT id , amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
              if (err) console.log(err);


              if (res.length > 0) {
                  res.forEach(function (am) {
                      var newAm = parseFloat(parseFloat(am.amout) - parseFloat(amout));

                      if (amout > am.amout) {
                          clb(false);
                          return;
                      }

                      player.data.money = parseFloat(parseFloat(player.data.money) + parseFloat(amout));
                      gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [player.data.money, player.data.internalId], function (err, res) {
                          if (err) console.log(err);
                      });
                      gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                          if (err3) console.log(err3)
                      });

                      clb(true);
                  });
              } else {
                  clb(false);
                  player.notify("~r~Du besitzt kein Bankkonto!");
              }
          });
        } else {
            clb(false);
            player.notify("~r~So wenig kannst du nicht auszahlen!");
        }
    }
    player.transferMoney = function (player, recPlayer, amout, clb) {
        if (!parseFloat(amout)) {
            player.notify("~r~Das ist keine Zahl!");
            return;
        }
        gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE ingameName = ?", [recPlayer], function (err, res){
            if (err) console.log(err);
            if (!res.length > 0){
                player.notify("~r~ Empfänger unbekannt!");
                return;
            }
                let recvID = res[0].id;
                if (player.data.internalId == recvID){
                    player.notify("~r~Du kannst nicht an dich selbst überweisen!");
                    return;
                }
                //Absenderberechnung
                gm.databaseManager.getConnection().query("SELECT id, amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
                    if (err) console.log(err);

                    if (res.length > 0) {
                        res.forEach(function (am) {
                            var newAm = parseFloat(parseFloat(am.amout) - parseFloat(amout)).toFixed(2);
                            if (parseFloat(amout) > parseFloat(am.amout)) {
                                clb(false);
                                return;
                            }
                            player.notify("neuer Betrag:" + newAm);
                            gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                                if (err3) console.log(err3)
                            });
                            clb(true);
                        });
                    } else {
                        clb(false);
                        player.notify("~r~Du besitzt kein Bankkonto!");
                    }
                //Empfängerberechnung
                gm.databaseManager.getConnection().query("SELECT id, amout FROM bank_konten WHERE ownerId = ?", [recvID], function (err, res) {
                    if (err) console.log(err);

                    if (res.length > 0) {
                        res.forEach(function (am) {
                            var newAm = parseFloat(parseFloat(am.amout) + parseFloat(amout)).toFixed(2);

                            gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, recvID], function (err3, res3) {
                                if (err3) console.log(err3);
                                clb(true);
                            });
                        });
                    } else {
                        clb(false);
                        player.notify("~r~Du besitzt kein Bankkonto!");
                    }
                });
            });
        });
    };
  }
});

mp.events.add("startFleecaBank", (player) => {
    toClient.createMenu(player, "fleecaNormal", "Fleeca Bank", ["Konto erstellen"]);
});


mp.events.add("openATM", (player) => {
    gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
        if (err) console.log(err);

        if (res.length > 0) {
            toClient.createMenu(player, "atmInteract", "ATM", ["Kontostand", "Geld abheben", "Geld einzahlen", "Überweisung"]);
        } else {
            player.notify("~r~Du besitzt kein Bankkonto!");
        }
    });
});

mp.events.add("menuClick", (player, trigger, button) => {
    if (trigger === "fleecaNormal") {
        gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
            if (err) console.log(err);
            kontonummer = "" + Math.floor(Math.random() * 9999999999);
            if (!res.length > 0) {
                gm.databaseManager.getConnection().query("INSERT INTO bank_konten (id , ownerId , amout, kontonummer, beschreibung) VALUES ('' , ? , '50', ?, ?)", [player.data.internalId, kontonummer, player.data.ingameName], function (err2, res2) {                    
                    if (err2) console.log(err2);
                    player.notify("~g~Du hast dir ein Konto erstellt!");
                });
            } else {
                player.notify("~r~Du besitzt ein Konto!");
            }
        });
    } else if (trigger === "atmInteract") {
        if (button === "Kontostand") {
            gm.databaseManager.getConnection().query("SELECT amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
                if (err) console.log(err);

                res.forEach(function (am) {
                    player.notifyWithPicture("Fleeca Bank", "Fleeca Bank San Andreas", "Dein Kontostand beträgt:~n~ ~g~" + am.amout + "~w~ US Dollar", "CHAR_BANK_FLEECA");
                    toClient.createMenu(player, "atmKontoAmout", "ATM", ["Kontostand: " + am.amout]);
                });
            });
        } else if (button === "Geld einzahlen") {
            toClient.createInputShop(player, "StockkontoAmout");
        } else if (button === "Geld abheben") {
            toClient.createInputShop(player, "buchGeldAb");
        }
        else if (button === "Überweisung") {
            toClient.createInput(player, "überweiseRecv");
        }
    }
});



mp.events.add("inputValue", (player, trigger, output) => {
    if (trigger === "überweiseRecv") {
        player.setVariable("TransferRecv", output);
        toClient.createInputShop(player, "überweiseGeld");
    }
});


