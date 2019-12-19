var Damage = require("./damage.js")
var Player = class {
    constructor(player) {
        this._setup(player);
    }
    _setup(player) {
        var self = this;
        self._player = player;
        self._weapons = [];
        self._damage = [];
    }
    get player() {
        return this._player;
    }
    hit(hitter, weapon, bone) {
        var self = this;
        if (self._loggedIn == true) {
            if ((Date.now() - self._spawnedTimestamp) / 1000 > 15) {
                if ((self._health > 0) && (self.isDead() == 0)) {
                    let mul = 1;
                    if (bone != undefined) {
                        mul = Damage.getBoneMul(bone);
                    }
                    let damage = Math.floor(Damage.getWeaponDamage(weapon) * (mul || 1));
                    self.log("weapon", weapon)
                    self.log("damage", damage)
                    self.log("hitter", hitter._player.name)
                    if (hitter.team == self.team) {
                        damage *= 0.25;
                    }
                    if (self._player.health > self._health) {
                        self._player.health = self._health;
                    }
                    if (self._player.armour > self._armor) {
                        self._player.armour = self._armor;
                    }
                    self._health = self._player.health;
                    self._armor = self._player.armour;
                    let armor = self._armor - damage;
                    let health = self._health;
                    if (armor < 0) {
                        health += armor;
                        armor = 0;
                    }
                    self._health = health;
                    if (self._health < 0) {
                        self._health = 0;
                    }
                    self._armor = armor;
                    hitter.player.call("Combat:HitEntity")
                    if ((health <= 0) && (self.isDead() == 0)) {
                        self.death(hitter, weapon);
                    } else {
                        self._player.health = self._health + 100;
                        self._player.armour = self._armor;
                        self._damage.push({
                            hitter: hitter.player.getVariable("user_id"),
                            weapon: weapon,
                            damage: damage
                        })
                    }
                } else {
                    if ((self.isDead() == 0)) {
                        self.death(hitter, weapon);
                    }
                }
            }
        }
    }
    fireWeapon(id, ammo) {
        var self = this;
        if (id != 0) {
            // self.exp(15);
            let wIndex = self._weapons.findIndex(weapon => {
                return weapon.id == id;
            });
            if (wIndex == -1) {
                //self.error(Number(id), "Weapon Cheat", self._player.name)
                //self._player.removeWeapon(Number(id));
            }
        }
    }
}
module.exports = Player;