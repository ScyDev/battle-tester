
// run how many battles?
const numberOfBattles = 1;
const maxRounds = 100; // prevent endless loops

const refreshTilesAfterNumRounds = 15;

// example: 0.223 means 22.3% chance
const probabilityOfFindingTile = 0.2;   // finding a suitable tile within range of target hero
const probabilityOfAttack = 0.3;        // attacking or just moving around?

let heroesForBattle = [
  heroNightmare,
  heroProtector
];

let heroesOnMap = [];


function main() {
  // copy basic hero attributes onto all heroes
  heroesForBattle.forEach(hero => {
    let clonedHeroStuff = JSON.parse(JSON.stringify(basicHeroStuff)); // deep copy
    Object.assign(hero, clonedHeroStuff);
  });

  runBattles();
}

function runBattles() {
  for (let i = 0; i < numberOfBattles; i++) {
    addOutputLine("----------- Battle "+(i+1)+" ----------");

    // reset heroes health before battle
    // TODO: copy them to have them clean (auras, timers, etc)!
    heroesForBattle.forEach(hero => {
      // TODO: !!! stringify kills magic spells functions
      // let clonedHero = JSON.parse(JSON.stringify(hero)); // deep copy
      // heroesOnMap.push(clonedHero);

      // reset heroes manually
      hero.health = hero.maxHealth;
      hero.dead = false;
      hero.triggeredEffects = [],
      hero.timedEffects = []
      heroesOnMap.push(hero);
    });
    
    initTiles();

    oneBattle();
  }

  addOutputLine("---------------------------------");
  addOutputLine("All battles done!");
  heroesOnMap.forEach(hero => {
    addOutputLine(hero.name+" deaths: "+hero.deaths+" kills: "+hero.kills);
  });  
}

function oneBattle() {
  printHealth();

  let round = 0;
  while (heroesOnMap.filter(hero => hero.health > 0).length > 1) {
    // log tiles 
    console.log(JSON.parse(JSON.stringify(tiles))); // force copy, because JS console only has references and lazy loads them, so no matter how many times your log, it always shows the last state of an object

    round++;
    if (round % refreshTilesAfterNumRounds == 0) {
      refreshTiles();
    }
    if (round >= maxRounds) {
      break;
    }
    
    addOutputLine("--- Round "+round);

    // run timed effects
    heroesOnMap.forEach(hero => {
      triggerTimedEffect(hero)
    });
    
    oneFight();

    printHealth();
    logEffects();    
  }
}

function oneFight() {
  heroesOnMap.forEach(hero => {
    
    if (Math.random() < probabilityOfAttack) {
      let otherHeroes = heroesOnMap.filter(otherHero => otherHero.name != hero.name);
      // TODO: check for heroes that are not dead, for multi hero teams
      let targetHero = otherHeroes[Math.floor(Math.random()*otherHeroes.length)];

      let hasAttacked = false;
      if (heroCanDoActionOnTile("magic", hero, targetHero)) {
        magicAttack(hero, targetHero);
        hasAttacked = true;
      }
      else {
        let weaponsType = getTypeOfWeapons(hero);
        if (weaponsType == WEAPON_ONE_HANDED && heroCanDoActionOnTile("oneHanded", hero, targetHero)) {
          hero.weapons.forEach(weapon => {
            weaponAttack(hero, weapon, targetHero);
          });
          hasAttacked = true;
        }
        else if (weaponsType == WEAPON_TWO_HANDED && heroCanDoActionOnTile("twoHanded", hero, targetHero)) {
          weaponAttack(hero, hero.weapons[0], targetHero);
          hasAttacked = true;
        }
      }

      if (!hasAttacked) {
        addOutputLine(hero.name+" can't attack");
      }
    }
    else {
      addOutputLine(hero.name+" just moves around");
    }

  });

}


function printHealth() {
  heroesOnMap.forEach(hero => {
    addOutputLine(hero.name+" health: "+hero.health);
  });
}

function logEffects() {
  heroesOnMap.forEach(hero => {
    console.log(hero.name+" effects: ");
    console.log("           timed: "+JSON.stringify(hero.timedEffects, null, 4));
    console.log("           triggered: "+JSON.stringify(hero.triggeredEffects, null, 4));
  });
}



// run battles
main();