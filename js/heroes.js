// ---------- config ----------

let basicHeroStuff = {
  deaths: 0,
  kills: 0,
  dead: false,
  timers: []
}

// range is number of reachable tiles: 
const RANGE_NEAR = 9    // just 9
const RANGE_MEDIUM = 15 // 9 + 6 = 15
const RANGE_FAR = 27    // 9 + 6 + 12 = 27

const heroNightmare = {
  name: "Des Alpes",
  maxHealth: 5,
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
  maxHealth: 9,
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
