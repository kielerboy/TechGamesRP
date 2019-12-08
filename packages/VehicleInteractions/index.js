mp.events.add("server:VehicleInteractions:prepereMenu", (player) => {
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
  					if(mp.players.exists(player)) player.call("client:VehicleInteractions:drawMenu", [JSON.stringify(VehList)]);
  				}
  				i++;
  			});
  		} else {
  			if(mp.players.exists(player)) player.call("client:VehicleInteractions:drawMenu", ["none"]);
  		}
  	});
  }
});

mp.events.add("server:VehicleInteractions:giveVehiclePapers", (player,nearestPlayer, numberplate) =>{
	if (mp.players.exists(player)){
		gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE numberplate = ? AND owner = ?", [numberplate, player.data.internalId], function(err1, res1){
			if (err1) console.log("ERROR in Select Vehicles: "+err1);
				if (res1.length > 0) {
					if (res1[0].fraction == "none") {
					gm.databaseManager.getConnection().query("UPDATE vehicles SET owner = ? WHERE numberplate = ? AND owner = ?", [nearestPlayer.data.internalId, numberplate, player.data.internalId], function(err2, res2){
						if (err2) console.log("ERROR in Update Vehicle Owner: "+err2);
						if (res2.length > 0) {
							if(mp.players.exists(player)) player.notify("Da ist etwas schief gelaufen!");
						} else {
							if(mp.players.exists(player)) player.call(`notification`, ["2", "Du hast jemanden dein Fahrzeug überschrieben"]);
							if(mp.players.exists(nearestPlayer)) nearestPlayer.call(`notification`, ["2", "Die wurde ein Fahrzeug überschrieben"]);
							mp.vehicles.forEach(
								(vehicle, id) => {
									if (mp.vehicles.exists(vehicle) && vehicle.getVariable("numberPlate") == numberplate) {
										vehicle.setVariable("owner",String(nearestPlayer.data.internalId));
									}
								}
							);
						}
					});
				} else {
					if(mp.players.exists(player)) player.call(`notification`, ["3", "Das Fahrzeug ist Staatseigentum"]);
				}
			} else {
				if(mp.players.exists(player)) player.call(`notification`, ["3", "Das ist nicht dein Fahrzeug"]);
			}
		});
	}
});