//Clear all notifications on client start
for (i = 0; i < 20; i++) {
    mp.game.ui.removeNotification(i);
}


// !!!VOR MERGE AUSKOMMENTIEREN!!!
require("TechGames/Admin");

//require("TechGames/AnimPlayer");
require("TechGames/interriorprops");
require("TechGames/ClothesMenu");

//Fraktionen
require("TechGames/Police");
require("TechGames/PoliceImpound");
require("TechGames/DOJ");
require("TechGames/IAATower");
require("TechGames/Cabco");
require("TechGames/Medic");

//Firmen
require("TechGames/Bennys");
require("TechGames/LSC");
require("TechGames/TequilalaBar");
require("TechGames/VanillaUnicorn");
require("TechGames/YellowJack");
require("TechGames/Ammunation");
require("TechGames/BlazingTattoo");

//Spielersachen
require("TechGames/CharCreator");
require("TechGames/Players");
require("TechGames/CarTuner");
require("TechGames/WalkingStyles");
require("TechGames/FingerPoint");
require("TechGames/Zulassung");
require("TechGames/Garagen");
require("TechGames/VehicleMenu");
require("TechGames/Spikes");
require("TechGames/Jobs");
require("TechGames/Minijobs");
require("TechGames/AnimationMenu");
require("TechGames/ShortAnims");
require("TechGames/Barber");
require("TechGames/Invent");
require("TechGames/Handy");
require("TechGames/Kofferaum");
require("TechGames/Carshops");
require("TechGames/charchooser");
require("TechGames/clothesShop");
require("TechGames/housing");
require("TechGames/HouseItems");
require("TechGames/indicators");
require("TechGames/Bank");
require("TechGames/Bankrob");

// Server sachen
require("TechGames/KeyBinds");
require("TechGames/nativeui");
require("TechGames/ragelife");
require("TechGames/Doors");
require("TechGames/Animations");
//require("TechGames/TS-VoiceChat");
require("TechGames/VehSync");
require("TechGames/GetPos");
require("TechGames/Fuelstation");
require("TechGames/VehicleInteractions");
require("TechGames/TattooMenu");
require("TechGames/vehKeys");
require("TechGames/phoneshop");
require("TechGames/Drugs");
require("TechGames/Passenger");
require("TechGames/BlipCreator");
require("TechGames/playerlocation");
require("TechGames/IPL");
require("TechGames/speedometer");
require("TechGames/notification");

let playerNotify = new mp.Event("playerNotify", (message) =>
{
    mp.game.graphics.notify(message);
    setTimeout(function() {
        playerNotify.destroy();
    },2000);
});

mp.gui.chat.activate(true);