
function VehNearestPlayer(player, playerForVeh) {
  var vehTuning = {
    pcolor: 0,
    scolor: 0,
    neonr: 0,
    neong: 0,
    neonb: 0,
    neonEnabled: false,
    wheelColor: 0,
    windowTint: 0,
    design: 0,
    spoiler: 0,
    front: 0,
    heck: 0,
    seite: 0,
    auspuff: 0,
    rahmen: 0,
    gitter: 0,
    haube: 0,
    kotfl: 0,
    dach: 0,
    motor: 0,
    bremsen: 0,
    getriebe: 0,
    hupe: 0,
    feder: 0,
    turbo: 0,
    xenon: 0,
    felgen: 0,
  };
  console.log("beginne Nummerschild");
  var randomNumPlate = 0;
  gm.databaseManager.getConnection().query("SELECT * FROM vehicles", function (err, res) {
    if (err) console.log(err);
    var randomOK = true;
    do{
      randomNumPlate = "NEW-" + Math.floor(Math.random() * 1000);
      randomOK = true;
      res.forEach(toCheck => {
        console.log(randomNumPlate + " = " + toCheck + " ?");
        if(toCheck.numberplate === randomNumPlate) randomOK = false;
      });
    } while(!randomOK);
    console.log("Nummerschild " + randomNumPlate + " OK, trage in DB ein");
    console.log(randomNumPlate + " " + playerForVeh.data.internalId + " " + JSON.stringify(vehTuning));
    gm.databaseManager.getConnection().query("INSERT INTO vehicles (garage, isSpawned, modelId, type, numberplate, owner, fuel, odometer, tuning) VALUES (4, 'N', 1987142870, 1, ?, ?, 100, 100, ?)", [randomNumPlate, playerForVeh.data.internalId, JSON.stringify(vehTuning)], function (err, res) {
      if (err) console.log(err);
      playerForVeh.notify("Dein Auto mit Kennzeichen " + randomNumPlate + " wurde in Garage4 geparkt");
      player.notify("Auto übergeben");
    });
  });
}
mp.events.add("server:Admin:VehNearestPlayer", VehNearestPlayer);


function destroyVeh(player) {
  if (player.vehicle) {
    player.vehicle.destroy();
  }
}
mp.events.add("server:Admin:destroyVeh", destroyVeh);

mp.events.add('server:admin:tpto', (player, id) => {
  mp.events.call("adminlog", player, player.data.ingameName+" hat sich zu" +id+ " teleportiert");
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if(fractionData.fractionName == "NOOSE") {
    mp.players.forEach(
      (playerToSearch, id) => {
        if (playerToSearch.name == id) {
          player.spawn(playerToSearch.position);
          player.dimension = playerToSearch.dimension;
          player.notify('~g~Du hast dich zu ' + id + ' teleportiert.');
        }
      }
    );
  }
});

mp.events.add('server:admin:heal', (player, id) => {
  mp.events.call("adminlog", player, player.data.ingameName+" hat" +id+ " geheilt");
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if(fractionData.fractionName == "NOOSE") {
    mp.players.forEach(
      (playerToSearch, id) => {
        if (playerToSearch.name == id) {
          player.health = 100;
          player.notify('~g~Du hast ' + id + ' geheilt.');
        }
      }
    );
  }
});