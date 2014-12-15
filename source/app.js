var App = function(view) {
  this.view = view;
  this.mode = 'start';
  this.isSolved = false;
  this.setOptions();
};

App.prototype.init = function() {
  Config.bindListeners(this);
  this.setAndRenderMap(0);
  this.setAlgorithm('astar');
};

App.prototype.resetAll = function() {
  this.isSolved = false;

  var mapNum = $('#map').val();
  this.setAndRenderMap(mapNum);

  var algorithm = $('#algorithm').val();
  this.setAlgorithm(algorithm);

  $('#count').html('0');
  $('#best').html('0');
};

App.prototype.resetMap = function() {
  this.isSolved = false;
  this.map.resetExplored();
  this.view.renderMap(this.map);
};

App.prototype.setAlgorithm = function(algorithm) {
  this.algorithm = algorithms[algorithm];
};

App.prototype.setAndRenderMap = function(mapNum) {
  this.map = new Map(rawMaps[mapNum]);
  this.view.renderMap(this.map);
};

App.prototype.setStart = function(x, y) {
  this.map.setStart(x, y);
  this.view.renderMap(this.map);
};

App.prototype.setGoal = function(x, y) {
  this.map.setGoal(x, y);
  this.view.renderMap(this.map);
};

App.prototype.setWall = function(x, y) {
  this.map.set(x, y, { value: '#', type: 'wall' });
  this.view.renderMap(this.map);
};

App.prototype.setElevation = function(x, y) {
  this.map.set(x, y, { value: '^', type: 'elevation' });
  this.view.renderMap(this.map);
};

App.prototype.setWater = function(x, y) {
  this.map.set(x, y, { value: 'w', type: 'water' });
  this.view.renderMap(this.map);
};

App.prototype.setMode = function() {
  this.mode = $('#setMode').val();
};

App.prototype.setOptions = function() {
  var mapOptionTemplate = '<option value="{{mapNum}}">{{mapNum}}</option>';
  var maps = Object.keys(rawMaps);
  for (var i = 0; i < maps.length; i++) {
    var mapOption = mapOptionTemplate.replace(/{{mapNum}}/g, maps[i]);
    $('#map').append(mapOption);
  }

  var algoOptionTemplate = '<option value="{{algoNum}}">{{algoNum}}</option>';
  var algos = Object.keys(algorithms);
  for (var i = 0; i < algos.length; i++) {
    var algoOption = algoOptionTemplate.replace(/{{algoNum}}/g, algos[i]);
    $('#algorithm').append(algoOption);
  }
};

App.prototype.solve = function(solver) {
  if (this.isSolved) this.resetMap();
  return solver.solve(this.map, this.view);
};

var app = new App(new DivsView);
app.init();
