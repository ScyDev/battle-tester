// ---------- config ----------

let basicHeroStuff = {
  deaths: 0,
  kills: 0,
  dead: false,
  triggeredEffects: [],
  timedEffects: []
}


const heroNightmare = {
  name: "Des Alpes",
  maxHealth: 10,
  health: 5,
  speed: 3,
  range: RANGE_FAR,
  weapons: [
    weaponSword,
    weaponSword
  ],
  shield: weaponShield,
  magicPoints: 4,
  magicActive: magicActiveAreaDamage,
  magicPassive: null
};

const heroProtector = {
  name: "Beschützer",
  maxHealth: 18,
  health: 9,
  speed: 2,
  range: RANGE_NEAR,
  weapons: [
    weaponHammer
  ],
  shield: null,
  magicPoints: 2,
  magicActive: magicActiveProtect,
  magicPassive: null
};

// ---------- functions ----------

function checkHealth(defender, attacker) {
  if (defender.health <= 0) {
    addOutputLine(defender.name+" dies!");
    defender.deaths++;
    attacker.kills++;
  }
}
