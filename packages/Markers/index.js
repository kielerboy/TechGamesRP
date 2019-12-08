mp.events.add("tpPlayer", (player, x, y, z) => {
  if(mp.players.exists(player)) {
    player.position = new mp.Vector3(x, y, z);
  }
});

mp.events.add("changeDimension", (player, dim) => {
  if(mp.players.exists(player)) {
    player.dimension = dim;
    player.call("client:world:weatherUpdate",[gm.weather.currentWeather]);
    player.call("client:world:timeUpdate");
  }
});
