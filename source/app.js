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

App.prototype.setMode = function() {
  this.mode = $('#setMode').val();
  console.log(this.mode);
};

App.prototype.solve = function(solver) {
  return solver.solve(this.map, this.view);
};

var app = new App(new DivsView);
app.init();
