var DivsView = function() {
  this.tileTemplate = '<div id="{{xy}}" class="tile {{type}}"></div>';

  this.$container = $('#container');

  this.renderMap = function(map) {
    this.$container.html('');
    for (var y = 0; y < map.height; y++) {
      var $row = $('<div class="row"></div>');
      for (var x = 0; x < map.width; x++) {
        var tileType = map.get(x, y).type;
        var tile = this.tileTemplate
          .replace('{{type}}', tileType)
          .replace('{{xy}}', x + '-' + y);
        $row.append(tile);
      }
      this.$container.append($row);
    }
  };

  this.queueRenderShortestPath = function(path) {
    this.$container.queue('renderQueue', function() {
      $('.explored').addClass('open');
      $('.explored').removeClass('explored');
      for (var i = 0; i < path.length; i++) {
        $('#' + path[i]).addClass('explored');
      }
      $('#best').html(path.length);
    }).delay(10, 'renderQueue');
  };

  this.queueRender = function(tile) {
    this.$container.queue('renderQueue', function() {
      $('#' + tile.xy).removeClass('open');
      $('#' + tile.xy).addClass('explored');
      $('#count').html(parseInt($('#count').html()) + 1);
      $(this).dequeue('renderQueue');
    }).delay(10, 'renderQueue');
  };
};
