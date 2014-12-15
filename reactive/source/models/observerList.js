function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.add = function(object) {
  return this.observerList.push(object);
};

ObserverList.prototype.count = function() {
  return this.observerList.length;
};

ObserverList.prototype.get = function(index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
};

ObserverList.prototype.indexOf = function(object) {
  return this.observerList.indexOf(object);
};

ObserverList.prototype.removeAt = function(index) {
  this.observerList.splice(index, 1);
};

