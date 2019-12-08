let Barriers = {}
function createbarri(player, barrier, pos) {
  if (mp.players.exists(player)) {
    player.playAnimation("amb@world_human_gardener_plant@male@idle_a", "idle_b", 1, 49)
    // ALTE BARRIERE let objBarrier = mp.objects.new(mp.joaat("prop_mp_barrier_02b"), pos, [0, 0, 0]);
    let objBarrier = mp.objects.new(mp.joaat("prop_barrier_work05"), pos, [0, 0, 0]);
    objBarrier.rotation = new mp.Vector3(0, 0, player.heading);
    if (barrier === "barrier1") Barriers[player.name].barrier1 = objBarrier;
    else {
        Barriers[player.name].barrier2 = objBarrier;
    }
    setTimeout(_ => {
        if (mp.players.exists(player)) player.stopAnimation();
    }, 1000)
    player.notify("Barriere ~g~ erfolgreich ~w~ aufgestellt!");
  }
};

//BARRIERE AUFSTELLEN
mp.events.add("server:barrier:setbarrier", (player) => {
  if(mp.players.exists(player)) {
    var playerPos = player.position;
    var xDistance = 1.3;
    var yDistance = 1.3;
    var StartingRotation = player.heading;
    var newAngle = 360.0 - ((StartingRotation + 360.0) % 360.0);
    var x = playerPos.x + xDistance * Math.sin(newAngle * Math.PI / 180.0);
    var y = playerPos.y + yDistance * Math.cos(newAngle * Math.PI / 180.0);
    var newPosition = new mp.Vector3(x, y, playerPos.z -= 1, player.heading);
    if (Barriers[player.name] === undefined) {
        Barriers[player.name] = {
            barrier1: null,
            barrier2: null
        };
    };
    if(player.vehicle){
        player.notify("Genau und ich Baue hier drin ein Hochhaus");
    }
    else if (Barriers[player.name].barrier1 === null) {
        createbarri(player, "barrier1", newPosition)
    } else if (Barriers[player.name].barrier2 === null) {
        createbarri(player, "barrier2", newPosition)
    } else {
        player.notify("Du kannst nicht mehr wie 2 Barrieren aufstellen");
        return false;
    };
  }
});

mp.events.add("server:barrier:removebarrier", (player) => {
  if (mp.players.exists(player)) {
    if (Barriers[player.name] === undefined || Barriers[player.name].barrier1 === null)
        return player.notify("Du hast ~r~keine ~w~Barrieren aufgestellt!");

    if (Barriers[player.name].barrier1 != null) {
        let objBarrier = Barriers[player.name].barrier1;
        if (objBarrier) objBarrier.destroy();
        Barriers[player.name].barrier1 = null;
    };

    if (Barriers[player.name].barrier2 != null) {
        let objBarrier = Barriers[player.name].barrier2;
        if (objBarrier) objBarrier.destroy();
        Barriers[player.name].barrier2 = null;
    };

    player.notify("Alle Barrieren ~g~erfolgreich ~w~entfernt!");
  }
});
