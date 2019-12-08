let discounterShape = mp.colshapes.newSphere(1196.60, 2711.62, 38, 3, 0);
let discounterShape2 = mp.colshapes.newSphere(-1102.39, 2711.60, 19, 3, 0);
let discounterShape3 = mp.colshapes.newSphere(5.81, 6511.43, 31, 3, 0);
let discounterShape4 = mp.colshapes.newSphere(1695.28, 4823.03, 42, 3, 0);
let discounterShape11 = mp.colshapes.newSphere(127.47, -222.95, 54.55, 3, 0)
let discounterShape12  = mp.colshapes.newSphere(73.93, -1393, 29, 3, 0);
//Ponsonbys
let discounterShape5 = mp.colshapes.newSphere(-165.06, -303.04, 39.733, 3, 0);
let discounterShape6 = mp.colshapes.newSphere(-1448.77, -237.82, 49.81, 3, 0);
let discounterShape7 = mp.colshapes.newSphere(-709, -151.60, 37,41, 3, 0);
//Suburban
let discounterShape9 = mp.colshapes.newSphere(613.03, 2781.82, 42, 3, 0);
let discounterShape10 = mp.colshapes.newSphere(-3169.07, 1044, 20, 3, 0);


// KEYPRESS
mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    if(discounterShape.isPointWithin(player.position) || discounterShape2.isPointWithin(player.position) || discounterShape3.isPointWithin(player.position) ||
                                                          discounterShape4.isPointWithin(player.position) || discounterShape5.isPointWithin(player.position) || discounterShape6.isPointWithin(player.position) ||
                                                          discounterShape7.isPointWithin(player.position) || discounterShape9.isPointWithin(player.position) || discounterShape10.isPointWithin(player.position) ||
                                                          discounterShape11.isPointWithin(player.position) || discounterShape12.isPointWithin(player.position) ) {

      player.call("client:ClothesMenu:OpenMenu");
    }
  }
});



// CLOSE SHAPE
function playerExitColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == discounterShape || discounterShape2 || discounterShape3 || discounterShape4 || discounterShape5 || discounterShape6 || discounterShape7 || discounterShape9 || discounterShape10 || discounterShape11 || discounterShape12) {
      //Spieler hat colshape verlassen
      player.call("client:Discounter:closeMenu")
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);
