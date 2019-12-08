//Häuser
let house1 = mp.colshapes.newSphere(243.102, -1073.400, 29.28, 2, 0);
let house1exit = mp.colshapes.newSphere(346.411,-1012.351,-99.19, 2, -99);
let house2 = mp.colshapes.newSphere(-47.1140, -585.971, 37.95, 2, 0);
let house2exit = mp.colshapes.newSphere(-18.406,-591.033,90.11, 2, -99);
let houseanna = mp.colshapes.newSphere(-658.778, 887.164, 229.24, 2, 0);
let houseannaexit = mp.colshapes.newSphere(-786.9563, 315.6229, 187.9136, 2, -99);
let housevespuc = mp.colshapes.newSphere(-822.385, -1223.430, 7.365, 2, 0);
let housevespucexit = mp.colshapes.newSphere(-1450.173, -525.700, 56.92, 2, -99);
let houserichman = mp.colshapes.newSphere(-1274.315, 315.404, 65.511, 2, 0);
let houserichmanexit = mp.colshapes.newSphere(-912.480, -365.059, 114.274, 2, -99);
let housesandy = mp.colshapes.newSphere(2476.543, 4087.47, 38.11, 2, 0);
let housesandyexit = mp.colshapes.newSphere(266.245, -1007.079, -100.963, 2, -99);
let housepaleto = mp.colshapes.newSphere(-109.075, 6337, 31.57, 2, 0);
let housepaletoexit = mp.colshapes.newSphere(266.245, -1007.079, -100.963, 2, -99);
let housebillig = mp.colshapes.newSphere(287.997, -919.811, 29.57, 2, 0);
let housebilligexit = mp.colshapes.newSphere(151.293, -1007.72, -98.999, 2, -99);
//Lager
let houseannalager = mp.colshapes.newSphere(-782.58,328.8500,187.31, 2, -99);
let house1lager = mp.colshapes.newSphere(344.077,-1002.029,-99.196, 2, -99);
let house2lager = mp.colshapes.newSphere(-32.50, -590.87, 88.71, 2, -99);
let housevecpuclager = mp.colshapes.newSphere(-1458.268,-537.082,55.52, 2, -99);
let houserichmanlager = mp.colshapes.newSphere(-919.759, -384.966, 113.674, 2, -99);
let housesandylager = mp.colshapes.newSphere(265.276, -995.796, -99, 2, -99);
let housepaletolager = mp.colshapes.newSphere(265.276, -995.796, -99, 2, -99);


mp.events.add("server:Keybind:KeyE", (player) => {
    if(house1.isPointWithin(player.position)) {
        let id = 1;
      mp.events.call("server:housing:openMenu", player,id);
    }
    if(house1exit.isPointWithin(player.position)) {
        let id = 1;
        mp.events.call("server:housing:openInnen",player,id);
    }
    if(house1lager.isPointWithin(player.position)) {
        let id = 1;
       mp.events.call("server:housingitems:vermenu",player,id);
    }
    if(house2.isPointWithin(player.position)) {
        let id = 2;
        mp.events.call("server:housing:openMenu",player, id);
    }
    if(house2exit.isPointWithin(player.position)) {
        let id = 2;
        mp.events.call("server:housing:openInnen",player,id);
    }
    if(house2lager.isPointWithin(player.position)) {
        let id = 2;
       mp.events.call("server:housingitems:vermenu",player,id);
    }
    if(houseanna.isPointWithin(player.position)) {
        let id = 3;
        mp.events.call("server:housing:openMenu",player, id);
    }
    if(houseannaexit.isPointWithin(player.position)) {
        let id = 3;
        mp.events.call("server:housing:openInnen",player,id);
    }
    if(houseannalager.isPointWithin(player.position)) {
        let id = 3;
       mp.events.call("server:housingitems:vermenu",player,id);
    }
    if(housevespuc.isPointWithin(player.position)) {
        let id = 4;
        mp.events.call("server:housing:openMenu",player, id);
    }
    if(housevespucexit.isPointWithin(player.position)) {
        let id = 4;
        mp.events.call("server:housing:openInnen",player,id);
    }
    if(housevecpuclager.isPointWithin(player.position)) {
        let id = 4;
       mp.events.call("server:housingitems:vermenu",player,id);
    }
    if(houserichman.isPointWithin(player.position)) {
        let id = 5;
        mp.events.call("server:housing:openMenu",player, id);
    }
    if(houserichmanexit.isPointWithin(player.position)) {
        let id = 5;
        mp.events.call("server:housing:openInnen",player,id);
    }
    if(houserichmanlager.isPointWithin(player.position)) {
        let id = 5;
       mp.events.call("server:housingitems:vermenu",player,id);
    }
    if(housesandy.isPointWithin(player.position)) {
        let id = 6;
        mp.events.call("server:housing:openMenu",player, id);
    }
    if(housesandyexit.isPointWithin(player.position)) {
        let id = 6;
        mp.events.call("server:housing:openInnen",player,id);
    }
    if(housesandylager.isPointWithin(player.position)) {
        let id = 6;
       mp.events.call("server:housingitems:vermenu",player,id);
    }
    if(housepaleto.isPointWithin(player.position)) {
        let id = 7;
        mp.events.call("server:housing:openMenu",player, id);
    }
    if(housepaletoexit.isPointWithin(player.position)) {
        let id = 7;
        mp.events.call("server:housing:openInnen",player,id);
    }
    if(housepaletolager.isPointWithin(player.position)) {
        let id = 7;
       mp.events.call("server:housingitems:vermenu",player,id);
    }
    if(housebillig.isPointWithin(player.position)) {
        let id = 8;
        mp.events.call("server:housing:openMenu",player, id);
    }
    if(housebilligexit.isPointWithin(player.position)) {
        let id = 8;
        mp.events.call("server:housing:openInnen",player,id);
    }
});
mp.events.add("server:housing:openMenu", (player, id) => {
    if(mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT * FROM housing WHERE id = ?", [id], function (err, res) {
            if (err) console.log(err);
            if (res.length > 0) {
                var i = 1;
                let HouseList = [];
                res.forEach(function(house) {
                    let obj = {"name": String(house.name), "price": String(house.price), "garage": String(house.garageplatz), "id": String(house.id)};
                    HouseList.push(obj);        
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:housing:openMenu", [JSON.stringify(HouseList)]);
                    }
                    i++;
                });
            } else {
                if(mp.players.exists(player)) player.call("client:housing:openMenu", ["none"]);
            }
        });
    }
});


