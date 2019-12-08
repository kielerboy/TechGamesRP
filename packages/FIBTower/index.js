//FIB SHAPE
let FIBColShape = mp.colshapes.newSphere(135.93270874023438, -762.1954345703125, 45.75202560424805, 1, 0);
let FIBExitColShape = mp.colshapes.newSphere(136.36448669433594, -761.9046020507812, 242.15199279785156, 1, 0); 
let FIBtopExitColShape = mp.colshapes.newSphere(121.1474380493164, -727.202392578125, 258.15203857421875, 1, 0);

//FIB MARKER
const fibmarker = mp.markers.new(2, new mp.Vector3(135.93270874023438, -762.1954345703125, 45.75202560424805),1,
{
    color: [255, 0, 0, 50],
    visible: true,
    dimension: 0
});
const fibexitmarker = mp.markers.new(2, new mp.Vector3(136.36448669433594, -761.9046020507812, 242.15199279785156),1,
{
    color: [255, 0, 0, 50],
    visible: true,
    dimension: 0
});
const fibtopexitmarker = mp.markers.new(2, new mp.Vector3(121.1474380493164, -727.202392578125, 258.15203857421875),1,
{
    color: [255, 0, 0, 50],
    visible: true,
    dimension: 0
});




//FIB Erste Etage
mp.events.add("1ET", (player, x, y, z) => {
    if(FIBColShape.isPointWithin(player.position)) {
		player.position = new mp.Vector3(135.2572784423828, -764.27880859375, 242.15199279785156);﻿
        player.call("loadFIBfirstfloor", [x,y,z]);
	}
	if(FIBtopExitColShape.isPointWithin(player.position)) {
		player.position = new mp.Vector3(135.2572784423828, -764.27880859375, 242.15199279785156);﻿
        player.call("loadFIBfirstfloor", [x,y,z]);
    }
});
//FIB Erdgeschoss
mp.events.add("EG", (player, x, y, z) => {
    if(FIBExitColShape.isPointWithin(player.position)) {
		player.position = new mp.Vector3(135.30169677734375, -764.0867309570312, 45.75203323364258);﻿
        player.call("loadFIBfirstfloorExit", [x,y,z]);
    }
    if(FIBtopExitColShape.isPointWithin(player.position)) {
		player.position = new mp.Vector3(135.30169677734375, -764.0867309570312, 45.75203323364258);﻿
        player.call("loadFIBfirstfloorExit", [x,y,z]);
    }
});
//FIB Dachgeschoss
mp.events.add("TOP", (player, x, y, z) => {
    if(FIBColShape.isPointWithin(player.position)) {
		player.position = new mp.Vector3(119.53166961669922, -731.0320434570312, 258.15203857421875);﻿
        player.call("loadFIBtopfloor", [x,y,z]);
	}
	if(FIBExitColShape.isPointWithin(player.position)) {
		player.position = new mp.Vector3(119.53166961669922, -731.0320434570312, 258.15203857421875);
        player.call("loadFIBtopfloor", [x,y,z]);
    }
});

//Enter Colshape
function playerEnterColshapeHandler(player, shape) {
  if(shape == FIBColShape) {
    player.call("bedienung");
  }
  else if(shape == FIBExitColShape) {
    player.call("bedienung");
  }
  else if(shape == FIBtopExitColShape) {
    player.call("bedienung");
  }
}

mp.events.add("playerEnterColshape", playerEnterColshapeHandler);