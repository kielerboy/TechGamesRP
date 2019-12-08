
function position(player, fullText) {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);
    if(fractionData.fractionName == "NOOSE") {
      player.call("client:GetPos:position",[player, player.heading]);
    }
  }
}
mp.events.addCommand("posi", position);
