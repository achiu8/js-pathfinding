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
  if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
    var index = y * this.width + x;
    return this.tiles[index];
  }
};
