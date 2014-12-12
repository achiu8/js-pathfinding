var BFS = (function() {
  var solve = function(map, view) {
    var explored = [];
    var unexplored = [map.start];
    var cameFrom = {};
    cameFrom[map.start.xy] = null;

    while (unexplored.length > 0) {
      var current = unexplored.shift();
      if (explored.indexOf(current) > -1) continue;
      explored.push(current);

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
        var neighbor = neighbors[i];
        if (explored.indexOf(neighbor) == -1) {
          unexplored.push(neighbor);
          if (!cameFrom[neighbor.xy]) cameFrom[neighbor.xy] = current.xy;
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
