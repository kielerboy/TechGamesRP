mp.events.add("server:Global:GetBankMoney", (player) => {
  gm.databaseManager.getConnection().query("SELECT amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
      if (err) console.log(err);
      var amount = res[0].amout;
        player.call("client:Handy:ShowBankAmount", [amount])
  });
});

mp.events.add("server:Global:showDispatch", (player, value, playerposx, playerposy, playerposz) => {
  if (mp.players.exists(player)) {
    console.log("teste"+value);
    var dispatchid = 0;
    dispatchid = "" + Math.floor(Math.random() * 5000);  
    gm.databaseManager.getConnection().query("INSERT INTO fraction_dispatches (fraction,posx,posy,posz,dispatchid, von, active) VALUES (?,?,?,?,?,?,'Y')",[value,playerposx,playerposy,playerposz,dispatchid,player.data.internalId], function (err, res) {
      mp.events.call("sqlLog", player, player.data.ingameName+" hat einen Dispatch an " + value + " gesendet.");
    if(value == "lsmc") {
      var sendDispatchTo = "LSMC";
    } else if (value == "lspd") {
      var sendDispatchTo = "LSPD";
    } else if (value == "acls") {
      var sendDispatchTo = "ACLS";
    } else if (value == "FuelLSPD") {
      let rand = Math.random() * (10 - 1) + 1;
      rand = parseInt(rand);
      var hint = "";
      var hintType = "";
      if(rand == 1 || rand == 2 || rand == 3) {
        if (mp.vehicles.exists(player.vehicle)) {
          hint = player.vehicle.getVariable("numberPlate");
        }
        hintType = "numberplate";
    } else if (value == "AtmRob") {
    } else if (value == "Door1Bank") {
    } else if (value == "Door2Bank") {
      } else if (rand == 4 || rand == 5 || rand == 6) {
        if (player.data.gender == 0) hint = "männlich";
        else hint = "weiblich"
        var hintType = "gender";
      }
    }    
    mp.players.forEach(
      (receiver, id) => {
        var fractionData = JSON.parse(receiver.data.fractionData);
        if(fractionData != undefined) {
          if (fractionData.fractionName == sendDispatchTo && fractionData.playerFractionDuty == "Y") {
            if(sendDispatchTo == "LSMC") {
              receiver.call("client:medic:showDispatch", [playerposx, playerposy, playerposz, dispatchid]);
            } else if (sendDispatchTo == "LSPD") {
              receiver.call("client:police:showDispatch", [playerposx, playerposy, playerposz, dispatchid]);
            } else if (sendDispatchTo == "ACLS") {
              receiver.call("client:cabco:showDispatch", [playerposx, playerposy, playerposz, dispatchid]);
            }
          } else if (fractionData.fractionName == "LSPD" && fractionData.playerFractionDuty == "Y" && value == "FuelLSPD") {
            receiver.call("client:police:fuelstation", [playerposx, playerposy, playerposz, hint, hintType]);
          } else if (fractionData.fractionName == "LSPD" && fractionData.playerFractionDuty == "Y" && value == "AtmRob") {
            receiver.call("client:police:atmrob", [playerposx, playerposy, playerposz]);
          } else if (fractionData.fractionName == "LSPD" && fractionData.playerFractionDuty == "Y" && value == "Door1Bank") {
            receiver.call("client:police:door1bank", [playerposx, playerposy, playerposz]);
          } else if (fractionData.fractionName == "LSPD" && fractionData.playerFractionDuty == "Y" && value == "Door2Bank") {
            receiver.call("client:police:door2bank", [playerposx, playerposy, playerposz]);
          }
        }
      }
    );
    }); 
  }
});

mp.events.add("server:Global:getVehNearPlayer", (player, trigger) => {
  if (mp.players.exists(player)) {
    if(player && trigger){
      const returnVehicles = [];
      mp.vehicles.forEachInRange(position, range,
          (vehicle) => {
              returnVehicles.push(vehicle);
          }
      );
      VehToPlayerEvent = JSON.stringify(returnVehicles);
      player.call("client:Global:recvVehNearPlayer",[VehToPlayerEvent, trigger]);
    }
  }
});

mp.events.add("server:Global:inventoryWeight", (player) => {
  if (mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.internalId], function(err, res) {
      if (err) console.log("Error in get Inventory Query: "+err);
      else {
        if (res.length > 0) {
          var i = 1;
          var weight = 0.00;
          var inv = {};
          res.forEach(function(item) {
            if (i == res.length) {
              inv[""+item.id] = item;
              weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
            } else {
              inv[""+item.id] = item;
              weight = parseFloat(parseFloat(weight) + (parseInt(item.amout) * parseFloat(item.itemcount))).toFixed(2);
            }
            i = parseInt(parseInt(i) + 1);
          });
          if (mp.players.exists(player)) player.data.weight = weight;
        } else {
          if (mp.players.exists(player)) player.data.weight = weight;
        }
      }
    });
  }
});

mp.events.add({
    "sqlLog" : async (player, logfile) => {
        try {
            if(!player) return;
            if(!logfile) return;
             gm.databaseManager.getConnection().query("INSERT INTO logs (id, playername, log, socialclub, ip) VALUES ('',?,?,?,?)", [player.data.ingameName, logfile, player.socialClub, player.ip], function(err, res) {
                    if(err) console.log("FILE: ERROR on sqlLog for player " + player.data.ingameName + ": " + err);
            });
        } catch(ex) {
            return console.log("FILE: ERROR on sqlLog for player " + player.data.ingameName + ": " + ex);
        }
    }
});

mp.events.add({
  "adminlog" : async (player, logfile) => {
      try {
          if(!player) return;
          if(!logfile) return;
           gm.databaseManager.getConnection().query("INSERT INTO adminlogs (id, playername, log, socialclub, ip) VALUES ('',?,?,?,?)", [player.data.ingameName, logfile, player.socialClub, player.ip], function(err, res) {
                  if(err) console.log("FILE: ERROR on sqlLog for player " + player.data.ingameName + ": " + err);
          });
      } catch(ex) {
          return console.log("FILE: ERROR on adminsqlLog for player " + player.data.ingameName + ": " + ex);
      }
  }
});

function playerQuitHandler(player, exitType, reason) {
  gm.databaseManager.getConnection().query("UPDATE characters SET isOnline = 'N', currentOnlineId = 0 WHERE id = ?", [player.data.internalId], function(err, res) {
    if (err) console.log("Error in update player on quit: "+err);
  });
}

mp.events.add("playerQuit", playerQuitHandler);