mp.events.add("server:housing:buyhouse", (player, id) => {
    if(mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT * FROM housing WHERE id = ?", [id], function(err, res) {
            if (err) console.log("Error in Selct Houses: "+err);
            if (res.length > 0) {
                res.forEach(function(house) {
                    gm.databaseManager.getConnection().query("SELECT COUNT(houseid) AS counter FROM user_houses WHERE houseid = ?",[id], function(err4,res4){
                        if (res4[0].counter >= house.maxbew) {
                            player.call(`notification`, ["4", "Es ist kein Platz mehr hier"]);
                        } else {
                            gm.databaseManager.getConnection().query("SELECT * FROM bank_konten WHERE ownerId = ?", [player.data.internalId], function(err1, res1) {
                                if (err1) console.log("Error in Select Bank Konten :"+err1);
                                if(res1.length > 0) {
                                    res1.forEach(function(bank) {
                                        money = parseFloat(bank.amout).toFixed(2);
                                        amout = parseFloat(res[0].price).toFixed(2);
                                        if ( (money*1) > (amout*1)) {
                                            var newAm = parseFloat( parseFloat(money*1).toFixed(2) - parseFloat(amout*1).toFixed(2) ).toFixed(2);
                                            gm.databaseManager.getConnection().query("UPDATE bank_konten SET amout = ? WHERE ownerId = ?", [newAm, player.data.internalId], function(err2, res2) {
                                                if (err2) console.log("Error in Update BankKonten: "+err2);
                                                gm.databaseManager.getConnection().query("SELECT commandName FROM characters WHERE id = ?",[player.data.internalId], function(err5, res5) {
                                                    if (err5) console.log("Error in Select Commandname: "+err5);
                                                    var houseDimension = 0;
                                                    houseDimension = "" + Math.floor(Math.random() * 900000);                                            
                                                    gm.databaseManager.getConnection().query("INSERT INTO user_houses(houseid,ingameName,charId,dimension) VALUES(?,?,?,?)", [id,res5[0].commandName,player.data.internalId, houseDimension], function(err3, res3) {
                                                        if(err3) console.log("Error in Insert Houses: "+err3);
                                                        player.call(`notification`, ["2", "Dass Haus wurde gekauft"]);
                                                    });
                                                });
                                            });
                                        } else {
                                            player.call(`notification`, ["4", "Du hast nicht genügend Geld"]);
                                        }
                                    });
                                } else {
                                    player.call(`notification`, ["4", "Du besitzt kein Bankkonto"]);
                                }
                            });
                        }
                    });
                    
                });
            }
        });
    }
});

