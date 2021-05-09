// action types that can trigger an effect

// used in bitmask
const ACTION_TYPE_ATTACK = 1;
const ACTION_TYPE_MAGIC = 2;
const ACTION_TYPE_TELEPORT = 4;

// ---------- config ----------

const magicActiveProtect = {
  name: "Protect",
  spell: function(caster, points, target) {
    addOutputLine("                on "+caster.name);

    caster.health += points;

    // an action triggered effect
    let actionTriggered = {
      name: "restoreDamage",
      actionTypes: ACTION_TYPE_ATTACK,
      //actionTypes: ACTION_TYPE_ATTACK | ACTION_TYPE_MAGIC, // combine bitmask
      counter: 3,
      strength: points,
      iteration: function(wearer, parentEffect) { 
        addOutputLine("                effect: restoring one damage");
        wearer.health += 1;
        parentEffect.counter--;
      }
    }
    caster.triggeredEffects.push(actionTriggered);
  }
}

const magicActiveAreaDamage = {
  name: "Area Damage",
  spell: function(caster, points, target) {
    addOutputLine("                on "+target.name);

    target.health -= points;

    // a time triggered effect
    let timeTriggered = {
      name: "dotHurt",
      counter: 3,
      strength: points,
      iteration: function(wearer, parentEffect) { 
        addOutputLine("                effect: give one damage");
        wearer.health -= 1;
        parentEffect.counter--;
      }
    }
    target.timedEffects.push(timeTriggered);    
    console.log("added dotHurt to "+target.name);
  }
}

// ---------- functions ----------

function magicAttack(attacker, defender) {
  addOutputLine(attacker.name+" casts spell "+attacker.magicActive.name+"<"+attacker.magicPoints+">");

  attacker.magicActive.spell(attacker, attacker.magicPoints, defender);

  // trigger effects that respond to magic attacks
  triggerActionEffect(attacker, defender, ACTION_TYPE_MAGIC)
  
  checkHealth(defender, attacker);
}

function triggerActionEffect(attacker, wearer, type) {
  // TODO: check action type
  wearer.triggeredEffects.forEach(effect => {
    if (effect.actionTypes & type) { // check bitmask
      addOutputLine("trigger action effect on "+wearer.name);
      effect.iteration(wearer, effect)
    }
    else {
      let binType = (type >>> 0).toString(2);
      let binActionTypes = (effect.actionTypes >>> 0).toString(2);
      console.log("action effect doesn't match: "+binType+" not in "+binActionTypes);
    }
  });  

  wearer.triggeredEffects = wearer.triggeredEffects.filter(effect => effect.counter > 0);
  //removeExpiredEffects(wearer.triggeredEffects)
}


function triggerTimedEffect(wearer) {
  wearer.timedEffects.forEach(effect => {
    addOutputLine("trigger timed effect on "+wearer.name);
    effect.iteration(wearer, effect)
  });  

  wearer.timedEffects = wearer.timedEffects.filter(effect => effect.counter > 0);
  //removeExpiredEffects(wearer.timedEffects)
}

// function removeExpiredEffects(effects) {
//   effects.forEach(effect => {
//     if (effect.counter <= 0) {
//       let index = effects.indexOf()
//       effects.
//     }
//   });  
// }