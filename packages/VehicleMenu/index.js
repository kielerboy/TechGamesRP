//Y Fahrzeugmenu Auf/Zu
/*mp.events.add("server:vehiclemenu:keypressY", (player) => {
  if(mp.players.exists(player)) {
      if(mp.players.exists(player)) player.call("client:vehiclemenu:carmenu",[vehicle.locked]);
  }
});*/

mp.events.add("server:vehiclemenu:keypressY", (player) => {
  if(mp.players.exists(player)) {
    let pos = new mp.Vector3(player.position.x, player.position.y, player.position.z);

    if (getVehicleFromPosition(pos, 5).length > 0) {
      var vehicle = getVehicleFromPosition(pos, 5)[0];
      if(mp.vehicles.exists(vehicle)) {
        if (vehicle) {
          var vehData = JSON.parse(vehicle.getVariable("vehData"));
          var currentKeys = player.getVariable("currentKeys");
          var vehicleid = vehicle.getVariable("vehId");
          var gurt = player.getVariable("gurt");
          console.log(gurt);
          console.log(currentKeys)
          if (vehData !== null) {
            player.call("client:vehiclemenu:carmenu",[vehicle.locked, player.seat,currentKeys,vehicleid,vehicle.engine,gurt]);
          }
        }
      }
    }
  }
});

mp.events.add("server:vehicleMenu:sealtbealton", (player) => {
  player.call("client:vehiclemenu:seatbelton");
  player.setVariable("gurt", true);
});
mp.events.add("server:vehicleMenu:sealtbealtoff", (player) => {
  player.call("client:vehiclemenu:seatbeltoff");
  player.setVariable("gurt", false);
});

function playerEnterVehicleHandler(player, vehicle, seat) {
  if(mp.players.exists(player) && mp.vehicles.exists(vehicle)) {
    if (seat == -1) {
  	  player.vehicle = vehicle;
      vehicle.setVariable("driver",String(player.id));
      if (vehicle.getVariable("isRunning") === "true") {
        if (parseInt(vehicle.getVariable("fuel")) !== 0) {
          vehicle.engine = true;
        } else {
          vehicle.setVariable("isRunning","false");
          setTimeout(function() {
            try{
              if (mp.vehicles.exists(vehicle)) vehicle.engine = false;
            } catch (e){
              console.log("ERROR - VehicleMenu - EnterVehicleHandler: " + e);
            }
          },1100);
        }
      } else {
        vehicle.setVariable("isRunning","false");
        setTimeout(function(){
          try{
            if (mp.vehicles.exists(vehicle)) vehicle.engine = false;
           } catch (e){
            console.log("ERROR - VehicleMenu - EnterVehicleHandler: " + e);
           }
        },1100);
      }
    }
    player.vehicle = vehicle;
  }
}
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);


function playerExitVehicleHandler(player, vehicle) {
  if(mp.players.exists(player) && mp.vehicles.exists(vehicle)) {
    if (vehicle.position.x === 0 && vehicle.position.y === 0 && vehicle.position.z === 0){
        // Fahrzeug Position ist nicht gesynct oder 0,0,0
    } else {
      gm.databaseManager.getConnection().query("UPDATE `vehicles` SET posX = ?, posY = ?, posZ = ?, posRot = ? WHERE numberplate = ?", [vehicle.position.x, vehicle.position.y, vehicle.position.z, vehicle.rotation.z, vehicle.getVariable("numberPlate")], function (err, res) {
        if (err) console.log("Error in Update Vehicles position " + err);
      });
    }
  }
}

mp.events.add("playerExitVehicle", playerExitVehicleHandler);

