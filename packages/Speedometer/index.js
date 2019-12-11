let timeNow = Date.now();

mp.events.add('calc_km', (player, vehicle_data) => {
	vehicle_data = JSON.parse(vehicle_data);
	let distance = 0;
	let speed = vehicle_data.speedofcar;
	let trip = Math.floor(speed * ((Date.now() - timeNow) / 1000) * 100) / 100;

	distance += parseFloat(trip / 1000);
	timeNow = Date.now();

	var kmS = distance;
	kmS = kmS + player.vehicle.getVariable('Kilometer');

	let data = JSON.stringify({ "playerID" : player.id, "distance" : distance, "state" : true, "vehicle" : player.vehicle });
	mp.events.call('tank', player, data);

	player.vehicle.setVariable('Kilometer', kmS);
});

mp.events.add('tank', (player, args) => {
	args = JSON.parse(args);
	player = mp.players.at(args.playerID);
	var vehicle = mp.vehicles.at(args.vehicle);
	var Veh_data = args.distance;
	var State = args.state;
	if(State)
	{
        if(player.vehicle.getVariable('Tank') != null)
        {
        	let rest = (Veh_data * 2);
			let tank = player.vehicle.getVariable('Tank');
			let newtank = (tank - rest);
			if(newtank < 0) {
				player.vehicle.engine = false;
				player.notify("~r~ Achtung Tank ist leer!");
				player.vehicle.setVariable('Tank', 0);
			} else if (newtank < 16 && !newtank < 0){
				player.notify("~y~Achtung Tank bald leer!");
				player.vehicle.setVariable('Tank', newtank);
			} else {
				player.vehicle.setVariable('Tank', newtank);
			}
		} else {
			player.vehicle.setVariable('Tank',100);
			player.vehicle.setVariable('TankMax',100);
		}
}
});