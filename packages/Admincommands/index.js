mp.events.addCommand("fillTank", (player, fullText) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    if (player.vehicle) {
      player.vehicle.setVariable("fuel", "100");
      mp.events.call(
        "adminlog",
        player,
        player.data.ingameName + " hat ein Fahrzeug aufgetankt"
      );
    }
  }
});

mp.events.addCommand("changeweather", (player, fullText) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    gm.weather.currentWeather = fullText;
    mp.events.call(
      "adminlog",
      player,
      player.data.ingameName + " hat dass Wetter geändert"
    );
  }
});

mp.events.addCommand("test", player => {
  var teamData = player.data.teamData;
  teamData = JSON.parse(teamData);
  if (teamData.teamName == "Projektleitung") {
    player.notify("Dein Teamrang -> : " + teamData.teamName);
  }
});

mp.events.addCommand("noose", player => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach(player => {
      player.call("noosenachricht");
      var newWeather = "THUNDER";
      gm.weather.currentWeather = newWeather;
      mp.players.call("client:world:weatherUpdate", [newWeather]);
    });
  }
});

mp.events.addCommand("nooseend", player => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach(player => {
      player.call("nooseend");
      var newWeather = "EXTRASUNNY";
      gm.weather.currentWeather = newWeather;
      mp.players.call("client:world:weatherUpdate", [newWeather]);
      mp.players.call("playerReady");
    });
    gm.weather.currentWeather = "EXTRASUNNY";
  }
});

mp.events.addCommand("banUser", (player, userToBan) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach((playerToBan, id) => {
      if (playerToBan.name == userToBan) {
        var accountId = playerToBan.data.accountId;
        gm.databaseManager
          .getConnection()
          .query(
            "UPDATE `accounts` SET isBanned = 'Y' WHERE id = ?",
            [accountId],
            function (err, res) {
              if (err) console.log("Error in Ban query: " + err);
              mp.events.call(
                "adminlog",
                player,
                player.data.ingameName + " hat" + userToBan + " gebannt"
              );
            }
          );
        playerToBan.outputChatBox(
          `!{255, 0, 0}Du wurdest gebannt. Bitte melde dich im Support!`
        );
        playerToBan.kick("Du wurdest gebannt. Bitte melde dich im Support!");
        playerToBan.call("client:voice:endConnection");
      }
    });
  }
});

mp.events.addCommand("kickUser", (player, userToKick) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach((playerToKick, id) => {
      if (playerToKick.name == userToKick) {
        mp.events.call(
          "adminlog",
          player,
          player.data.ingameName + " hat" + userToKick + " gekickt"
        );
        playerToKick.kick("Du wurdest gekickt!");
        playerToKick.call("client:voice:endConnection");
      }
    });
  }
});

mp.events.addCommand("playersNotify", (player, fullText) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  mp.events.call(
    "adminlog",
    player,
    player.data.ingameName + " hat folgende Notify geschrieben:" + fullText
  );
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach((player, id) => {
      player.notify(fullText);
    });
  }
});

mp.events.add("revall", player => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach((playerToRev, idToRev) => {
      if (playerToRev.health == 0 || playerToRev.health == 1) {
        if (parseInt(playerToRev.getVariable("permaDeathTimer")) == 0) {
          mp.events.call("stopAnimation", playerToRev);
          playerToRev.spawn(playerToRev.position);
          playerToRev.health = 100;
          playerToRev.dimension = playerToRev.dimension;
          playerToRev.call("endDeathScreen", []);
          playerToRev.setVariable("isUnconcious", "false");
          clearTimeout(gm.timers.deathTimers[playerToRev.data.internalId]);
        }
      }
    });
    player.notify("Alle Spieler wiederbelebt!");
    mp.events.call(
      "adminlog",
      player,
      player.data.ingameName + " hat alle Spieler wiederbelebt"
    );
  }
});

mp.events.addCommand("veh", (player, full, hash) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);

  var veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
  veh.dimension = player.dimension;
  veh.numberPlateType = 1;
  veh.numberPlate = "SUPPORT";
  veh.setVariable("isRunning", "true");
  veh.setVariable("fuel", "100.00");
  veh.setVariable("misfueled", "false");
  veh.setVariable("canStart", "true");
  veh.setVariable("owner", String(player.data.internalId));
  if (gm.vehicleData["" + mp.joaat(hash)]) {
    vehData = gm.vehicleData["" + mp.joaat(hash)];
    veh.setVariable("tankvolumen", String(vehData.tankvolumen));
    veh.setVariable("verbrauch", String(vehData.verbrauch));
    veh.setVariable("treibstoff", vehData.treibstoff);
  } else {
    veh.setVariable("tankvolumen", "60");
    veh.setVariable("verbrauch", "2");
    veh.setVariable("treibstoff", "benzin");
  }
  veh.engine = true;
  veh.dead = false;
  player.putIntoVehicle(veh, -1);

  mp.events.call(
    "adminlog",
    player,
    player.data.ingameName + " hat sich ein TempVeh gespawnt " + hash
  );
});

