let policeColShape = mp.colshapes.newSphere(460.26, -990.81, 30.68, 4, 0);
//let policeWeaponColShape = mp.colshapes.newSphere(454.04, -980.07, 30.68, 2, 0);
let policeLeitstelleColShape1 = mp.colshapes.newSphere(442.034, -978.851, 30.68, 2, 0);
let policeLeitstelleColShape2 = mp.colshapes.newSphere(447.96, -973.40, 30.68, 2, 0);
let policeLeitstelleColShape3 = mp.colshapes.newSphere(437.089, -996.314, 30.68, 2, 0);
let policeLeitstelleColShape4 = mp.colshapes.newSphere(471.72, -955.51, -38.47, 2, 0);
let policeLeitstelleColShape5 = mp.colshapes.newSphere(472.007, -968.366, -38.47, 2, 0);
let policeLeitstelleColShape6 = mp.colshapes.newSphere(459.750, -988.89, 24.91, 2, 0);
let policeLeitstelleColShape7 = mp.colshapes.newSphere(440.13, -975.67, 30.68, 2, 0);
let manyPedColShape = mp.colshapes.newSphere(721.136, 1296.028, 360.29, 2, 0);



mp.events.add("server:Keybind:KeyE", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.fractionName == "LSPD") {
      if(policeColShape.isPointWithin(player.position)) {
          player.call("client:police:dutyMenu");
          // policeMenu
      }     
     /*if (fractionData.playerFractionDuty == "Y") {
        if (policeWeaponColShape.isPointWithin(player.position)) {
            player.call("client:police:weaponMenu");
            // weaponMenu
        }*/
        if (fractionData.playerFractionDuty == "Y") {
          if (policeLeitstelleColShape1.isPointWithin(player.position) || policeLeitstelleColShape2.isPointWithin(player.position) || policeLeitstelleColShape3.isPointWithin(player.position) || policeLeitstelleColShape4.isPointWithin(player.position) || policeLeitstelleColShape5.isPointWithin(player.position) || policeLeitstelleColShape6.isPointWithin(player.position) || policeLeitstelleColShape7.isPointWithin(player.position) ) {
              player.call("client:police:leitstellenmenu");
              // Leitstellen Computer
          }                    
      }
    }
        if (manyPedColShape.isPointWithin(player.position)) {
          player.call("client:police:manyduty");
        }  
  }
});

mp.events.add("server:Keybind:KeyO", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);

    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSPD") {
        gm.databaseManager.getConnection().query("SELECT r.fractionRankName FROM fractions f LEFT JOIN fractionranks r ON f.fractionID = r.fractionID WHERE f.fractionID = 2", function (errUp, resUp) {
            if (errUp) player.notify("Error: " + errUp);
            if (resUp.length > 0) {
                var c = 1;
                let ranks = [];
                resUp.forEach(function(rank) {
                    ranks.push(rank.fractionRankName);
                    if (c == resUp.length) {
                        player.call("client:police:openInteractionMenu", [fractionData.canInvite, JSON.stringify(ranks)]);
                    }
                    c++;
                });
            }
        });
    }
  }
});

mp.events.add("server:police:leitstellensystem", (player) => {
  if(mp.players.exists(player)) {
    player.call("client:police:leitstellensystem", ["https://docs.google.com/spreadsheets/d/18ucMn-rfpbBz7VA_OFld-lgxGy81JcGPMCt-04Dp1vo/edit?usp=sharing"]);
  }
});

mp.events.add("server:police:aktensystem", (player) => {
  if(mp.players.exists(player)) {
    player.call("client:police:aktensystem", ["https://lspd.los-santos-info.de/"]);
  }
});

mp.events.add("server:fractions:reDuty", (player) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);
    if (fractionData.playerFractionDuty == "Y" && fractionData.fractionName == "LSPD") {
      gm.databaseManager.getConnection().query("SELECT clothes FROM fractionusers WHERE playerCharID = ?", [player.data.internalId], function(err, res) {
        if (err) console.log("Error in SELECT clothes by reDuty: "+err);
        if (res.length > 0) {          
          mp.events.call("server:police:kleidung", player, res[0].clothes);
        }
      });
    }
  }
});

// IN DEN DIENST
mp.events.add("server:police:onduty", (player) => {
    gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'Y' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
      if (errUp) console.log("Error: " + errUp);
    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy, u.clothes FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error on Set Fraction");
      player.data.fractionData = JSON.stringify("arbeitslos");
      if (res2.length > 0) {
        res2.forEach(function (fraction) {
          if(mp.players.exists(player)) player.data.fractionData = JSON.stringify(fraction);
          player.data.fractionClothes = JSON.stringify(fraction.clothes);
        });
      }
    });
  });
});

