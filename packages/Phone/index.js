var tsUserPrefix = "RageLife-";

mp.events.add("server:phone:phoneRing", (player, number) => {
  if(mp.players.exists(player)) {
    if(number != "") {
      if(number.length == 3) {
        gm.databaseManager.getConnection().query("SELECT targetnumber FROM phone_short WHERE shortnumber = " + number, function (errUp, resUp) {
          if (errUp) {
            console.log("ERROR in phone Leitstellen db querry:");
            console.log("errUp = " + errUp);
            console.log("resUp = " + resUp);
            return;
          } else if (resUp.length > 0) {
            if(resUp[0].targetnumber == null) {
              player.call(`notification`, ["3", "Die Leitstelle ist nicht besetzt"]);
              player.call("client:Handy:noNumber", [number]);
            } else {
              mp.events.call("server:phone:phoneRing2", player, resUp[0].targetnumber, number);
            }
          }
        });

      } else if (number.length < 6){
        player.call("client:Handy:noNumber", [number]);
      } else if(number === player.phoneNumber) {
        player.call(`notification`, ["4", "Du kannst dich nicht selbst anrufen!"]);
        player.call("client:Handy:noNumber", [number]);
      } else {
        mp.events.call("server:phone:phoneRing2", player, number, null);
      }
    }
  }
});

mp.events.add("server:phone:phoneRing2", (player, number, leitstelle) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT commandName FROM characters WHERE telefonnummer = " + number, function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone ring commandName db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else if (resUp.length > 0) {
        var callPlayerName = JSON.stringify(resUp[0].commandName);
        callPlayerName = callPlayerName.substring(1, callPlayerName.length -1);
        mp.players.forEach(
          (playerToSearch, id) => {
            if (playerToSearch.name == callPlayerName) {
              if(playerToSearch.getVariable("CALL_IS_STARTED") == true || playerToSearch.getVariable("phoneIsRinging") == true || playerToSearch.getVariable("phoneIsCalling") == true){
                player.call("client:Handy:numberBusy", [number, leitstelle]);
                return;
              }
              var phonenumber = player.phoneNumber.toString();
              player.setVariable("phoneIsCalling", true);
              playerToSearch.setVariable("phoneIsRinging", true);
              playerToSearch.call("client:Handy:phoneRing", [phonenumber, leitstelle]);
            }
          }
        );
      } else {
        if(mp.players.exists(player)) player.call("client:Handy:noNumber", [number]);
        //Nummer nicht vergeben
      }
    });
  }
});


mp.events.add("server:phone:startCall", (player, number, leitstelle) => {
  if(mp.players.exists(player)) {
    if(number != "") {
      gm.databaseManager.getConnection().query("SELECT commandName FROM characters WHERE telefonnummer = " + number, function (errUp, resUp) {
        if (errUp) {
          console.log("ERROR in phone call db querry:");
          console.log("errUp = " + errUp);
          console.log("resUp = " + resUp);
          return;
        } else if (resUp.length > 0) {
          if (errUp) player.notify("Error: " + errUp);
          var callPlayerName = JSON.stringify(resUp[0].commandName);
          callPlayerName = callPlayerName.substring(1, callPlayerName.length -1);
          mp.players.forEach(
            (playerToSearch, id) => {
              if(mp.players.exists(player) && mp.players.exists(playerToSearch)) {
                if (playerToSearch.name == callPlayerName) {
                  if(playerToSearch.getVariable("state") === "INGAME") {
                    let newTSName = "" + tsUserPrefix + "" + player.id;
                    let newOtherTSName = "" + tsUserPrefix + "" + playerToSearch.id;
                    player.setVariable("phoneIsCalling", false);
                    playerToSearch.setVariable("phoneIsRinging", false);
                    player.setVariable("CALLING_PLAYER_NAME", newOtherTSName);
                    playerToSearch.setVariable("CALLING_PLAYER_NAME", newTSName);
                    player.setVariable("CALL_IS_STARTED", true);
                    playerToSearch.setVariable("CALL_IS_STARTED", true);
                    playerToSearch.call("client:Handy:acceptCall", [player.phoneNumber, leitstelle]);
                    if(leitstelle != null) {
                      player.setVariable("CALLING_PLAYER_NUMBER", leitstelle);
                      playerToSearch.setVariable("CALLING_PLAYER_NUMBER", leitstelle);
                    } else {
                      player.setVariable("CALLING_PLAYER_NUMBER", number);
                      playerToSearch.setVariable("CALLING_PLAYER_NUMBER", player.phoneNumber);
                    }
                  }
                }
              }
            }
          );
        }
      });
    }
  }
});