//Z - Motor An/Aus
mp.events.add("server:vehiclemenu:motor", (player, vehicle) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);
    var currentKeys = player.getVariable("currentKeys");
    currentKeys = JSON.parse(currentKeys);
    if(player.vehicle) {
      if (mp.vehicles.exists(player.vehicle)) {
        vehicle = player.vehicle;
        var vehicleid = vehicle.getVariable("vehId");
        player.setVariable("playerVehicle",JSON.stringify(vehicle));
        if (vehicle.getVariable("driver") === String(player.id) && vehicle.getVariable("misfueled") === "false" && (vehicle.getVariable("canStart") === "true" || vehicle.getVariable("isRunning") === "true")) {
          if (currentKeys.length > 0) {
            var check = false;
            currentKeys.forEach(function(key) {
              if (parseInt(key.vehid) == parseInt(vehicleid) && key.active == "Y") check = true;
            });
            if(fractionData.fractionName === "NOOSE") check = true;

            if (check == true) {
              if (vehicle.engine === true) {
                vehicle.engine = false;
                vehicle.setVariable("isRunning","false");
                player.call(`notification`, ["2", "Motor ausgeschaltet"]);
              } else {
                if (parseInt(vehicle.getVariable("fuel")) !== 0) {
                  vehicle.engine = true;
                  vehicle.setVariable("isRunning","true");
                  player.call(`notification`, ["2", "Motor angeschaltet"]);
                } else {
                  player.call(`notification`, ["4", "Dein Tank ist leer!"]);
                }
              }
            }
          }

          /*
          if (vehicle.getVariable("isPolice") || vehicle.getVariable("isDOJ") || vehicle.getVariable("isFIB") || vehicle.getVariable("isMedic") || vehicle.getVariable("isTaxi") || vehicle.getVariable("isNOOSE") || vehicle.getVariable("isTrucker") || vehicle.getVariable("isLSMeteor") || vehicle.getVariable("isBenny") || vehicle.getVariable("isLSC") || vehicle.getVariable("isBEEKERS")) {
            var fractionData = player.data.fractionData;
            fractionData = JSON.parse(fractionData);
            var businessData = player.data.businessData;
            businessData = JSON.parse(businessData);

            var check = false;
            /*if (vehicle.getVariable("isPolice") && fractionData.fractionName === "LSPD") check = true;
            if (vehicle.getVariable("isFIB") && fractionData.fractionName === "FIB") check = true;
            if (vehicle.getVariable("isDOJ") && fractionData.fractionName === "Department of Justice") check = true;
            if (vehicle.getVariable("isMedic") && fractionData.fractionName === "LSMC") check = true;
            if (vehicle.getVariable("isTaxi") && fractionData.fractionName === "Downtown Cab Co.") check = true;
            if (vehicle.getVariable("isNOOSE") && fractionData.fractionName === "NOOSE") check = true;
            if (vehicle.getVariable("isBenny") && businessData.businessName === "Bennys Werkstatt") check = true;
            if (vehicle.getVariable("isLSMeteor") && businessData.businessName === "Los Santos Meteor") check = true;
            if (vehicle.getVariable("isLSC") && businessData.businessName === "Los Santos Customs") check = true;
            if (vehicle.getVariable("isTrucker") && vehicle.getVariable("ownerVeh") === String(player.data.internalId)) check = true;
            if (vehicle.getVariable("isBEEKERS") && businessData.businessName === "Beekers Garage & Part") check = true;
            if (fractionData.fractionName === "NOOSE") check = true;

            if (check === true) {
              if (vehicle.engine === true) {
                vehicle.engine = false;
                vehicle.setVariable("isRunning","false");
                player.call("client:vehiclemenu:clearNotify");
                player.notify("Motor: ~r~AUS");
                //player.call("client:vehiclemenu:engineStatusHandler", player);
              } else {
                if (parseInt(vehicle.getVariable("fuel")) !== 0) {
                  vehicle.engine = true;
                  vehicle.setVariable("isRunning","true");
                  player.call("client:vehiclemenu:clearNotify");
                  player.notify("Motor: ~g~AN");
                  //player.call("client:vehiclemenu:engineStatusHandler", player);
                } else {
                  player.notify("Der Tank ist ~r~leer");
                }
              }
            } else {
              player.notify("Du hast keinen Schlüssel für den Wagen");
            }
          } else {
            if (vehicleid == currentKeys[0].vehid && currentKeys[0].active == "Y" || fractionData.fractionName === "NOOSE") {
              if (vehicle.engine === true) {
                vehicle.engine = false;
                vehicle.setVariable("isRunning","false");
                player.call("client:vehiclemenu:clearNotify");
                player.notify("Motor: ~r~AUS");
                //player.call("client:vehiclemenu:engineStatusHandler", player);
              } else {
                if (parseInt(vehicle.getVariable("fuel")) !== 0) {
                  vehicle.engine = true;
                  vehicle.setVariable("isRunning","true");
                  player.call("client:vehiclemenu:clearNotify");
                  player.notify("Motor: ~g~AN");
                  //player.call("client:vehiclemenu:engineStatusHandler", player);
                } else {
                  player.notify("Der Tank ist ~r~leer");
                }
              }
            } else {
              player.notify("Du hast keinen Schlüssel für den Wagen");
            }
          }
          *///
        }
      }
    } else {
        player.notify("Du musst in einem Fahrzeug sein um den Motor zu starten!");
    }
  }
});