var PlayerRanks = "";
PlayerRanks = {
    "RankClothingM": [
        {"RankName":"Streifendienst", "jacket":[55,0], "tshirt":[58,0], "pants":[35,0], "shoes":[25,0], "accessoires":[2,0], "gloves":[30,0], "mask":[0,0], "hats":[8,0], "eyes":[0,0]},
        {"RankName":"Standart", "jacket":[55,0], "tshirt":[122,0], "pants":[47,0], "shoes":[35,0], "accessoires":[2,0], "gloves":[30,0], "mask":[0,0], "hats":[8,0], "eyes":[0,0]},
        {"RankName":"StreifendienstWinter", "jacket":[50,0], "tshirt":[122,0], "pants":[47,0], "shoes":[35,0], "accessoires":[2,0], "gloves":[30,0], "mask":[0,0], "hats":[8,0], "eyes":[0,0]},
        {"RankName":"Detective Unit", "jacket":[29,0], "tshirt":[32,0], "pants":[10,0], "shoes":[10,0], "accessoires":[0,0], "gloves":[12,0], "mask":[121,0], "hats":[8,0], "eyes":[0,0]},
        {"RankName":"SWAT", "jacket":[50,0], "tshirt":[122,0], "pants":[31,0], "shoes":[25,0], "accessoires":[0,0], "gloves":[17,0], "mask":[28,0], "hats":[8,0], "eyes":[0,0]},
        {"RankName":"Undercover", "jacket":[4,0], "tshirt":[31,0], "pants":[24,0], "shoes":[10,0], "accessoires":[125,0], "gloves":[4,0], "mask":[0,0], "hats":[8,0], "eyes":[0,0]}
    ],
    "RankClothingF": [
        {"RankName":"Streifendienst", "jacket":[48,0], "tshirt":[35,0], "pants":[34,0], "shoes":[25,0], "accessoires":[0,0], "gloves":[57,0], "mask":[0,0], "hats":[120,0], "eyes":[5,0]},
        {"RankName":"Standart", "jacket":[48,0], "tshirt":[152,0], "pants":[102,0], "shoes":[27,0], "accessoires":[0,0], "gloves":[14,0], "mask":[121,0], "hats":[12,0], "eyes":[5,0]},
        {"RankName":"StreifendienstWinter", "jacket":[299,0], "tshirt":[35,0], "pants":[47,0], "shoes":[27,0], "accessoires":[0,0], "gloves":[3,0], "mask":[0,0], "hats":[120,0], "eyes":[5,0]},
        {"RankName":"Detective Unit", "jacket":[57,0], "tshirt":[38,0], "pants":[47,0], "shoes":[29,0], "accessoires":[0,0], "gloves":[1,0], "mask":[121,0], "hats":[120,0], "eyes":[5,0]},
        {"RankName":"SWAT", "jacket":[43,0], "tshirt":[152,0], "pants":[30,0], "shoes":[25,0], "accessoires":[0,0], "gloves":[18,0], "mask":[28,0], "hats":[120,0], "eyes":[5,0]},
        {"RankName":"Undercover", "jacket":[57,0], "tshirt":[64,0], "pants":[6,0], "shoes":[29,0], "accessoires":[95,0], "gloves":[1,0], "mask":[0,0], "hats":[120,0], "eyes":[5,0]}
    ]
};
mp.events.add("server:lspd:setOber", (player, componentID, drawableID, textureID) => {
  var clothesData = player.data.fractionClothes;
  clothesData =  JSON.parse(clothesData);
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if(mp.players.exists(player)) {
    console.log(player.data.gender);
    if (player.data.gender == 0) {
      if(clothesData === "Streifendienst" && fractionData.playerFractionDuty == "Y") {
        player.setClothes(3,30,0,2); // Torso
        player.setClothes(8,58,0,2); // Undershirts
        player.setClothes(11,55,0,2); // Top
      } else {
        if(clothesData === "Standart" && fractionData.playerFractionDuty == "Y") {
          player.setClothes(3,30,0,2); // Torso
          player.setClothes(8,122,0,2); // Undershirts
          player.setClothes(11,55,0,2); // Top
        } else {
          if(clothesData === "StreifendienstWinter" && fractionData.playerFractionDuty == "Y") {
            player.setClothes(3,30,0,2); // Torso
            player.setClothes(8,122,0,2); // Undershirts
            player.setClothes(11,50,0,2); // Top
          } else {
            if(clothesData === "Detective Unit" && fractionData.playerFractionDuty == "Y") {
              player.setClothes(3,12,0,2); // Torso
              player.setClothes(8,32,0,2); // Undershirts
              player.setClothes(11,29,0,2); // Top
            } else {
              if(clothesData === "SWAT" && fractionData.playerFractionDuty == "Y") {
                player.setClothes(3,17,0,2); // Torso
                player.setClothes(8,122,0,2); // Undershirts
                player.setClothes(11,50,0,2); // Top
              } else {
                if(clothesData === "Undercover" && fractionData.playerFractionDuty == "Y") {
                    player.setClothes(componentID,drawableID,textureID,2);
                } else {
                  if (fractionData.playerFractionDuty == "N") {
                      player.setClothes(componentID,drawableID,textureID,2);
                  }                  
                }
              }
            }
          }
        }
      }    
    } else {
      if(clothesData === "Streifendienst" && fractionData.playerFractionDuty == "Y") {
        player.setClothes(3,57,0,2); // Torso
        player.setClothes(8,35,0,2); // Undershirts
        player.setClothes(11,48,0,2); // Top
      } else {
        if(clothesData === "Standart" && fractionData.playerFractionDuty == "Y") {
          player.setClothes(3,14,0,2); // Torso
          player.setClothes(8,35,0,2); // Undershirts
          player.setClothes(11,48,0,2); // Top
        } else {
          if(clothesData === "StreifendienstWinter" && fractionData.playerFractionDuty == "Y") {
            player.setClothes(3,18,0,2); // Torso
            player.setClothes(8,152,0,2); // Undershirts
            player.setClothes(11,43,0,2); // Top
          } else {
            if(clothesData === "Detective Unit" && fractionData.playerFractionDuty == "Y") {
              player.setClothes(3,1,0,2); // Torso
              player.setClothes(8,38,0,2); // Undershirts
              player.setClothes(11,57,0,2); // Top
            } else {
              if(clothesData === "SWAT" && fractionData.playerFractionDuty == "Y") {
                player.setClothes(3,18,0,2); // Torso
                player.setClothes(8,152,0,2); // Undershirts
                player.setClothes(11,43,0,2); // Top
              } else {
                if(clothesData === "Undercover" && fractionData.playerFractionDuty == "Y") {
                    player.setClothes(componentID,drawableID,textureID,2);
                } else {
                  if (fractionData.playerFractionDuty == "N") {
                    player.setClothes(componentID,drawableID,textureID,2);
                  }
                }
              }
            }
          }
        }
      }       
    }
  }
});

