function Manhattan(map, view) {
  this.map = map;
  this.view = view;
  this.frontier = new PriorityQueue().add(map.start, 0);
  this.cameFrom = {};
  this.cameFrom[map.start.xy] = null;
}

Manhattan.prototype.solve = function() {
  if (!this.frontier.isEmpty()) {
    var current = this.frontier.pull();

    if (current == this.map.goal) {
      var shortestPath = this.buildShortestPath(this.cameFrom, this.map);
      $(this.map).trigger('solved', [shortestPath]);
      return true;
    }

    if (current.type == 'open') $(this.map).trigger('update', [current]);

    var neighbors = current.neighbors();
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!this.cameFrom[neighbor.xy]) {
        priority = -this.manhattanDistance(neighbor, this.map.goal);
        this.cameFrom[neighbor.xy] = current.xy;
        this.frontier.add(neighbor, priority);
      }
    }
  }

  return false;
};

Manhattan.prototype.buildShortestPath = function(path, map) {
  var current = map.goal.xy;
  var shortestPath = [];
  while (current != map.start.xy) {
    current = path[current];
    if (current != map.start.xy) shortestPath.push(current);
  }
  return shortestPath;
};

Manhattan.prototype.manhattanDistance = function(neighbor, goal) {
  return Math.abs(neighbor.x - goal.x) + Math.abs(neighbor.y - goal.y);
};
