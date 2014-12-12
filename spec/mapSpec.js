QUnit.module("Map", {
  beforeEach: function() {
    this.rawMap = {
      rawMap: [
        '##########',
        '#o.......#',
        '#........#',
        '#.......*#',
        '##########'
      ].join('\n'),

      start: 'o',
      goal: '*',
      open: '.'
    };

    this.map = new Map(this.rawMap);
  }
});

QUnit.test("sets the map width", function(assert) {
  assert.equal(this.map.width, 10);
});

QUnit.test("sets the map height", function(assert) {
  assert.equal(this.map.height, 5);
});

QUnit.test("sets the start position", function(assert) {
  assert.equal(this.map.start.x, 1);
  assert.equal(this.map.start.y, 1);
});

QUnit.test("sets the goal position", function(assert) {
  assert.equal(this.map.goal.x, 8);
  assert.equal(this.map.goal.y, 3);
});

QUnit.test("#get returns correct value", function(assert) {
  for (var i = 0; i < this.map.tiles.length; i++) {
    var x = this.map.tiles[i].x;
    var y = this.map.tiles[i].y;
    assert.equal(this.map.get(x, y).value, this.map.map[i]);
  }
});