mp.events.add("server:lspd:setLeg", (player, componentID, drawableID, textureID) => {
  var clothesData = player.data.fractionClothes;
  clothesData =  JSON.parse(clothesData);
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if(mp.players.exists(player)) {
    if (player.data.gender == 0) {
      if(clothesData === "Streifendienst" && fractionData.playerFractionDuty == "Y") {
        player.setClothes(4,35,0,2); // Torso
      } else {
        if(clothesData === "Standart" && fractionData.playerFractionDuty == "Y") {
          player.setClothes(4,47,0,2); // Torso
        } else {
          if(clothesData === "StreifendienstWinter" && fractionData.playerFractionDuty == "Y") {
            player.setClothes(4,47,0,2); // Torso
          } else {
            if(clothesData === "Detective Unit" && fractionData.playerFractionDuty == "Y") {
              player.setClothes(4,10,0,2); // Torso
            } else {
              if(clothesData === "SWAT" && fractionData.playerFractionDuty == "Y") {
                player.setClothes(4,31,0,2); // Torso
              } else {
                if(clothesData === "Undercover" && fractionData.playerFractionDuty == "Y") {
                    player.setClothes(componentID,drawableID,textureID,2);
                } else {
                  if (fractionData.playerFractionDuty == "N") {
                      player.setClothes(componentID,drawableID,textureID,2);
                  }                  
                }
              }
            }
          }
        }
      }    
    } else {
      if(clothesData === "Streifendienst" && fractionData.playerFractionDuty == "Y") {
        player.setClothes(4,34,0,2); // Torso
      } else {
        if(clothesData === "Standart" && fractionData.playerFractionDuty == "Y") {
          player.setClothes(4,102,0,2); // Torso
        } else {
          if(clothesData === "StreifendienstWinter" && fractionData.playerFractionDuty == "Y") {
            player.setClothes(4,47,0,2); // Torso
          } else {
            if(clothesData === "Detective Unit" && fractionData.playerFractionDuty == "Y") {
              player.setClothes(4,47,0,2); // Torso
            } else {
              if(clothesData === "SWAT" && fractionData.playerFractionDuty == "Y") {
                player.setClothes(4,30,0,2); // Torso
              } else {
                if(clothesData === "Undercover" && fractionData.playerFractionDuty == "Y") {
                    player.setClothes(componentID,drawableID,textureID,2);
                } else {
                  if (fractionData.playerFractionDuty == "N") {
                    player.setClothes(componentID,drawableID,textureID,2);
                  }
                }
              }
            }
          }
        }
      }       
    }
  }
});

mp.events.add("server:lspd:setShoe", (player, componentID, drawableID, textureID) => {
  var clothesData = player.data.fractionClothes;
  clothesData =  JSON.parse(clothesData);
  var fractionData = player.data.fractionData;
  fractionData = JSON.parse(fractionData);
  if(mp.players.exists(player)) {
    if (player.data.gender == 0) {
      if(clothesData === "Streifendienst" && fractionData.playerFractionDuty == "Y") {
        player.setClothes(6,25,0,2); // Torso
      } else {
        if(clothesData === "Standart" && fractionData.playerFractionDuty == "Y") {
          player.setClothes(6,35,0,2); // Torso
        } else {
          if(clothesData === "StreifendienstWinter" && fractionData.playerFractionDuty == "Y") {
            player.setClothes(6,35,0,2); // Torso
          } else {
            if(clothesData === "Detective Unit" && fractionData.playerFractionDuty == "Y") {
              player.setClothes(6,10,0,2); // Torso
            } else {
              if(clothesData === "SWAT" && fractionData.playerFractionDuty == "Y") {
                player.setClothes(6,25,0,2); // Torso
              } else {
                if(clothesData === "Undercover" && fractionData.playerFractionDuty == "Y") {
                    player.setClothes(componentID,drawableID,textureID,2);
                } else {
                  if (fractionData.playerFractionDuty == "N") {
                      player.setClothes(componentID,drawableID,textureID,2);
                  }                  
                }
              }
            }
          }
        }
      }    
    } else {
      if(clothesData === "Streifendienst" && fractionData.playerFractionDuty == "Y") {
        player.setClothes(6,25,0,2); // Torso
      } else {
        if(clothesData === "Standart" && fractionData.playerFractionDuty == "Y") {
          player.setClothes(6,27,0,2); // Torso
        } else {
          if(clothesData === "StreifendienstWinter" && fractionData.playerFractionDuty == "Y") {
            player.setClothes(6,27,0,2); // Torso
          } else {
            if(clothesData === "Detective Unit" && fractionData.playerFractionDuty == "Y") {
              player.setClothes(6,27,0,2); // Torso
            } else {
              if(clothesData === "SWAT" && fractionData.playerFractionDuty == "Y") {
                player.setClothes(6,25,0,2); // Torso
              } else {
                if(clothesData === "Undercover" && fractionData.playerFractionDuty == "Y") {
                    player.setClothes(componentID,drawableID,textureID,2);
                } else {
                  if (fractionData.playerFractionDuty == "N") {
                    player.setClothes(componentID,drawableID,textureID,2);
                  }
                }
              }
            }
          }
        }
      }       
    }
  }
});