// Send client event to calling partner when rejected
mp.events.add("server:phone:rejectCall", (player, number, leitstelle) => {
  if(mp.players.exists(player)) {
    if(number != "") {
      gm.databaseManager.getConnection().query("SELECT commandName FROM `characters` WHERE telefonnummer = "+number, function (errUp, resUp) {
        if (errUp) {
          console.log("ERROR in phone call reject db querry:");
          console.log("errUp = " + errUp);
          console.log("resUp = " + resUp);
          return;
        } else if (resUp.length > 0) {
          if (errUp) player.notify("Error: " + errUp);
          var callPlayerName = JSON.stringify(resUp[0].commandName);
          callPlayerName = callPlayerName.substring(1, callPlayerName.length -1);
          mp.players.forEach(
            (playerToSearch, id) => {
              if (playerToSearch.name == callPlayerName) {
                player.setVariable("phoneIsCalling", false);
                player.setVariable("phoneIsRinging", false);
                playerToSearch.setVariable("phoneIsRinging", false);
                playerToSearch.setVariable("phoneIsCalling", false);
                playerToSearch.call("client:Handy:callRejected");
                player.call("client:Handy:callRejected");
              }
            }
          );
        }
      });
    }
  }
});


///////////// Hier müsste auch mit ForEach erst mal der SpielerHandle gefunden werden. Der Bloße Name aus der Var ist leider kein Handle.
mp.events.add("server:phone:endCall", (player) => {
  if(mp.players.exists(player)) {
    var callingPartnerName = player.getVariable("CALLING_PLAYER_NAME");
    if (callingPartnerName !== null) {
      callingPartnerName = callingPartnerName.replace('RageLife-', '');
      player.setVariable("CALL_IS_STARTED", false);
      player.setVariable("CALLING_PLAYER_NAME", "");
      player.setVariable("CALLING_PLAYER_NUMBER", "");
      mp.players.forEach(
        (playerToSearch, id) => {
          if (playerToSearch.id == callingPartnerName) {
            playerToSearch.setVariable("phoneIsRinging", false);
            playerToSearch.setVariable("phoneIsCalling", false);
            playerToSearch.setVariable("CALL_IS_STARTED", false);
            playerToSearch.setVariable("CALLING_PLAYER_NAME", "");
            playerToSearch.setVariable("CALLING_PLAYER_NAME", "");
          }
        }
      );
    }
  }
});


// eigene Nummer an Client senden
mp.events.add("server:phone:getOwnNumber", (player) => {
  if(mp.players.exists(player)) {
    var number = player.phoneNumber;
    player.call("client:Handy:showSettings", [number]);
  }
});

  // is in call?

mp.events.add("server:phone:isInCall", (player) => {
  if(mp.players.exists(player)) {
    var isInCall = player.getVariable("CALL_IS_STARTED");
    if(isInCall == true) {
      var name = player.getVariable("CALLING_PLAYER_NAME");
          gm.databaseManager.getConnection().query("SELECT telefonnummer FROM `characters` WHERE commandName = ?", [name], function (errUp, resUp) {
            if (errUp) {
              console.log("ERROR in phone call db querry:");
              console.log("errUp = " + errUp);
              console.log("resUp = " + resUp);
              return;
            } else if (resUp.length > 0) {
              var number = resUp[0].telefonnummer;
              player.call("client:Handy:showPhonecall", [number])
            }
          });
    } else {
      player.call("client:Handy:showDialpad");
    }
  }
});


// Leitstelle schon meine?
mp.events.add("server:phone:getLeitstelle", (player, leitstelle) => {
  if(mp.players.exists(player)) {
    leitstelle = parseInt(leitstelle);
    gm.databaseManager.getConnection().query("SELECT targetnumber FROM phone_short WHERE shortnumber = " + leitstelle, function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone Leitstellen db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else if (resUp.length > 0) {
        var targetNumber = resUp[0].targetnumber;
        if (player.phoneNumber == targetNumber) {
          mp.events.call("server:phone:removeLeitstelle", player, leitstelle);
        } else {
          mp.events.call("server:phone:setLeitstelle", player, leitstelle);
        }
      }
    });
  }
});

mp.events.add("server:phone:leitstelleOffDuty", (player, leitstelle) => {
  if(mp.players.exists(player)) {
    leitstelle = parseInt(leitstelle);
    gm.databaseManager.getConnection().query("SELECT targetnumber FROM phone_short WHERE shortnumber = " + leitstelle, function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone Leitstellen db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else if (resUp.length > 0) {
        var targetNumber = resUp[0].targetnumber;
        if (player.phoneNumber == targetNumber) {
          mp.events.call("server:phone:removeLeitstelle", player, leitstelle);
        } else {
          return;
        }
      }
    });
  }
});

