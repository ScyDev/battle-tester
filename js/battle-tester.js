
// run how many battles?
const numberOfBattles = 1;
const maxRounds = 100; // prevent endless loops

// example: 0.223 means 22.3% chance
const probabilityOfFindingTile = 0.2;   // finding a suitable tile within range of target hero
const probabilityOfAttack = 0.3;        // attacking or just moving around?



let heroesOnMap = [
  heroNightmare,
  heroProtector
];

function main() {
  // copy basic hero attributes onto all heroes
  heroesOnMap.forEach(hero => {
    Object.assign(hero, basicHeroStuff);
  });

  runBattles();
}

// fill map with number of tiles
function initTiles() {
  tiles = [];
  
  tilesCount.forEach(tile => {
    for (let i = 0; i < tile.count; i++) {
      tiles.push({tile: tile, used: false})
    }
  });
}

function runBattles() {
  for (let i = 0; i < numberOfBattles; i++) {
    addOutputLine("----------- Battle "+(i+1)+" ----------");

    // reset heroes health before battle
    // TODO: copy them to have them clean (auras, timers, etc)!
    heroesOnMap.forEach(hero => {
      hero.health = hero.maxHealth;
      hero.dead = false;
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
    round++;
    if (round >= maxRounds) {
      break;
    }
    
    addOutputLine("--- Round "+round);

    oneFight();
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

  printHealth();
}


function printHealth() {
  heroesOnMap.forEach(hero => {
    addOutputLine(hero.name+" health: "+hero.health);
  });
}



// run battles
main();