// LSPD Kleidung
mp.events.add("server:police:kleidung", (player, PlayerRank) => {
  if(mp.players.exists(player)) {
    if (player.data.gender == 0) {
      for (let i = 0; i < PlayerRanks.RankClothingM.length; i++) {
        const RankName = PlayerRanks.RankClothingM[i].RankName;
        if(RankName == "SWAT" && PlayerRank == "SWAT"){
          //player.setClothes(1,121,0,2); // Mask
          player.setClothes(3,PlayerRanks.RankClothingM[i].gloves[0],PlayerRanks.RankClothingM[i].gloves[1],2); // Torso
          player.setClothes(4,PlayerRanks.RankClothingM[i].pants[0],PlayerRanks.RankClothingM[i].pants[1],2); // Pants
          player.setClothes(6,PlayerRanks.RankClothingM[i].shoes[0],PlayerRanks.RankClothingM[i].shoes[1],2); // Shoes
          player.setClothes(7,PlayerRanks.RankClothingM[i].accessoires[0],PlayerRanks.RankClothingM[i].accessoires[1],2); // Accessories
          player.setClothes(8,PlayerRanks.RankClothingM[i].tshirt[0],PlayerRanks.RankClothingM[i].tshirt[1],2); // Undershirts
          player.setClothes(11,PlayerRanks.RankClothingM[i].jacket[0],PlayerRanks.RankClothingM[i].jacket[1],2); // Top
          player.setClothes(1,PlayerRanks.RankClothingM[i].mask[0],PlayerRanks.RankClothingM[i].mask[1],2); // Maske
          player.setProp(0,PlayerRanks.RankClothingM[i].hats[0],PlayerRanks.RankClothingM[i].hats[1]); // Hüte
          player.setProp(1,PlayerRanks.RankClothingM[i].eyes[0],PlayerRanks.RankClothingM[i].eyes[1]); // Brillen
        } else if(RankName !== "Undercover" && RankName == ""+PlayerRank) {
          //player.setClothes(1,121,0,2); // Mask
          player.setClothes(3,PlayerRanks.RankClothingM[i].gloves[0],PlayerRanks.RankClothingM[i].gloves[1],2); // Torso
          player.setClothes(4,PlayerRanks.RankClothingM[i].pants[0],PlayerRanks.RankClothingM[i].pants[1],2); // Pants
          player.setClothes(6,PlayerRanks.RankClothingM[i].shoes[0],PlayerRanks.RankClothingM[i].shoes[1],2); // Shoes
          player.setClothes(7,PlayerRanks.RankClothingM[i].accessoires[0],PlayerRanks.RankClothingM[i].accessoires[1],2); // Accessories
          player.setClothes(8,PlayerRanks.RankClothingM[i].tshirt[0],PlayerRanks.RankClothingM[i].tshirt[1],2); // Undershirts
          player.setClothes(11,PlayerRanks.RankClothingM[i].jacket[0],PlayerRanks.RankClothingM[i].jacket[1],2); // Top
          player.setClothes(1,PlayerRanks.RankClothingM[i].mask[0],PlayerRanks.RankClothingM[i].mask[1],2); // Maske
        }
      }
      console.log("ID: "+player.data.internalId);
        gm.databaseManager.getConnection().query("UPDATE fractionusers SET clothes = ? WHERE playerCharID = ?", [PlayerRank, player.data.internalId], function(err, res) {
          if (err) console.log("Error in Update Clothes: "+err);
          gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy, u.clothes FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Fraction");
          player.data.fractionData = JSON.stringify("arbeitslos");
          if (res2.length > 0) {
            res2.forEach(function (fraction) {
              if(mp.players.exists(player)) player.data.fractionData = JSON.stringify(fraction);
              player.data.fractionClothes = JSON.stringify(fraction.clothes);
            });
          }
        });
      });
    } else {
        for (let i = 0; i < PlayerRanks.RankClothingF.length; i++) {
            const RankName = PlayerRanks.RankClothingF[i].RankName;
            if (RankName == "SWAT" && PlayerRank == "SWAT") {
            player.setClothes(3,PlayerRanks.RankClothingF[i].gloves[0],PlayerRanks.RankClothingF[i].gloves[1],2); // Torso
            player.setClothes(4,PlayerRanks.RankClothingF[i].pants[0],PlayerRanks.RankClothingF[i].pants[1],2); // Pants
            player.setClothes(6,PlayerRanks.RankClothingF[i].shoes[0],PlayerRanks.RankClothingF[i].shoes[1],2); // Shoes
            player.setClothes(7,PlayerRanks.RankClothingF[i].accessoires[0],PlayerRanks.RankClothingF[i].accessoires[1],2); // Accessories
            player.setClothes(8,PlayerRanks.RankClothingF[i].tshirt[0],PlayerRanks.RankClothingF[i].tshirt[1],2); // Undershirts
            player.setClothes(11,PlayerRanks.RankClothingF[i].jacket[0],PlayerRanks.RankClothingF[i].jacket[1],2); // Top
            player.setClothes(1,PlayerRanks.RankClothingF[i].mask[0],PlayerRanks.RankClothingF[i].mask[1],2); // Maske
            player.setProp(0,PlayerRanks.RankClothingF[i].hats[0],PlayerRanks.RankClothingF[i].hats[1]); // Hüte
            player.setProp(1,PlayerRanks.RankClothingF[i].eyes[0],PlayerRanks.RankClothingF[i].eyes[1]); // Brillen
           } else if(RankName !== "Undercover" && RankName == ""+PlayerRank) {
              player.setClothes(3,PlayerRanks.RankClothingF[i].gloves[0],PlayerRanks.RankClothingF[i].gloves[1],2); // Torso
              player.setClothes(4,PlayerRanks.RankClothingF[i].pants[0],PlayerRanks.RankClothingF[i].pants[1],2); // Pants
              player.setClothes(6,PlayerRanks.RankClothingF[i].shoes[0],PlayerRanks.RankClothingF[i].shoes[1],2); // Shoes
              player.setClothes(7,PlayerRanks.RankClothingF[i].accessoires[0],PlayerRanks.RankClothingF[i].accessoires[1],2); // Accessories
              player.setClothes(8,PlayerRanks.RankClothingF[i].tshirt[0],PlayerRanks.RankClothingF[i].tshirt[1],2); // Undershirts
              player.setClothes(11,PlayerRanks.RankClothingF[i].jacket[0],PlayerRanks.RankClothingF[i].jacket[1],2); // Top
              player.setClothes(1,PlayerRanks.RankClothingF[i].mask[0],PlayerRanks.RankClothingF[i].mask[1],2); // Maske
            }
        }
        console.log("ID: "+player.data.internalId);
        gm.databaseManager.getConnection().query("UPDATE fractionusers SET clothes = ? WHERE playerCharID = ?", [PlayerRank, player.data.internalId], function(err, res) {
          if (err) console.log("Error in Update Clothes: "+err);
          gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy, u.clothes FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
            if (err2) console.log("Error on Set Fraction");
          player.data.fractionData = JSON.stringify("arbeitslos");
          if (res2.length > 0) {
            res2.forEach(function (fraction) {
              if(mp.players.exists(player)) player.data.fractionData = JSON.stringify(fraction);
              player.data.fractionClothes = JSON.stringify(fraction.clothes);
            });
          }
        });
      });
    }
  }
});

