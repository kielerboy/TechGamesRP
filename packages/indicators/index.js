mp.events.add("toggleIndicator", (player, indicatorID) => {
        if(mp.players.exists(player)) {
        let vehicle = player.vehicle;
        if(mp.players.exists(vehicle)) {
        if (vehicle && player.seat == -1) {
            switch (indicatorID) {
                // Right
                case 0:
                    vehicle.data.IndicatorRight = !vehicle.data.IndicatorRight;
                break;

                // Left
                case 1:
                    vehicle.data.IndicatorLeft = !vehicle.data.IndicatorLeft;
                break;
            }
        }
    }
}
});