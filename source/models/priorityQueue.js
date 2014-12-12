var PriorityQueue = function() {
  this.queue = [];
};

PriorityQueue.prototype.add = function(element, priority) {
  if (this.contains(element)) {
    for (var i = 0; i < this.size(); i++) {
      if (this.queue[i].element == element) this.queue[i].priority = priority;
    }
  } else {
    this.queue.push({ element: element, priority: priority });
  }
};

PriorityQueue.prototype.pull = function() {
  if (!this.isEmpty()) {
    this.sortByPriority();
    return this.queue.shift().element;
  } else {
    return null;
  }
};

PriorityQueue.prototype.isEmpty = function() {
  return this.size() == 0;
};

PriorityQueue.prototype.contains = function(element) {
  for (var i = 0; i < this.size(); i++) {
    if (this.queue[i].element == element) return true;
  }
  return false;
};

PriorityQueue.prototype.size = function() {
  return this.queue.length;
};

PriorityQueue.prototype.sortByPriority = function() {
  this.queue.sort(function(a, b) {
    return b.priority - a.priority;
  });
};
