var Tile = function(value, x, y, map) {
  this.value = value;
  this.x = x;
  this.y = y;
  this.xy = this.x + '-' + this.y;
  this.map = map;
  this.type = this.type || this.setType();
};

Tile.prototype.neighbors = function() {
  return [
    this.north(),
    this.east(),
    this.south(),
    this.west()
  ].filter(Boolean);
};

Tile.prototype.north = function() {
  var neighbor = this.map.get(this.x, this.y - 1);
  if (neighbor.type != 'wall') return neighbor;
};

Tile.prototype.east = function() {
  var neighbor = this.map.get(this.x + 1, this.y);
  if (neighbor.type != 'wall') return neighbor;
};

Tile.prototype.south = function() {
  var neighbor = this.map.get(this.x, this.y + 1);
  if (neighbor.type != 'wall') return neighbor;
};

Tile.prototype.west = function() {
  var neighbor = this.map.get(this.x - 1, this.y);
  if (neighbor.type != 'wall') return neighbor;
};

Tile.prototype.setType = function() {
  if (this.value == this.map.startMark) {
    return 'start';
  } else if (this.value == this.map.goalMark) {
    return 'goal';
  } else if (this.value == this.map.openMark) {
    return 'open';
  } else {
    return 'wall';
  }
};
