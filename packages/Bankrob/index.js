///
let Tur1 = mp.colshapes.newSphere(257.297, 219.957, 106.286, 3, 0);
let Tur2 = mp.colshapes.newSphere(261.708, 223.078,105.283,3, 0);
let fach1 = mp.colshapes.newSphere(258.269, 218.064, 101.683, 1, 0);
let fach2 = mp.colshapes.newSphere(259.61, 217.870, 101.68, 1, 0);
let fach3 = mp.colshapes.newSphere(261.082, 217.268, 101.68, 1, 0);
let fach4 = mp.colshapes.newSphere(259.851, 213.757, 101.683, 1, 0);
let fach5 = mp.colshapes.newSphere(258.352, 214.640, 101.683, 1, 0);
let fach6 = mp.colshapes.newSphere(266.898, 214.858, 101.683, 1, 0);
mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    if(Tur1.isPointWithin(player.position)) {
        player.call("client:bankrob:door1");        
    }
    if(Tur2.isPointWithin(player.position)) {
        player.call("client:bankrob:door2");        
    }
    if(fach1.isPointWithin(player.position)) {
        mp.events.call("server:bank:tresor1",player);        
    }
    if(fach2.isPointWithin(player.position)) {
        mp.events.call("server:bank:tresor2",player);        
    }
    if(fach3.isPointWithin(player.position)) {
        mp.events.call("server:bank:tresor3",player);        
    }
    if(fach4.isPointWithin(player.position)) {
        mp.events.call("server:bank:tresor4",player);        
    }
    if(fach5.isPointWithin(player.position)) {
        mp.events.call("server:bank:tresor5",player);        
    }
    if(fach6.isPointWithin(player.position)) {
        mp.events.call("server:bank:tresor6",player);        
    }
  }
});


mp.events.add("server:bankrob:door1",(player) => {     
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
            if (err) console.log("Error in Count Duty Officers: "+err);
            if (res[0].counter >= 1) {               
                player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                player.call("client:dispatch:bankdoor1");   
                time = 120000
                player.call("client:progressbar:start",[100, time]);   
                player.setVariable("BANKROB",true); 
                setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                    player.call(`notification`, ["2", "Tür wurde geknackt"]);
                }, 120000);
            } else {
                player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
            }
        });     
    }    
});

mp.events.add("server:bankrob:door2",(player) => {     
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
            if (err) console.log("Error in Count Duty Officers: "+err);
            if (res[0].counter >= 1) {               
                player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                player.call("client:dispatch:bankdoor2");   
                time = 120000
                player.call("client:progressbar:start",[100, time]);   
                player.setVariable("BANKROB",true); 
                setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                    player.call(`notification`, ["2", "Tür wurde geknackt"]);
                }, 120000);
            } else {
                player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
            }
        });     
    }    
});

var lastTresor1 = 0;
mp.events.add("server:bank:tresor1",(player) => {        
    if (mp.players.exists(player)) {        
        console.log(lastTresor1);
        if (Date.now() > lastTresor1 + 600000) {
            gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
                if (err) console.log("Error in Count Duty Officers: "+err);
                if (res[0].counter >= 1) {               
                    player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                    time = 120000
                    player.call("client:progressbar:start",[100, time]);   
                    player.setVariable("ROBBING",true); 
                    setTimeout(_ => {
                        if (mp.players.exists(player)) player.stopAnimation();
                            robMoney = "" + Math.floor(Math.random() * 5000);
                            var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                                if (err) console.log("Error in Update money: "+err);
                                player.data.money = newAm;
                                player.call("updateHudMoney",[newAm]);
                                player.call("changeValue",["money",newAm]);
                                player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                                player.setVariable("ROBBING",false);   
                                lastTresor1 = Date.now()
                            });
                    }, 120000);
                } else {
                    player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
                }
            });
        } else {
            player.call(`notification`, ["4", "Hier ist nichts drinne!"]);  
        }    
    }    
});

var lastTresor2 = 0;
mp.events.add("server:bank:tresor2",(player) => {        
    if (mp.players.exists(player)) {        
        if (Date.now() > lastTresor2 + 600000) {
            gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
                if (err) console.log("Error in Count Duty Officers: "+err);
                if (res[0].counter >= 1) {               
                    player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                    time = 120000
                    player.call("client:progressbar:start",[100, time]);   
                    player.setVariable("ROBBING",true); 
                    setTimeout(_ => {
                        if (mp.players.exists(player)) player.stopAnimation();
                            robMoney = "" + Math.floor(Math.random() * 5000);
                            var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                                if (err) console.log("Error in Update money: "+err);
                                player.data.money = newAm;
                                player.call("updateHudMoney",[newAm]);
                                player.call("changeValue",["money",newAm]);
                                player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                                player.setVariable("ROBBING",false);   
                                lastTresor2 = Date.now()
                            });
                    }, 120000);
                } else {
                    player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
                }
            });
        } else {
            player.call(`notification`, ["4", "Hier ist nichts drinne!"]);  
        }    
    }    
});

