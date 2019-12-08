const fs = require('fs');
const path = require('path');

global.gm = {};
gm.databaseManager = require('./core/database.js');
gm.databaseManager.startConnection();
gm.databaseManager.onError();

console.log("[Server] Starte Dateiladen...");
require('./global_events.js');
console.log("[Server] Loaded global_events.js!");
require('./bank_fleeca.js');
console.log("[Server] Loaded bank_fleeca.js!");
require('./login.js');
console.log("[Server] Loaded login.js!");
require('./shop.js');
console.log("[Server] Loaded shop.js!");

setTimeout(function() {
  gm.databaseManager.getConnection().query("UPDATE characters SET isOnline = 'N', currentOnlineId = 0 WHERE 1 = 1",function(err, res) {
    if (err) console.log("Error in update players on startup: "+err);
    gm.databaseManager.getConnection().query("SELECT * FROM vehicles WHERE isSpawned = 'Y'",function(err1,res1) {
      if(err1) console.log("Error in Select vehicles on startup: "+err1);
      var aktdate = new Date();
      var aktmonth = parseInt(parseInt(aktdate.getMonth()) + 1);
      var aktdatum = ""+aktdate.getFullYear()+"-"+aktmonth+"-"+aktdate.getDate()+"-"+aktdate.getHours();+"";
      res1.forEach(function(date) {
        var datum = parseInt(date.datum);
        var monat = parseInt(date.monat);
        var stunde = parseInt(date.stunde);
      });
    });
  });

}, 3000);

gm.timers = {};
gm.timers.deathTimers = {};
gm.timers.crimetimers = {};
gm.timers.crimetimers.WeedCollect = {};
gm.timers.crimetimers.WeedPack = {};
gm.timers.crimetimers.WeedSell = {};
gm.timers.crimetimers.MushroomsCollect = {};
gm.timers.crimetimers.MushroomsPack = {};
gm.timers.crimetimers.MushroomsSell = {};
gm.timers.crimetimers.MescalineCollect = {};
gm.timers.crimetimers.MescalinePack = {};
gm.timers.crimetimers.MescalineSell = {};

gm.functions = {};
gm.functions.getVehicleFromPosition = function (position, range) {
    const returnVehicles = [];
    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}