let jobShape = mp.colshapes.newSphere(879.444, -1257.135, 26.3593, 3, 0);

mp.events.add("server:Keybind:KeyE", (player) => {
    if(jobShape.isPointWithin(player.position)) {
        player.call("client:speditoer:openMenu");
    }
});

// EXIT COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if(shape == jobColShape) {
    //Spieler hat colshape verlassen
    player.call("client:speditoer:closeMenu")
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);


mp.events.add("server:spediteur:unterschreiben", (player,unterschreiben) => {
  function unterschreiben(player) {
    if(mp.players.exists(player)){
      player.notify("nach if vor DB");
        gm.databaseManager.getConnection().query("INSERT INTO jobusers(charID,jobid) VALUES(?,1)", [player.data.internalId], function(err, res) {
        if (err2) console.log("Error in adding Job Player "+err);
          else {
             player.notify("Du hast den Job als Spediteur angenommen!");
                    }
                });
              }
          }
          unterschreiben(player);
       });


       mp.events.add("server:spediteur:kündigen", (player,kündigen) => {
        function kündigen(player) {
          if(mp.players.exists(player)){
            player.notify("nach if vor DB");
              gm.databaseManager.getConnection().query("DELETE FROM jobusers WHERE jobid = 1 AND charID = ?", [player.data.internalId], function(err2, res2) {
              if (err2) console.log("Error in adding Job Player "+err2);
                else {
                   player.notify("Du hast den Job als Spediteur gekündigt!");
                          }
                      });
                    }
                }
                kündigen(player);
             });


             mp.events.add("server:spediteur:startJob", (player) => {
              if(mp.players.exists(player)){
                gm.databaseManager.getConnection().query("SELECT charID FROM `jobusers` WHERE jobid = ?", [player.data.internalId], function (err3, res) {
                  if (err2) console.log("Error in SELECT JobID "+err3)

                   else if (res.length = 1){
                player.setVariable("isTruckerjob","true");
            }
        });
      }
  });
