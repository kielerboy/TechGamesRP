var currentTarget = null;

mp.events.add("server:bank:konten", (player) => {
    gm.databaseManager.getConnection().query("SELECT * FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function(err, res) {
        if (err) console.log("Error in Select Bank Konten: "+err);
        if (res.length > 0) {
            var i = 1;
            let BankList = [];
            res.forEach(function(bank) {
                let obj = {"nummer": String(bank.kontonummer), "id": String(bank.id), "name": String(bank.beschreibung)};
                BankList.push(obj);

                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:bank:openMenu", [JSON.stringify(BankList)]);
                }
                i++;
            });
        } else {
            if(mp.players.exists(player)) player.call("client:bank:openMenu", ["none"]);
        }
    });
});

mp.events.add("server:bank:abheben", (player, id) => {
    if (mp.players.exists(player)) player.setVariable("bankid",id);
});

mp.events.add("server:bank:kontostand", (player, id) => {
    console.log(id);
    gm.databaseManager.getConnection().query("SELECT * FROM bank_konten WHERE id = ? AND ownerId = ?",[id, player.data.internalId], function(err, res) {
        if (err) console.log("Error in Select Bank konten: "+err);
        if (res.length > 0) {
            player.call(`notification`, ["2", "Aktueller Kontostand: "+res[0].amout]);
        } else {
            player.call(`notification`, ["4", "Dies ist nicht dein Konto!"]);
        }
    });
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
        if(trigger === "moneyeinzahlen") {
            var id = player.getVariable("bankid");
            gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE id = ?", [player.data.internalId], function(err,res) {
                if(err) console.log("Error in Select Characters: "+err);
                res.forEach(function(bar) {
                    if ((output*1) > (bar.money*1)) {
                        player.call(`notification`, ["4", "Du hast nicht genug Bargeld"]);
                    } else {
                        gm.databaseManager.getConnection().query("SELECT * FROM bank_konten WHERE id = ? AND ownerId = ?", [id, player.data.internalId], function (err3,res3) {
                            if (err3) console.log("Error in Select bank Konten: " + err3);
                            res3.forEach(function(bank) {
                                var newAm = parseFloat(parseFloat(bank.amout) + parseFloat(output));
                                var newMoney = parseFloat( parseFloat(bar.money*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2);
                                gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE id = ?", [newAm, id], function(err1,res1) {
                                    if(err) console.log("Error in Update Bank Konten: "+err);
                                    gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newMoney, player.data.internalId], function(err2,res2) {
                                        if(err2) console.log("Error in update Charactersmoney: "+err2);
                                        player.call("updateHudMoney", [newMoney]);
                                    });
                                });
                            });
                        });
                    }
                });
            });
        }
    }
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
        if(trigger === "moneyabheben") {
            var id = player.getVariable("bankid");
            gm.databaseManager.getConnection().query("SELECT * FROM bank_konten WHERE id = ?", [id], function(err, res) {
                if(err) console.log("Error in Select Characters: " + err);
                res.forEach(function(bank) {
                    if ((output * 1) < (bank.amout * 1)) {
                        player.call(`notification`, ["4", "Es ist nicht genug Geld auf Ihrem Konto vorhanden!"]);
                    } else {
                        gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE id = ?", [player.data.internalId], function (err3,res3) {
                            if (err3) console.log("Error in Select bank Konten: "+ err3);
                            res3.forEach(function(bar) {
                                var newAm = parseFloat(parseFloat(bar.money) + parseFloat(output));
                                var newBank = parseFloat( parseFloat(bank.amout*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2);
                                gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE id = ?", [newBank, id], function(err1,res1) {
                                    if(err) console.log("Error in Update Bank Konten: "+err);
                                    gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.internalId], function(err2,res2) {
                                        if(err2) console.log("Error in update Charactersmoney: "+err2);
                                        player.call("updateHudMoney", [newAm]);
                                    });
                                });
                            });
                        });
                    }
                });
            });
        }
    }
});

mp.events.add("server:bank:addKonto", (player) => {
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
});

