var AStar = (function() {
  var solve = function(map, view) {
    var frontier = new PriorityQueue().add(map.start, 0);
    var cameFrom = {};
    var costSoFar = {};
    cameFrom[map.start.xy] = null;
    costSoFar[map.start.xy] = 0;

    while (!frontier.isEmpty()) {
      var current = frontier.pull();

      if (current == map.goal) {
        var shortestPath = buildShortestPath(cameFrom, map);
        if (view) view.queueRenderShortestPath(shortestPath);
        if (view) view.$container.dequeue('renderQueue');
        return true;
      }

      if (current.type == 'open') $(map).trigger('update', [current]);

      var neighbors = current.neighbors();
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        var newCost = costSoFar[current.xy] + costs[neighbor.type];
        if (!costSoFar[neighbor.xy] || newCost < costSoFar[neighbor.xy]) {
          costSoFar[neighbor.xy] = newCost;
          priority = -(newCost + manhattanDistance(neighbor, map.goal));
          cameFrom[neighbor.xy] = current.xy;
          frontier.add(neighbor, priority);
        }
      }
    }

    return false;
  };

  var buildShortestPath = function(path, map) {
    var current = map.goal.xy;
    var shortestPath = [];
    while (current != map.start.xy) {
      current = path[current];
      if (current != map.start.xy) shortestPath.push(current);
    }
    return shortestPath;
  };

  var manhattanDistance = function(neighbor, goal) {
    return Math.abs(neighbor.x - goal.x) + Math.abs(neighbor.y - goal.y);
  };

  var costs = {
    'open': 1,
    'water': 2,
    'elevation': 3
  };

  return {
    solve: solve
  };
})();