// AUS DEM DIENST
// LSPDoffDuty
mp.events.add("server:police:offDuty", (player) => {
  if(mp.players.exists(player)) {
    player.notify("Du hast den Dienst verlassen");
    player.setClothes(1,0,0,2); 
    gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [player.data.internalId], function (err2, res2) {
        if (err2) console.log("Error in setModel + Clothes on Login");

        if (res2.length > 0) {
            res2.forEach(function (modelData) {
                var model = JSON.parse(modelData.data);
                var appearance = modelData.appearance;

                if(mp.players.exists(player)) mp.events.call("server:ClothesMenu:load", player, appearance);

                gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionDuty = 'N' WHERE playerCharID = " + player.data.internalId, function (errUp, resUp) {
                    if (errUp) console.log("Error: " + errUp);

                    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy  FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [player.data.internalId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction");

                        player.data.fractionData = JSON.stringify("arbeitslos");
                        if (res2.length > 0) {
                            res2.forEach(function (fraction) {
                              if(mp.players.exists(player)) player.data.fractionData = JSON.stringify(fraction);
                            });
                        }
                    });
                });
            });
        }
    });
  }
});

mp.events.add("inputValueShop", (player, trigger, output) => {
  if(mp.players.exists(player)) {
    if(trigger === "lspddienstn") {
      getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
        var targetId = parseInt(currentTarget.data.internalId);
        gm.databaseManager.getConnection().query("UPDATE fractionusers SET dienstnummer = ? WHERE playerCharID = ? AND fractionID = '2' ", [output, targetId], function(err2, res2) {
          if (err2) console.log("Error in Police Hire Player Query2: "+err2);
          else {
            player.notify("Die Person wurde erfolgreich eingestellt!");
            currentTarget.notify("Du hast die Dienstnummer "+output+" bekommen!");
            gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
                if (err2) console.log("Error on Set Fraction");

                if (res2.length > 0) {
                  res2.forEach(function (fraction) {
                      currentTarget.data.fractionData = JSON.stringify(fraction);
                  });
                }
            });
          }
        });
      }
    }
    }
  }
});

// Uprank
function rankup(player, rank) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
        gm.databaseManager.getConnection().query("SELECT id FROM fractionranks WHERE fractionID = 2 AND fractionRankName = ?", [rank], function (err1, res1) {
            if (err1) console.log("Error in Police Hire Player Query1: "+err1);
            if (res1.length == 1) {
                res1.forEach(function(rankID) {
                    var id = rankID.id;
                    var targetId = parseInt(currentTarget.data.internalId);
                    gm.databaseManager.getConnection().query("UPDATE fractionusers SET fractionRankID = ? WHERE playerCharID = ?", [id, targetId], function(err2, res2) {
                        if (err2) console.log("Error in Police Hire Player Query2: "+err2);
                        else {
                            player.notify("Die Person wurde erfolgreich befördert!");
                            currentTarget.notify("Du bist nun "+rank+"!");
                            gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
                                if (err2) console.log("Error on Set Fraction");

                                if (res2.length > 0) {
                                    res2.forEach(function (fraction) {
                                        currentTarget.data.fractionData = JSON.stringify(fraction);
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
      }
    }
  }
}
mp.events.add("server:police:rankup", rankup);

function firePlayer(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("DELETE FROM fractionusers WHERE fractionID = 2 AND playerCharID = ?", [targetId], function (err1, res1) {
            if (err1) console.log("Error in Police Fire Player Query1: "+err1);
            else {
                player.notify("Die Person wurde erfolgreich gefeuert!");
                currentTarget.notify("Du wurdest aus dem LSPD entlassen!");
                gm.databaseManager.getConnection().query("SELECT appearance, data FROM charactermodel WHERE internalId = ?", [currentTarget.data.internalId], function (err2, res2) {
                  if (err2) console.log("Error in setModel + Clothes on Login");

                  if (res2.length > 0) {
                    res2.forEach(function (modelData) {
                        var model = JSON.parse(modelData.data);
                        var appearance = modelData.appearance;
                        currentTarget.setClothes(1,0,0,2); // Mask
                        mp.events.call("server:ClothesMenu:load", currentTarget, appearance);
                    });
                  }
                });
                gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
                    if (err2) console.log("Error on Set Fraction");

                    currentTarget.data.fractionData = JSON.stringify("arbeitslos");
                    if (res2.length > 0) {
                        res2.forEach(function (fraction) {
                            currentTarget.data.fractionData = JSON.stringify(fraction);
                        });
                    }
                });
            }
        });
      }
    }
  }
}
mp.events.add("server:police:firePlayer", firePlayer);

function canBuy(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if (currentTarget) {
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("SELECT fractionID FROM fractionusers WHERE playerCharID = ?", [targetId], function(err1, res1){
          if (err1) console.log("Error in DB Query Check Fraction")
            if (res1.length > 0) {
              res1.forEach(function(fraction) {
                if(fraction.fractionID == 2) {
                  gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionCanBuy = 'Y' WHERE playerCharID = ?", [targetId], function(err2, res2){
                    if (err2) console.log("Error in DB Query canBuy "+err2);
                    else {
                      player.notify("Die Person hat nun eine Berechtigung");
                      currentTarget.notify("Du hast nun eine Shop Berechtigung");
                      var targetId = currentTarget.data.internalId;
                      gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
                        if (err2) console.log("Error on Set Fraction");

                        currentTarget.data.fractionData = JSON.stringify("arbeitslos");
                        if (res2.length > 0) {
                          res2.forEach(function (fraction) {
                            currentTarget.data.fractionData = JSON.stringify(fraction);
                          });
                        }
                      });
                    }
                  });
                } else {
                  player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
                }
              });
            } else {
              player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
            }
        });
      }
    }
  }
}
mp.events.add("server:police:canbuy", canBuy);

