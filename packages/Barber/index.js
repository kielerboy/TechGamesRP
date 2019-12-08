let BarberShape = mp.colshapes.newSphere(-30.46, -151.82, 57.07, 3, 0);

mp.events.add("server:Keybind:KeyE", (player) => {
  if (mp.players.exists(player)) {
    if(BarberShape.isPointWithin(player.position)) {
      gm.databaseManager.getConnection().query("SELECT data FROM charactermodel WHERE internalId='" + player.data.internalId + "'", function (err, res) {
        if (err){
          console.log("BARBER: Fehler beim Laden der charactermodel.data aus Datenbank");
          return;
        } else if (res.length > 0){
          let data = JSON.parse(res[0].data);
          player.call("client:Barber:OpenMenu",[data.Hair[0], data.Hair[1], data.Hair[2]]);
        }
      });
    }
  }
});

mp.events.add("server:Barber:SetHair", (player, hairID) => {
  if (mp.players.exists(player)) {
    player.setClothes(2, hairID, 0, 2);
  }
});

mp.events.add("server:Barber:save", (player, hairID, colorID, highlightID, money) => {
  if (mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT data FROM charactermodel WHERE internalId='" + player.data.internalId + "'", function (err, res) {
      if (err){
        console.log("BARBER: Fehler beim Laden der charactermodel.data aus Datenbank");
        return;
      } else if (res.length > 0){
        data = JSON.parse(res[0].data);
        data.Hair[0] = hairID;
        data.Hair[1] = colorID;
        data.Hair[2] = highlightID;
        dataToSave = JSON.stringify(data);
        gm.databaseManager.getConnection().query("UPDATE charactermodel SET data =? WHERE internalId='" + player.data.internalId + "'", [dataToSave], function (err, res) {
          if (err){
            console.log("BARBER: Fehler beim Speichern der charactermodel.data in Datenbank");
            return;
          } else {
            player.data.money = money;
            gm.databaseManager.getConnection().query("UPDATE `characters` SET money = ? WHERE id = ?",[money, player.data.internalId], function(errPlayer, resPlayer) {
              if (errPlayer) console.log("BARBER: Fehler beim Speichern des Bargeldes für CharID " + player.data.internalId + " - " + errPlayer);
            });
          }
        });
      }
    });
  }
});



mp.events.add("server:Barber:SetColor", (player, p1, p2) => {
  if (mp.players.exists(player)) {
    player.setHairColor(p1, p2);
  }
});

// EXIT
function playerExitColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape === BarberShape) {
      //Spieler hat colshape verlassen
      player.call("client:Barber:closeMenu")
    }
  }
}
