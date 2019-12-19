const bcrypt = require('bcryptjs');
const toClient = require('./core/toClient.js');
let player = null;

let startApartmentExitColshape = mp.colshapes.newSphere(-28.73, -597.24, 80.03, 1, -99);
mp.markers.new(1, new mp.Vector3(-28.73, -597.24, 80.03), 1, {
    direction: new mp.Vector3(-28.73, -597.24, 80.03),
    rotation: new mp.Vector3(0, 0, 0),
    color: [255, 255, 255, 100],
    visible: true,
    dimension: -99
});

mp.events.add("server:Keybind:KeyE", (player) => {
    if (startApartmentExitColshape.isPointWithin(player.position)) {
        player.spawn(new mp.Vector3(254.92, -1013.30, 29.26));
        player.dimension = 0;
    }
});

mp.events.add({
    "playerJoin": (player) => {
        player = player;
        console.log("[Server] " + player.socialClub + " " + player.id + " ist im Login");
        let playerID = player.id + 100;
        player.setVariable("state", "LOGIN");
        player.dimension = playerID;
        player.position = new mp.Vector3(-797.019775390625, 332.118896484375, 153.80490112304688);
        player.heading = 266;
        player.health = 100;
        player.alpha = 255;
        player.data.fractionData = JSON.stringify("arbeitslos");
        player.data.businessData = JSON.stringify("arbeitslos");
		player.data.teamData = JSON.stringify("spieler");

        gm.databaseManager.getConnection().query("SELECT username FROM accounts where socialClub = ?", [player.socialClub], function(err, res) {
            if (err) console.log(err);
            if (!res) return;
            res.forEach(function(username) {
                player.call("startLogin", [username.username]);
            });
        });

        setTimeout(function() {
            try {
                if (mp.players.exists(player)) {
                    gm.databaseManager.getConnection().query("SELECT * FROM actions", function(err, res) {
                        if (err) console.log(err);
                        res.forEach(function(action) {
                            if (!res) return;
                            gm.databaseManager.getConnection().query("SELECT * FROM ped WHERE id = ?", [action.ped], function(err2, res2) {
                                if (err2) console.log(err2);
                                if (!res2) return;
                                res2.forEach(function(ped) {
                                    player.call("loadAction", [action.action, action.id, action.fraktionsAktion, ped.posX, ped.posY, ped.posZ]);
                                    player.call("createPed", [ped.hash, ped.posX, ped.posY, ped.posZ, ped.heading, ped.dimension]);
                                });
                            });
                        });
                    });

                    gm.databaseManager.getConnection().query("SELECT * FROM marker", function(err, res) {
                        if (err) console.log(err);
                        if (!res) return;
                        res.forEach(function(marker) {
                            player.call("loadMarker", [marker.krz, marker.dim1, marker.dim2, marker.pos1X, marker.pos1Y, marker.pos1Z, marker.pos2X, marker.pos2Y, marker.pos2Z, marker.ownerType, marker.ownerName, marker.open]);
                        });
                    });

                    gm.databaseManager.getConnection().query("SELECT spawnerX , spawnerY , spawnerZ FROM garages", function(err, res) {
                        if (err) console.log(err);
                        if (!res) return;
                        res.forEach(function(pos) {
                            var garageMarker = mp.markers.new(1, new mp.Vector3(pos.spawnerX, pos.spawnerY, (pos.spawnerZ - 4)), 4, {
                                color: [255, 255, 255, 255],
                                visible: true,
                                dimension: 0
                            });
                        });
                    });

                    gm.databaseManager.getConnection().query("SELECT * FROM Blips", function(err, res) {
                        if (err) console.log(err);
                        if (!res.length > 0) return;
                        res.forEach(function(blip) {
                            player.call("createBlip", [new mp.Vector3(blip.posX, blip.posY, blip.posZ), blip.sprite, blip.color, blip.title]);
                        });
                    });
                }
            } catch (e) {
                console.log("ERROR - login.js - playerJoin: " + e);
            }
        }, 100);
    },

    "checkUsernamePassword": (player, username, password) => {

        gm.databaseManager.getConnection().query("SELECT id , password, hwid FROM `accounts` WHERE username = '" + username + "' AND isWhitelisted = 'Y' AND isBanned = 'N'", function(err, res) {
            if (err) console.log("[Auth] Es gab ein Fehler im login System");

            if (!res.length > 0) {
                player.call("wrongLoginDatas");
                return;
            }
            if (res[0].hwid == "none") {
                gm.databaseManager.getConnection().query("UPDATE `accounts` SET hwid = ? WHERE username = ?", [player.serial, username], function(err2, res2) {
                    if (err2) console.log("Error in Update HWID on login!");
                });
            }
            if (res[0].hwid !== player.serial) {
                player.call("wrongLoginDatas");
                return;
            }

            res.forEach(function(account) {
                bcrypt.compare(password, account.password, function(err2, res2) {
                    if (err2) throw err2;

                    if (res2) {
                        gm.databaseManager.getConnection().query("UPDATE `accounts` SET socialClub = ? WHERE username = ?", [player.socialClub, username], function(err4, res4) {
                            if (err4) console.log("Error in Update socialClub on login!");
                        });
                        player.call("closeLogin");
                        gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE accountId = '" + account.id + "' AND isWhitelisted = '1'", function(err3, res3) {
                            if (err3) console.log("[Character Login] Es gab ein Fehler im Character Login!");

                            if (!res3.length > 0) {
                                player.notify("~r~Du hast keine gewhitelisteten Charactere!");
                                player.kick('');
                                return;
                            }
                            player.data.accountId = account.id;
                            let charList = [];
                            res3.forEach(function(chars) {
                                let obj = { "ingamename": chars.ingameName };
                                charList.push(obj);
                            });
                            if(mp.players.exists(player)) player.call("client:charchooser:openMenu", [JSON.stringify(charList)]);
                        });
                    } else {
                        player.call("wrongLoginDatas");
                    }
                });
            });
        });
    },

    "server:charchooser:menuclick": (player, char) => {
        player.alpha = 255;

        gm.databaseManager.getConnection().query("SELECT c.*, f.dateOfBirth FROM characters c LEFT JOIN whitelisting_forms f ON f.characterId = c.id WHERE c.ingameName='" + char + "' AND c.isWhitelisted = 1", function(err, res) {
            if (err) throw err;

            if (!res.length > 0) {
                player.kick("Es ist ein Fehler beim Charakterlogin aufgetreten, melde dich im Support!");
                return;
            }

            res.forEach(function(character) {
                player.health = character.health;
                player.armour = character.armor;
                //player.data.model = "mp_m_freemode_01";
                player.alpha = 255;
                player.data.fraktion = character.fraktion;
                player.data.accountId = character.accountId;
                player.data.money = character.money;
                player.data.internalId = character.id;
                player.data.ingameName = character.ingameName;
                player.data.dob = character.dateOfBirth;
                player.name = character.commandName;
                player.phoneNumber = character.telefonnummer;
                player.isPet = character.isPet;
                player.petHash = character.petHash;
                player.setVariable("permaDeathTimer", String(character.permaDeathTime));
                player.setVariable("isUnconcious", "false");
                player.data.inventory = parseFloat(10);

                player.data.propZero = null;
                player.data.propOne = null;
                player.data.propTwo = null;
                player.data.propSix = null;
                player.data.propSeven = null;

                player.call("setFraktion", [player.data.fraktion]);

                if (character.isCreator == "Y") {
                    player.sendToCreator();
                } else {
                    player.dimension = character.dimension;
                    player.data.food = character.food;
                    player.data.drink = character.drink;
                    player.data.weight = character.weight;
                    player.data.inventory = character.inventory;

                    gm.databaseManager.getConnection().query("UPDATE characters SET isOnline = 'Y', currentOnlineId = " + player.id + " WHERE id = " + character.id, function(errUp, resUp) {
                        if (errUp) console.log("Error in update character on login: " + errUp);
                    });

                    //Set Team to Player..
                    player.data.teamData = JSON.stringify("spieler");
                    gm.databaseManager.getConnection().query("SELECT f.teamName, f.teamID, r.id AS teamRankID, r.teamRankName, r.teamRank FROM teamusers u LEFT JOIN teamranks r ON r.id = u.teamRankID LEFT JOIN team f ON f.teamID = u.teamID WHERE u.playerCharId = ?", [player.data.internalId], function(err2, res2) {
                        if (err2) console.log("Error on Set Team");

                        if (res2.length > 0) {
                            res2.forEach(function(team) {
                                player.data.teamData = JSON.stringify(team);
                                //player.data.fractionClothes = JSON.stringify(fraction.clothes);
                            });
                        }
                    });
					
                    //Set Fraction to Player..
                    player.data.fractionData = JSON.stringify("arbeitslos");
                    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy, u.clothes FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharId = ?", [player.data.internalId], function(err2, res2) {
                        if (err2) console.log("Error on Set Fraction");

                        if (res2.length > 0) {
                            res2.forEach(function(fraction) {
                                player.data.fractionData = JSON.stringify(fraction);
                                player.data.fractionClothes = JSON.stringify(fraction.clothes);
                            });
                        }
                    });

                    //Set Business to Player
                    player.data.businessData = JSON.stringify("arbeitslos");
                    gm.databaseManager.getConnection().query("SELECT f.businessName, f.businessID, r.id AS businessRankID, r.businessRankName, r.businessRank, r.canBill, r.canInvite, r.payCheck, u.playerBusinessDuty FROM businessusers u LEFT JOIN businessranks r ON r.id = u.businessRankID LEFT JOIN business f ON f.businessID = u.businessID WHERE u.playerCharId = ?", [player.data.internalId], function(err2, res2) {
                        if (err2) console.log("Error on Set Business");

                        if (res2.length > 0) {
                            res2.forEach(function(fraction) {
                                player.data.businessData = JSON.stringify(fraction);
                            });
                        }
                    });

                    player.colorForOverlayIdx = function(index) {
                        let color;

                        switch (index) {
                            case 1:
                                color = this.customCharacter.BeardColor;
                                break;

                            case 2:
                                color = this.customCharacter.EyebrowColor;
                                break;

                            case 5:
                                color = this.customCharacter.BlushColor;
                                break;

                            case 8:
                                color = this.customCharacter.LipstickColor;
                                break;

                            case 10:
                                color = this.customCharacter.ChestHairColor;
                                break;

                            default:
                                color = 0;
                        }

                        return color;
                    };

                    if (player.isPet !== 1) {
                        gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function(err2, res2) {
                            if (err2) console.log("Error in setModel + Clothes on Login");


                            if (res2.length > 0) {
                                try {
                                    res2.forEach(function(modelData) {
                                        var model = JSON.parse(modelData.data);
                                        var appearance = modelData.appearance;

                                        if (model["Gender"] == 0) {
                                            player.model = mp.joaat("mp_m_freemode_01");
                                        } else if (model["Gender"] == 1) {
                                            player.model = mp.joaat("mp_f_freemode_01");
                                        }
                                        player.data.gender = model["Gender"];

                                        //From ClothesMenu:load
                                        if (appearance === null) return;
                                        var appearance = JSON.parse(appearance);
                                        var clothes = appearance.clothes;
                                        var props = appearance.props;
                                        var i = 0;
                                        clothes.forEach(function(component) {
                                            if (component !== null) {
                                                player.setClothes(parseInt(i), parseInt(component.drawable), parseInt(component.texture), parseInt(component.palette));
                                            }
                                            i++;
                                        });
                                        i = 0;
                                        props.forEach(function(component) {
                                            if (component !== null) {
                                                player.setProp(parseInt(i), parseInt(component.drawable), parseInt(component.texture));
                                            }
                                            i++;
                                        });

                                        let pos = new mp.Vector3(254.92, -1013.30, 29.26);
                                        if (character.posX) {
                                            pos = new mp.Vector3(character.posX, character.posY, character.posZ);
                                        }
                                        if (player && pos) player.spawn(pos);
                                        //if(player && pos) player.call("client::login::camerafahrt", [pos]);

                                        var i = 0;
                                        model["Features"].forEach(function(featureData) {
                                            player.setFaceFeature(i, featureData);
                                            i = i + 1;
                                        });

                                        player.setHeadBlend(model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Similarity"], model["Parents"]["SkinSimilarity"], 0)

                                        player.setClothes(2, model['Hair']['0'], 0, 2);
                                        player.setHairColor(model['Hair']['1'], model['Hair']['2']);
                                        player.eyeColor = model['Hair']['5'];

                                        var i2 = 0;
                                        model["Appearance"].forEach(function(featureData) {
                                            switch (i2) {
                                                case 1:
                                                    color = model['Hair'][4];
                                                    break;
                                                case 2:
                                                    color = model['Hair'][3];
                                                    break;
                                                case 5:
                                                    color = model['Hair'][6];
                                                    break;
                                                case 8:
                                                    color = model['Hair'][7];
                                                    break;
                                                case 10:
                                                    color = model['Hair'][8];
                                                    break;
                                                default:
                                                    color = 0;
                                            }
                                            player.setHeadOverlay(i2, [model['Appearance'][i2].Value, model['Appearance'][i2].Opacity, color, 0]);
                                            i2 = i2 + 1;
                                        });
                                    });
                                } catch (e) {
                                    console.log("ERROR - run in catch - login.js: " + e);
                                }
                            }
                        });
                    } else {
                        player.model = mp.joaat(player.petHash);
                        let pos = new mp.Vector3(254.92, -1013.30, 29.26);
                        if (character.posX) {
                            pos = new mp.Vector3(character.posX, character.posY, character.posZ);
                        }
                        if (player && pos) player.spawn(pos);
                        //if(player && pos) player.call("client::login::camerafahrt", [pos]);
                    }
                    player.notify("~g~Willkommen, " + char);
                    player.call("client:world:weatherUpdate", [gm.weather.currentWeather]);
                    player.call("loginCamera", [new mp.Vector3(character.posX, character.posY, character.posZ)]);
                    //  player.call("loginFinish");
                    player.setVariable("state", "INGAME");
                    player.call("client:TS-VoiceChat:removeFromRadio");
                }
            });
        });
    },
});