// Command to teleport to player
mp.events.addCommand("tpto", (player, commandName) => {
  mp.events.call(
    "adminlog",
    player,
    player.data.ingameName + " hat sich zu" + commandName + " teleportiert"
  );
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach((playerToSearch, id) => {
      if (playerToSearch.name == commandName) {
        player.spawn(playerToSearch.position);
        player.dimension = playerToSearch.dimension;
      }
    });
  }
});

// Command to teleport a player to you
mp.events.addCommand("tphere", (player, commandName) => {
  mp.events.call(
    "adminlog",
    player,
    player.data.ingameName + " hat" + commandName + " zu sich Teleportiert"
  );
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    mp.players.forEach((playerToSearch, id) => {
      if (playerToSearch.name == commandName) {
        playerToSearch.spawn(player.position);
        playerToSearch.dimension = player.dimension;
      }
    });
  }
});

let getCharIdByCommandName = function (name, clb) {
  gm.databaseManager
    .getConnection()
    .query("SELECT id FROM characters WHERE commandName = ?", [name], function (
      err,
      res
    ) {
      if (err) console.log(err);

      if (res.length > 0) {
        res.forEach(function (charId) {
          // console.log(charId);
          clb(true, charId.id);
        });
      } else {
        clb(false, -1);
      }
    });
};

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    var weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
  }
  mp.events.call(
    "adminlog",
    player,
    player.data.ingameName + " hat sich eine Waffe gegeben: " + weapon
  );
});

mp.events.addCommand("tp", (player, location) => {
  var teamData = player.data.teamData;
  teamData = JSON.parse(teamData);
  if (teamData.teamName == "Projektleitung" || teamData.teamName == "Supporter") {
    if (location == "medical_center") {
      player.spawn(new mp.Vector3(275.446, -1361.11, 24.5378));
    } else if (location == "iaa_office") {
      player.spawn(new mp.Vector3(117.22, -620.938, 206.1398));
    } else if (location == "iaa_complex") {
      player.spawn(new mp.Vector3(2147.91, 2921.0, -61.9));
      player.dimension = -2;
    } else if (location == "document_forgery") {
      player.spawn(new mp.Vector3(1165, -3196.6, -39.01306));
    } else if (location == "creator") {
      player.spawn(new mp.Vector3(402.5164, -1002.847, -99.2587));
    } else if (location == "surprise") {
      player.spawn(new mp.Vector3(-1157.129, -1523.028, 9.6327));
    } else if (location == "NOOSE") {
      player.spawn(new mp.Vector3(102.6934, -634.5288, 43.7421));
    } else if (location == "stadtpark") {
      player.spawn(new mp.Vector3(165.401, -984.36895751, 30.09192276));
    } else if (location == "lifeinvader") {
      player.spawn(new mp.Vector3(-1044.193, -236.9535, 37.96496));
    } else if (location == "fib47") {
      player.spawn(new mp.Vector3(134.5835, -766.486, 234.152));
    } else if (location == "fib49") {
      player.spawn(new mp.Vector3(134.635, -765.831, 242.152));
    } else if (location == "server") {
      player.spawn(new mp.Vector3(2168.0, 2920.0, -84.0));
    } else if (location == "terrorbyte") {
      player.spawn(new mp.Vector3(-1421.015, -3012.587, -80.0));
    } else if (location == "lspd") {
      player.spawn(new mp.Vector3(424.72, -978.71, 30.71));
    } else if (location == "chilliard") {
      player.spawn(new mp.Vector3(501.67, 5603.82, 797.91));
    }
    mp.events.call(
      "adminlog",
      player,
      player.data.ingameName + " hat sich teleportiert zu: " + location
    );
  }
});

mp.events.addCommand("tpcor", (player, full, x, y, z) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    player.position = new mp.Vector3(
      parseFloat(x),
      parseFloat(y),
      parseFloat(z)
    );
  }
});

//SETZT ESSEN UND TRINKEN
mp.events.addCommand("fillUp", (player, valueDrink, valueFood) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    player.data.food = parseInt(valueFood);
    player.data.drink = parseInt(valueDrink);
    gm.databaseManager
      .getConnection()
      .query(
        "UPDATE characters SET drink = ?, food = ? WHERE id = ?",
        [valueDrink, valueFood, player.data.internalId],
        function (err6, res2, row2) {
          if (err6) console.log("Error in FillUp Command: " + err6);
        }
      );
    player.call("changeValue", ["food", valueFood]);
    player.call("changeValue", ["drink", valueDrink]);
  }
});

//SETZT DAS LEBEN
mp.events.addCommand("setHealth", (player, valueHealth) => {
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if (fractionData.fractionName == "NOOSE") {
    player.health = parseInt(valueHealth);
    gm.databaseManager
      .getConnection()
      .query(
        "UPDATE characters SET health = ? WHERE id = ?",
        [valueHealth, player.data.internalId],
        function (err7, res7, row7) {
          if (err7) console.log("Error in setHealth Command: " + err7);
        }
      );
  }
});

//LOG DER KOORDINATEN
mp.events.addCommand("pos", (player, text) => {
  console.log(
    text +
    ": " +
    player.position.x +
    ", " +
    player.position.y +
    ", " +
    player.position.z +
    ", " +
    player.heading
  );
  player.notify("~g~Position " + text + " gesendet.");
});
