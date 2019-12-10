//NOOSE SHAPE
let NOOSEColShape = mp.colshapes.newSphere(2475.606, -384.11, 94.39, 1, 0);
let NOOSEExitColShape = mp.colshapes.newSphere(2155.06, 2920.94, -61.90, 1, 0);
let NOOSEToGarageColShape = mp.colshapes.newSphere(106.43, -647.98, 45.09, 1, 0);
let NOOSEFromGarageColShape = mp.colshapes.newSphere(184.88, -688.82, 33.12, 1, 0);
let NOOSEDutyPedColShape = mp.colshapes.newSphere(2110.9128, 2928.4641, -61.9019, 4, 0);
let NOOSEBikePedColShape = mp.colshapes.newSphere(2126.3151, 2918.2976, -61.9019, 2, 0);
let NOOSEBikeDestructPos = new mp.Vector3(2125.5639, 2922.7033, -61.9018, 3, 0);
const NOOSELeitstelle = 999;
mp.markers.new(1, new mp.Vector3(2125.5639, 2922.7033, -63.9018), 2, {
    direction: new mp.Vector3(2125.5639, 2922.7033, -63.9018),
    rotation: new mp.Vector3(0, 0, 0),
    color: [255, 255, 255, 100],
    visible: true,
    dimension: 0
});
var NOOSEBikeSpawnPos = new mp.Vector3(2124.4194, 2918.9067, -61.9018);

//NOOSE MARKER
const NOOSEmarker = mp.markers.new(2, new mp.Vector3(2475.606, -384.11, 94.39), 1, {
    color: [255, 0, 0, 50],
    visible: true,
    dimension: 0
});
const NOOSEexitmarker = mp.markers.new(2, new mp.Vector3(2155.06, 2920.94, -61.90), 1, {
    color: [255, 0, 0, 50],
    visible: true,
    dimension: 0
});
//Enter Colshape
function playerEnterColshapeHandlerNOOSE(player, shape) {
    if (mp.players.exists(player)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);
        if (fractionData.fractionName == "NOOSE") {
            if (shape == NOOSEColShape) {
                player.position = new mp.Vector3(2152.23, 2921.04, -61.50);
                player.heading = 93.197;
                player.dimension = 0;
            } else if (shape == NOOSEExitColShape) {
                player.position = new mp.Vector3(2477.606, -384.11, 94.39);
                player.heading = 70.4951;
                player.dimension = 0;
            }
        }
        if (shape == NOOSEFromGarageColShape) {
            player.position = new mp.Vector3(104.76, -647.41, 45.2);
            player.heading = 73.5333;
            player.dimension = 0;
        }
        if (shape == NOOSEToGarageColShape) {
            player.position = new mp.Vector3(183.12, -687.91, 33.20);
            player.heading = 90.9914;
            player.dimension = 0;
        }
    }
}

mp.events.add("playerEnterColshape", playerEnterColshapeHandlerNOOSE);

mp.events.add("server:Keybind:KeyO", (player) => {
    if (mp.players.exists(player)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "NOOSE") {
            gm.databaseManager.getConnection().query("SELECT r.fractionRankName FROM fractions f LEFT JOIN fractionranks r ON f.fractionID = r.fractionID WHERE f.fractionID = 1", function(errUp, resUp) {
                if (errUp) player.notify("Error: " + errUp);
                if (resUp.length > 0) {
                    var c = 1;
                    let ranks = [];
                    resUp.forEach(function(rank) {
                        ranks.push(rank.fractionRankName);
                        if (c == resUp.length) {
                            if (mp.players.exists(player)) {
                                player.call("client:NOOSE:openInteractionMenu", [fractionData.canInvite, JSON.stringify(ranks)]);
                            }
                        }
                        c++;
                    });
                }
            });
        }
    }
});

