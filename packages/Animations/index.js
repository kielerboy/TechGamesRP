mp.events.add("playAnimationEvent", (player, animGroup, animType, speed, moveNumber, milSec) => {
	if(!mp.players.exists(player)) return;
	if(player.vehicle) return;
	player.playAnimation(animGroup, animType, speed, moveNumber);
	if(milSec && milSec != -1) {
		player.call("quitAnimationAfter", [player, parseInt(milSec)]);
	}
});

mp.events.add("server:animations:facial", (player, animName, animDict) => {
	if(!mp.players.exists(player)) return;
	player.notify("Spiele animation ab")
	//if(player.vehicle) return;
	player.notify(""+animName+animDict);
	player.playFacialAnim(animName, animDict);
});

// Animation stoppen
mp.events.add("stopAnimation", (player) => {
	// Nicht stoppen wenn Spieler im Auto ist
	if(!mp.players.exists(player)) return;
	if(player.vehicle) return;
	player.stopAnimation();
});