mp.events.add("server:housing:houseOwners",(player,id) => {
    if(mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE houseId = ?", [id], function(err, res) {
            if (err) console.log("Error in Select Houses: "+err);
            let OwnerList = [];
            res.forEach(function(char) {
                let obj = {"name": String(char.ingameName), "id": String(char.id)};
                OwnerList.push(obj);  
                player.setVariable("houseid",char.id);    
            });
            if(mp.players.exists(player)) player.call("client:housing:openownerMenu", [JSON.stringify(OwnerList)]);   
        });
    }
});

mp.events.add("server:housing:houseMenu",(player,id) => {
    if(mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
            if (err) console.log("Error in Select Houses: "+err);
            var i = 1;
            let HousingList = [];
            res.forEach(function(char) {
                let obj = {"housecharid": String(char.charId), "locked": String(char.isLocked)};
                HousingList.push(obj);   
                player.setVariable("pinhouseid", id);
                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:housing:openverwMenu", [JSON.stringify(HousingList),player.data.internalId, id]);
                }
                i++;
            });
        });
    }
});

mp.events.add("server:housing:openInnen",(player, id) => {
    if(mp.players.exists(player)) {
        console.log(player.dimension)
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE houseid = ? AND dimension = ?", [id, player.dimension], function(err, res) {
            if (err) console.log("Error in Select Houses: "+err);
            var i = 1;
            let HousingList = [];
            res.forEach(function(char) {
                let obj = {"housecharid": String(char.charId), "locked": String(char.isLocked), "id": String(char.id)};
                HousingList.push(obj);   
                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:housing:openverwinnenMenu", [JSON.stringify(HousingList),player.data.internalId]);
                }
                i++;
            });
        });
    }
});

mp.events.add("server:housing:openInnenSub",(player, id) => {
    if(mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
            if (err) console.log("Error in Select Houses: "+err);
            var i = 1;
            let HousingList = [];
            res.forEach(function(char) {
                let obj = {"housecharid": String(char.charId), "locked": String(char.isLocked), "id": String(char.id)};
                HousingList.push(obj);   
                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:housing:openverwinnenMenu", [JSON.stringify(HousingList),player.data.internalId]);
                }
                i++;
            });
        });
    }
});


mp.events.add("server:housing:enterhouse",(player, id) => {
    if(mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function (err, res) {
        if (err) console.log("Error in Select houses: "+err);
            gm.databaseManager.getConnection().query("SELECT * FROM housing WHERE id = ?", [res[0].houseid], function(err1,res1){
                if (err1) console.log("Error in Select houses: "+err1);
                res1.forEach(function (houses){
                    if (houses.id == 1) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(346.411,-1012.351,-99.19);
                            player.dimension = parseInt(res[0].dimension);   
                            player.setVariable("enteredhouseid",id);  
                        });              
                    } 
                    if (houses.id == 2) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                        player.position = new mp.Vector3(-18.406,-591.033,90.11);
                        player.dimension = parseInt(res[0].dimension); 
                        player.setVariable("enteredhouseid",id);  
                        });                   
                    }  
                    if (houses.id == 3) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                        player.position = new mp.Vector3(-786.9563, 315.6229, 187.9136);
                        player.dimension = parseInt(res[0].dimension);
                        player.setVariable("enteredhouseid",id);   
                        });                   
                    }
                    if (houses.id == 4) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                        player.position = new mp.Vector3(-1450.173, -525.700, 56.92);
                        player.dimension = parseInt(res[0].dimension);
                        player.setVariable("enteredhouseid",id);   
                        });                   
                    } 
                    if (houses.id == 5) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                        player.position = new mp.Vector3(-912.480, -365.059, 114.274);
                        player.dimension = parseInt(res[0].dimension);
                        player.setVariable("enteredhouseid",id);   
                        });                   
                    } 
                    if (houses.id == 6) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                        player.position = new mp.Vector3(266.245, -1007.079, -100.963);
                        player.dimension = parseInt(res[0].dimension);
                        player.setVariable("enteredhouseid",id);   
                        });                   
                    } 
                    if (houses.id == 7) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                        player.position = new mp.Vector3(266.245, -1007.079, -100.963);
                        player.dimension = parseInt(res[0].dimension);
                        player.setVariable("enteredhouseid",id);   
                        });                   
                    }
                    if (houses.id == 8) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                        player.position = new mp.Vector3(151.293, -1007.72, -98.999);
                        player.dimension = parseInt(res[0].dimension);
                        player.setVariable("enteredhouseid",id);   
                        });                   
                    }                   
                });
            });
        });
    }
});