var PlayerRanks = "";
PlayerRanks = {
    "RankClothingM": [
        { "RankName": "NOOSE Agent", "jacket": [186, 0], "tshirt": [97, 0], "pants": [34, 0], "shoes": [81, 0], "accessoires": [125, 0], "gloves": [38, 0], "mask": [29, 0], "hats": [124, 0], "eyes": [5, 0] },
        { "RankName": "NOOSE Special Agent", "jacket": [4, 0], "tshirt": [31, 0], "pants": [24, 0], "shoes": [10, 0], "accessoires": [125, 0], "gloves": [4, 0], "mask": [0, 0], "hats": [120, 0], "eyes": [5, 0] },
        { "RankName": "NOOSE Leitung", "jacket": [4, 0], "tshirt": [31, 0], "pants": [24, 0], "shoes": [10, 0], "accessoires": [125, 0], "gloves": [4, 0], "mask": [0, 0], "hats": [120, 0], "eyes": [5, 0] }
    ],
    "RankClothingF": [
        { "RankName": "NOOSE Agent", "jacket": [57, 0], "tshirt": [64, 0], "pants": [6, 0], "shoes": [29, 0], "accessoires": [95, 0], "gloves": [1, 0], "mask": [0, 0], "hats": [120, 0], "eyes": [5, 0] },
        { "RankName": "NOOSE Special Agent", "jacket": [57, 0], "tshirt": [64, 0], "pants": [6, 0], "shoes": [29, 0], "accessoires": [95, 0], "gloves": [1, 0], "mask": [0, 0], "hats": [120, 0], "eyes": [5, 0] },
        { "RankName": "NOOSE Leitung", "jacket": [57, 0], "tshirt": [64, 0], "pants": [6, 0], "shoes": [29, 0], "accessoires": [95, 0], "gloves": [1, 0], "mask": [0, 0], "hats": [120, 0], "eyes": [5, 0] }
    ]
};

mp.events.add("server:fractions:reDuty", (player) => {
    if (mp.players.exists(player)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "NOOSE") {
            player.call("client:NOOSE:openDutyMenu");
            player.notify('Du bist als OnDuty eingetragen bitte gehe von hier aus wieder in den Dienst!');
        }
    }
});

mp.events.add("server:NOOSE:onDuty", (player, PlayerRank) => {
    if (mp.players.exists(player)) {
        if (player.data.gender == 0) {
            for (let i = 0; i < PlayerRanks.RankClothingM.length; i++) {
                const RankName = PlayerRanks.RankClothingM[i].RankName;
                if (RankName == PlayerRank) {
                    player.setClothes(1, 0, 0, 2); // Mask
                    player.setClothes(3, PlayerRanks.RankClothingM[i].gloves[0], PlayerRanks.RankClothingM[i].gloves[1], 2); // Torso
                    player.setClothes(4, PlayerRanks.RankClothingM[i].pants[0], PlayerRanks.RankClothingM[i].pants[1], 2); // Pants
                    player.setClothes(6, PlayerRanks.RankClothingM[i].shoes[0], PlayerRanks.RankClothingM[i].shoes[1], 2); // Shoes
                    player.setClothes(7, PlayerRanks.RankClothingM[i].accessoires[0], PlayerRanks.RankClothingM[i].accessoires[1], 2); // Accessories
                    player.setClothes(8, PlayerRanks.RankClothingM[i].tshirt[0], PlayerRanks.RankClothingM[i].tshirt[1], 2); // Undershirts
                    player.setClothes(11, PlayerRanks.RankClothingM[i].jacket[0], PlayerRanks.RankClothingM[i].jacket[1], 2); // Top
                    player.setClothes(1, PlayerRanks.RankClothingM[i].mask[0], PlayerRanks.RankClothingM[i].mask[1], 2); // Maske
                    player.setProp(0, PlayerRanks.RankClothingM[i].hats[0], PlayerRanks.RankClothingM[i].hats[1]); // Hüte
                    player.setProp(1, PlayerRanks.RankClothingM[i].eyes[0], PlayerRanks.RankClothingM[i].eyes[1]); // Brillen
                }
            }
        } else {
            for (let i = 0; i < PlayerRanks.RankClothingF.length; i++) {
                const RankName = PlayerRanks.RankClothingF[i].RankName;
                if (RankName == PlayerRank) {
                    player.setClothes(0, 0, 0, 2); // Mask
                    player.setClothes(3, PlayerRanks.RankClothingF[i].gloves[0], PlayerRanks.RankClothingF[i].gloves[1], 2); // Torso
                    player.setClothes(4, PlayerRanks.RankClothingF[i].pants[0], PlayerRanks.RankClothingF[i].pants[1], 2); // Pants
                    player.setClothes(6, PlayerRanks.RankClothingF[i].shoes[0], PlayerRanks.RankClothingF[i].shoes[1], 2); // Shoes
                    player.setClothes(7, PlayerRanks.RankClothingF[i].accessoires[0], PlayerRanks.RankClothingF[i].accessoires[1], 2); // Accessories
                    player.setClothes(8, PlayerRanks.RankClothingF[i].tshirt[0], PlayerRanks.RankClothingF[i].tshirt[1], 2); // Undershirts
                    player.setClothes(11, PlayerRanks.RankClothingF[i].jacket[0], PlayerRanks.RankClothingF[i].jacket[1], 2); // Top
                    player.setClothes(1, PlayerRanks.RankClothingF[i].mask[0], PlayerRanks.RankClothingF[i].mask[1], 2); // Maske
                    player.setProp(0, PlayerRanks.RankClothingF[i].hats[0], PlayerRanks.RankClothingF[i].hats[1]); // Hüte
                    player.setProp(1, PlayerRanks.RankClothingF[i].eyes[0], PlayerRanks.RankClothingF[i].eyes[1]); // Brillen
                }
            }
        }
        player.notify(`Du hast den Dienst als ${PlayerRank} angetreten!`);
        mp.events.call("adminlog", player, player.data.ingameName + " hat den Dienst angetreten als NOOSE Agent");
        gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function(errUp, resUp) {
            if (errUp) console.log("Error: " + errUp);
            gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [player.data.internalId], function(err2, res2) {
                if (err2) console.log("Error on Set Fraction");

                if (res2.length > 0) {
                    res2.forEach(function(fraction) {
                        if (mp.players.exists(player)) {
                            player.data.fractionData = JSON.stringify(fraction);
                        }
                    });
                }
            });
        });
    }
});

