function extend(extension, object) {
  for (var property in extension) {
    object[property] = extension[property];
  }
}

var mapNum = document.getElementById('map');

// var myEvent = new Event('update');

var test = {};
$(test).on('update', function(e) {
  console.log(e.name);
});
$(test).trigger({ type: 'update', name: 'tester' });

function Tester() {
}