mp.events.add('inputValueHouse', (player, trigger, output) => {
    if(trigger === "housingPinenter") {
        console.log(trigger);
        console.log(output);        
        var id = player.getVariable("pinhouseid");
        console.log(id);
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ? AND pin = ?", [id,output], function (err, res) {
        if (err) console.log("Error in Select houses: "+err);
            if (res.length > 0) {
                gm.databaseManager.getConnection().query("SELECT * FROM housing WHERE id = ?", [res[0].houseid], function(err1,res1){
                    if (err1) console.log("Error in Select houses: "+err1);
                    res1.forEach(function (houses){
                        if (houses.id == 1) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                                player.position = new mp.Vector3(346.411,-1012.351,-99.19);
                                player.dimension = parseInt(res[0].dimension); 
                                player.setVariable("enteredhouseid",id);     
                            });              
                        } 
                        if (houses.id == 2) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-18.406,-591.033,90.11);
                            player.dimension = parseInt(res[0].dimension); 
                            player.setVariable("enteredhouseid",id); 
                            });                   
                        }  
                        if (houses.id == 3) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-786.9563, 315.6229, 187.9136);
                            player.dimension = parseInt(res[0].dimension); 
                            player.setVariable("enteredhouseid",id); 
                            });                   
                        }  
                        if (houses.id == 4) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-1450.173, -525.700, 56.92);
                            player.dimension = parseInt(res[0].dimension);
                            player.setVariable("enteredhouseid",id);   
                            });                   
                        } 
                        if (houses.id == 5) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-912.480, -365.059, 114.274);
                            player.dimension = parseInt(res[0].dimension);
                            player.setVariable("enteredhouseid",id);   
                            });                   
                        } 
                        if (houses.id == 6) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(266.245, -1007.079, -100.963);
                            player.dimension = parseInt(res[0].dimension);
                            player.setVariable("enteredhouseid",id);   
                            });                   
                        } 
                        if (houses.id == 7) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(266.245, -1007.079, -100.963);
                            player.dimension = parseInt(res[0].dimension);
                            player.setVariable("enteredhouseid",id);   
                            });                   
                        }   
                        if (houses.id == 8) {
                            gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '1' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                                if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(151.293, -1007.72, -98.999);
                            player.dimension = parseInt(res[0].dimension);
                            player.setVariable("enteredhouseid",id);   
                            });                   
                        }               
                    });
                });
            } else {
                if(mp.players.exists(player)) player.call(`notification`, ["4", "Falscher Pin"]);
            }            
        });
    }
});

mp.events.add("server:housing:exithouse",(player, id) => {
    if(mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function (err, res) {
        if (err) console.log("Error in Select houses: "+err);
            gm.databaseManager.getConnection().query("SELECT * FROM housing WHERE id = ?", [res[0].houseid], function(err1,res1){
                if (err1) console.log("Error in Select houses: "+err1);
                res1.forEach(function (houses){
                    if (houses.id == 1) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(243.102, -1073.400, 29.28);
                            player.dimension = 0;      
                        });              
                    } 
                    if (houses.id == 2) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-47.1140, -585.971, 37.95);
                            player.dimension = 0;  
                        });                   
                    }  
                    if (houses.id == 3) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-658.778, 887.164, 229.24);
                            player.dimension = 0; 
                        });                   
                    }
                    if (houses.id == 4) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-822.385, -1223.430, 7.365);
                            player.dimension = 0; 
                        });                   
                    } 
                    if (houses.id == 5) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-1274.315, 315.404, 65.511);
                            player.dimension = 0; 
                        });                   
                    } 
                    if (houses.id == 6) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(2476.543, 4087.47, 38.11);
                            player.dimension = 0; 
                        });                   
                    } 
                    if (houses.id == 7) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(-109.075, 6337, 31.57);
                            player.dimension = 0; 
                        });                   
                    } 
                    if (houses.id == 8) {
                        gm.databaseManager.getConnection().query("UPDATE user_houses SET userinhouse = '0' WHERE id = ? AND charId = ?", [id, player.data.internalId], function(err1,res1){
                            if (err1) console.log("Error in Select houses: "+err1);
                            player.position = new mp.Vector3(287.997, -919.811, 29.57);
                            player.dimension = 0; 
                        });                   
                    }                 
                });
            });
        });
    }
});

