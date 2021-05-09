
// ---------- config ----------

const magicActiveProtect = {
  name: "Protect",
  action: function(caster, points, target) {
    addOutputLine("                on "+caster.name);

    caster.health += points;
  }
}

const magicActiveAreaDamage = {
  name: "Area Damage",
  action: function(caster, points, target) {
    addOutputLine("                on "+target.name);

    target.health -= points;
  }
}

// ---------- functions ----------

function magicAttack(attacker, defender) {
  addOutputLine(attacker.name+" casts spell "+attacker.magicActive.name+"<"+attacker.magicPoints+">");

  attacker.magicActive.action(attacker, attacker.magicPoints, defender);
  
  checkHealth(defender, attacker);
}

