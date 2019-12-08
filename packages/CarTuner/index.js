
// Tuning
mp.events.add("mod", (player, vehicle, mod, modvalue) => {
  if(mp.vehicles.exists(vehicle)) {
    vehicle.setMod(parseInt(mod), parseInt(modvalue));
  }
});

mp.events.add("modcolor1", (player, vehicle, primcolor) => {
  if(mp.vehicles.exists(vehicle)) {
    vehicle.setColor(parseInt(primcolor), vehicle.getColor(1));
  }
});

mp.events.add("modcolor2", (player, vehicle, seccolor) => {
  if(mp.vehicles.exists(vehicle)) {
	  vehicle.setColor(vehicle.getColor(0), parseInt(seccolor));
	  vehicle.setVariable("secColor", seccolor);
  }
});

mp.events.add("modneon", (player, vehicle, toggle) => {
  if(mp.vehicles.exists(vehicle)) {
    vehicle.neonEnable = toggle;
  	vehicle.setNeonColor(255, 255, 255);
  	if(!toggle){
  		vehicle.setNeonColor(255, 255, 255);
  	}
  }
});

mp.events.add("modpearl", (player, vehicle, pearlescentColor) => {
  if(mp.vehicles.exists(vehicle)) {
    let wheelcolor = vehicle.wheelColor;
    player.call("modpearl", [vehicle, wheelcolor, pearlescentColor]);
  }
});

mp.events.add("modneoncolor", (player, vehicle, r, g, b) => {
  if(mp.vehicles.exists(vehicle)) {
  	vehicle.setNeonColor(parseInt(r), parseInt(g), parseInt(b));
  	vehicle.setVariable("neonColorR", r);
  	vehicle.setVariable("neonColorG", g);
  	vehicle.setVariable("neonColorB", b);
  }
});

mp.events.add("modwindowtint", (player, vehicle, tint) =>{
  if(mp.vehicles.exists(vehicle)) {
	  vehicle.windowTint = parseInt(tint);
  }
});

mp.events.add("modwheelcolor", (player, vehicle, color) => {
  if(mp.vehicles.exists(vehicle)) {
    vehicle.wheelColor = parseInt(color);
  }
});

mp.events.add("Server:CarTuner:setWheels", (player, vehicle, wheelType, wheel) => {
  if(mp.vehicles.exists(vehicle)) {
    vehicle.wheelType = wheelType;
    vehicle.setMod(23, wheel);
  }
});

mp.events.add("repair", (player, vehicle) => {
  if(mp.vehicles.exists(vehicle)) {
  	var vehicles = getVehicleFromPosition(player.position, 3);
    if (vehicles.length > 0) {
      player.notify("~g~Fahrzeug repariert");
      if (mp.vehicles.exists(vehicles[0])) {
        vehicles[0].repair();
        vehicles[0].setVariable("misfueled","false");
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

mp.events.add("updatePearlForPlayer", (player, playerToUpdate, vehicle, wheelColor, pearlColor) => {
  if(mp.vehicles.exists(vehicle)) {
    // call client to update pearl for a vehicle
    if (vehicle !== undefined) {
        vehicle.setVariable("pearlColor", pearlColor);
        playerToUpdate.call("updatePearlForVehicle", [vehicle, wheelColor, pearlColor]);
    } else {
        playerToUpdate.notify("Server hat undfined vehicle ...");
    }
  }
});
