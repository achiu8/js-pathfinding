var Dijkstra = (function() {
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

      if (current.type == 'open') {
        current.type = 'explored';
        if (view) view.queueRender(current);
      }

      var neighbors = current.neighbors();
      for (var i = 0; i < neighbors.length; i++) {
        var newCost = costSoFar[current.xy] + 1;
        var neighbor = neighbors[i];
        if (!costSoFar[neighbor.xy] || newCost < costSoFar[neighbor.xy]) {
          costSoFar[neighbor.xy] = newCost;
          priority = -newCost;
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

  return {
    solve: solve
  };
})();