mp.events.add("server:housing:unlock",(player,id) => {
    gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
        if (err) console.log("Error in Select Houses: "+err);
        gm.databaseManager.getConnection().query("UPDATE user_houses SET isLocked = '1' WHERE id = ? AND charId = ?", [id,player.data.internalId], function(err1,res1) {
            if (err1) console.log("Error in Update Lock status: "+err1);
            if(mp.players.exists(player)) player.call(`notification`, ["2", "Dein Haus wurde aufgeschlossen"]);
        });
    });
});

mp.events.add("server:housing:lock",(player,id) => {
    gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
        if (err) console.log("Error in Select Houses: "+err);
        gm.databaseManager.getConnection().query("UPDATE user_houses SET isLocked = '0' WHERE id = ? AND charId = ?", [id,player.data.internalId], function(err1,res1) {
            if (err1) console.log("Error in Update Lock status: "+err1);
            if(mp.players.exists(player)) player.call(`notification`, ["2", "Dein Haus wurde abgeschlossen"]);
        });
    });
});

mp.events.add("server:housing:klingeln", (player, id) => {
    gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
        if (err) console.log("Error in Select Houses: "+err);
    });
});

mp.events.add('server:housing:klingeln', (player, id) => {
        gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
            if (err) console.log("Error in Select Houses: "+err);
            mp.players.forEach(                
                (playerToSearch) => {                                      
                  if (playerToSearch.name == res[0].ingameName && res[0].userinhouse == "1") {
                    if(mp.players.exists(playerToSearch)) playerToSearch.call("client:housing:openKlingel", [res[0].id, player.data.internalId]);
                    if(mp.players.exists(player)) player.call(`notification`, ["2", "Du hast geklingelt"]);
                  } else {
                    if(mp.players.exists(player)) player.call(`notification`, ["4", "Keiner zuhause"]);
                  }
                }
              );
        });    
  });

  mp.events.add('server:housing:klingelenter', (player, id, targetId) => {
    gm.databaseManager.getConnection().query("SELECT * FROM user_houses WHERE id = ?", [id], function(err, res) {
        if (err) console.log("Error in Select Houses: "+err);
        gm.databaseManager.getConnection().query("SELECT * FROM characters WHERE id = ?", [targetId], function(err1,res1) {
            if (err1) console.log("Error in Select Houses: "+err1);
            
            mp.players.forEach(                
                (playerToSearch, id) => {   
                  if (playerToSearch.name == res1[0].commandName) {
                    if (res[0].houseid == 1) {
                            playerToSearch.position = new mp.Vector3(346.411,-1012.351,-99.19);
                            playerToSearch.dimension = parseInt(res[0].dimension);               
                    } 
                    if (res[0].houseid == 2) {
                            playerToSearch.position = new mp.Vector3(-18.406,-591.033,90.11);
                            playerToSearch.dimension = parseInt(res[0].dimension);                    
                    }  
                    if (res[0].houseid == 3) {
                            playerToSearch.position = new mp.Vector3(-786.9563, 315.6229, 187.9136);
                            playerToSearch.dimension = parseInt(res[0].dimension);                 
                    } 
                    if (res[0].houseid == 4) {
                        playerToSearch.position = new mp.Vector3(-1450.173, -525.700, 56.92);
                        playerToSearch.dimension = parseInt(res[0].dimension);               
                    } 
                    if (res[0].houseid == 5) {
                            playerToSearch.position = new mp.Vector3(-912.480, -365.059, 114.274);
                            playerToSearch.dimension = parseInt(res[0].dimension);                    
                    }  
                    if (res[0].houseid == 6) {
                            playerToSearch.position = new mp.Vector3(266.245, -1007.079, -100.963);
                            playerToSearch.dimension = parseInt(res[0].dimension);                 
                    } 
                    }
                    if (res[0].houseid == 7) {
                        playerToSearch.position = new mp.Vector3(266.245, -1007.079, -100.963);
                        playerToSearch.dimension = parseInt(res[0].dimension);                 
                    } 
                    if (res[0].houseid == 8) {
                        playerToSearch.position = new mp.Vector3(151.293, -1007.72, -98.999);
                        playerToSearch.dimension = parseInt(res[0].dimension);                 
                    } 
                }
              );
        });        
    });    
});

mp.events.add('inputValueHouse', (player, trigger, output) => {
    if(trigger === "housingPin") {
        var id = player.getVariable("pinhouseid");
        gm.databaseManager.getConnection().query("UPDATE user_houses SET pin = ? WHERE id = ?",[output,id], function(err,res) {
            if (err) console.log("Error in Update Pin: "+err);
            if(mp.players.exists(player)) player.call(`notification`, ["2", "Du hast dein Haus Pin geändert"]);
        });
    }
});