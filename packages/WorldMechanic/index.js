//LOOSE HEALTH WENN ESSEN UND TRINKEN AUF 0!
// SYNC Time
function syncTime() {
    var date = new Date();
    mp.world.time.set(date.getHours(), date.getMinutes(), date.getSeconds());
}
function syncPosition() {
    mp.vehicles.forEach(
        (vehicle) => {
            if (!vehicle.position || (vehicle.position.x === 0 && vehicle.position.y === 0 && vehicle.position.z === 0) || (vehicle.position.x === null && vehicle.position.y === null && vehicle.position.z === null)){
                // Fahrzeug Position ist nicht gesynct oder 0,0,0
            } else {
                //if (mp.vehicles.exists(vehicle)) {               
                    gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ?",[vehicle.getVariable("numberPlate")], function(err4,res4) {
                        if (err4) console.log("Error in select Vehicles on vehiclesync: "+err4);
                        if (res4.length > 0) {
                            res4.forEach(function(veh) {
                                if(veh.posX == vehicle.position.x && veh.posY == vehicle.position.y && veh.posZ == vehicle.position.z) {
                                } else {
                                    var date = new Date();
                                    var month = parseInt(parseInt(date.getMonth()) + 1);
                                    var day = parseInt(parseInt(date.getDate()));
                                    var hour = parseInt(parseInt(date.getHours()));     

                                    gm.databaseManager.getConnection().query("UPDATE `vehicles` SET posX = ?, posY = ?, posZ = ?, posRot = ?, buyDate = ? WHERE numberplate = ?", [vehicle.position.x, vehicle.position.y, vehicle.position.z, vehicle.rotation.z, date, vehicle.getVariable("numberPlate")], function (err, res) {
                                        if (err) console.log("Error in Update Vehicles position " + err);
                                    });
                                }
                            });
                        
                        }
                    });
                //}
            }
        }
    );
  mp.players.forEach(
    (player, id) => {
      if (player.getVariable("state") == "INGAME") {
        if(player.vehicle) {
      	var posXsave = parseFloat(player.vehicle.position.x);
      	var posYsave = parseFloat(player.vehicle.position.y);
      	var posZsave = parseFloat(player.vehicle.position.z);
      } else {
        var posXsave = parseFloat(player.position.x);
      	var posYsave = parseFloat(player.position.y);
      	var posZsave = parseFloat(player.position.z);
      }
      	var dimSave = parseInt(player.dimension);
        var healthSave = parseInt(player.health);
        var inventory = parseInt(player.data.inventory);
        var permaDeathTimer = parseInt(player.getVariable("permaDeathTimer"));

        if (player.health > 1) {
          if (permaDeathTimer > 0) {
            permaDeathTimer = permaDeathTimer - 30;

            if (permaDeathTimer < 0) permaDeathTimer = 0;
          }
        }

        player.setVariable("permaDeathTimer",String(permaDeathTimer));

        gm.databaseManager.getConnection().query("UPDATE `characters` SET health = ?, posX = ?, posY = ?, posZ = ?, dimension = ?, inventory = ?, permaDeathTime = ? WHERE id = ?", [healthSave, posXsave, posYsave, posZsave, dimSave, inventory, permaDeathTimer, player.data.internalId], function (err, res) {
      	  if (err) console.log("Error in Update Characters position " + err);
      	});
        //mp.events.call("server:ClothesMenu:save", player);
      }
    }
  );
}
//FRAKTION PAYCHECKS
function paycheckFractions() {
    mp.players.forEach(
      (player, id) => {
          if (player.data.fractionData) {
            let playerFractionData = JSON.parse(player.data.fractionData);
            if (playerFractionData.fractionName != undefined) {
                if (player.getVariable("state") == "INGAME" && playerFractionData.playerFractionDuty == "Y") {
                    var amount = playerFractionData.payCheck; //WERT FÜR DEN PAYCHECK

                    gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
                        if (err) console.log(err);

                        if (res.length > 0) {
                            gm.databaseManager.getConnection().query("SELECT amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err2, res2) {
                                if (err2) console.log(err2);

                                res2.forEach(function (am) {
                                    var newAm = parseFloat(am.amout) + parseFloat(amount);

                                    gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                                        if (err3) console.log(err3);
                                    });
                                });
                            });
                        } else {
                            newAmount = player.data.money + amount;
                            if(mp.players.exists(player)) player.data.money = newAmount;
                            gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [newAmount, player.data.internalId], function (err, res, row) {
                                if (err) console.log("Error in Paycheck: " + err);
                                if(mp.players.exists(player)) player.call("updateHudMoney", [player.data.money]);
                                if(mp.players.exists(player)) player.call("changeValue", ["money", player.data.money]);
                            });
                        }
                    });

                    // ENDE
                    if(mp.players.exists(player)) player.call(`notification`, ["2", "Du hast einen Gehaltscheck in höhe von " + amount + "$ erhalten"]);
                }
            } else {
                if (player.getVariable("state") == "INGAME" && JSON.parse(player.data.businessData) == "arbeitslos") {
                    var amount = 21.25; //WERT FÜR DEN PAYCHECK

                    gm.databaseManager.getConnection().query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err, res) {
                        if (err) console.log(err);

                        if (res.length > 0) {
                            gm.databaseManager.getConnection().query("SELECT amout FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function (err2, res2) {
                                if (err2) console.log(err2);

                                res2.forEach(function (am) {
                                    var newAm = parseFloat(am.amout) + parseFloat(amount);

                                    gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function (err3, res3) {
                                        if (err3) console.log(err3);
                                    });
                                });
                            });
                        } else {
                            newAmount = player.data.money + amount;
                            if(mp.players.exists(player)) player.data.money = newAmount;
                            gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [newAmount, player.data.internalId], function (err, res, row) {
                                if (err) console.log("Error in Paycheck: " + err);
                                if(mp.players.exists(player)) player.call("updateHudMoney", [player.data.money]);
                                if(mp.players.exists(player)) player.call("changeValue", ["money", player.data.money]);
                            });
                        }
                    });

                    if(mp.players.exists(player)) player.call(`notification`, ["2", "Du hast deine Staatliche stütze in höhe von" + amount + "$ erhalten"]);                    
                }
            }
          }
        }
    );
}