function dontcanBuy(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      if (currentTarget) {
        var targetId = currentTarget.data.internalId;
        gm.databaseManager.getConnection().query("SELECT fractionID FROM fractionusers WHERE playerCharID = ?", [targetId], function(err1, res1){
          if (err1) console.log("Error in DB Query Check Fraction")
          if (res1.length > 0) {
            res1.forEach(function(fraction) {
              if(fraction.fractionID == 2) {
                gm.databaseManager.getConnection().query("UPDATE fractionusers SET playerFractionCanBuy = 'N' WHERE playerCharID = ?", [targetId], function(err2, res2){
                  if (err2) console.log("Error in DB Query canBuy "+err2);
                  else {
                    player.notify("Die Person hat nun keine Berechtigung mehr!");
                    currentTarget.notify("Du hast nun keine Shop Berechtigung mehr!");
                    var targetId = currentTarget.data.internalId;
                    gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
                      if (err2) console.log("Error on Set Fraction");

                      currentTarget.data.fractionData = JSON.stringify("arbeitslos");
                      if (res2.length > 0) {
                        res2.forEach(function (fraction) {
                          currentTarget.data.fractionData = JSON.stringify(fraction);
                        });
                      }
                    });
                  }
                });
              } else {
                player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
              }
            });
          } else {
            player.notify("Der Spieler befindet sich nicht in deiner Fraktion!");
          }
        });
      }
    }
  }
}
mp.events.add("server:police:dontcanbuy", dontcanBuy);

//Ticket ausstellen
mp.events.add("inputValueRechnung", (player, trigger, output, text) => {
  if(mp.players.exists(player)) {
    if(trigger === "LspdTicket") {
      getNearestPlayer(player, 1);      
      if (mp.players.exists(currentTarget)) {
        gm.databaseManager.getConnection().query("SELECT amout FROM `bank_konten` WHERE ownerId = ?", [currentTarget.data.internalId], function (err, res) {
          if (err) console.log("Error in get Player bank amount at lspd ticket: "+err);
          gm.databaseManager.getConnection().query("SELECT amout FROM `bank_konten` WHERE kontonummer = ?", [9876543210], function (err1, res1) {
            if (err1) console.log("Error in get Player bank amount at staatskonto: "+err1);
            if (res.length > 0) {
              res.forEach(function(konto) {
                if (parseFloat(konto.amout) >= parseFloat(output)) {
                  currentTarget.setVariable("kontoamout",konto.amout);
                  player.setVariable("staatskonto", res1[0].amout);
                  if(mp.players.exists(currentTarget)) player.call("createTargetRechnung",[player,output,text]);
                  player.playAnimation('mp_common', 'givetake2_a', 1, 49);
                  setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                  }, 2500);
                } else {
                  if(mp.players.exists(player)) player.notify("Die Transaktion wurde wegen zu wenig Geld verweigert!");
                }
              });
            }
          });
        });
      }
    }
  }
});

mp.events.add("server:police:einstellen",(player) => {
  getNearestPlayer(player, 2);
  if(mp.players.exists(currentTarget)) {
    if(currentTarget){
      var targetId = currentTarget.data.internalId;
      gm.databaseManager.getConnection().query("INSERT INTO fractionusers(playerCharID,fractionID,fractionRankID,playerFractionDuty,playerFractionCanBuy,dienstnummer) VALUES(?,2,' ','N','N',' ')", [targetId], function (err1, res1) {
        if (err1) console.log("Error in Police Fire Player Query1: "+err1);
        else {
          player.notify("Die Person wurde erfolgreich eingestellt!");
          currentTarget.notify("Du wurdest beim LSPD eingestellt!");
          gm.databaseManager.getConnection().query("SELECT f.fractionName, f.fractionID, r.id AS fractionRankID, r.fractionRankName, r.fractionRank, r.canBill, r.canInvite, r.payCheck, u.playerFractionDuty, u.playerFractionCanBuy FROM fractionusers u LEFT JOIN fractionranks r ON r.id = u.fractionRankID LEFT JOIN fractions f ON f.fractionID = u.fractionID WHERE u.playerCharID = ?", [targetId], function (err2, res2) {
            if (err2) console.log("Error on Set Fraction");

            currentTarget.data.fractionData = JSON.stringify("arbeitslos");
            if (res2.length > 0) {
              res2.forEach(function (fraction) {
                  currentTarget.data.fractionData = JSON.stringify(fraction);
              });
            }
          });
        }
      });
    }
  }
});

mp.events.add("inputValueTargetRechnung", (player, cop, output, accountamount, staatskonto) => {
  if(mp.players.exists(player) && mp.players.exists(cop)) {
    var newamount = parseFloat(parseFloat(accountamount) - parseFloat(output));
    var staatamout = parseFloat(parseFloat(staatskonto) + parseFloat(output));
    player.playAnimation('mp_common', 'givetake2_a', 1, 49);
    setTimeout(_ => {
      if (mp.players.exists(player)) player.stopAnimation();
    }, 2500);

    gm.databaseManager.getConnection().query("UPDATE `bank_konten` SET amout = ? WHERE ownerId = ?",[newamount,player.data.internalId], function(err, res) {
      if (err) {
        console.log("Error in Pay LSPD Ticket Query: "+err);
        if(mp.players.exists(cop)) cop.notify("Die Banktransaktion wurde technisch abgebrochen.");
        if(mp.players.exists(player)) player.notify("Die Banktransaktion wurde technisch abgebrochen.");
      } else {
        gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE kontonummer = ?", [staatamout, 9876543210], function(err1, res1) {
          if (err1) console.log("Error in Update Staatskonto: "+err1);
        });
        if(mp.players.exists(cop)) cop.notify("Das Ticket wurde bezahlt.");
        if(mp.players.exists(player)) player.notify("Du hast das Ticket bezahlt.");
      }
    });
  }
});