mp.events.add("inputValueShop", (player, trigger, output) => {
    if(trigger === "giveMoneyToTarget"){
        getNearestPlayer(player, 2);
        if (currentTarget !== null) {
            if (parseFloat(player.data.money) > parseFloat(output)) {
                var playerMoney = parseFloat(player.data.money);
                var targetMoney = parseFloat(currentTarget.data.money);
                player.playAnimation('mp_common', 'givetake2_a', 1, 49);
                setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                }, 2500);

                var playerMoney = parseFloat(playerMoney - output);
                var targetMoney = parseFloat(parseFloat(targetMoney) + parseFloat(output));

                currentTarget.data.money = targetMoney;
                player.call("updateHudMoney",[targetMoney]);
                player.call("changeValue",["money",targetMoney]);

                player.data.money = playerMoney;
                player.call("updateHudMoney",[playerMoney]);
                player.call("changeValue",["money",playerMoney]);

                // Logfile
                mp.events.call("sqlLog", player, player.data.ingameName+" hat "+currentTarget.data.ingameName+" "+output+"$ gegeben.");

                gm.databaseManager.getConnection().query("UPDATE `characters` SET money = ? WHERE id = ?",[playerMoney,player.data.internalId], function(errPlayer, resPlayer) {
                    if (errPlayer) console.log("Error in Player give Money for Player: "+errPlayer);
                });

                gm.databaseManager.getConnection().query("UPDATE `characters` SET money = ? WHERE id = ?",[targetMoney,currentTarget.data.internalId], function(errPlayer, resPlayer) {
                    if (errPlayer) console.log("Error in Player give Money for Target: "+errPlayer);
                });
            } else {
                player.notify("Du hast nicht genug Bargeld dabei!");
            }
        }
    }
});

let ROBBING = false;

mp.events.add("server:bank:ausrauben",(player,playerposx,playerposy,playerposz) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
            if (err) console.log("Error in Count Duty Officers: "+err);
            if (res[0].counter >= 2) {
                if(ROBBING == false) {
                    let raubShape = mp.colshapes.newSphere(player.position.x, player.position.y, player.position.z, 2, 0);

                    let raubInterval = setInterval(function() {
                        let position = player.position;
                        if (raubShape.isPointWithin(position) && (!player.vehicle)) {
                        } else {
                            player.call("client:progressbar:end");
                            player.setVariable("ROBBING",false);
                            ROBBING = false;
                            player.call(`notification`, ["4", "Du hast den Raub beendet!"]);
                            raubShape.destroy();
                            clearInterval(raubInterval);
                            clearInterval(raubInterval2);
                        }
                    },1000);
                    ROBBING = true;
                    player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);
                    player.call("client:dispatch:showDispatch");
                    time = 180000
                    player.call("client:progressbar:start",[100, time]);
                    player.setVariable("ROBBING",true);


                    let raubInterval2 = setTimeout(_ => {
                        if (mp.players.exists(player) && ROBBING == true) player.stopAnimation();
                        robMoney = "" + Math.floor(Math.random() * 2000);
                        var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                        gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                            if (err) console.log("Error in Update money: "+err);
                            player.data.money = newAm;
                            player.call("updateHudMoney",[newAm]);
                            player.call("changeValue",["money",newAm]);
                            player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                            player.setVariable("ROBBING",false);
                            ROBBING = false;
                            clearInterval(raubInterval);
                        });
                    }, 180000);
                } else if (ROBBING == true) {
                    player.call(`notification`, ["4", "Du raubst bereits schon aus!"]);
                }
            } else {
                player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
            }
        });
    }
});

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range, (_player) => {
        if(player != _player) {
            let _dist = _player.dist(player.position);
            if(_dist < dist) {
                currentTarget = _player;
                dist = _dist;
            }
        }
    });
}

mp.events.add("bankexitrob",(player, posi) => {
    console.log("huhu"+player.position);
    console.log("huhu"+posi);
    if (player.position !== posi) {
        player.stopAnimation();
        player.setVariable("ROBBING",false);
        player.call(`notification`, ["4", "Du hast dich zuweit entfernt"]);
    }
});

// Exit Verarbeiter COLSHAPE
/*function playerExitColshapeHandler(player, shape) {
    if(mp.players.exists(player)) {
        console.log("ATM: ");
      if(shape == shape) {
        var state = player.getVariable("ROBBING");
        if (state == true) {
          player.setVariable("ROBBING",false);  
          player.stopAnimation();
          player.call(`notification`, ["4", "Du hast dich zuweit entfernt"]);
        }
      }
    }
  }  
  mp.events.add("playerExitColshape", playerExitColshapeHandler);*/

