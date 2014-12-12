var Config = {
  bindListeners: function(app) {
    $('body').on('change', '#map', function() {
      app.reset();
    });

    $('body').on('change', '#algorithm', function() {
      app.reset();
    });

    $('body').on('change', '#setMode', function() {
      app.setMode();
    });

    $('body').on('click', '#start', function() {
      app.isSolved = app.solve(app.algorithm, app.map);
    });

    $('body').on('click', '.open', function() {
      var xy = this.id.split('-');
      if (app.isSolved) app.reset();
      if (app.mode == 'start') {
        app.setStart(parseInt(xy[0]), parseInt(xy[1]));
      } else if (app.mode == 'goal') {
        app.setGoal(parseInt(xy[0]), parseInt(xy[1]));
      }
    });
  }
};
