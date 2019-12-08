module.exports = {
    createMenu: function (player, triggerName, menuName, itemList) {
        player.call("createMenu", [triggerName, menuName, itemList]);
    },

    createInput: function (player, trigger) {
        player.call("createInput", [trigger]);
    },

    createInputShop: function (player, trigger) {
        player.call("createInputShop", [trigger]);
    },

    //UPDATE CHAR INV AT BUY
    updateCharacterItem: function (charId, itemId, amout, clbUpdate) {

        //CHECKEN OB ITEM EXISTIERT
        gm.databaseManager.getConnection().query("SELECT itemName FROM items WHERE id = ?", [itemId], function (errCheckItem, resCheckItem) {
            if (errCheckItem) console.log(errCheckItem);
            if (resCheckItem.length > 0) {

                //ITEM EINZELGEWICHT AUS DER DB
                gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = ?",[itemId], function(errSet, rowUpdate){
                    //console.log("     SINGLE ITEMWEIGHT TO UPDATE: " + rowUpdate[0].itemcount);

                    //ITEMGEWICHT MIT AMOUNT MULTIPLIZIEREN FÜRS UPDATEN
                    var newItemWeightToUpdate = amout * rowUpdate[0].itemcount;
                    //console.log("     MULTIPLIED ITEMWEIGHT TO UPDATE: " + newItemWeightToUpdate);

                    //AKTUELLES CHARAKTERGEWICHT
                    gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [charId], function (erractualInvUp, rowactualInvUp){
                        if(erractualInvUp) console.log(erractualInvUp);
                        //console.log("     ACTUALY CHARINV TO UPDATE: " + rowactualInvUp[0].weight);


                        //Akutelle Inventargröße aus DB
                        gm.databaseManager.getConnection().query("SELECT inventory FROM characters WHERE id = ?", [charId], function (errActChinvUpdate, rowActChinvUpdate) {
                            var achtualInvForUpdate = rowActChinvUpdate[0].inventory;

                            //Aktuelles Charaktergewicht mit Itemweight addieren.
                            var newCharacterweightUpdate = newItemWeightToUpdate + rowactualInvUp[0].weight;
                            //console.log("     UPDATED CHARWEIGHT TO UPDATE: " + newCharacterweightUpdate);

                            if(newCharacterweightUpdate < achtualInvForUpdate) {

                                gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newCharacterweightUpdate, charId], function (errUpdateCweight, resUpdateCweight) {
                                    if(errUpdateCweight) console.log(errUpdateCweight);
    
                                    if (parseInt(amout)) {
                   
                                        gm.databaseManager.getConnection().query("SELECT amout , id FROM user_items WHERE charId = ? AND itemId = ?", [charId, itemId], function (err3, res3) {
                                            if (err3) console.log("Error in SELECT amout query (toClient.js)" + err3);
                                                
                                                
                                            res3.forEach(function (am) {
                                                gm.databaseManager.getConnection().query("UPDATE user_items SET amout = ? WHERE charId = ? AND id = ?", [am.amout * 1 + amout * 1, charId, am.id], function (err4, res4) {
                                                    if (err4) console.log("Error in UPDATE user_items query (toClient.js)" + err4);
                                                    clbUpdate(true, "Item erfolgreich geupdatet!");
                                                })
                                                
                                            })     
                                        })
                    
                                    }
                                })
                            }
                            else if( newCharacterweightUpdate > achtualInvForUpdate) {
    
                                player = mp.players.local;
                                player.notify("Soviel Gewicht kannst du nicht tragen.");
    
                            }
                        
                        })
                    })

                });

            }
        });
    },

    //SET ITEM CHAR AT BUY
    setCharacterItem: function (charId, itemId, amout, clbSet) {
        gm.databaseManager.getConnection().query("SELECT itemName FROM items WHERE id = ?", [itemId], function (err5, res5) {
            if (err5) console.log("Error in SELECT itemName query (toClient.js)" + err5);
            
            gm.databaseManager.getConnection().query("SELECT itemcount FROM items WHERE id = ?",[itemId], function(errSet, rowSet){
                if(errSet) console.log(errSet);
                
                //Einzel Gewicht eines Items
                //console.log("     SINGLE ITEMWEIGHT: " + rowSet[0].itemcount);

                //Eingegebenen Amount mit Item Gewicht Multiplizieren
                var newItemWeightSet = amout * rowSet[0].itemcount;
                //console.log("     MULTIPLE ITEMWEIGHT: " + newItemWeightSet);

                //Aktuelles Charaktergewicht
                gm.databaseManager.getConnection().query("SELECT weight FROM characters WHERE id = ?", [charId], function (errGetInv, rowSetInv){

                    //Akutelle Inventargröße aus DB
                    gm.databaseManager.getConnection().query("SELECT inventory FROM characters WHERE id = ?", [charId], function (errActChinv, rowActChinv) {
                        if(errActChinv) console.log (errActChinv);
                        var actualInventory = rowActChinv[0].inventory;
                        //console.log("     ACTUALLY CHARINVSIZE: " + actualInventory);

                        //Aktuelles Charaktergewicht aus DB
                        if(errGetInv) console.log(errGetInv);
                        //console.log("     ACTUALLY CHARWEIGHT: " + rowSetInv[0].weight);
                
                        //Aktuelles Charaktergewicht mit Itemweight addieren.
                        var newCharacterweight = newItemWeightSet + rowSetInv[0].weight;
                        //console.log("     UPDATED CHARWEIGHT: " + newCharacterweight);

                        //Charactergewicht updaten
                        if(newCharacterweight < actualInventory) {

                            gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newCharacterweight, charId], function (errUpdateCweight, resUpdateCweight) {
                                if(errUpdateCweight) console.log(errUpdateCweight);

                                if (parseInt(amout)) {
                                    gm.databaseManager.getConnection().query("INSERT INTO user_items (id, charId, itemId, amout) VALUES ( NULL, ?, ?, ? )", [charId, itemId, amout], function (err6, res6) {
                                        if (err6) console.log("Error in charSetItem (toClient.js)" + err6);
                                        clbSet(true, "Item erfolgreich erstellt!");
                                    });
                                }
                            })
                        }
                        else if( newCharacterweight > actualInventory) {

                            player = mp.players.local;
                            player.notify("Soviel Gewicht kannst du nicht tragen.");

                        }
                        
                    })
                
                })

            });
        });
    }
}