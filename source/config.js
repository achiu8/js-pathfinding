var Config = {
  bindListeners: function(app) {
    $('body').on('change', '#map', function() {
      app.reset();
    });

    $('body').on('change', '#algorithm', function() {
      app.reset();
    });

    $('body').on('click', '#start', function() {
      app.solve(app.algorithm, app.map);
    });

    $('body').on('click', '.open', function() {
      app.reset();
      var xy = this.id.split('-');
      app.setStart(parseInt(xy[0]), parseInt(xy[1]));
    });
  }
};