mp.events.add("server:police:dontPayTicket", (player, cop) => {
  if(mp.players.exists(player) && mp.players.exists(cop)) {
    cop.notify("Die Bezahlung wurde durch die Gegenpartei abgelehnt.");
    player.notify("Du hast die Bezahlung abgelehnt.");
    player.playAnimation('mp_common', 'givetake2_a', 1, 49);
    setTimeout(_ => {
      if (mp.players.exists(player)) player.stopAnimation();
    }, 2500);
  }
});

mp.events.add("server:police:search", (player) => {
  if(mp.players.exists(player)) {
    currentTarget = null;
    getNearestPlayer(player, 1);
    if (mp.players.exists(currentTarget)) {
      var charId = parseInt(currentTarget.getVariable("internalId"));
      gm.databaseManager.getConnection().query("SELECT u.*, i.itemName FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?",[charId], function(err, res) {
        if (err) console.log("Error in Police Search Query: "+err);
        if (res.length > 0) {
          if(mp.players.exists(player)) player.call("client:police:searchInvMenu",[JSON.stringify(res)]);
        } else {
          if(mp.players.exists(player)) player.notify("~g~Die Person trägt nichts bei sich.");
        }
      });
    }
  }
});

mp.events.add("server:police:removeItem", (player, invItemId) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT u.amout, i.itemcount, c.weight, c.id FROM user_items u LEFT JOIN items i ON i.id = u.itemId LEFT JOIN characters c ON c.id = u.charId WHERE u.id = ?",[invItemId], function(err, res) {
      if (err) console.log("Error in get police remove query 1: "+err);
      if (res.length > 0) {
        res.forEach(function(item) {
          var toRemoveWeight = parseFloat(parseInt(item.amout) * parseFloat(item.itemcount)).toFixed(2);
          var newWeight = parseFloat(parseFloat(item.weight) - parseFloat(toRemoveWeight)).toFixed(2);

          gm.databaseManager.getConnection().query("UPDATE characters SET weight = ? WHERE id = ?", [newWeight,item.id],function(err2, res2) {
            if (err2) console.log("Error in police remove query 2: "+err2);

            gm.databaseManager.getConnection().query("DELETE FROM user_items WHERE id = ?", [invItemId], function(err3, res3) {
              if (err3) {
                console.log("Error in police remove query 3: "+err3);
                if(mp.players.exists(player)) player.notify("~r~Der Gegenstand konnte nicht beschlagnahmt werden.");
              } else {
                if(mp.players.exists(player)) player.notify("~g~Der Gegenstand wurde beschlagnahmt.");
              }
            });
          });
        });
      }
    });
  }
});

//Fahrzeug Beschlagnahmen
mp.events.add("server:police:vehdestroy",(player) => {
  if(mp.players.exists(player)) {
    var vehicles = getVehicleFromPosition(player.position, 3);
    if (vehicles.length > 0) {
      if (mp.vehicles.exists(vehicles[0])) {
        var veh = vehicles[0];
        var numberplate = veh.getVariable("numberPlate");
        gm.databaseManager.getConnection().query("UPDATE vehicles SET isSpawned = 'N' , isImpounded = 'Y', fuel = 100 WHERE numberplate = ?", [numberplate], function (err, res) {
          if (err) console.log(err);
          player.notify("~g~Du hast das Fahrzeug beschlagnahmt!");
          if (mp.vehicles.exists(veh)) {
            veh.destroy();
          }
        });
      }
    }
  }
});

function removelicensea(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if (mp.players.exists(currentTarget)) {
      var targetId = currentTarget.data.internalId;
      gm.databaseManager.getConnection().query("SELECT licenseID FROM user_licenses WHERE charID = ? AND licenseID = ?", [targetId, 1], function(err1, res1){
        if (err1) console.log("Error in DB Query Check Licenses");
        if (res1.length > 0) {
          gm.databaseManager.getConnection().query("DELETE FROM user_licenses WHERE licenseID = 1 AND charID = ?",[targetId], function(err2, res2){
            if (err2) console.log("Error in remove License A: "+err2);
            if(mp.players.exists(player)) player.notify("Waffenlizenz A wurde entzogen");
            if(mp.players.exists(currentTarget)) currentTarget.notify("Dir wurde die Waffenlizenz A entzogen");
          });
        } else {
          if(mp.players.exists(player)) player.notify("Die Person hat diese Lizenz nicht!");
        }
      });
    }
  }
}
mp.events.add("server:police:removelicensea", removelicensea);

function removelicenseb(player) {
  if(mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if (mp.players.exists(currentTarget)) {
      var targetId = currentTarget.data.internalId;
      gm.databaseManager.getConnection().query("SELECT licenseID FROM user_licenses WHERE charID = ? AND licenseID = ?", [targetId, 2], function(err1, res1){
        if (err1) console.log("Error in DB Query Check Licenses");
        if (res1.length > 0) {
          gm.databaseManager.getConnection().query("DELETE FROM user_licenses WHERE licenseID = 2 AND charID = ?",[targetId], function(err2, res2){
            if (err2) console.log("Error in remove License B: "+err2);
            if(mp.players.exists(player)) player.notify("Waffenlizenz B wurde entzogen");
            if(mp.players.exists(currentTarget)) currentTarget.notify("Dir wurde die Waffenlizenz B entzogen");
          });
        } else {
          if(mp.players.exists(player)) player.notify("Die Person hat diese Lizenz nicht!");
        }
      });
    }
  }
}
mp.events.add("server:police:removelicenseb", removelicenseb);





