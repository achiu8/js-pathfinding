var Config = {
  bindListeners: function(app) {
    $('body').on('change', '#map', function() {
      app.resetAll();
    });

    $('body').on('change', '#algorithm', function() {
      app.resetAll();
    });

    $('body').on('change', '#setMode', function() {
      app.setMode();
    });

    $('body').on('click', '#start', function() {
      app.isSolved = app.solve(app.algorithm, app.map);
    });

    $('body').on('click', '.open', function() {
      var xy = this.id.split('-');
      if (app.isSolved) app.resetMap();
      if (app.mode == 'start') {
        app.setStart(parseInt(xy[0]), parseInt(xy[1]));
      } else if (app.mode == 'goal') {
        app.setGoal(parseInt(xy[0]), parseInt(xy[1]));
      } else if (app.mode == 'wall') {
        app.setWall(parseInt(xy[0]), parseInt(xy[1]));
      } else if (app.mode == 'elevation') {
        app.setElevation(parseInt(xy[0]), parseInt(xy[1]));
      } else if (app.mode == 'water') {
        app.setWater(parseInt(xy[0]), parseInt(xy[1]));
      }
    });
  }
};
