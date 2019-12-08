const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];

mp.events.add("playerJoin", (player) => {
  if(mp.players.exists(player)) {
    player.sendToCreator = function () {
        player.dimension = -100;
        player.alpha = 0;
        player.position = new mp.Vector3(-1005.8150634765625, -480.3327331542969, 50.0274772644043);
        player.heading = 33.189697265625;
        player.playAnimation("anim@heists@fleeca_bank@scope_out@return_case", "trunk_action", 1, 1);

        player.notify("~g~Du bist nun im Charactercreator!");
        player.call("startCreator");
        player.model = mp.joaat("mp_m_freemode_01");
        mp.game.controls.disableControlAction(0, null, true);
        player.freezePosition(true);
    }
  }
});

mp.events.add("createCharacter", (player, data) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("UPDATE characters SET isCreator = 'N' WHERE id = '" + player.data.internalId + "'", (err, res) => {
        if (err) throw err;
        player.position = new mp.Vector3(-1042.6781005859375, -2746.25, 21.35940170288086);
        player.heading = 323.992858886715;
        player.notify("~g~Dein Character ist nun eingereist!");

        if (player.model === mp.joaat("mp_m_freemode_01")) {
            player.setClothes(1, 0, 0, 0); //Mask
            player.setClothes(3, 6, 0, 0); //Torso
            player.setClothes(4, 1, 0, 0); //Legs
            player.setClothes(6, 1, 0, 0); //Shoes
            player.setClothes(8, 15, 0, 0); //Undershirt
            player.setClothes(11, 41, 0, 0); //Top
        } else {
            player.setClothes(1, 0, 0, 0); //Mask
            player.setClothes(3, 15, 0, 0); //Torso
            player.setClothes(4, 73, 0, 0); //Legs
            player.setClothes(6, 3, 0, 0); //Shoes
            player.setClothes(8, 16, 0, 0); //Undershirt
            player.setClothes(11, 16, 0, 0); //Top
        }

        gm.databaseManager.getConnection().query("UPDATE characterModel SET data =? WHERE internalId='" + player.data.internalId + "'", [data], function (err, res) {
            if (err) throw err;
        })
        player.dimension = 0;
        player.alpha = 255;
        player.call("sendPlayerToAirport");
    });
  }
});

mp.events.add("creator_GenderChange", (player, gender) => {
  if(mp.players.exists(player)) {
    player.model = freemodeCharacters[gender];
    player.data.model = gender;
    player.alpha = 0;

    player.changedGender = true;
    player.call("genderChange");
  }
});