mp.events.add("initEinreise", (player) => {
    player.setVariable("state", "INGAME");
    mp.events.call("server:ClothesMenu:save", player);
    try {
        if (mp.players.exists(player)) {
            gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function(err2, res2) {
                if (err2) console.log("Error in unnötiges nötiges Camera Destroy Event Clothes + Model");

                if (res2.length > 0) {
                    res2.forEach(function(modelData) {
                        var model = JSON.parse(modelData.data);
                        var appearance = modelData.appearance;

                        if (model["Gender"] == 0) {
                            player.model = mp.joaat("mp_m_freemode_01");
                        } else if (model["Gender"] == 1) {
                            player.model = mp.joaat("mp_f_freemode_01");
                        }
                        player.data.gender = model["Gender"];
                        mp.events.call("server:ClothesMenu:load", player, appearance);

                        var i = 0;
                        model["Features"].forEach(function(featureData) {
                            player.setFaceFeature(i, featureData);
                            i = i + 1;
                        });

                        player.setHeadBlend(model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Similarity"], model["Parents"]["SkinSimilarity"], 0)
                        player.setClothes(2, model['Hair']['0'], 0, 2);
                        player.setHairColor(model['Hair']['1'], model['Hair']['2']);
                        player.eyeColor = model['Hair']['5'];

                        var i2 = 0;
                        model["Appearance"].forEach(function(featureData) {
                            switch (i2) {
                                case 1:
                                    color = model['Hair'][4];
                                    break;
                                case 2:
                                    color = model['Hair'][3];
                                    break;
                                case 5:
                                    color = model['Hair'][6];
                                    break;
                                case 8:
                                    color = model['Hair'][7];
                                    break;
                                case 10:
                                    color = model['Hair'][8];
                                    break;
                                default:
                                    color = 0;
                            }
                            player.setHeadOverlay(i2, [model['Appearance'][i2].Value, model['Appearance'][i2].Opacity, color, 0]);
                            i2 = i2 + 1; // TODO: Finde raus warum es da knallt!
                        });
                    });
                }
            });

            player.call("loginFinish", [player.data.money]);
            player.call("ConnectTeamspeak", [true]);
            player.setVariable("VOICE_RANGE", "normal");
            player.call("changeValue", ['micro', '2']);
            player.call("changeValue", ['food', player.data.food]);
            player.call("changeValue", ['drink', player.data.drink]);
        }
    } catch (e) {
        console.log("ERROR - login.js - initEinreise: " + e);
    }
});

