mp.events.add("server:cuff:cuff", (player) => {
  if(mp.players.exists(player)) {
    var currentTarget = null;
    function getNearestPlayer(player, range) {
            let dist = range;
            mp.players.forEachInRange(player.position, range, (_player) => {
                    if(player != _player) {
                            let _dist = _player.dist(player.position);
                            if(_dist < dist) {
                                    currentTarget = _player;
                                    dist = _dist;
                            }
                    }

            });
    }
    getNearestPlayer(player, 1);
    if(mp.players.exists(currentTarget)) {
      if(currentTarget){
          currentTarget.setVariable('cuffState','CUFFED');
          currentTarget.notify("Dir wurden die Handschellen ~r~angelegt!");
          mp.events.call("playAnimationEvent", currentTarget, "mp_arresting", "idle", 1, 49, -1);
      }
    }
  }
});

mp.events.add("server:cuff:uncuff", (player) => {
  if(mp.players.exists(player)) {
        var currentTarget = null;
        function getNearestPlayer(player, range) {
                let dist = range;
                mp.players.forEachInRange(player.position, range, (_player) => {
                        if(player != _player) {
                                let _dist = _player.dist(player.position);
                                if(_dist < dist) {
                                        currentTarget = _player;
                                        dist = _dist;
                                }
                        }

                });
        }
        getNearestPlayer(player, 1);
    if(mp.players.exists(currentTarget)) {
        if(currentTarget) {
            currentTarget.setVariable('cuffState','UNCUFFED');
            currentTarget.notify("Dir wurden die Handschellen ~g~abgenommen!");
            currentTarget.stopAnimation();
        }
      }
    }
});