// Leitstellen setzen
mp.events.add("server:phone:setLeitstelle", (player, leitstelle) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("UPDATE phone_short SET targetnumber = '" + player.phoneNumber + "' WHERE shortnumber = " + leitstelle, function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone Leitstellen db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else {
        player.call(`notification`, ["2", "Du hast die Leitstelle übernommen"]);
      }
    });
  }
});

// Leitstellen entfernen
mp.events.add("server:phone:removeLeitstelle", (player, leitstelle) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("UPDATE phone_short SET targetnumber = NULL WHERE shortnumber = " + leitstelle, function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone Leitstellen db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else {
        player.call(`notification`, ["2", "Leitstelle wurde abgegeben"]);
      }
    });
  }
});

// SMS senden
mp.events.add("server:phone:sendSMS", (player,myNumber,number,message,date) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT commandName FROM characters WHERE telefonnummer = " + number, function (errUp, res) {
      if (errUp) {
        return;
      } else
        mp.players.forEach(
          (playerToSearch, id) => {
            gm.databaseManager.getConnection().query("INSERT INTO phone_sms (sender, empf, sms, datum) VALUES (?,?,?,?)", [player.phoneNumber, number, message, date], function (errUp, resUp) {
              if (errUp) {
                console.log("ERROR in phone add contact db querry:");
                console.log("errUp = " + errUp);
                console.log("resUp = " + resUp);
                return;
              } else {
                player.call(`notification`, ["2", "SMS Gesendet"]);
                if (playerToSearch.name == res[0].commandName) {                  
                  playerToSearch.call(`notification`, ["2", "Du hast eine SMS bekommen!"]);
                }                
              }
            });
          }
        );
    });
  }
});

// Kontakt hinzufügen
mp.events.add("server:phone:addContact", (player, name, number) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("INSERT INTO phone_contacts (playerCharID, phoneNumber, contactName) VALUES (?,?,?)", [player.data.internalId, number, name], function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone add contact db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else {
        player.call(`notification`, ["2", "Kontakt gespeichert"]);
      }
    });
  }
});

// Kontakte auslesen
mp.events.add("server:phone:getContacts", (player) => {
  console.log("Test");
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query("SELECT * FROM phone_contacts WHERE playerCharID = ? ORDER BY contactName", [player.data.internalId], function(errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone getContacts db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else if (resUp.length > 0) {
        var c = 0;
        let names = [];
        resUp.forEach(function(contacts) {
            names.push(contacts.contactName, contacts.phoneNumber);
            if (c+1 == resUp.length) {
                player.call("client:Handy:showContacts"[names]);
            }
            c++;
        });
      } else {
        if(mp.players.exists(player)) player.call("client:Handy:showContacts");
      }
    });
  }
});

mp.events.add("server:phone:getSingleContact", (player, name) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query('SELECT phoneNumber from phone_contacts WHERE contactName = ? AND playerCharID = ?', [name, player.data.internalId], function(errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone getSingleContacts db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else if (resUp.length > 0) {
        var number = resUp[0].phoneNumber;
        if(mp.players.exists(player)) player.call("client:Handy:showSingleContact", [name, number]);
      }
    });
  }
});

// Kontakt anrufen
mp.events.add("server:phone:callContact", (player, name) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query(`SELECT phoneNumber FROM phone_contacts WHERE contactName = ? AND playerCharID = ?`, [name, player.data.internalId], function(errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone getContacts db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else if (resUp.length > 0) {
        var number = resUp[0].phoneNumber;
        if(mp.players.exists(player)) player.call("client:Handy:onCall", [number]);
      }
    });
  }
});


// Kontakt löschen
mp.events.add("server:phone:deleteContact", (player, name) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query('DELETE FROM phone_contacts WHERE contactName = ? AND playerCharID = ?', [name, player.data.internalId], function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone deleteContact db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else {
        if(mp.players.exists(player)) player.call(`notification`, ["2", "Kontakt gelöscht"]);
      }
    });
  }
});


// Kontakt bearbeiten
mp.events.add("server:phone:saveContact", (player, name, number, old_name, old_number) => {
  if(mp.players.exists(player)) {
    gm.databaseManager.getConnection().query('UPDATE phone_contacts SET contactName = ?, phoneNumber = ? WHERE contactName = ? AND phoneNumber = ? AND playerCharID = ?', [name, number, old_name, old_number, player.data.internalId], function (errUp, resUp) {
      if (errUp) {
        console.log("ERROR in phone saveContact db querry:");
        console.log("errUp = " + errUp);
        console.log("resUp = " + resUp);
        return;
      } else {
        if(mp.players.exists(player)) player.call(`notification`, ["2", "Kontakt bearbeitet"]);
      }
    });
  }
});