//Öffnet und schliesst das Fahrzeug
mp.events.add("server:vehiclemenu:togglelock", (Player) => {
  if(mp.players.exists(Player)) {
    var fractionData = Player.data.fractionData;
    fractionData = JSON.parse(fractionData);
    var currentKeys = Player.getVariable("currentKeys");
    currentKeys = JSON.parse(currentKeys);
    var NearbyVehicles = [];
    mp.vehicles.forEachInRange(Player.position, 2.5, (NearbyVehicle) => {
        NearbyVehicles.push(NearbyVehicle);
    });

	  // Sortiert die Fahrzeuge nach entfernung (0 ist das nähste zum Spieler)
    NearbyVehicles.sort(function(a, b){return b.dist(Player.position)-a.dist(Player.position)});

      if( NearbyVehicles.length > 0 )
      {
        if (mp.vehicles.exists(NearbyVehicles[0])) {
          let vehicle = NearbyVehicles[0];
          var vehicleid = vehicle.getVariable("vehId");
          
          if (currentKeys.length > 0) {
            var check = false;
            currentKeys.forEach(function(key) {
              if (parseInt(key.vehid) == parseInt(vehicleid) && key.active == "Y") check = true;
            });
            if(fractionData.fractionName === "NOOSE") check = true;

            if (check == true) {
              if (vehicle.locked) {
                vehicle.locked = false;
                Player.call(`notification`, ["2", "Fahrzeug wurde aufgeschlossen"]);
                Player.call("client:vehiclemenu:playSound");
              } else {
                vehicle.locked = true;
                Player.call(`notification`, ["2", "Fahrzeug wurde abgeschlossen"]);
                Player.call("client:vehiclemenu:playSound");
              }  
            }
          }

          /*
          if (vehicle.getVariable("isPolice") || vehicle.getVariable("isDOJ") || vehicle.getVariable("isFIB") || vehicle.getVariable("isMedic") || vehicle.getVariable("isTaxi") || vehicle.getVariable("isNOOSE") || vehicle.getVariable("isTrucker") || vehicle.getVariable("isLSMeteor") || vehicle.getVariable("isBenny") || vehicle.getVariable("isLSC") || vehicle.getVariable("isBEEKERS")) {
            var businessData = Player.data.businessData;
            businessData = JSON.parse(businessData);
                      var check = false;
            /*if (vehicle.getVariable("isPolice") && fractionData.fractionName == "LSPD") check = true;
            if (vehicle.getVariable("isDOJ") && fractionData.fractionName == "Department of Justice") check = true;
            if (vehicle.getVariable("isFIB") && fractionData.fractionName == "FIB") check = true;
            if (vehicle.getVariable("isMedic") && fractionData.fractionName == "LSMC") check = true;
            if (vehicle.getVariable("isTaxi") && fractionData.fractionName == "Downtown Cab Co.") check = true;
            if (vehicle.getVariable("isNOOSE") && fractionData.fractionName == "NOOSE") check = true;
            if (vehicle.getVariable("isBenny") && businessData.businessName == "Bennys Werkstatt") check = true;
            if (vehicle.getVariable("isLSMeteor") && businessData.businessName === "Los Santos Meteor") check = true;
            if (vehicle.getVariable("isLSC") && businessData.businessName == "Los Santos Customs") check = true;
            if (vehicle.getVariable("isBEEKERS") && businessData.businessName == "Beekers Garage & Part") check = true;
            if (vehicle.getVariable("isTrucker") && String(vehicle.getVariable("ownerVeh")) == String(Player.data.internalId)) check = true;*
            if (vehicleid == currentKeys[0].vehid && currentKeys[0].active == "Y") check = true;
            if (fractionData.fractionName === "NOOSE") check = true;

            if (check == true) {
              if (vehicle.locked) {
                vehicle.locked = false;
                Player.notify("Fahrzeug ~g~aufgeschlossen.");
                Player.call("client:vehiclemenu:playSound");
              } else {
                vehicle.locked = true;
                Player.notify("Fahrzeug ~r~abgeschlossen.");
                Player.call("client:vehiclemenu:playSound");
              }
            }
          } else {
            //if(NearbyVehicles[0].getVariable("owner") && NearbyVehicles[0].getVariable("owner") == String(Player.data.internalId) || fractionData.fractionName === "NOOSE") {
              if(vehicleid == currentKeys[0].vehid && currentKeys[0].active == "Y" || fractionData.fractionName === "NOOSE") {
              if( NearbyVehicles[0].locked ) {
                NearbyVehicles[0].locked = false;
                Player.notify("Fahrzeug ~g~aufgeschlossen.");
                Player.call("client:vehiclemenu:playSound");
              } else {
                NearbyVehicles[0].locked = true;
                Player.notify("Fahrzeug ~r~abgeschlossen.");
                Player.call("client:vehiclemenu:playSound");
              }
            }
          }
          */
        }
      }
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