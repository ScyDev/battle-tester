
const WEAPON_NONE = 0;
const WEAPON_ONE_HANDED = 1;
const WEAPON_TWO_HANDED = 2;

// weapons
const weaponSword = {
  name: "Sword",
  type: WEAPON_ONE_HANDED,
  damage: 1
}

const weaponHammer = {
  name: "Hammer",
  type: WEAPON_TWO_HANDED,
  damage: 2
}

// shields
const weaponShield = {
  name: "Shield",
  type: WEAPON_ONE_HANDED,
  damage: 0
}



function getTypeOfWeapons(hero) {
  let type = WEAPON_NONE;

  if (hero.weapons.length > 0)
  {
    let typeOfFirst = hero.weapons[0].type;
    let weaponsFound = hero.weapons.filter(weapon => weapon.type == typeOfFirst);

    if (weaponsFound.length != hero.weapons.length) {
      addOutputLine("!!! NOT ALL WEAPONS OF SAME TYPE !!! for hero "+hero.name+" weapons: "+hero.weapons);
      throw new Error("ERROR");
    }
    else {
      type = typeOfFirst;
    }
  }

  return type;
}

function weaponAttack(attacker, weapon, defender) {
  addOutputLine(attacker.name+" attacks "+defender.name+" with "+JSON.stringify(weapon, null, 4));

  defender.health -= weapon.damage;
  
  checkHealth(defender, attacker);
}