var lastTresor3 = 0;
mp.events.add("server:bank:tresor3",(player) => {        
    if (mp.players.exists(player)) {        
        if (Date.now() > lastTresor3 + 600000) {
            gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
                if (err) console.log("Error in Count Duty Officers: "+err);
                if (res[0].counter >= 1) {               
                    player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                    time = 120000
                    player.call("client:progressbar:start",[100, time]);   
                    player.setVariable("ROBBING",true); 
                    setTimeout(_ => {
                        if (mp.players.exists(player)) player.stopAnimation();
                            robMoney = "" + Math.floor(Math.random() * 5000);
                            var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                                if (err) console.log("Error in Update money: "+err);
                                player.data.money = newAm;
                                player.call("updateHudMoney",[newAm]);
                                player.call("changeValue",["money",newAm]);
                                player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                                player.setVariable("ROBBING",false);   
                                lastTresor3 = Date.now()
                            });
                    }, 120000);
                } else {
                    player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
                }
            });
        } else {
            player.call(`notification`, ["4", "Hier ist nichts drinne!"]);  
        }    
    }    
});

var lastTresor4 = 0;
mp.events.add("server:bank:tresor4",(player) => {        
    if (mp.players.exists(player)) {        
        if (Date.now() > lastTresor4 + 600000) {
            gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
                if (err) console.log("Error in Count Duty Officers: "+err);
                if (res[0].counter >= 1) {               
                    player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                    time = 120000
                    player.call("client:progressbar:start",[100, time]);   
                    player.setVariable("ROBBING",true); 
                    setTimeout(_ => {
                        if (mp.players.exists(player)) player.stopAnimation();
                            robMoney = "" + Math.floor(Math.random() * 5000);
                            var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                                if (err) console.log("Error in Update money: "+err);
                                player.data.money = newAm;
                                player.call("updateHudMoney",[newAm]);
                                player.call("changeValue",["money",newAm]);
                                player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                                player.setVariable("ROBBING",false);   
                                lastTresor4 = Date.now()
                            });
                    }, 120000);
                } else {
                    player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
                }
            });
        } else {
            player.call(`notification`, ["4", "Hier ist nichts drinne!"]);  
        }    
    }    
});

var lastTresor5 = 0;
mp.events.add("server:bank:tresor5",(player) => {        
    if (mp.players.exists(player)) {
        if (Date.now() > lastTresor5 + 600000) {
            gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
                if (err) console.log("Error in Count Duty Officers: "+err);
                if (res[0].counter >= 1) {               
                    player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                    time = 120000
                    player.call("client:progressbar:start",[100, time]);   
                    player.setVariable("ROBBING",true); 
                    setTimeout(_ => {
                        if (mp.players.exists(player)) player.stopAnimation();
                            robMoney = "" + Math.floor(Math.random() * 5000);
                            var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                                if (err) console.log("Error in Update money: "+err);
                                player.data.money = newAm;
                                player.call("updateHudMoney",[newAm]);
                                player.call("changeValue",["money",newAm]);
                                player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                                player.setVariable("ROBBING",false);   
                                lastTresor5 = Date.now()
                            });
                    }, 120000);
                } else {
                    player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
                }
            });
        } else {
            player.call(`notification`, ["4", "Hier ist nichts drinne!"]);  
        }    
    }    
});

var lastTresor6 = 0;
mp.events.add("server:bank:tresor6",(player) => {        
    if (mp.players.exists(player)) {        
        if (Date.now() > lastTresor6 + 600000) {
            gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
                if (err) console.log("Error in Count Duty Officers: "+err);
                if (res[0].counter >= 1) {               
                    player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);   
                    time = 120000
                    player.call("client:progressbar:start",[100, time]);   
                    player.setVariable("ROBBING",true); 
                    setTimeout(_ => {
                        if (mp.players.exists(player)) player.stopAnimation();
                            robMoney = "" + Math.floor(Math.random() * 5000);
                            var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                                if (err) console.log("Error in Update money: "+err);
                                player.data.money = newAm;
                                player.call("updateHudMoney",[newAm]);
                                player.call("changeValue",["money",newAm]);
                                player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                                player.setVariable("ROBBING",false);   
                                lastTresor6 = Date.now()
                            });
                    }, 120000);
                } else {
                    player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
                }
            });
        } else {
            player.call(`notification`, ["4", "Hier ist nichts drinne!"]);  
        }    
    }    
});