function fuelUpdate() {
  mp.vehicles.forEach(
    (vehicle) => {
      if (vehicle) {
        if (vehicle.getVariable("isRunning") == "true") {
          let currentFuel = vehicle.getVariable("fuel");
          let verbrauch = vehicle.getVariable("verbrauch");
          let tankvolumen = vehicle.getVariable("tankvolumen");

          var calc = parseFloat(((parseFloat(verbrauch) * 100) / tankvolumen));

          var newFuel = parseFloat(currentFuel) - parseFloat(calc);
          if (parseInt(newFuel) <= 0) newFuel = 0;
          if (parseInt(newFuel) == 0) {
            vehicle.engine = false;
            vehicle.setVariable("isRunning","false");
            vehicle.dead = true;
          }
          newFuel = newFuel.toFixed(2);
          vehicle.setVariable("fuel",String(newFuel));
          if (vehicle.getVariable("vehId")) {
            let vehId = parseInt(vehicle.getVariable("vehId"));
            gm.databaseManager.getConnection().query('UPDATE vehicles SET fuel = ? WHERE id = ?', [newFuel, vehId], function (err, res, row) {
                if (err) console.log("Error in Fuel Update: " + err);
            });
          }
        }
      }
    }
  );
}

function drinkfood() {
    mp.players.forEach((player, id) => {
		if (player.data.drink > 0  && player.data.drink < 5) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du musst jetzt dingend etwas trinken!!"]);         
		}  
		
		if (player.data.drink > 6 && player.data.drink < 15) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du solltest jetzt am besten trinken!!"]);         
		}
		
		if (player.data.drink > 16 && player.data.drink < 50) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du solltest zeitnah etwas trinken!"]);         
		}	

		if (player.data.drink > 51 && player.data.drink < 60) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du solltest bald etwas trinken!!"]);         
		}		
		
		if (player.data.food > 0  && player.data.food < 5) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du musst jetzt dingend etwas essen!!"]);     
		} 
		
		if (player.data.food > 6 && player.data.food < 15) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du solltest jetzt am besten essen!!"]);     
		}
		
		if (player.data.food > 16 && player.data.food < 50) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du solltest zeitnah etwas essen!"]);     
		}
		
		if (player.data.food > 51 && player.data.food < 60) {
			if(mp.players.exists(player)) player.call(`notification`, ["3", "Du solltest bald etwas essen!"]);     
		}		
    });    
}

setInterval(fuelUpdate, 60000);
//setInterval(syncTime, 60000);
setInterval(syncPosition, 15000);
setInterval(paycheckFractions, 900000);
setInterval(drinkfood, 300000);
//setInterval(paycheckFractions, 60000);
paycheckFractions();
syncTime();

// Wetter
gm.weather = {};
gm.weather.lastrain = 15;
//gm.weather.currentWeather = newWather;

/*function changeWeather() {
    let randomWeather = Math.random() * (20 - 1) + 1;
    let newWeather = 'EXTRASUNNY';
    /*if (randomWeather < 12) {
        newWeather = 'CLEAR';
    } else if (randomWeather > 11 && randomWeather <= 14) {
        newWeather = 'OVERCAST';
    } else if (randomWeather > 14 && randomWeather <= 16) {
        newWeather = 'FOGGY';
    } else if (randomWeather > 16 && randomWeather <= 18) {
        newWeather = 'CLOUDS';
    } else if (randomWeather > 18 && randomWeather <= 19) {
        newWeather = 'THUNDER';
    } else if (randomWeather > 19 && randomWeather <= 20) {
        newWeather = 'RAIN';
    }

    if (newWeather == 'RAIN' || newWeather == 'THUNDER') {
        if (gm.weather.lastrain > 0) {
            newWeather = 'CLEAR';
            gm.weather.lastrain = gm.weather.lastrain - 1;
        } else {
            gm.weather.lastrain = 24;
        }
    } else {
        gm.weather.lastrain = gm.weather.lastrain - 1;
    }

    gm.weather.currentWeather = newWeather;
    mp.world.setWeatherTransition(newWeather);

    mp.players.call("client:world:weatherUpdate", [newWeather]);
}
setInterval(changeWeather, 1200000);
changeWeather();*/

