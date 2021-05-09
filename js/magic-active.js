


function magicAttack(attacker, defender) {
  addOutputLine(attacker.name+" attacks "+defender.name+" with magic");

  defender.health -= attacker.magicPoints;
  
  checkHealth(defender, attacker);
}