//Halter
//mp.events.add("server:police:halter") => {
mp.events.add("inputValue", (player, trigger, kennzeichen) => {
  if(mp.players.exists(player)) {
    if(trigger === "LspdHalter") {
      gm.databaseManager.getConnection().query("SELECT * FROM `vehicles` WHERE numberplate = ?", [kennzeichen], function (err, res) {
        if (err){
          console.log("HALTERABFRAGE - Fehler bei Auslesen von ownerID "+err);
        } else if (res.length > 0){
          if(res[0].isRegistered == "Y") {
            gm.databaseManager.getConnection().query("SELECT ingameName FROM `characters` WHERE id = ?", [res[0].owner], function (err, owner) {
              if (err){
                console.log("HALTERABFRAGE - Fehler bei Auslesen von ingameName " +err);
              } else if (owner.length > 0){
                if(mp.players.exists(player)) player.notify("Der Halter zum Fahrzeug: " + owner[0].ingameName);
              } else{
                // Fehler darf nicht passieren xD
              }
            });
          } else {
            if(mp.players.exists(player)) player.notify("~r~Das Fahrzeug ist nicht angemeldet.");
          }
        } else {
          if(mp.players.exists(player)) player.notify("Fahrzeug nicht gefunden. Kennzeicheneingabe prüfen!");
        }
      });
    }
  }
});

mp.events.add("server:police:dispatchverw", (player) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT * FROM fraction_dispatches WHERE fraction = 'lspd' AND active = 'Y'", [], function(err, res) {
  	if (err) console.log("ERROR in Select Dispatches: "+err);
  		if (res.length > 0) {
  			var i = 1;
  			let DisList = [];
  			res.forEach(function(dis) {
  				let obj = {"id": String(dis.id),"posx":dis.posx,"posy":dis.posy,"disid": String(dis.dispatchid)};
  				DisList.push(obj);

  				if (parseInt(i) == parseInt(res.length)) {
  					if(mp.players.exists(player)) player.call("client:police:dispatchvewer", [JSON.stringify(DisList)]);
  				}
  				i++;
  			});
  		} else {
  			if(mp.players.exists(player)) player.call("client:police:dispatchvewer", ["none"]);
  		}
  	});
  }
});

mp.events.add("server:police:mark", (player, id) => {
  gm.databaseManager.getConnection().query("SELECT posx,posy FROM fraction_dispatches WHERE id = ?", [id], function(err,res) {
    if(err) console.log("Error in Select Dispatch: "+err);
    console.log(res[0].posx); 
    console.log(res[0].posy);
    player.call("client:police:markdispatch", [res[0].posx, res[0].posy])
  });
});

mp.events.add("server:police:deletedispatch", (player, id) => {
  gm.databaseManager.getConnection().query("UPDATE fraction_dispatches SET active = 'N' WHERE id = ?", [id], function (err,res) {
    if(err) console.log("Error in Update Dispatch: "+err);
  });
});

// SCHUTZWESTE
// bodyarmor
mp.events.add("server:police:bodyarmor", (player) => {
  if(mp.players.exists(player)) {
    if(player.armour < 90) {
        if (player.data.gender == 0) {
          player.setClothes(9,12,1,2);
          player.armour = 100;
        } else {
          player.setClothes(9,12,1,2);
          player.armour = 100;
        }
    }
    else
    {
      player.setClothes(9,0,0,2);
      player.armour = 0;
    }
  }
});

//ENTER COLSHAPE
function playerEnterColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == policeColShape) {
    }
  }
}
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

// EXIT COLSHAPE
function playerExitColshapeHandler(player, shape) {
  if(mp.players.exists(player)) {
    if(shape == policeColShape) {
      //Spieler hat colshape verlassen
      player.call("client:police:closeMenu");
    }
  }
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);

var currentTarget = null;
function getNearestPlayer(player, range)
{
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if(player != _player)
            {
                let _dist = _player.dist(player.position);
                if(_dist < dist)
                {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};

function getVehicleFromPosition(position, range) {
  const returnVehicles = [];
  mp.vehicles.forEachInRange(position, range,
      (vehicle) => {
          returnVehicles.push(vehicle);
      }
  );
  return returnVehicles;
}

// Show ID Card
mp.events.add("server:police:showIDCard", (player, nearestPlayer, playerName, rankName) => {
  if(mp.players.exists(nearestPlayer) && mp.players.exists(player)) {
    nearestPlayer.call("client:police:showIDCard",[playerName,rankName]);
  }
});

var amout = 500;
var lastCopInfo = 0;
mp.events.add("server:police:manyduty", (player) => {
  gm.databaseManager.getConnection().query("SELECT money FROM characters WHERE id = ?", [player.data.internalId], function(err1, res1) {
    if (err1) console.log("ERROR in SELECT money: "+err1);
    if (res1.length > 0) {
      money = player.data.money;
      amout = parseFloat(amout).toFixed(2);
      if ( (amout*1) > (money*1)) {
        player.notify("~r~Ohne Mos nix los");
        console.log("ManyDuty - nicht genug Geld");
      } else {
        var newAm = parseFloat( player.data.money - parseFloat(amout*1).toFixed(2) ).toFixed(2);;
        if (mp.players.exists(player)) player.call("updateHudMoney", [newAm]);
        gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.internalId], function (err2, res2) {
          if (err2) console.log("ERROR in Update Money: "+err2);
          if (Date.now() > lastCopInfo + 600000) {
            gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
              if (err) console.log("Error in Count Duty Officers: "+err);
              if (res[0].counter >= 4) {
                let infoCops = randomInt(res[0].counter-2, res[0].counter+2);
                player.notify("Hab da so ungefähr "+infoCops+" Cops gesehen!");
                player.data.money = newAm;
                lastCopInfo = Date.now()
              } else {
                player.notify("Verpiss Dich! Hab keine Infos!");
                player.data.money = newAm;
              }
            });
          } else {
            player.notify("Verpiss Dich! Hab keine Infos!");
            player.data.money = newAm;
          }
        });
      }
    } else {
      player.notify("~r~Ohne Mos nix los!")
    }
  });
});

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}