function weatherSync() {
  var weather = gm.weather.currentWeather;
  mp.players.call("client:world:weatherUpdate", [gm.weather.currentWeather]);
}
setInterval(weatherSync, 60000);

mp.events.add("updatePlayerNeeds", (player) => {
  if(mp.players.exists(player)) {
    if(player.data.food > 100) {
        player.data.food = 100;
        var currentFood = parseInt(player.data.food);
        var newFood = currentFood - 1;
        player.data.food = newFood;
        player.call("changeValue", ['food', newFood]);
        gm.databaseManager.getConnection().query('UPDATE characters SET food = ? WHERE id = ?', [newFood, player.data.internalId], function (err, res, row) {
            if (err) console.log("Error in UpdatePlayerNeeds(insert values food): " + err);
        });
    }
    else if (player.data.food < 100 || player.data.food == 100 || player.data.food > 0) {
        var currentFood = parseInt(player.data.food);
        var newFood = currentFood - 1;
        player.data.food = newFood;
        player.call("changeValue", ['food', newFood]);
        gm.databaseManager.getConnection().query('UPDATE characters SET food = ? WHERE id = ?', [newFood, player.data.internalId], function (err, res, row) {
            if (err) console.log("Error in UpdatePlayerNeeds(insert values food): " + err);            
        });
    }
    if(player.data.drink > 100) {
        player.data.drink = 100;
        var currentDrink = parseInt(player.data.drink);
        var newDrink = currentDrink - 2;
        player.data.drink = newDrink;
        player.call("changeValue", ['drink', newDrink]);
        gm.databaseManager.getConnection().query('UPDATE characters SET drink = ? WHERE id = ?', [newDrink, player.data.internalId], function (err2, res2, row2) {
            if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
        });
    }
    else if(player.data.drink < 100 || player.data.drink == 100 || player.data.drink > 0){
        var currentDrink = parseInt(player.data.drink);
        var newDrink = currentDrink - 2;
        player.data.drink = newDrink;
        player.call("changeValue", ['drink', newDrink]);
        gm.databaseManager.getConnection().query('UPDATE characters SET drink = ? WHERE id = ?', [newDrink, player.data.internalId], function (err2, res2, row2) {
            if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
        });
    }
    if(player.data.drink == 0 || player.data.drink < 0){
        var lowDrink = 0;
        player.data.drink = lowDrink;
        player.call("changeValue", ['drink', lowDrink]);
        gm.databaseManager.getConnection().query('UPDATE characters SET drink = ? WHERE id = ?', [lowDrink, player.data.internalId], function (err2, res2, row2) {
            if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
        });
    }
    if(player.data.food == 0 || player.data.food < 0){
        var lowFood = 0;
        player.data.food = lowFood;
        player.call("changeValue", ['food', lowFood]);
        gm.databaseManager.getConnection().query('UPDATE characters SET food = ? WHERE id = ?', [lowFood, player.data.internalId], function (err2, res2, row2) {
            if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
        });
    }
  }
});

function updatePlayerNeeds() {
  mp.players.forEach((player, id) => {
    if(player.isPet === 0) {
      mp.events.call("updatePlayerNeeds", player);
    }
  });
}

setInterval(updatePlayerNeeds, 180000);

function lossHealth() {
    mp.players.forEach(
        (player, id) => {
            if(player.health > 0) {
                if(player.data.food == 0) {
                    const lossAmount = 2;
                    newHealth = player.health - lossAmount;
                    player.health = newHealth;
                    if(newHealth < 0){
                        newHealth = 0;
                    }
                    gm.databaseManager.getConnection().query('UPDATE characters SET health = ? WHERE id = ?', [newHealth, player.data.internalId], function (err2, res2, row2) {
                        if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
                    });

                }
                if(player.data.drink == 0) {
                    const lossAmount = 2;
                    newHealth = player.health - lossAmount;
                    player.health = newHealth;
                    if(newHealth < 0){
                        newHealth = 0;
                    }
                    gm.databaseManager.getConnection().query('UPDATE characters SET health = ? WHERE id = ?', [newHealth, player.data.internalId], function (err2, res2, row2) {
                        if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
                    });

                }
            }
            else if(player.health == 0){
                return;
            }
        }
    );
}
setInterval(lossHealth, 120000);
lossHealth();
