const walkingStyles = [
    {Name: "Normal", AnimSet: null},
    {Name: "Mutig", AnimSet: "move_m@brave"},
    {Name: "Selbstsicher", AnimSet: "move_m@confident"},
    {Name: "Betrunken", AnimSet: "move_m@drunk@verydrunk"},
    {Name: "Fett", AnimSet: "move_m@fat@a"},
    {Name: "Gangster", AnimSet: "move_m@shadyped@a"},
    {Name: "Eilig", AnimSet: "move_m@hurry@a"},
    {Name: "Verletzt", AnimSet: "move_m@injured"},
    {Name: "Eingeschüchtert", AnimSet: "move_m@intimidation@1h"},
    {Name: "Schnell", AnimSet: "move_m@quick"},
    {Name: "Traurig", AnimSet: "move_m@sad@a"},
    {Name: "Stark", AnimSet: "move_m@tool_belt@a"}
];

mp.events.add("requestWalkingStyles", (player) => {
  if(mp.players.exists(player)) {
    player.call("receiveWalkingStyles", [JSON.stringify(walkingStyles.map(w => w.Name))]);
  }
});

mp.events.add("setWalkingStyle", (player, styleIndex) => {
  if(mp.players.exists(player)) {
    if (styleIndex < 0 || styleIndex >= walkingStyles.length) return;
    player.data.walkingStyle = walkingStyles[styleIndex].AnimSet;
    player.outputChatBox(`Laufstil geändert auf ${walkingStyles[styleIndex].Name}.`);
  }
});
