mp.events.add("server:Passenger:getVehSeatNr", (player) => {
  if(mp.players.exists(player)) {
    let pos = new mp.Vector3(player.position.x, player.position.y, player.position.z);

    if (getVehicleFromPosition(pos, 5).length > 0) {
        var vehicle = getVehicleFromPosition(pos, 5)[0];
        if (vehicle) {
            var vehData = JSON.parse(vehicle.getVariable("vehData"));
            if (vehData !== null) {
              player.call("client:Passenger:openMenu", [vehData["sitzplatz"], vehicle]);
            }
        }
    }
  }
});

mp.events.add("server:Passenger:putIntoVehicle", (player, vehicle, seat) => {
  if(mp.players.exists(player)) {
    if(mp.vehicles.exists(vehicle)) {
      if (!vehicle.locked) {
        player.putIntoVehicle(vehicle, seat);
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
