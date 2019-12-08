//givePlayerJobMoney (true=Bank|false=Bar)
mp.events.add("givePlayerJobMoney", (player,toBank,money) => {
  if(mp.players.exists(player)) {
    if (toBank) {

        TODO: Geld auf bank hinzufügen

        player.data.money = (player.data.money + money);
        gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [player.data.money, player.data.internalId],
            function (err, res, row) {
                if (err) console.log("Error in Player Quit Query: " + err);
            });
        player.call("changeValue", ["money", player.data.money]);
    } else {
        player.data.money = (player.data.money + money);
        gm.databaseManager.getConnection().query('UPDATE characters SET money = ? WHERE id = ?', [player.data.money, player.data.internalId],
            function (err, res, row) {
                if (err) console.log("Error in Player Quit Query: " + err);
            });
        player.call("changeValue", ["money", player.data.money]);
    }
  }
});
