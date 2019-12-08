var PlayerClass = require("./users/player.js");
var players = [];

mp.events.add("playerJoin", function(player) {
  if(mp.players.exists(player)) {
    players[player] = new PlayerClass(player);
  }
});

mp.events.add("Combat:FireWeapon", function(player, weapon, ammo) {
  if(mp.players.exists(player)) {
    if (players[player.id]) {
        players[player.id].fireWeapon(weapon, ammo)
    }
  }
});
mp.events.add("Combat:HitEntity", function(player, entity, weapon, bone) {
  if(mp.players.exists(player)) {
    if ((entity) && (weapon)) {
        if (entity.type == "player") {
            if (players[player.id]) {
                if (players[entity.id]) {
                    players[entity.id].hit(players[player.id], weapon, bone)
                }
            }
        }
    }
  }
});
