
// tile types and their number
const tilesCount = [
  { name: "portal",     count: 4},
  { name: "oneHanded",  count: 24},
  { name: "twoHanded",  count: 24},
  { name: "magic",      count: 24},
  { name: "shop",       count: 1},
  { name: "potion",     count: 1},
  { name: "trap",       count: 4},
  { name: "shield",     count: 4},
  { name: "pillar",     count: 6},
  { name: "kick",       count: 4}
];

// tiles generated on virtual map
let tiles = [];


function heroCanDoActionOnTile(action, attacker, defender) {
  //let unusedTiles = tiles.filter(tile => tile.used == false);
  
  // pick number of tiles in range of attacker
  let reachableTiles = [];
  for (let i = 0; i < attacker.range; i++) {
    let nextTile = tiles[Math.floor(Math.random()*tiles.length)];
    reachableTiles.push(nextTile)
  }
  //console.log({reachableTiles: reachableTiles});
  
  // check if any of them are unused and fit the type of the desired action
  let suitableTiles = reachableTiles.filter(tile => tile.used == false && tile.tile.name == action);
  if (suitableTiles.length == 0) {
    // no tiles of desired type
    return false;
  }
  console.log({suitableTiles: suitableTiles});
  
  // check probability of finding a way to fitting tile
  // multiple tiles of the same type increase probability
  if (Math.random() < probabilityOfFindingTile * suitableTiles.length) {
    // use that tile
    suitableTiles[0].used = true;
    
    return true;
  }
  
  // no tile found
  return false;
}