mp.events.add("server:NOOSE:offDuty", (player) => {
    if (mp.players.exists(player)) {
        player.notify("Du hast den Dienst verlassen");
        gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function(err2, res2) {
            if (err2) console.log("Error in setModel + Clothes on Login");

            if (res2.length > 0) {
                res2.forEach(function(modelData) {
                    var model = JSON.parse(modelData.data);
                    var appearance = modelData.appearance;
                    setTimeout(function() {
                        if (mp.players.exists(player)) {
                            mp.events.call("server:ClothesMenu:load", player, appearance);
                        }
                    }, 500);

                    gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'N' WHERE playerCharID = " + player.data.internalId, function(errUp, resUp) {
                        if (errUp) console.log("Error: " + errUp);
                        mp.events.call("adminlog", player, player.data.ingameName + " hat den Dienst verlassen als NOOSE Agent");
                        gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [player.data.internalId], function(err2, res2) {
                            if (err2) console.log("Error on Set Fraction");

                            if (res2.length > 0) {
                                res2.forEach(function(fraction) {
                                    if (mp.players.exists(player)) {
                                        player.data.fractionData = JSON.stringify(fraction);
                                    }
                                });
                            }
                        });
                    });
                });
            }
        });
    }
});

function setInvisible(player, state) {
    if (mp.players.exists(player)) {
        if (state == "Unsichtbar") {
            player.alpha = 0;
            mp.events.call("adminlog", player, player.data.ingameName + " hat sich unsichtbar gemacht!");
        }
        if (state == "Sichtbar") {
            player.alpha = 255;
            mp.events.call("adminlog", player, player.data.ingameName + " hat sich sichtbar gemacht");
        }
    }
}
mp.events.add("server:NOOSE:setInvisible", setInvisible);

