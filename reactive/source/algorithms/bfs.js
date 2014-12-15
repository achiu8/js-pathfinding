function BFS(map, view) {
  this.map = map;
  this.view = view;
  this.explored = [];
  this.unexplored = [this.map.start];
  this.cameFrom = {};
  this.cameFrom[this.map.start.xy] = null;
}

BFS.prototype.solve = function() {
  if (this.unexplored.length > 0) {
    var current = this.unexplored.shift();
    if (this.explored.indexOf(current) > -1) return;
    this.explored.push(current);

    if (current == this.map.goal) {
      var shortestPath = this.buildShortestPath(this.cameFrom, this.map);
      $(this.map).trigger('solved', [shortestPath]);
      return true;
    }

    if (current.type == 'open') $(this.map).trigger('update', [current]);

    var neighbors = current.neighbors();
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (this.explored.indexOf(neighbor) == -1) {
        this.unexplored.push(neighbor);
        if (!this.cameFrom[neighbor.xy]) this.cameFrom[neighbor.xy] = current.xy;
      }
    }
  }

  return false;
};

BFS.prototype.buildShortestPath = function(path, map) {
  var current = map.goal.xy;
  var shortestPath = [];
  while (current != map.start.xy) {
    current = path[current];
    if (current != map.start.xy) shortestPath.push(current);
  }
  return shortestPath;
};
