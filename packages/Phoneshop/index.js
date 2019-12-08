let PhoneShopShape = mp.colshapes.newSphere(-85.76, 37.53, 71.89, 2, 0);


mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    if(PhoneShopShape.isPointWithin(player.position)) {
      player.call('client:phoneshop:openMenu', player);
    }
  }
});

mp.events.add("inputValueShop", (player,trigger, output) => {
    if(trigger === "phonenumber") {
        var str = output;
        if (str.length == 9) {
            gm.databaseManager.getConnection().query("SELECT telefonnummer FROM characters WHERE id = ? AND telefonnummer = ?", [player.data.internalId, output], function(err, res) {
                if (err) console.log("Error in Selcet Phonenumbers: "+err);
                if (res.length > 0) {
                    player.call(`notification`, ["4", "Die Telefonnummer ist schon vergeben"]);
                } else {
                    gm.databaseManager.getConnection().query("UPDATE characters SET telefonnummer = ? WHERE id = ?", [output, player.data.internalId], function(err2, res2) {
                        if (err2) console.log("Error in Updata Phonenumber: "+err2);
                        player.call(`notification`, ["2", "Die Telefonnummer wurde geändert"]);
                        player.phoneNumber = output;
                    });
                }    
            });
        } else {
            player.call(`notification`, ["4", "Die Telefonnummer muss 9 Zahlen haben"]);
        }
    } 
});