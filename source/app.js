var App = function(view) {
  this.view = view;

  this.init = function() {
    Config.bindListeners(this);
    this.setAndRenderMap(0);
    this.setAlgorithm('astar');
  };

  this.reset = function() {
    var mapNum = $('#map').val();
    this.setAndRenderMap(mapNum);

    var algorithm = $('#algorithm').val();
    this.setAlgorithm(algorithm);

    $('#count').html('0');
    $('#best').html('0');
  };

  this.setAlgorithm = function(algorithm) {
    this.algorithm = algorithms[algorithm];
  };

  this.setAndRenderMap = function(mapNum) {
    this.map = new Map(rawMaps[mapNum]);
    this.view.renderMap(this.map);
  };

  this.setStart = function(x, y) {
    var oldStart = this.map.start;
    oldStart.value = '.';
    oldStart.type = 'open'
    var newStart = this.map.get(x, y);
    newStart.value = 'o';
    newStart.type = 'start';
    this.map.start = newStart;
    $('#' + oldStart.xy).removeClass('start');
    $('#' + oldStart.xy).addClass('open');
    $('#' + newStart.xy).removeClass('open');
    $('#' + newStart.xy).addClass('start');
  };

  this.solve = function(solver) {
    solver.solve(this.map, this.view);
  };
};

var app = new App(new DivsView);
app.init();
