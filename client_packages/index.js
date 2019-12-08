//Clear all notifications on client start
for (i = 0; i < 20; i++) {
    mp.game.ui.removeNotification(i);
}

// !!!VOR MERGE AUSKOMMENTIEREN!!!
require("Admin");

//require('AnimPlayer');
require("interriorprops");
require("ClothesMenu");

//Fraktionen
require('Police');
require('PoliceImpound');
require('DOJ');
require('IAATower');
require('Cabco');
require('Medic');

//Firmen
require('Bennys');
require('LSC');
require('TequilalaBar');
require('VanillaUnicorn');
require('YellowJack');
require('Ammunation');
require('BlazingTattoo');

//Spielersachen
require('CharCreator');
require('Players');
require('CarTuner');
require('WalkingStyles');
require('FingerPoint');
require('Zulassung');
require('Garagen');
require('VehicleMenu');
require('Spikes');
require('Jobs');
require('Minijobs');
require('AnimationMenu');
require('ShortAnims');
require('Barber');
require('Invent');
require('Handy');
require("Kofferaum");
require('Carshops');
require('charchooser');
require('clothesShop');
require('housing');
require('HouseItems');
require("indicators");
require("Bank");
require("Bankrob");

// Server sachen
require('KeyBinds');
require('nativeui');
require('ragelife');
require('Doors');
require('Animations');
require('TS-VoiceChat');
require('VehSync');
require('GetPos');
require('Fuelstation');
require('VehicleInteractions');
require('TattooMenu');
require('vehKeys');
require('phoneshop');
require('Drugs');
require('Passenger');
require('BlipCreator');
require('playerlocation');
require('IPL');
require('speedometer');
require('notification');

let playerNotify = new mp.Event("playerNotify", (message) =>
{
    mp.game.graphics.notify(message);
    setTimeout(function() {
        playerNotify.destroy();
    },2000);
});

mp.gui.chat.activate(true);