mp.events.add("unnötigesCameraDestroyEvent", (player) => {
    if (player.isPet !== 1) {
        gm.databaseManager.getConnection().query("SELECT appearance, data, feature FROM charactermodel WHERE internalId = ?", [player.data.internalId], function(err2, res2) {
            if (err2) console.log("Error in unnötiges nötiges Camera Destroy Event Clothes + Model");

            if (res2.length > 0) {
                res2.forEach(function(modelData) {
                    var model = JSON.parse(modelData.data);
                    var appearance = modelData.appearance;
                    var currentTattoos = modelData.feature;
                    player.setVariable("tattoos", currentTattoos);
                    currentTattoos = JSON.parse(currentTattoos);

                    if (currentTattoos !== null) {
                        currentTattoos.forEach(function(tattoo) {
                            player.setDecoration(parseInt(tattoo.collection), parseInt(tattoo.overlay));
                        });
                    }

                    if (model["Gender"] == 0) {
                        player.model = mp.joaat("mp_m_freemode_01");
                    } else if (model["Gender"] == 1) {
                        player.model = mp.joaat("mp_f_freemode_01");
                    }
                    player.data.gender = model["Gender"];
                    mp.events.call("server:ClothesMenu:load", player, appearance);

                    var i = 0;
                    model["Features"].forEach(function(featureData) {
                        player.setFaceFeature(i, featureData);
                        i = i + 1;
                    });

                    player.setHeadBlend(model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Similarity"], model["Parents"]["SkinSimilarity"], 0)
                    player.setClothes(2, model['Hair']['0'], 0, 2);
                    player.setHairColor(model['Hair']['1'], model['Hair']['2']);
                    player.eyeColor = model['Hair']['5'];

                    var i2 = 0;
                    model["Appearance"].forEach(function(featureData) {
                        switch (i2) {
                            case 1:
                                color = model['Hair'][4];
                                break;
                            case 2:
                                color = model['Hair'][3];
                                break;
                            case 5:
                                color = model['Hair'][6];
                                break;
                            case 8:
                                color = model['Hair'][7];
                                break;
                            case 10:
                                color = model['Hair'][8];
                                break;
                            default:
                                color = 0;
                        }
                        player.setHeadOverlay(i2, [model['Appearance'][i2].Value, model['Appearance'][i2].Opacity, color, 0]);
                        i2 = i2 + 1;
                    });
                });
            }
        });
    } else {
        player.model = mp.joaat(player.petHash);
    }

    gm.databaseManager.getConnection().query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [player.data.internalId], function(err5, res5) {
        if (err5) console.log("Error in Select Vehicle Keys on Login");
        let vehKeysList = [];
        res5.forEach(function(vehKeys) {
            let obj = { "vehid": parseInt(vehKeys.vehID), "active": String(vehKeys.isActive) };
            vehKeysList.push(obj);
        });
        vehKeysList = JSON.stringify(vehKeysList);
        player.setVariable("currentKeys", vehKeysList);
    });
    
    player.call("loginFinish", [player.data.money]);
    player.call("ConnectTeamspeak", [true]);
    player.setVariable("VOICE_RANGE", "normal");
    player.call("changeValue", ['micro', '2']);
    player.call("changeValue", ['food', player.data.food]);
    player.call("changeValue", ['drink', player.data.drink]);
    mp.world.requestIpl("apa_v_mp_h_08_a");
    mp.world.requestIpl("apa_v_mp_h_01_c");

    gm.databaseManager.getConnection().query("SELECT health FROM `characters` WHERE id = ?", [player.data.internalId], function(err, res) {
        if (err) console.log("Error in Update Char join Health: " + err);

        res.forEach(function(health) {
            mp.events.call("server:inventory:reWeaponize", player);

            if (parseInt(health.health) == 1 || parseInt(health.health) == 0) {
                //player.spawn(player.position);
                player.health = 1;
                player.call("startDeathScreen", []);
                player.setVariable("VOICE_RANGE", "stumm");
                player.call("changeValue", ['micro', 0]);
                player.setVariable("isUnconcious", "true");
                player.position.z += 1.5;

                var currentId = player.id;
                var currentInternalId = player.data.internalId;

                if (parseInt(player.getVariable("permaDeathTimer")) == 0) {
                    gm.timers.deathTimers[player.data.internalId] = setTimeout(() => {
                        try {
                            var nowPlayer = mp.players.at(currentId);
                            if (nowPlayer) {
                                if (nowPlayer.data.internalId == currentInternalId) {
                                    mp.events.call("stopAnimation", player);
                                    player.health = 100;
                                    player.spawn(player.position);
                                    player.dimension = player.dimension;
                                    player.call("endDeathScreen", []);
                                    player.setVariable("VOICE_RANGE", "normal");
                                    player.call("changeValue", ['micro', 2]);
                                    player.setVariable("isUnconcious", "false");
                                }
                            }
                        } catch (e) {
                            console.log("ERROR - login.js - unnötig (permaDeathTimer): " + e);
                        }
                    }, 600000);
                }
            } else {
                player.health = parseInt(health.health);
                var fractionData = player.data.fractionData;
                fractionData = JSON.parse(fractionData);
                if (fractionData.playerFractionDuty == "Y") {
                    mp.events.call("server:fractions:reDuty", player);
                }
            }
        });
    });
});