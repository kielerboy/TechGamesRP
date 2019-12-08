var currentTarget = null;

let ROBBING = false;
mp.events.add("server:shop:ausrauben",(player) => {
    if (mp.players.exists(player)) {
        gm.databaseManager.getConnection().query("SELECT COUNT(c.id) AS counter FROM characters c LEFT JOIN fractionusers f ON c.id = f.playerCharId WHERE f.fractionID = 2 AND f.playerFractionDuty = 'Y' AND c.isOnline = 'Y'", function (err, res) {
            if (err) console.log("Error in Count Duty Officers: "+err);
            if (res[0].counter >= 0) { 
                if(ROBBING == false) {
                    player.call(`notification`, ["2", "Du hast den Raub gestartet!"]);
                    let raubShape = mp.colshapes.newSphere(player.position.x, player.position.y, player.position.z, 4, 0);

                    let raubInterval = setInterval(function() {
                        let position = player.position;
                        if (raubShape.isPointWithin(position) && (!player.vehicle)) {
                        } else {
                            player.call("client:progressbar:end");
                            player.setVariable("ROBBING",false);
                            ROBBING = false;
                            player.call(`notification`, ["4", "Du hast den Raub beendet!"]);
                            raubShape.destroy();
                            clearInterval(raubInterval2);
                            clearInterval(raubInterval);
                        }
                    },1000);
                    ROBBING = true;
                    player.call("client:dispatch:showDispatch");   
                    time = 10000
                    player.call("client:progressbar:start",[100, time]);
                    player.setVariable("ROBBING",true);
                    

                    let raubInterval2 = setTimeout(_ => {
                        if (mp.players.exists(player) && ROBBING == true) player.stopAnimation();

                            //money

                            robMoney = "" + Math.floor(Math.random() * 500);
                            if(robMoney < 150) {
                                robMoney = 150;
                                return;
                            }
                            var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));



                            gm.databaseManager.getConnection().query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.internalId], function(err,res) {
                                if (err) console.log("Error in Update money: "+err);
                                player.data.money = newAm;
                                player.call("updateHudMoney",[newAm]);
                                player.call("changeValue",["money",newAm]);
                                player.call(`notification`, ["2", "Du hast "+robMoney+"$ ausgeraubt"]);
                                player.setVariable("ROBBING",false);  
                                ROBBING = false; 
                                clearInterval(raubInterval);
                            });
                    }, 10000);
                } else if (ROBBING == true) {
                    player.call(`notification`, ["4", "Es ist bereits ein Überfall am laufen!"]);
                }
            } else {
                player.call(`notification`, ["4", "Es sind nicht genügend Cops im Dienst!"]);
            }
        });     
    }    
});
