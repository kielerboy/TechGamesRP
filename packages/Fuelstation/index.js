mp.events.add('server:fuelStation:start', (player) => {
  if(mp.players.exists(player)) {
    var vehicles = getVehicleFromPosition(player.position, 3);
    if (vehicles.length > 0) {
      if(mp.vehicles.exists(vehicles[0])) {
        var currFuel = vehicles[0].getVariable("fuel");
        if (vehicles[0].getVariable("isRunning") == "false") {
          if (vehicles[0].getVariable("fuel") == "100") {
            player.notify("Du hast einen vollen Tank.");
          } else {
            player.call("client:fuelstation:setFuel");
          }
        } else {
          player.notify("Bitte schalte zum tanken den Motor aus!");
        }
      }
    } else {
      player.notify("Es befindet sich kein Auto in der Nähe!");
    }
  }
});

mp.events.add("server:fuelStation:startFueling",(player, type) => {
  if(mp.players.exists(player)) {
    var vehicles = getVehicleFromPosition(player.position, 3);
    if (vehicles.length > 0) {
      if (mp.vehicles.exists(vehicles[0])) {
        var fuel = vehicles[0].getVariable("fuel");
        var treibstoff = vehicles[0].getVariable("treibstoff");
        var tankvolumen = vehicles[0].getVariable("tankvolumen");
        var percentToFill = 100 - parseFloat(fuel);

        var calc = parseFloat(((parseFloat(percentToFill) * parseFloat(tankvolumen)) / 100));
        calc = calc.toFixed(2);

        if (type == "Benzin") {
          var price = calc * 1.19;
        } else if (type == "Diesel") {
          var price = calc * 0.99;
        }
        price = price.toFixed(2);
        player.notify("Du tankst "+calc+" Liter "+type+" für "+price+"$");
        player.notify("Bitte warte das Tanken ab...");

        var time = calc * 3000;
        time = parseInt(time);

        // Test Kommentar für neue Githook
        player.call("client:progressbar:start",[100, time]);

        setTimeout(function() {
          try{
            if (mp.players.exists(player)){
              if (mp.vehicles.exists(vehicles[0])) {
                if (!vehicles[0].getVariable("isMedic") && !vehicles[0].getVariable("isPolice")) {
                  player.call("client:fuelstation:payMenu",[price]);
                } else {
                  player.notify("Der Staat hat für das Tanken des Dienstfahrzeug gezahlt.");
                }
                if (type != treibstoff) {
                  vehicles[0].setVariable("misfueled","true");
                }
                vehicles[0].setVariable("fuel","100");
                player.notify("Das Auto wurde vollgetankt!");
              }
            }
          } catch (e){
            console.log("ERROR - Fuelstation - startFueling: " + e);
          }
        }, time);
      }
    }
  }
});

mp.events.add('server:fuelStation:payCard',(player, amount) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
      if (err) console.log(err);

      if (res.length > 0) {
        gm.databaseManager.getConnection().query("SELECT amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err2, res2) {
          if (err2) console.log(err2);

          res2.forEach(function (am) {
            if(am.amout >= amount){
            var newAm = am.amout - amount;
            newAm = newAm.toFixed(2);

            gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                if (err3) console.log(err3);
            });
            player.notifyWithPicture("Fleeca Bank", "Fleeca Bank San Andreas", "Die Tranksaktion wurde durchgeführt!", "CHAR_BANK_FLEECA");

          } else {
            player.notify("Du hast nicht genug Geld!");
            player.call("client:fuelstation:payMenu",[amount]);
          }
        });
      });
      } else {
        player.notify("Du besitzt kein Bankkonto!");
        player.call("client:fuelstation:payMenu",[amount]);
      }
    });
  }
});

mp.events.add('server:fuelStation:payCash',(player, amount) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT id FROM characters WHERE id = ?", [player.data.internalId], function (err, res) {
      if (err) console.log(err);

      if (res.length > 0) {
        gm.databaseManager.getConnection().query("SELECT money FROM characters WHERE id = ?", [player.data.internalId], function (err2, res2) {
          if (err2) console.log(err2);

          res2.forEach(function (am) {
            if(mp.players.exists(player)) {
              if(am.money >= amount){
                var newAm = am.money - amount;
                newAm = newAm.toFixed(2);
                gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.internalId], function (err3, res3) {
                    if (err3) console.log(err3);
                });
                player.notify("Du hast den Betrag bezahlt.");
                player.call("updateHudMoney", newAm);
                player.call("changeValue", ["money", newAm]);
              } else {
                player.notify("Du hast nicht genug Geld!");
                player.call("client:fuelstation:payMenu",[amount]);
              }
            }
          });
        });
      } else {
        if(mp.players.exists(player)) {
          player.notify("Du existierst scheinbar nicht.");
          player.call("client:fuelstation:payMenu",[amount]);
        }
      }
    });
  }
});

mp.events.add('server:fuelStation:payCheat',(player, amount) => {
  if(mp.players.exists(player)) {
    var playerposx = player.position.x;
    var playerposy = player.position.y;
    var playerposz = player.position.z;
    var value = "FuelLSPD";
    mp.events.call("server:Global:showDispatch", player, value, playerposx, playerposy, playerposz);
  }
});

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];
    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}