function hirePlayer(player, rank) {
    if (mp.players.exists(player)) {
        getNearestPlayer(player, 2);
        if (mp.players.exists(player)) {
            if (currentTarget) {
                gm.databaseManager.getConnection().query("SELECT id FROM fractionranks WHERE fractionID = 1 AND fractionRankName = ?", [rank], function(err1, res1) {
                    if (err1) console.log("Error in NOOSE Hire Player Query1: " + err1);
                    if (res1.length == 1) {
                        res1.forEach(function(rankID) {
                            var id = rankID.id;
                            var targetId = parseInt(currentTarget.data.internalId);
                            gm.databaseManager.getConnection().query("INSERT INTO fractionusers(playerCharID,fractionID,fractionRankID,playerFractionDuty) VALUES(?,1,?,'N')", [targetId, id], function(err2, res2) {
                                if (err2) console.log("Error in NOOSE Hire Player Query2: " + err2);
                                else {
                                    if (mp.players.exists(player) && mp.players.exists(currentTarget)) {
                                        player.notify("Die Person wurde erfolgreich eingestellt!");
                                        currentTarget.notify("Du wurdest beim NOOSE als " + rank + " eingestellt!");
                                        gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function(err2, res2) {
                                            if (err2) console.log("Error on Set Fraction");

                                            if (res2.length > 0) {
                                                res2.forEach(function(fraction) {
                                                    if (mp.players.exists(currentTarget)) {
                                                        currentTarget.data.fractionData = JSON.stringify(fraction);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    }
                });
            }
        }
    }
}
mp.events.add("server:NOOSE:hirePlayer", hirePlayer);

function firePlayer(player) {
    if (mp.players.exists(player)) {
        getNearestPlayer(player, 2);
        if (currentTarget) {
            var targetId = currentTarget.data.internalId;
            gm.databaseManager.getConnection().query("DELETE FROM fractionusers WHERE fractionID = 1 AND playerCharID = ?", [targetId], function(err1, res1) {
                if (err1) console.log("Error in NOOSE Fire Player Query1: " + err1);
                else {
                    if (mp.players.exists(player) && mp.players.exists(currentTarget)) {
                        player.notify("Die Person wurde erfolgreich gefeuert!");
                        currentTarget.notify("Du wurdest aus dem NOOSE entlassen!");
                        gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function(err2, res2) {
                            if (err2) console.log("Error on Set Fraction");

                            currentTarget.data.fractionData = JSON.stringify("arbeitslos");
                            if (res2.length > 0) {
                                res2.forEach(function(fraction) {
                                    if (mp.players.exists(currentTarget)) {
                                        currentTarget.data.fractionData = JSON.stringify(fraction);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
}
mp.events.add("server:NOOSE:firePlayer", firePlayer);

mp.events.add("server:NOOSE:armor", (player) => {
    if (mp.players.exists(player)) {
        player.setClothes(9, 12, 1, 2);
        player.armour = 100;
    }
});

mp.events.add("server:NOOSE:weapon", (player, name) => {
    if (mp.players.exists(player)) {
        var hashToSpawn = "";
        if (name == "Karabiner MK2") {
            hashToSpawn = mp.joaat("weapon_specialcarbine_mk2");
        } else if (name == "Combat MG MK2") {
            hashToSpawn = mp.joaat("weapon_combatmg_mk2");
        } else if (name == "Pistol MK2") {
            hashToSpawn = mp.joaat("weapon_pistol_mk2");
        } else if (name == "Tazer") {
            hashToSpawn = mp.joaat("weapon_stungun");
        } else if (name == "Minigun") {
            hashToSpawn = mp.joaat("weapon_minigun");
        } else if (name == "RPG") {
            hashToSpawn = mp.joaat("weapon_rpg");
        }

        player.giveWeapon(hashToSpawn, 10000);
    }
});

mp.events.add("server:noose:playerlist", (player) => {
    gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE isOnline = 'Y'", function(err, res) {
        if (err) console.log("Error in Select Online Characters: " + err);
        if (res.length > 0) {
            var PlayerList = [];
            var i = 1;
            res.forEach(function(players) {
                let obj = { "commandname": String(players.commandName), "charname": String(players.ingameName), "money": String(players.money), "telefon": String(players.telefonnummer) };
                PlayerList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:noose:playerlist", [JSON.stringify(PlayerList)]);
                }
                i++;
            });
        } else {
            player.notify("~r~Keine Spieler Online");
        }
    });
});

function SpawnBike(player, model) {
    if (mp.players.exists(player)) {
        if (getVehicleFromPosition(NOOSEBikeSpawnPos, 3).length > 0) {
            player.notify("~r~Es steht bereits ein Fahrrad in der Ausfahrt");
        } else {
            hashToSpawn = mp.joaat(model);
            let veh = mp.vehicles.new(hashToSpawn, NOOSEBikeSpawnPos, {});
            veh.rotation = new mp.Vector3(0, 0, 82.6290);
            veh.dimension = 0;
            veh.numberPlateType = 1;
            veh.numberPlate = "NOOSE";
            veh.setVariable("Owner", player.name);
            veh.setVariable("isNOOSE", "true");
            player.call("client:MedicVeh:setEngineBoost", [veh]);
            player.notify("~g~Dein Dienstfahrrad wurde ausgeparkt und steht bereit");
        }
    }
}
mp.events.add("server:NOOSE:SpawnBike", SpawnBike);

function DestructBike(player) {
    if (mp.players.exists(player)) {
        if (getVehicleFromPosition(NOOSEBikeSpawnPos, 3).length > 0) {
            player.notify("~r~Es steht kein Fahrrad in der Einfahrt");
            return;
        } else {
            mp.vehicles.forEachInRange(NOOSEBikeDestructPos, 3, (veh) => {
                if (mp.vehicles.exists(veh)) {
                    if (veh) veh.destroy();
                    player.notify("~g~Fahrrad wurde eingeparkt");
                }
            });
        }
    }
}
mp.events.add("server:NOOSE:DestructBike", DestructBike);

mp.events.add("server:Keybind:KeyE", (player) => {
    if (mp.players.exists(player)) {
        var fractionData = player.data.fractionData;
        fractionData = JSON.parse(fractionData);

        if (fractionData.fractionName == "NOOSE") {

            if (NOOSEDutyPedColShape.isPointWithin(player.position)) {
                player.call("client:NOOSE:openDutyMenu");
            }
            if (NOOSEBikePedColShape.isPointWithin(player.position)) {
                player.call("client:NOOSE:openBikeMenu");
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

var currentTarget = null;

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if (player != _player) {
                let _dist = _player.dist(player.position);
                if (_dist < dist) {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};