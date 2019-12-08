mp.events.add("giveWeedbuds", (player) => {
    player.stopAnimation();
    var amount = Math.floor((Math.random() * 3) + 1);
    if(player.data.weight > 10){
        player.notify("Du kannst nicht soviel tragen!");
        return;
    };
    gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function(errcheckWeed,resWeed) {
        if(resWeed == ""){
            gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 60, ?)", [player.data.internalId, amount], function(errGiveWeed,resGiveWeed) {
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
        }
        else
        {
            gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function(errcheckWeed,rowWeed) {
                var newAmount = parseInt(rowWeed[0].amout) + amount;
                gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND itemId = '60'", [newAmount, player.data.internalId], function(errGiveWeed,resGiveWeed) {
                    player.notify("Du hast insgesamt: ~g~" + amount + "x ~w~Buds geerntet.");
                    if(errGiveWeed) console.log(errGiveWeed);

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
});

//WEED ABPACKEN AKA VERARBEITEN
mp.events.add("packWeed", (player) => {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function (errPackWeed, resPackBuds) {
        if(resPackBuds == "") {
            player.notify("Komm wieder wenn du Buds bei dir hast.")
        }
        else
        {
            gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function(errcheckWeed,rowPackWeed) {
                //1:1 Verarbeitung
                var newAmount = rowPackWeed[0].amout;
                gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, 62, ?)",[player.data.internalId, newAmount], function(errPackWeed3,resPackWeed3) {
                    if(errPackWeed3) console.log(errPackWeed3);
                    
                    gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                        if(errWeight)console.log(errWeight);
                        var charWeight = rowWeight[0].weight;
                        gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '62'", function(errItemweight, rowItemweight) {
                            gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '60'", function (errBuds,rowBuds){
                                var budsWeight = rowBuds[0].itemcount;
                                var WeedBaggyWeight = rowItemweight[0].itemcount;
                                var calculateNewWeight = charWeight - budsWeight * newAmount;
                                var amountWeight = newAmount * WeedBaggyWeight;
                                //NEUES CHARACTERGEWICHT
                                var newCharWeight = calculateNewWeight + amountWeight;
                                gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newCharWeight, player.data.internalId], function (errNewWeight, resNewWeight){
                                    if(errNewWeight) console.log(errNewWeight);
                                    gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND itemId = '60'", [player.data.internalId], function (errDeleteOldItem){
                                        if(errDeleteOldItem) console.log(errDeleteOldItem);
                                        //SPIELER BENACHRICHTIGEN
                                        player.notify("Du hast ~g~" + newAmount + " ~w~x ~g~Buds~w~ in kleine Baggys abgepackt.");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };
    });
});

//JOINTS ROLLEN ZUM BEHALTEN ODER VERKAUFEN
mp.events.add("rollJoints", (player) => {
    player.stopAnimation();
    gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '62'", [player.data.internalId], function (errRollJoint, resBaggy) {
        if(resBaggy == "") {
            player.notify("Komm wieder wenn du Weed abgepackt hast.");
        }
        else
        {
            gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '61'", [player.data.internalId], function(errcheckWeed,resJoints) {
                if(resJoints == ""){
                    gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '62'", [player.data.internalId], function(errGiveWeed,rowAmount) {
                        var newJoints = rowAmount[0].amout;
                        gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, '61', ?)", [player.data.internalId, newJoints], function (err1,res1) {
                            if(err1) console.log(err1);

                            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND itemId = '62'", [player.data.internalId], function (errDeleteOldItem){
                                if(errDeleteOldItem) console.log(errDeleteOldItem);

                                gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                                    
                                    if(errWeight)console.log(errWeight);
                                    var charWeight = rowWeight[0].weight;
                                    gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '61'", function(errItemweight, rowItemweight) {
                                        gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '62'", function (errWeed,rowWeed){
                                            var baggyWeight = rowWeed[0].itemcount;
                                            var itemWeight = rowItemweight[0].itemcount;
                                            var calculateNewWeight = charWeight - baggyWeight * newJoints;
                                            var amountWeight = newJoints * itemWeight;
                                            var newCharWeight = calculateNewWeight + amountWeight;
                                            gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newCharWeight, player.data.internalId], function (errNewWeight, resNewWeight){
                                                if(errNewWeight) console.log(errNewWeight);
                                                //SPIELER BENACHRICHTIGEN
                                                player.notify("Du hast ~g~" + newJoints + " ~w~x~g~Joints~w~ aus deinem Weed gedreht!");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                else
                {
                    gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '62'", [player.data.internalId], function(errGiveWeed,rowAmountUpdate) {
                        var newJoints = rowAmountUpdate[0].amout;

                        gm.databaseManager.getConnection().query("SELECT amout FROM user_items WHERE charId = ? AND itemId = '61'", [player.data.internalId], function(errGiveWeed,rowAmount1) {
                            var actualJoints = rowAmount1[0].amout;
                            var newInventoryJoints = actualJoints + newJoints;
                        
                            gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE itemId = '61' AND charId = ?", [newInventoryJoints, player.data.internalId], function (err2,res2) {
                                if(err2) console.log(err2);

                                gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE charId = ? AND itemId = '62'", [player.data.internalId], function (errDeleteOldItem){
                                    if(errDeleteOldItem) console.log(errDeleteOldItem);
                                    gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [player.data.internalId], function (errWeight, rowWeight) {
                                        if(errWeight)console.log(errWeight);
                                        var charWeight = rowWeight[0].weight;
                                        gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = '61'", function(errItemweight, rowItemweight) {
                                            var itemWeight = rowItemweight[0].itemcount;
                                            var amountWeight = newJoints * itemWeight;
                                            var newCharWeight = charWeight + amountWeight;
                                            gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newCharWeight, player.data.internalId], function (errNewWeight, resNewWeight){
                                                if(errNewWeight) console.log(errNewWeight);
                                                //SPIELER BENACHRICHTIGEN
                                                player.notify("Du hast ~g~" + newJoints + " ~w~x~g~Joints~w~ aus deinem Weed gedreht!");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                };
            });
        };
    });
});

mp.events.add("server:jobs:weed:startProgress", (player) => {
    time = 15000
    player.call("client:progressbar:start",[100, time]);
});

mp.events.add("server:jobs:weed:setstate", (player) => {
    player.setVariable('collect','COLLECTINGBUDS');
});

mp.events.add("server:jobs:weed:setstatenormal", (player) => {
    player.setVariable('collect','NOTCOLLECTINGBUDS');
});
mp.events.add("server:jobs:weed:setpackstate", (player) => {
    player.setVariable('packweed','PACKING');
});
mp.events.add("server:jobs:weed:setpackstatenormal", (player) => {
    player.setVariable('packweed','NOTPACKING');
});
mp.events.add("server:jobs:weed:setrollstate", (player) => {
    player.setVariable('roll','ROLLING');
});
mp.events.add("server:jobs:weed:setrollstatenormal", (player) => {
    player.setVariable('roll','NOTROLLING');
});

