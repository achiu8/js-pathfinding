var Map = function(rawMap) {
  this.startMark = rawMap.start;
  this.goalMark = rawMap.goal;
  this.openMark = rawMap.open;
  this.tiles = [];
  this.processRawMap(rawMap.rawMap);
};

Map.prototype.processRawMap = function(rawMap) {
  this.width = rawMap.split('\n')[0].length;
  this.height = rawMap.split('\n').length;
  this.map = rawMap.split('\n').join('');

  for (var i = 0; i < this.map.length; i++) {
    var x = i % this.width;
    var y = Math.floor(i / this.width);
    this.tiles.push(new Tile(this.map[i], x, y, this));
  }

  this.start = this.tiles[this.map.indexOf(this.startMark)];
  this.goal = this.tiles[this.map.indexOf(this.goalMark)];
};

Map.prototype.get = function(x, y) {
  if (this.isValid(x, y)) {
    var index = y * this.width + x;
    return this.tiles[index];
  }
};

Map.prototype.set = function(x, y, props) {
  if (this.isValid(x, y)) {
    var tile = this.get(x, y);
    tile.value = props.value || tile.value;
    tile.type = props.type || tile.type;
    return tile;
  }
};

Map.prototype.setStart = function(x, y) {
  if (this.isValid(x, y)) {
    var oldStart = this.start;
    this.set(oldStart.x, oldStart.y, { value: '.', type: 'open' });
    this.start = this.set(x, y, { value: 'o', type: 'start' });
  }
};

Map.prototype.setGoal = function(x, y) {
  if (this.isValid(x, y)) {
    var oldGoal = this.goal;
    this.set(oldGoal.x, oldGoal.y, { value: '.', type: 'open' });
    this.goal = this.set(x, y, { value: '*', type: 'goal' });
  }
};

Map.prototype.resetExplored = function() {
  for (var i = 0; i < this.tiles.length; i++) {
    var tile = this.tiles[i];
    if (tile.type == 'explored') tile.type = 'open';
  }
};

Map.prototype.isValid = function(x, y) {
  return x >= 0 && x < this.width && y >= 0 && y < this.height;
};

