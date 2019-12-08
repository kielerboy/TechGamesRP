//ZUL SHAPE
let ZULColShape = mp.colshapes.newSphere(-539.50, -189.88, -157.21, 2, 7);


mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    if(ZULColShape.isPointWithin(player.position)) {
      mp.events.call('server:zulassung:prepareVehicles', player);
    }
  }
});

mp.events.add("server:zulassung:prepareVehicles", (player) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE owner = ?", [player.data.internalId], function(err, res) {
  	if (err) console.log("ERROR in Select Vehicles: "+err);
  		if (res.length > 0) {
  			var i = 1;
  			let VehList = [];
  			res.forEach(function(veh) {
  				if (gm.vehicleData[""+veh.modelId]) {
  					vehData = gm.vehicleData[""+veh.modelId];
  				} else {
  					vehData = gm.vehicleData["undefiniert"];
  				}
  				let obj = {"model": String(veh.modelId), "bezeichnung": String(vehData.bezeichnung), "kennzeichen": String(veh.numberplate)};
  				VehList.push(obj);

  				if (parseInt(i) == parseInt(res.length)) {
  					if(mp.players.exists(player)) player.call("client:zulassung:drawMenu", [JSON.stringify(VehList)]);
  				}
  				i++;
  			});
  		} else {
  			if(mp.players.exists(player)) player.call("client:zulassung:drawMenu", ["none"]);
  		}
  	});
  }
});

mp.events.add("server:zulassung:kennzeichen", (player,newplate, oldplate) => {
  if(mp.players.exists(player)) {
		var str = newplate.toUpperCase();
		var strTwo = str;
  	if (str.length <= 8) {
			var result = str.match(/^([0-9]|[A-Z])+([0-9A-Z]+)$/i);
			if (result !== null) {			
				var newplate = str;
				var amout = 100;
				gm.databaseManager.getConnection().query("SELECT numberplate FROM vehicles WHERE numberplate = ?", [newplate], function(err3, res3){
					if (err3) console.log("ERROR in SELECT vehicles: "+err3);
					if (res3.length > 0) {
						player.call(`notification`, ["3", "Das Kennzeichen ist schon vergeben!"]);
					} else {
						gm.databaseManager.getConnection().query("SELECT money FROM characters WHERE id = ?", [player.data.internalId], function(err1, res1) {
							if (err1) console.log("ERROR in SELECT money: "+err1);
							if (res1.length > 0) {
								money = player.data.money;
								amout = parseFloat(amout).toFixed(2);
								if ( (amout*1) > (money*1)) {
									player.call(`notification`, ["3", "Du hast nicht genügend Geld bei dir!"]);
									console.log("Zulassungsstelle - nicht genug Geld");
								} else {
									var newAm = parseFloat( player.data.money - parseFloat(amout*1).toFixed(2) ).toFixed(2);;
									if (mp.players.exists(player)) player.call("updateHudMoney", [newAm]);
									gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.internalId], function (err2, res2){
										if (err2) console.log("ERROR in Update Money: "+err2);
										gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ? AND owner = ?",[oldplate, player.data.internalId], function(err4, res4) {
											if (err4) console.log("ERROR in UPDATE vehicle numberplate GET DATA: "+err4);
											else {
												if (res4.length !== 1) return;
												res4.forEach(function(veh) {
													if (veh.firstRegistration == null || veh.firstRegistration == "") {
														var date = new Date();
														var month = parseInt(parseInt(date.getMonth()) + 1);
														var erstZulassung = ""+date.getFullYear()+"-"+month+"-"+date.getDate()+"";

														gm.databaseManager.getConnection().query("UPDATE vehicles SET numberplate = ? , isRegistered = 'Y', firstRegistration = ? WHERE numberplate = ? AND owner = ?",[newplate, erstZulassung, oldplate, player.data.internalId], function(err, res){
															if (err) console.log("ERROR in UPDATE vehicle numberplate: "+err);
															else {
																player.call(`notification`, ["2", "Dein Fahrzeug wurde erstzugelassen"]);
																player.data.money = newAm;
																mp.vehicles.forEach(
																	(vehicle, id) => {
																		if (mp.vehicles.exists(vehicle) && vehicle.getVariable("numberPlate") == oldplate) {
																			vehicle.numberPlate = newplate;
																			vehicle.setVariable("numberPlate",newplate);
																		}
																	}
																);
															}
														});
													} else {
														gm.databaseManager.getConnection().query("UPDATE vehicles SET numberplate = ? , isRegistered = 'Y' WHERE numberplate = ? AND owner = ?",[newplate, oldplate, player.data.internalId], function(err, res){
															if (err) console.log("ERROR in UPDATE vehicle numberplate: "+err);
															else {
																player.call(`notification`, ["2", "Dein Fahrzeug wurde Zugelassen"]);
																player.data.money = newAm;
																mp.vehicles.forEach(
																	(vehicle, id) => {
																		if (mp.vehicles.exists(vehicle) && vehicle.getVariable("numberPlate") == oldplate) {
																			vehicle.numberPlate = newplate;
																			vehicle.setVariable("numberPlate",newplate);
																		}
																	}
																);
															}
														});
													}
												});
											}
										});
										
									});
								}
							}
						});
						return;
					}
				});
			} else {
				player.call(`notification`, ["4", "Es sind keine Sonderzeichen erlaubt!"]);
			}
  	}	else {
		player.call(`notification`, ["4", "Dein kennzeichen darf maximal 8 zeichen haben!"]);
  	}
  }
});
