function Dijkstra(map, view) {
  this.map = map;
  this.view = view;
  this.costs = {
    'open': 1,
    'water': 2,
    'elevation': 3
  };
  this.frontier = new PriorityQueue().add(this.map.start, 0);
  this.cameFrom = {};
  this.costSoFar = {};
  this.cameFrom[this.map.start.xy] = null;
  this.costSoFar[this.map.start.xy] = 0;
}

Dijkstra.prototype.solve = function() {
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
      var newCost = this.costSoFar[current.xy] + this.costs[neighbor.type];
      if (!this.costSoFar[neighbor.xy] || newCost < this.costSoFar[neighbor.xy]) {
        this.costSoFar[neighbor.xy] = newCost;
        priority = -newCost;
        this.cameFrom[neighbor.xy] = current.xy;
        this.frontier.add(neighbor, priority);
      }
    }
  }

  return false;
};

Dijkstra.prototype.buildShortestPath = function(path, map) {
  var current = map.goal.xy;
  var shortestPath = [];
  while (current != map.start.xy) {
    current = path[current];
    if (current != map.start.xy) shortestPath.push(current);
  }
  return shortestPath;
};
